// 論文・発表・ニュースのデータ（content/ 以下の YAML）を扱う共通処理。
// Issue フォームからの自動 PR、コマンドラインからの追加、検証スクリプトで共有する。
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse, stringify } from 'yaml'

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
export const PUBLICATIONS_DIR = join(ROOT, 'content', 'publications')
export const NEWS_DIR = join(ROOT, 'content', 'news')

export const PUBLICATION_CATEGORIES = {
  journal: '論文誌',
  international: '国際会議',
  workshop: 'ワークショップ',
  domestic: '国内発表',
  invited: '招待講演',
  poster: 'ポスター',
}

export const NEWS_CATEGORIES = {
  award: '受賞',
  publication: '発表',
  media: 'メディア',
  event: 'イベント',
  seminar: 'セミナー',
  workshop: 'ワークショップ',
  project: 'プロジェクト',
}

const PUBLICATION_FIELDS = ['title', 'authors', 'venue', 'year', 'date', 'category', 'pages', 'doi', 'arxiv', 'pdf', 'url', 'featured']
const NEWS_FIELDS = ['date', 'category', 'title', 'summary', 'url', 'image', 'publication', 'featured']

/** ユーザーに見せるエラー（Issue へのコメントにそのまま使う） */
export class ContentError extends Error {}

// ---------------------------------------------------------------------------
// 正規化
// ---------------------------------------------------------------------------

export function normalizeDoi(input) {
  if (!input) return undefined
  const m = String(input).trim().match(/10\.\d{4,9}\/\S+/)
  return m ? m[0].replace(/[.,;]+$/, '') : undefined
}

export function normalizeArxiv(input) {
  if (!input) return undefined
  const s = String(input).trim()
  const m = s.match(/(\d{4}\.\d{4,5})(v\d+)?/) ?? s.match(/([a-z-]+(?:\.[A-Z]{2})?\/\d{7})(v\d+)?/i)
  return m ? m[1] : undefined
}

/** 著者欄の入力（改行・カンマ・読点区切り）を配列にする */
export function splitAuthors(input) {
  if (!input) return []
  if (Array.isArray(input)) return input.map((a) => a.trim()).filter(Boolean)
  return String(input)
    .split(/\r?\n|,|、|，|;| and /)
    .map((a) => a.trim())
    .filter(Boolean)
}

function cleanText(s) {
  return s == null ? undefined : String(s).replace(/\s+/g, ' ').trim() || undefined
}

export function slugify(s) {
  return String(s)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const STOP_WORDS = new Set(['a', 'an', 'the', 'of', 'for', 'and', 'in', 'on', 'to', 'with', 'by', 'via', 'using', 'toward', 'towards'])

/** 日本語タイトルなど英字が取れない場合用の、内容から決まる短い ID */
function shortHash(...parts) {
  return createHash('sha1').update(parts.join('|')).digest('hex').slice(0, 8)
}

/**
 * 「年-筆頭著者の姓-タイトルの主要語」形式の ID を作る。
 * 英字が取れない場合（日本語のみ）は「年-種別-タイトルのハッシュ」。どちらも同じ入力なら毎回同じ ID になる。
 */
export function makePublicationId(pub) {
  const first = pub.authors?.[0] ?? ''
  const family = /[a-z]/i.test(first) ? slugify(first.includes(',') ? first.split(',')[0] : first.split(/\s+/).pop()) : ''
  const words = slugify(pub.title ?? '')
    .split('-')
    .filter((w) => w && !STOP_WORDS.has(w))
    .slice(0, 3)
  const parts = [pub.year, family, ...words].filter(Boolean)
  return words.length > 0 ? parts.join('-') : [pub.year, pub.category, shortHash(pub.title, pub.venue)].join('-')
}

export function makeNewsId(news) {
  const words = slugify(news.title ?? '').split('-').filter((w) => w && !STOP_WORDS.has(w)).slice(0, 4)
  return [news.date, news.category, ...(words.length >= 2 ? words : [shortHash(news.title)])].join('-')
}

// ---------------------------------------------------------------------------
// 外部メタデータの取得
// ---------------------------------------------------------------------------

/** タイムアウト付き fetch。通信エラーは1回だけ再試行し、それでも失敗したら ContentError にする */
async function fetchWithTimeout(url, init = {}, ms = 15000) {
  for (let attempt = 1; ; attempt++) {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), ms)
    try {
      return await fetch(url, { ...init, signal: ctrl.signal, headers: { 'User-Agent': 'lab-homepage-bot (https://github.com/Katagiri-Hoshino-Lab/lab_homepage)', ...init.headers } })
    } catch (e) {
      if (attempt >= 2) throw new ContentError(`${new URL(url).host} に接続できませんでした（${e.cause?.code ?? e.name}）。時間をおいて Issue を編集（保存し直す）すると再実行されます。`)
      await new Promise((r) => setTimeout(r, 2000))
    } finally {
      clearTimeout(timer)
    }
  }
}

