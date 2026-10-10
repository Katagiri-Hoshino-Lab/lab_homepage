import type { NewsItem } from '@data/news'
import { formatDate } from '../lib/format'
import { ArrowUpRight } from './Icons'

export const newsCategoryLabel: Record<NewsItem['category'], string> = {
  award: '受賞',
  media: 'メディア',
  publication: '発表',
  event: 'イベント',
  seminar: 'セミナー',
  workshop: 'ワークショップ',
  project: 'プロジェクト',
}

type Props = {
  item: NewsItem
  compact?: boolean
  variant?: 'row' | 'card'
}

const categoryColor: Record<NewsItem['category'], string> = {
  award: 'border-rose-200 bg-rose-100 text-rose-800',
  media: 'border-purple-200 bg-purple-100 text-purple-800',
  publication: 'border-blue-200 bg-blue-100 text-blue-800',
  event: 'border-orange-200 bg-orange-100 text-orange-800',
  seminar: 'border-cyan-200 bg-cyan-100 text-cyan-800',
  workshop: 'border-amber-200 bg-amber-100 text-amber-800',
  project: 'border-emerald-200 bg-emerald-100 text-emerald-800',
}

export default function NewsEntry({ item, compact, variant = 'row' }: Props) {
  const card = variant === 'card'
  return (
    <article className={card ? 'rounded-xl border border-line bg-white p-4 shadow-sm sm:p-5' : 'grid gap-2 py-5 sm:grid-cols-[7.5rem_1fr] sm:gap-6'}>
      <div className={card ? 'mb-2 flex flex-wrap items-center gap-2' : 'flex items-center gap-3 sm:flex-col sm:items-start sm:gap-1'}>
        <time dateTime={item.date} className="font-mono text-sm text-muted">
          {formatDate(item.date)}
        </time>
        <span className={card ? `rounded-full border px-2 py-0.5 text-xs ${categoryColor[item.category]}` : 'eyebrow text-nu-600'}>{newsCategoryLabel[item.category]}</span>
      </div>
      <div className={card ? 'flex flex-col gap-4 sm:flex-row sm:gap-5' : 'flex gap-5'}>
        <div className="min-w-0 flex-1">
          <h3 className="font-medium leading-snug text-ink">
            {item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-nu-700">
                {item.title}
                <ArrowUpRight className="ml-1 inline h-3.5 w-3.5 align-baseline text-nu-600" />
              </a>
            ) : (
              item.title
            )}
          </h3>
          {!compact && item.summary && <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.summary}</p>}
        </div>
        {!compact && item.image && (
          <img
            src={item.image}
            alt=""
            loading="lazy"
            className={card ? 'max-h-48 w-full shrink-0 rounded-md border border-line object-contain sm:h-28 sm:w-44 sm:object-cover' : 'hidden h-24 w-36 shrink-0 rounded border border-line object-cover sm:block'}
          />
        )}
      </div>
    </article>
  )
}
