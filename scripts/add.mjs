// 手元の PC から論文・発表を追加するコマンド。Issue フォームと同じ処理で content/ に YAML を作る。
//
//   npm run add -- 10.1145/3784828.3785335
//   npm run add -- https://arxiv.org/abs/2510.00031 --category international
//   npm run add -- refs.bib --news
//
// オプション:
//   --category <種別>  journal / international / workshop / domestic / invited / poster
//   --date <日付>      YYYY-MM-DD（省略時は DOI / arXiv / BibTeX の日付）
//   --featured         代表論文として表示する
//   --news             トップの「最新情報」にも載せる
import { existsSync, readFileSync } from 'node:fs'
import { parseArgs } from 'node:util'
import {
  ContentError,
  PUBLICATION_CATEGORIES,
  addPublications,
  bibEntryToPublication,
  normalizeArxiv,
  normalizeDoi,
  parseBibtex,
} from './lib/content.mjs'

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    category: { type: 'string' },
    date: { type: 'string' },
    featured: { type: 'boolean' },
    news: { type: 'boolean' },
  },
})

if (positionals.length === 0) {
  console.error('使い方: npm run add -- <DOI | arXiv | BibTeX ファイル> [--category 種別] [--date YYYY-MM-DD] [--featured] [--news]')
  process.exit(1)
}
if (values.category && !(values.category in PUBLICATION_CATEGORIES)) {
  console.error(`--category は ${Object.keys(PUBLICATION_CATEGORIES).join(' / ')} のいずれかにしてください`)
  process.exit(1)
}

const inputs = positionals.flatMap((arg) => {
  if (existsSync(arg)) return parseBibtex(readFileSync(arg, 'utf8')).map(bibEntryToPublication)
  const doi = normalizeDoi(arg)
  if (doi) return [{ doi }]
  const arxiv = normalizeArxiv(arg)
  if (arxiv) return [{ arxiv }]
  console.error(`「${arg}」を DOI・arXiv・BibTeX ファイルのいずれとしても読み取れませんでした`)
  process.exit(1)
})

const date = values.date ? { date: values.date, year: Number(values.date.slice(0, 4)) } : undefined

try {
  const { created, news } = await addPublications(inputs, {
    date,
    category: values.category,
    featured: values.featured,
    announce: values.news,
  })
  for (const c of created) console.log(`✓ 追加: ${c.rel}\n    ${c.data.title}`)
  for (const n of news) console.log(`✓ 最新情報: ${n.rel}`)
  console.log('\n内容を確認して、必要なら YAML を直してから PR を出してください。')
} catch (e) {
  if (!(e instanceof ContentError)) throw e
  console.error(`✗ ${e.message}`)
  process.exit(1)
}
