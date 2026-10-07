// GitHub Issue フォーム（.github/ISSUE_TEMPLATE/）の内容から content/ の YAML を作る。
// GitHub Actions（.github/workflows/content-from-issue.yml）から呼ばれる。
//
//   node scripts/issue-to-content.mjs <event.json> <出力ディレクトリ>
//
// 出力ディレクトリには次のファイルを書き出す:
//   kind         … publication / news / none（対象外の Issue）
//   pr-title     … PR のタイトル
//   pr-body.md   … PR の本文
//   comment.md   … 失敗時に Issue へ投稿するコメント
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  ContentError,
  addPublications,
  NEWS_CATEGORIES,
  NEWS_DIR,
  PUBLICATION_CATEGORIES,
  ROOT,
  bibEntryToPublication,
  makeNewsId,
  newsPath,
  normalizeArxiv,
  normalizeDoi,
  parseBibtex,
  publicationLink,
  splitAuthors,
  toNews,
  uniqueId,
  validateNews,
  writeYaml,
} from './lib/content.mjs'

// Issue フォームの見出し → 項目名。フォームの label を変えたらここも合わせる
const PUBLICATION_FIELDS = {
  'DOI / arXiv': 'identifiers',
  BibTeX: 'bibtex',
  種別: 'category',
  タイトル: 'title',
  著者: 'authors',
  '会議名・論文誌名': 'venue',
  '発表日・公開日': 'date',
  ページ: 'pages',
  'PDF・スライドなどの URL': 'link',
  オプション: 'options',
}
const NEWS_FIELDS = {
  'ニュースの種類': 'category',
  日付: 'date',
  タイトル: 'title',
  本文: 'summary',
  '関連 URL': 'url',
  画像: 'image',
}

const [eventPath, outDir] = process.argv.slice(2)
mkdirSync(outDir, { recursive: true })
const out = (name, text) => writeFileSync(join(outDir, name), text)

const issue = JSON.parse(readFileSync(eventPath, 'utf8')).issue
const sections = parseIssueForm(issue.body ?? '')

try {
  if ('DOI / arXiv' in sections && 'BibTeX' in sections) {
    await handlePublication(pick(sections, PUBLICATION_FIELDS))
  } else if ('ニュースの種類' in sections) {
    await handleNews(pick(sections, NEWS_FIELDS))
  } else {
    out('kind', 'none')
  }
} catch (e) {
  const message = e instanceof ContentError ? e.message : `予期しないエラーが発生しました。\n\n\`\`\`\n${e.stack ?? e}\n\`\`\``
  out(
    'comment.md',
    `⚠️ **サイトへの反映用 PR を作成できませんでした。**\n\n${message}\n\nIssue を編集して内容を直すと、自動で再実行されます。`,
  )
  console.error(e)
  process.exit(1)
}

// ---------------------------------------------------------------------------

async function handlePublication(f) {
  const category = parseCategory(f.category)
  const options = f.options ?? ''
  const featured = /\[x\]\s*代表論文/i.test(options)
  const announce = /\[x\]\s*トップの/i.test(options)

  // 入力の組み立て: BibTeX があれば各エントリ、なければフォームの1件
  let inputs
  if (f.bibtex) {
    const entries = parseBibtex(f.bibtex)
    if (entries.length === 0) throw new ContentError('BibTeX を読み取れませんでした。`@article{...}` などの形式で貼り付けてください。')
    inputs = entries.map((e) => bibEntryToPublication(e))
  } else {
    const ids = (f.identifiers ?? '').split(/[\s,]+/).filter(Boolean)
    const doi = ids.map(normalizeDoi).find(Boolean)
    const arxiv = ids.map((s) => (/arxiv/i.test(s) || /^\d{4}\.\d{4,5}(v\d+)?$/.test(s) ? normalizeArxiv(s) : undefined)).find(Boolean)
    if (ids.length && !doi && !arxiv) throw new ContentError(`「DOI / arXiv」欄の \`${f.identifiers}\` を DOI または arXiv ID として読み取れませんでした。`)
    inputs = [{ doi, arxiv, title: f.title, authors: splitAuthors(f.authors), venue: f.venue, pages: f.pages, ...linkField(f.link) }]
  }

  const { created, news } = await addPublications(inputs, { date: parseDate(f.date), category, featured, announce })

  const first = created[0].data
  out('kind', 'publication')
  out('pr-title', created.length > 1 ? `論文・発表を ${created.length} 件追加` : `論文・発表を追加: ${truncate(first.title, 60)}`)
  out(
    'pr-body.md',
    [
      `#${issue.number} の内容から自動で作成しました。マージするとサイトに反映されます。`,
      '',
      ...created.map((c) => describePublication(c)),
      news.length ? `\n**トップの「最新情報」にも追加:**\n${news.map((n) => `- ${n.data.title}（\`${n.rel}\`）`).join('\n')}` : '',
      '',
      '内容を直したいときは、Issue を編集すると PR も自動で更新されます。細かい修正はこの PR のファイルを直接編集しても構いません。',
      '',
      `Closes #${issue.number}`,
    ].join('\n'),
  )
}

