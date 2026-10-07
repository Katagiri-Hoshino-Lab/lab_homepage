import { groupPhotos } from '@data/gallery'
import { highlights } from '@data/highlights'
import { newsItems } from '@data/news'
import { heroContent } from '@data/site'
import NewsEntry from '../components/NewsEntry'
import SectionHeading from '../components/SectionHeading'
import SmartLink from '../components/SmartLink'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const latestNews = [...newsItems].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8)
const groupPhoto = groupPhotos[0]

export default function HomePage() {
  useDocumentTitle()

  return (
    <>
      {/* 研究室の紹介 */}
      <section className="border-b border-line bg-paper pt-16">
        <div className="container-site grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          <div>
            <p className="text-sm text-muted">名古屋大学 情報基盤センター</p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">片桐・星野研究室</h1>
            <p className="mt-5 text-lg font-bold leading-relaxed text-nu-700 sm:text-xl">
              {/* 日本語の語の途中で改行されないよう、句ごとに inline-block でまとめる */}
              <span className="inline-block">AIで切り開く</span>
              <span className="inline-block">次世代スーパーコンピューティング</span>
            </p>
            <p className="mt-4 leading-[1.9] text-ink/85">
              {heroContent.subtitle}
              {heroContent.description}
            </p>
          </div>
          <figure>
            <img
              src={groupPhoto.image}
              alt={`${groupPhoto.fiscalYear}年度 研究室メンバー集合写真`}
              fetchPriority="high"
              className="w-full border border-line"
            />
            <figcaption className="mt-2 text-xs text-muted">{groupPhoto.fiscalYear}年度 研究室メンバー</figcaption>
          </figure>
        </div>
      </section>

      {/* 研究紹介（サムネイル付きリンク） */}
      <section className="py-12 sm:py-16">
        <div className="container-site">
          <SectionHeading title="研究紹介" action={{ label: '研究紹介ページへ', to: '/research' }} />
          <ul className="grid grid-cols-2 gap-x-5 gap-y-7 md:grid-cols-3">
            {highlights.map((h) => (
              <li key={h.title}>
                <SmartLink href={h.url} className="group block">
                  <div className="aspect-video overflow-hidden border border-line bg-paper">
                    <img src={h.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <p className="mt-2 text-sm font-bold text-ink group-hover:text-nu-700 group-hover:underline">{h.title}</p>
                  <p className="text-xs leading-relaxed text-muted">{h.subtitle}</p>
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 最新情報 */}
      <section className="pb-16 sm:pb-20">
        <div className="container-site">
          <SectionHeading title="ニュース" action={{ label: 'ニュース一覧', to: '/news' }} />
          <div className="divide-y divide-line border-b border-line">
            {latestNews.map((n) => (
              <NewsEntry key={n.id} item={n} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