const CSL_TYPE_TO_CATEGORY = {
  'article-journal': 'journal',
  'journal-article': 'journal',
  article: 'journal',
  'paper-conference': 'international',
  'proceedings-article': 'international',
}

/** DOI から書誌情報を取得する（Crossref / DataCite / JaLC すべて doi.org のコンテントネゴシエーションで取得できる） */
export async function fetchDoi(doi) {
  const res = await fetchWithTimeout(`https://doi.org/${encodeURI(doi)}`, {
    headers: { Accept: 'application/vnd.citationstyles.csl+json' },
  })
  if (!res.ok) throw new ContentError(`DOI \`${doi}\` の情報を取得できませんでした（HTTP ${res.status}）。DOI が正しいか確認してください。`)
  const csl = await res.json()
  const issued = csl.issued?.['date-parts']?.[0] ?? csl.published?.['date-parts']?.[0] ?? []
  const volume = csl.volume ? `, vol. ${csl.volume}` : ''
  const issue = csl.issue ? `, no. ${csl.issue}` : ''
  const container = cleanText(Array.isArray(csl['container-title']) ? csl['container-title'][0] : csl['container-title'])
  const event = cleanText(csl['event-title'] ?? (typeof csl.event === 'string' ? csl.event : csl.event?.name))
  return {
    title: cleanText(stripTags(Array.isArray(csl.title) ? csl.title[0] : csl.title)),
    authors: (csl.author ?? []).map((a) => cleanText(a.literal ?? [a.given, a.family].filter(Boolean).join(' '))).filter(Boolean),
    venue: container ? container + (csl.type === 'article-journal' || csl.type === 'journal-article' ? volume + issue : '') : event,
    year: issued[0],
    date: issued.length === 3 ? toIsoDate(issued) : undefined,
    pages: cleanText(csl.page)?.replace(/–|--/g, '-'),
    category: CSL_TYPE_TO_CATEGORY[csl.type],
    doi,
  }
}

/** arXiv ID から書誌情報を取得する */
export async function fetchArxiv(id) {
  const res = await fetchWithTimeout(`https://export.arxiv.org/api/query?id_list=${encodeURIComponent(id)}`)
  if (!res.ok) throw new ContentError(`arXiv \`${id}\` の情報を取得できませんでした（HTTP ${res.status}）。`)
  const xml = await res.text()
  const entry = xml.match(/<entry>([\s\S]*?)<\/entry>/)?.[1]
  const title = entry && decodeXml(entry.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '')
  if (!entry || !title || /^Error$/i.test(title)) throw new ContentError(`arXiv \`${id}\` が見つかりませんでした。ID を確認してください。`)
  const published = entry.match(/<published>(\d{4}-\d{2}-\d{2})/)?.[1]
  return {
    title: cleanText(title),
    authors: [...entry.matchAll(/<author>\s*<name>([\s\S]*?)<\/name>/g)].map((m) => cleanText(decodeXml(m[1]))),
    venue: cleanText(decodeXml(entry.match(/<arxiv:journal_ref[^>]*>([\s\S]*?)<\/arxiv:journal_ref>/)?.[1] ?? '')) ?? 'arXiv preprint',
    year: published ? Number(published.slice(0, 4)) : undefined,
    date: published,
    doi: normalizeDoi(entry.match(/<arxiv:doi[^>]*>([\s\S]*?)<\/arxiv:doi>/)?.[1]),
    arxiv: id,
  }
}

