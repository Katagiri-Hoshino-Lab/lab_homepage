import { useMemo, useState } from 'react'
import { newsItems, type NewsItem } from '@data/news'
import NewsEntry, { newsCategoryLabel } from '../components/NewsEntry'
import PageHeader from '../components/PageHeader'
import { useDocumentTitle } from '../lib/useDocumentTitle'

type Category = NewsItem['category']

const sorted = [...newsItems].sort((a, b) => b.date.localeCompare(a.date))
const usedCategories = (Object.keys(newsCategoryLabel) as Category[]).filter((c) => newsItems.some((n) => n.category === c))
const yearOf = (n: NewsItem) => n.date.slice(0, 4)

export default function NewsPage() {
  useDocumentTitle('ニュース')
  const [category, setCategory] = useState<Category | 'all'>('all')

  const grouped = useMemo(() => {
    const items = sorted.filter((n) => category === 'all' || n.category === category)
    const years = [...new Set(items.map(yearOf))]
    return years.map((y) => ({ year: y, items: items.filter((n) => yearOf(n) === y) }))
  }, [category])

  return (
    <>
      <PageHeader title="ニュース" lead="受賞、イベント、プロジェクトなど研究室の最新情報をお知らせします。" />

      <div className="container-site py-12 sm:py-16">
        <div className="flex flex-wrap gap-2" role="group" aria-label="カテゴリで絞り込み">
          {(['all', ...usedCategories] as const).map((c) => {
            const active = category === c
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(c)}
                className={`border px-3 py-1 text-xs ${
                  active ? 'border-nu-700 bg-nu-700 text-white' : 'border-line bg-white text-muted hover:border-ink/40 hover:text-ink'
                }`}
              >
                {c === 'all' ? 'すべて' : newsCategoryLabel[c]}
              </button>
            )
          })}
        </div>

        {grouped.map((g) => (
          <section key={g.year} className="mt-10">
            <h2 className="border-b border-line pb-3 tabular-nums text-2xl font-medium">{g.year}</h2>
            <div className="divide-y divide-line">
              {g.items.map((n) => (
                <NewsEntry key={n.id} item={n} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
