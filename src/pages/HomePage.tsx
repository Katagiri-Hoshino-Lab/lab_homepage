import { Link } from 'react-router-dom'
import { newsItems } from '@data/news'
import { ArrowRight } from '../components/Icons'
import NewsEntry from '../components/NewsEntry'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const latestNews = newsItems.slice(0, 5)

export default function HomePage() {
  useDocumentTitle()

  return (
    <section className="container-site pb-16 pt-28 sm:pb-24 sm:pt-36" aria-labelledby="latest-news-heading">
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-nu-600">News</p>
          <h1 id="latest-news-heading" className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">最新情報</h1>
        </div>
        <Link to="/news" className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-nu-700 hover:text-nu-900">
          ニュース一覧
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="divide-y divide-line border-y border-line">
        {latestNews.map((item) => (
          <NewsEntry key={item.id} item={item} compact />
        ))}
      </div>
    </section>
  )
}
