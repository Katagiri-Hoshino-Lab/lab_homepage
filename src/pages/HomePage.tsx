import { Link } from 'react-router-dom'
import { highlights } from '@data/highlights'
import { newsItems } from '@data/news'
import { heroContent } from '@data/site'
import { ArrowRight } from '../components/Icons'
import NewsEntry from '../components/NewsEntry'
import SmartLink from '../components/SmartLink'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const latestNews = newsItems.slice(0, 5)

export default function HomePage() {
  useDocumentTitle()

  return (
    <>
      <Hero />
      <section aria-label="研究室の紹介リンク" className="border-b border-line bg-slate-50 py-4 sm:py-6">
        <div className="container-site">
          <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:gap-4">
            {highlights.map((highlight) => (
              <li key={highlight.title} className="w-52 shrink-0 snap-start sm:w-64">
                <SmartLink href={highlight.url} className="group block h-full overflow-hidden rounded-xl border border-line bg-white transition-colors hover:border-blue-300">
                  <img src={highlight.image} alt="" loading="lazy" className="aspect-video w-full object-cover" />
                  <div className="p-3">
                    <p className="font-semibold text-ink group-hover:text-blue-700">{highlight.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{highlight.subtitle}</p>
                  </div>
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-white py-6 sm:py-8" aria-labelledby="latest-news-heading">
        <div className="container-site">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="latest-news-heading" className="text-2xl font-bold tracking-tight">最新情報</h2>
            <Link to="/news" className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline">
              ニュース一覧
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {latestNews.map((item) => (
              <NewsEntry key={item.id} item={item} variant="card" />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function Hero() {
  return (
    <section className="relative mt-16 overflow-hidden border-b border-line bg-ink text-white">
      <img
        src={import.meta.env.BASE_URL + 'img/hero-bg.jpg'}
        alt=""
        aria-hidden
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden />
      <div className="container-site relative py-8 lg:py-10">
        <p className="mb-6 text-sm font-bold sm:text-base">{heroContent.eyebrow}</p>
        <h1 className="mb-6 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
          <span className="block">AIで切り開く</span>
          <span className="mt-3 block"><span className="inline-block">次世代スーパー</span><span className="inline-block">コンピューティング</span></span>
        </h1>
        <p className="text-sm font-bold leading-relaxed sm:text-base">
          {heroContent.subtitle}
          {heroContent.description}
        </p>
      </div>
    </section>
  )
}
