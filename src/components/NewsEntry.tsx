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
}

export default function NewsEntry({ item, compact }: Props) {
  return (
    <article className="grid gap-2 py-5 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
      <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-1">
        <time dateTime={item.date} className="tabular-nums text-sm text-muted">
          {formatDate(item.date)}
        </time>
        <span className="border border-nu-600 px-1.5 text-xs leading-5 text-nu-700">{newsCategoryLabel[item.category]}</span>
      </div>
      <div className="flex gap-5">
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
            className="hidden h-24 w-36 shrink-0 rounded border border-line object-cover sm:block"
          />
        )}
      </div>
    </article>
  )
}
