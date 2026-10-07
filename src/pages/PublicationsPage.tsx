import { useDeferredValue, useMemo, useState } from 'react'
import { publications, type Publication } from '@data/publications'
import { SearchIcon } from '../components/Icons'
import PageHeader from '../components/PageHeader'
import PublicationEntry, { publicationCategoryLabel } from '../components/PublicationEntry'
import { useDocumentTitle } from '../lib/useDocumentTitle'

type Category = Publication['category']
const categories = Object.keys(publicationCategoryLabel) as Category[]
const years = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a)
const featured = publications.filter((p) => p.featured)

export default function PublicationsPage() {
  useDocumentTitle('研究発表')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category | 'all'>('all')
  const [year, setYear] = useState<number | 'all'>('all')
  const deferredQuery = useDeferredValue(query)

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    return publications.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        (year === 'all' || p.year === year) &&
        (!q || [p.title, p.venue, ...p.authors].some((s) => s.toLowerCase().includes(q))),
    )
  }, [deferredQuery, category, year])

  const grouped = useMemo(
    () =>
      years
        .map((y) => ({ year: y, items: filtered.filter((p) => p.year === y) }))
        .filter((g) => g.items.length > 0),
    [filtered],
  )

  const isFiltered = query !== '' || category !== 'all' || year !== 'all'
  const countOf = (c: Category | 'all') =>
    publications.filter((p) => (c === 'all' || p.category === c) && (year === 'all' || p.year === year)).length

  return (
    <>
      <PageHeader
        title="研究発表"
        lead={`${years[years.length - 1]}年以降の論文誌・国際会議・国内発表など ${publications.length} 件を掲載しています。`}
      />

      <div className="container-site py-12 sm:py-16">
        {/* フィルタ */}
        <div className="card space-y-4 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">キーワード検索</span>
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="タイトル・著者・会議名で検索"
                className="w-full rounded-md border border-line bg-paper py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-nu-500 focus:bg-white"
              />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <span className="shrink-0 text-muted">年</span>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="w-full rounded-md border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-nu-500 sm:w-32"
              >
                <option value="all">すべて</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="種別で絞り込み">
            {(['all', ...categories] as const).map((c) => {
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
                  {c === 'all' ? 'すべて' : publicationCategoryLabel[c]}
                  <span className={`ml-1.5 tabular-nums ${active ? 'text-white/60' : 'text-muted/70'}`}>{countOf(c)}</span>
                </button>
              )
            })}
          </div>
        </div>

        {!isFiltered && featured.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-bold">代表的な論文</h2>
            <div className="mt-3 divide-y divide-line border border-line bg-paper px-5">
              {featured.map((p) => (
                <PublicationEntry key={p.id} publication={p} showYear />
              ))}
            </div>
          </section>
        )}

        <p className="mt-12 text-sm text-muted" aria-live="polite">
          {filtered.length} 件{isFiltered && ' 該当'}
        </p>

        {grouped.length === 0 ? (
          <p className="py-20 text-center text-muted">条件に一致する発表はありません。</p>
        ) : (
          grouped.map((g) => (
            <section key={g.year} className="mt-6">
              <h2 className="sticky top-16 z-10 -mx-4 flex items-baseline gap-3 border-b border-line bg-white px-4 py-3 sm:mx-0 sm:px-0">
                <span className="tabular-nums text-2xl font-medium">{g.year}</span>
                <span className="text-xs text-muted">{g.items.length} 件</span>
              </h2>
              <div className="divide-y divide-line">
                {g.items.map((p) => (
                  <PublicationEntry key={p.id} publication={p} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </>
  )
}