function toIsoDate([y, m, d]) {
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

function stripTags(s) {
  return s == null ? s : String(s).replace(/<[^>]+>/g, '')
}

function decodeXml(s) {
  return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, '&')
}

// ---------------------------------------------------------------------------
// BibTeX
// ---------------------------------------------------------------------------

const BIB_TYPE_TO_CATEGORY = { article: 'journal', inproceedings: 'international', conference: 'international', proceedings: 'international' }

/** 最小限の BibTeX パーサ。Google Scholar / DBLP / ACM / IEEE が出力する形式を想定 */
export function parseBibtex(src) {
  const entries = []
  const re = /@(\w+)\s*\{\s*([^,\s]*)\s*,/g
  let m
  while ((m = re.exec(src))) {
    const type = m[1].toLowerCase()
    if (['comment', 'string', 'preamble'].includes(type)) continue
    let i = re.lastIndex
    let depth = 1
    const start = i
    for (; i < src.length && depth > 0; i++) {
      if (src[i] === '{') depth++
      else if (src[i] === '}') depth--
    }
    entries.push({ type, key: m[2], fields: parseBibFields(src.slice(start, i - 1)) })
    re.lastIndex = i
  }
  return entries
}

function parseBibFields(body) {
  const fields = {}
  let i = 0
  while (i < body.length) {
    const nameMatch = /\s*,?\s*([\w-]+)\s*=\s*/y
    nameMatch.lastIndex = i
    const nm = nameMatch.exec(body)
    if (!nm) break
    i = nameMatch.lastIndex
    let value = ''
    if (body[i] === '{') {
      let depth = 0
      const start = i
      for (; i < body.length; i++) {
        if (body[i] === '{') depth++
        else if (body[i] === '}' && --depth === 0) break
      }
      value = body.slice(start + 1, i)
      i++
    } else if (body[i] === '"') {
      const end = body.indexOf('"', i + 1)
      value = body.slice(i + 1, end)
      i = end + 1
    } else {
      const end = body.slice(i).search(/[,}\n]/)
      value = body.slice(i, end === -1 ? undefined : i + end)
      i += value.length
    }
    fields[nm[1].toLowerCase()] = latexToText(value)
  }
  return fields
}

// LaTeX のアクセント記号 → Unicode の結合文字（例: \"{u} → ü）
const LATEX_ACCENTS = { '"': '̈', "'": '́', '`': '̀', '^': '̂', '~': '̃', '=': '̄', '.': '̇', c: '̧', v: '̌', u: '̆', H: '̋' }