async function handleNews(f) {
  const category = Object.entries(NEWS_CATEGORIES).find(([, label]) => f.category?.startsWith(label))?.[0]
  const date = parseDate(f.date)?.date
  if (!date) throw new ContentError('「日付」は YYYY-MM-DD の形式で入力してください（例: 2026-10-06）。')

  const n = toNews({ date, category, title: f.title?.trim(), summary: f.summary?.trim(), url: f.url?.trim() })
  const problems = validateNews(n)
  if (problems.length) throw new ContentError(`入力内容を確認してください:\n${problems.map((m) => `- ${m}`).join('\n')}`)

  const id = uniqueId(makeNewsId(n), NEWS_DIR)
  const imageUrl = f.image?.match(/https:\/\/[^\s)"'<>]+/)?.[0]
  if (imageUrl) n.image = await downloadImage(imageUrl, id)

  const file = writeYaml(newsPath(id, date), toNews(n))
  out('kind', 'news')
  out('pr-title', `ニュースを追加: ${truncate(n.title, 60)}`)
  out(
    'pr-body.md',
    [
      `#${issue.number} の内容から自動で作成しました。マージするとサイトに反映されます。`,
      '',
      `### ${n.title}`,
      `- 種類: ${NEWS_CATEGORIES[n.category]}`,
      `- 日付: ${n.date}`,
      n.url ? `- URL: ${n.url}` : '',
      n.image ? `- 画像: \`public/${n.image}\`` : '',
      n.summary ? `\n> ${n.summary.replace(/\n/g, '\n> ')}` : '',
      `\nファイル: \`${file}\``,
      '',
      `Closes #${issue.number}`,
    ]
      .filter((l) => l !== '')
      .join('\n'),
  )
}

// ---------------------------------------------------------------------------

/** Issue フォームの本文（### 見出し + 値）を { 見出し: 値 } にする */
function parseIssueForm(body) {
  const result = {}
  const parts = body.replace(/\r\n/g, '\n').split(/^### /m).slice(1)
  for (const part of parts) {
    const nl = part.indexOf('\n')
    const heading = part.slice(0, nl).trim()
    const value = part.slice(nl + 1).trim()
    result[heading] = value === '_No response_' || value === 'None' ? '' : value.replace(/^```\w*\n([\s\S]*?)\n```$/, '$1')
  }
  return result
}

function pick(sections, mapping) {
  return Object.fromEntries(Object.entries(mapping).map(([heading, key]) => [key, sections[heading] || undefined]))
}

function parseCategory(value) {
  if (!value || value.startsWith('自動')) return undefined
  return Object.entries(PUBLICATION_CATEGORIES).find(([, label]) => value.startsWith(label))?.[0]
}

/** 「2026-10-06」「2026/10/6」「2026」などを { date?, year } にする */
function parseDate(value) {
  if (!value) return undefined
  const s = value.normalize('NFKC').trim()
  const full = s.match(/^(\d{4})[-/.年](\d{1,2})[-/.月](\d{1,2})日?$/)
  if (full) {
    const [, y, m, d] = full
    return { date: `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`, year: Number(y) }
  }
  const year = s.match(/^(\d{4})/)
  if (year) return { year: Number(year[1]) }
  throw new ContentError(`「発表日・公開日」の \`${value}\` を日付として読み取れませんでした（例: 2026-10-06 または 2026）。`)
}

function linkField(url) {
  if (!url) return {}
  const u = url.trim()
  if (!/^https?:\/\//.test(u)) throw new ContentError(`「PDF・スライドなどの URL」は http(s) で始まる URL にしてください。`)
  return /\.pdf($|\?)/i.test(u) ? { pdf: u } : { url: u }
}

async function downloadImage(url, id) {
  const res = await fetch(url, {
    headers: process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {},
  })
  const type = res.headers.get('content-type') ?? ''
  const ext = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' }[type.split(';')[0]]
  if (!res.ok || !ext) throw new ContentError(`添付画像をダウンロードできませんでした（${res.status} ${type}）。JPEG / PNG / WebP / GIF の画像を添付してください。`)
  const path = `img/news/${id}.${ext}`
  mkdirSync(join(ROOT, 'public', 'img', 'news'), { recursive: true })
  writeFileSync(join(ROOT, 'public', path), Buffer.from(await res.arrayBuffer()))
  return path
}

function describePublication({ data: p, rel: file }) {
  const link = publicationLink(p)
  return [
    `### ${p.title}`,
    `- 種別: ${PUBLICATION_CATEGORIES[p.category]}${p.featured ? '（代表論文）' : ''}`,
    `- 著者: ${p.authors.join(', ')}`,
    `- 会議・論文誌: ${p.venue}${p.pages ? `, pp. ${p.pages}` : ''}`,
    `- 年: ${p.year}${p.date ? `（${p.date}）` : ''}`,
    link ? `- リンク: ${link}` : '',
    `- ファイル: \`${file}\``,
    '',
  ]
    .filter((l) => l !== '')
    .join('\n')
}

function truncate(s, n) {
  s = s.replace(/\s+/g, ' ')
  return s.length > n ? s.slice(0, n - 1) + '…' : s
}
