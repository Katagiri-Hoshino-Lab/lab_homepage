// content/ 以下の論文・発表・ニュースの YAML を検証する（PR ごとに CI で実行）
import { validateAll } from './lib/content.mjs'

const { errors, counts } = validateAll()
if (errors.length) {
  console.error(`✗ ${errors.length} 件の問題が見つかりました:\n`)
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}
console.log(`✓ 論文・発表 ${counts.publications} 件、ニュース ${counts.news} 件に問題はありません`)