function latexToText(s) {
  return s
    .replace(/\\(?:textit|textbf|emph|mathrm|text)\{([^}]*)\}/g, '$1')
    .replace(/\{?\\(["'`^~=.]|[cvuH](?=[\s{]))\s*\{?(\w)\}?\}?/g, (_, accent, ch) => (ch + LATEX_ACCENTS[accent]).normalize('NFC'))
    .replace(/\\&/g, '&')
    .replace(/[{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function bibEntryToPublication({ type, fields: f }) {
  const authors = (f.author ?? '').split(/\s+and\s+/i).map((a) => {
    const [last, first] = a.split(',').map((x) => x.trim())
    return first ? `${first} ${last}` : last
  })
  const arxiv = (f.archiveprefix ?? f.eprinttype ?? '').toLowerCase() === 'arxiv' ? normalizeArxiv(f.eprint) : normalizeArxiv(f.journal?.match(/arxiv/i) ? f.journal : undefined)
  const volume = f.volume ? `, vol. ${f.volume}` : ''
  const number = f.number ? `, no. ${f.number}` : ''
  return {
    title: cleanText(f.title),
    authors: authors.filter(Boolean),
    venue: cleanText(f.journal ? f.journal + volume + number : f.booktitle ?? f.publisher),
    year: f.year ? Number(f.year) : undefined,
    pages: cleanText(f.pages)?.replace(/--|–/g, '-'),
    doi: normalizeDoi(f.doi),
    arxiv,
    url: !f.doi && f.url && !/arxiv\.org/.test(f.url) ? f.url : undefined,
    category: BIB_TYPE_TO_CATEGORY[type],
  }
}

// ---------------------------------------------------------------------------
// 補完・組み立て
// ---------------------------------------------------------------------------

/**
 * 手入力の値と DOI / arXiv から取得した値をマージする。手入力が常に優先される。
 * DOI と arXiv の両方がある場合は、出版版（DOI）の情報を優先する。
 */
export async function completePublication(input) {
  const doi = normalizeDoi(input.doi)
  const arxiv = normalizeArxiv(input.arxiv)
  const sources = []
  if (doi) sources.push(await fetchDoi(doi))
  if (arxiv) sources.push(await fetchArxiv(arxiv))
  // arXiv に出版版 DOI が登録されていれば、それも取りに行く
  const linkedDoi = !doi && sources[0]?.doi
  if (linkedDoi) sources.unshift(await fetchDoi(linkedDoi).catch(() => ({ doi: linkedDoi })))

  const merged = {}
  for (const src of [...sources].reverse()) Object.assign(merged, definedOnly(src))
  Object.assign(merged, definedOnly({ ...input, doi: doi ?? merged.doi, arxiv: arxiv ?? merged.arxiv }))
  if (input.authors?.length) merged.authors = input.authors
  if (merged.date && !input.year) merged.year = Number(merged.date.slice(0, 4))
  return toPublication(merged)
}

function definedOnly(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0)))
}

/** フィールド順を揃え、余計なキーを落とす */
export function toPublication(p) {
  const out = {}
  for (const k of PUBLICATION_FIELDS) if (p[k] !== undefined && p[k] !== false) out[k] = p[k]
  if (out.year) out.year = Number(out.year)
  return out
}

export function toNews(n) {
  const out = {}
  for (const k of NEWS_FIELDS) if (n[k] !== undefined && n[k] !== false && n[k] !== '') out[k] = n[k]
  return out
}

export function publicationLink(p) {
  if (p.doi) return `https://doi.org/${p.doi}`
  if (p.arxiv) return `https://arxiv.org/abs/${p.arxiv}`
  return p.pdf ?? p.url
}

/** 論文・発表から「最新情報」用のニュースを作る */
export function newsFromPublication(id, p) {
  const isPaper = p.category === 'journal'
  return toNews({
    date: p.date ?? new Date().toISOString().slice(0, 10),
    category: 'publication',
    title: isPaper ? `論文「${p.title}」が ${p.venue} に掲載されました` : `${p.venue} で「${p.title}」を発表`,
    summary: `${p.authors.join(', ')}`,
    url: publicationLink(p),
    publication: id,
  })
}

// ---------------------------------------------------------------------------
// 読み書き
// ---------------------------------------------------------------------------

function listYaml(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { recursive: true })
    .filter((f) => String(f).endsWith('.yaml'))
    .map((f) => join(dir, String(f)))
}

export function loadAll(dir) {
  return listYaml(dir).map((file) => ({ file, id: basename(file, '.yaml'), data: parse(readFileSync(file, 'utf8')) ?? {} }))
}

export function publicationPath(id, year) {
  return join(PUBLICATIONS_DIR, String(year), `${id}.yaml`)
}

export function newsPath(id, date) {
  return join(NEWS_DIR, String(date).slice(0, 4), `${id}.yaml`)
}

/** 既存 ID と衝突しない ID にする */
export function uniqueId(id, dir) {
  return uniqueIdAmong(id, loadAll(dir))
}

export function writeYaml(file, data) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, stringify(data, { lineWidth: 0 }))
  return relative(ROOT, file).replaceAll('\\', '/')
}

// ---------------------------------------------------------------------------
// 追加
// ---------------------------------------------------------------------------

const FIELD_HINTS = {
  title: '「タイトル」を入力してください（DOI / arXiv から取得できませんでした）',
  authors: '「著者」を入力してください',
  venue: '「会議名・論文誌名」を入力してください',
  year: '「発表日・公開日」を入力してください（年だけでも可）',
}

/**
 * 論文・発表を補完・検証して content/ に書き出す。1件でも問題があれば何も書かずに ContentError を投げる。
 * @param inputs  手入力・BibTeX から作った部分的な論文情報の配列
 * @param options date: { date?, year }, category, featured, announce（最新情報にも載せる）
 */
export async function addPublications(inputs, { date, category, featured, announce } = {}) {
  const existing = loadAll(PUBLICATIONS_DIR)
  const pending = []
  const errors = []
  for (const [i, raw] of inputs.entries()) {
    const label = inputs.length > 1 ? `${i + 1}件目: ` : ''
    const p = await completePublication({ ...raw, ...date, category: category ?? raw.category, featured: featured || undefined })
    const dup = findDuplicate(p, [...existing, ...pending])
    if (dup) {
      errors.push(`${label}「${p.title}」はすでに登録されています（\`${relative(ROOT, dup.file).replaceAll('\\', '/')}\`）。`)
      continue
    }
    if (!p.category) {
      errors.push(`${label}${p.title ? `「${p.title}」の` : ''}種別を自動判定できませんでした。フォームの「種別」（コマンドでは --category）を指定してください。`)
      continue
    }
    const problems = validatePublication(p).map((m) => FIELD_HINTS[m.split('（')[0]] ?? m)
    if (problems.length) {
      errors.push(`${label}${p.title ? `「${p.title}」の` : ''}情報が足りません:\n${problems.map((m) => `- ${m}`).join('\n')}`)
      continue
    }
    const id = uniqueIdAmong(makePublicationId(p), [...existing, ...pending])
    pending.push({ id, file: publicationPath(id, p.year), data: p })
  }
  if (errors.length) throw new ContentError(errors.join('\n\n'))

  const created = pending.map((c) => ({ ...c, rel: writeYaml(c.file, c.data) }))
  const news = []
  if (announce) {
    const existingNews = loadAll(NEWS_DIR)
    for (const c of created) {
      const n = newsFromPublication(c.id, c.data)
      const id = uniqueIdAmong(`${n.date}-${c.id.replace(/^\d{4}-/, '')}`, [...existingNews, ...news])
      news.push({ id, data: n, rel: writeYaml(newsPath(id, n.date), n) })
    }
  }
  return { created, news }
}

function uniqueIdAmong(id, entries) {
  const taken = new Set(entries.map((e) => e.id))
  let candidate = id
  for (let n = 2; taken.has(candidate); n++) candidate = `${id}-${n}`
  return candidate
}

// ---------------------------------------------------------------------------
// 検証
// ---------------------------------------------------------------------------

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const URL_RE = /^https?:\/\/\S+$/

export function validatePublication(p, year) {
  const errors = []
  if (!p.title || typeof p.title !== 'string') errors.push('title（タイトル）がありません')
  if (!Array.isArray(p.authors) || p.authors.length === 0 || p.authors.some((a) => typeof a !== 'string' || !a.trim()))
    errors.push('authors（著者）は1人以上の名前のリストにしてください')
  if (!p.venue || typeof p.venue !== 'string') errors.push('venue（会議名・論文誌名）がありません')
  if (!Number.isInteger(p.year) || p.year < 1990 || p.year > 2100) errors.push('year（年）が正しくありません')
  if (year !== undefined && p.year !== Number(year)) errors.push(`year（${p.year}）とフォルダの年（${year}）が一致しません`)
  if (!(p.category in PUBLICATION_CATEGORIES)) errors.push(`category は ${Object.keys(PUBLICATION_CATEGORIES).join(' / ')} のいずれかにしてください`)
  if (p.date !== undefined && !DATE_RE.test(String(p.date))) errors.push('date は YYYY-MM-DD 形式にしてください')
  if (p.doi !== undefined && !/^10\.\d{4,9}\/\S+$/.test(p.doi)) errors.push('doi は「10.」で始まる DOI にしてください（URL ではなく）')
  if (p.arxiv !== undefined && !normalizeArxiv(p.arxiv)) errors.push('arxiv は arXiv ID（例: 2601.06886）にしてください')
  for (const k of ['pdf', 'url']) if (p[k] !== undefined && !URL_RE.test(p[k])) errors.push(`${k} は http(s) の URL にしてください`)
  const unknown = Object.keys(p).filter((k) => !PUBLICATION_FIELDS.includes(k))
  if (unknown.length) errors.push(`不明な項目があります: ${unknown.join(', ')}`)
  return errors
}

export function validateNews(n, year) {
  const errors = []
  if (!DATE_RE.test(String(n.date ?? ''))) errors.push('date（日付）は YYYY-MM-DD 形式にしてください')
  else if (year !== undefined && String(n.date).slice(0, 4) !== String(year)) errors.push(`date（${n.date}）とフォルダの年（${year}）が一致しません`)
  if (!(n.category in NEWS_CATEGORIES)) errors.push(`category は ${Object.keys(NEWS_CATEGORIES).join(' / ')} のいずれかにしてください`)
  if (!n.title || typeof n.title !== 'string') errors.push('title（タイトル）がありません')
  if (n.summary !== undefined && typeof n.summary !== 'string') errors.push('summary は文字列にしてください')
  if (n.url !== undefined && !URL_RE.test(n.url)) errors.push('url は http(s) の URL にしてください')
  if (n.image !== undefined && !existsSync(join(ROOT, 'public', n.image))) errors.push(`image のファイル public/${n.image} がありません`)
  const unknown = Object.keys(n).filter((k) => !NEWS_FIELDS.includes(k))
  if (unknown.length) errors.push(`不明な項目があります: ${unknown.join(', ')}`)
  return errors
}

// 日本語を含むタイトル・会議名を比較用に正規化する（全角半角・大文字小文字・空白と記号の違いを無視）
const norm = (t) => String(t ?? '').normalize('NFKC').toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, '')

