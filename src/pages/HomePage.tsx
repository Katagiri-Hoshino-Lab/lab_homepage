import { Link } from 'react-router-dom'
import { newsItems } from '@data/news'
import { heroContent } from '@data/site'
import { ArrowRight } from '../components/Icons'
import NewsEntry from '../components/NewsEntry'
import SectionHeading from '../components/SectionHeading'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const latestNews = newsItems.slice(0, 5)

export default function HomePage() {
  useDocumentTitle()

  return (
    <>
      <Hero />
      <section className="border-y border-line bg-white py-16 sm:py-24">
        <div className="container-site">
          <SectionHeading eyebrow="News" title="最新情報" action={{ label: 'ニュース一覧', to: '/news' }} />
          <div className="divide-y divide-line border-y border-line">
            {latestNews.map((item) => (
              <NewsEntry key={item.id} item={item} compact />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function Hero() {
  return (
    <section className="relative flex min-h-[38rem] h-[100svh] max-h-[60rem] flex-col overflow-hidden bg-ink text-white">
      <img
        src={import.meta.env.BASE_URL + 'img/hero-bg.jpg'}
        alt=""
        aria-hidden
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" aria-hidden />

      <div className="container-site relative flex flex-1 flex-col justify-center pb-10 pt-28">
        <p className="eyebrow flex items-center gap-3 text-signal">
          <span className="h-px w-8 bg-signal" />
          Katagiri-Hoshino Lab<span className="hidden sm:inline"> · Nagoya University</span>
        </p>
        <h1 className="mt-6 max-w-4xl text-[2.1rem] font-black leading-[1.25] tracking-tight sm:text-6xl sm:leading-[1.15]">
          {/* 日本語の語の途中で改行されないよう、句ごとに inline-block でまとめる */}
          <span className="inline-block">AIで切り開く</span>
          <br />
          <span className="inline-block">
            次世代<span className="text-signal">スーパー</span>
          </span>
          <span className="inline-block">コンピューティング</span>
        </h1>
        <p className="mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-white/75 sm:text-lg">
          {heroContent.subtitle}
          {heroContent.description}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          {heroContent.ctas.map((cta) => (
            <Link
              key={cta.href}
              to={cta.href}
              className={
                cta.variant === 'primary'
                  ? 'inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-white'
                  : 'inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/5'
              }
            >
              {cta.label}
              {cta.variant === 'primary' && <ArrowRight />}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