/** 同じ論文・発表がすでに登録されていないか調べる（DOI / arXiv が同じ、またはタイトル・会議名・年が同じ） */
export function findDuplicate(p, existing) {
  return existing.find(
    (e) =>
      (p.doi && e.data.doi?.toLowerCase() === p.doi.toLowerCase()) ||
      (p.arxiv && e.data.arxiv === p.arxiv) ||
      (norm(p.title) && norm(e.data.title) === norm(p.title) && norm(e.data.venue) === norm(p.venue) && e.data.year === p.year),
  )
}

/** content/ 全体を検証し、エラーメッセージの配列を返す */
export function validateAll() {
  const errors = []
  const pubs = loadAll(PUBLICATIONS_DIR)
  const pubIds = new Set()
  for (const e of pubs) {
    const rel = relative(ROOT, e.file).replaceAll('\\', '/')
    const year = basename(dirname(e.file))
    for (const msg of validatePublication(e.data, year)) errors.push(`${rel}: ${msg}`)
    if (pubIds.has(e.id)) errors.push(`${rel}: ファイル名（ID）が他の年と重複しています`)
    pubIds.add(e.id)
    const dup = findDuplicate(e.data, pubs.filter((o) => o !== e))
    if (dup) errors.push(`${rel}: ${relative(ROOT, dup.file).replaceAll('\\', '/')} と重複しています（DOI / arXiv、またはタイトル・会議名・年が同じ）`)
  }
  const news = loadAll(NEWS_DIR)
  const newsIds = new Set()
  for (const e of news) {
    const rel = relative(ROOT, e.file).replaceAll('\\', '/')
    for (const msg of validateNews(e.data, basename(dirname(e.file)))) errors.push(`${rel}: ${msg}`)
    if (e.data.publication && !pubIds.has(e.data.publication)) errors.push(`${rel}: publication「${e.data.publication}」に対応する論文・発表がありません`)
    if (newsIds.has(e.id)) errors.push(`${rel}: ファイル名（ID）が他の年と重複しています`)
    newsIds.add(e.id)
  }
  return { errors, counts: { publications: pubs.length, news: news.length } }
}
