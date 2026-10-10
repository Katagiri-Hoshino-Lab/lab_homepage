import { Link } from 'react-router-dom'
import { accessInfo } from '@data/access'
import { groupPhotos } from '@data/gallery'
import { highlights } from '@data/highlights'
import { currentMembers } from '@data/members'
import { newsItems } from '@data/news'
import { projects } from '@data/projects'
import { publications } from '@data/publications'
import { researchThemes } from '@data/research'
import { aboutContent, heroContent } from '@data/site'
import { ArrowRight, ArrowUpRight } from '../components/Icons'
import NewsEntry from '../components/NewsEntry'
import ProjectCard from '../components/ProjectCard'
import PublicationEntry from '../components/PublicationEntry'
import SectionHeading from '../components/SectionHeading'
import SmartLink from '../components/SmartLink'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const latestNews = [...newsItems].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)
const latestPublications = publications.filter((p) => p.category !== 'domestic').slice(0, 5)
const featuredProjects = projects.filter((p) => p.status === 'ongoing' && p.featured)
const featuredThemes = researchThemes.filter((t) => t.featured)
const faculty = currentMembers.filter((m) => m.category !== 'student' && m.category !== 'staff')

export default function HomePage() {
  useDocumentTitle()

  return (
    <>
      <Hero />

      {/* ハイライト（外部リンクのカード列） */}
      <section aria-label="ハイライト" className="border-b border-line bg-white">
        <div className="container-site py-6">
          <ul className="scrollbar-none -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
            {highlights.map((h) => (
              <li key={h.title} className="w-56 shrink-0 snap-start sm:w-64">
                <SmartLink href={h.url} className="group block">
                  <div className="aspect-video overflow-hidden rounded-md border border-line bg-paper">
                    <img
                      src={h.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-2 flex items-center gap-1 text-sm font-bold text-ink group-hover:text-nu-700">
                    {h.title}
                    <ArrowUpRight className="h-3 w-3 text-muted" />
                  </p>
                  <p className="text-xs text-muted">{h.subtitle}</p>
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 研究領域 */}
      <section className="py-16 sm:py-24">
        <div className="container-site">
          <SectionHeading index="01" eyebrow="Research" title="研究領域" action={{ label: '研究紹介へ', to: '/research' }} />
          <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {featuredThemes.map((t, i) => (
              <li key={t.id} className="bg-white">
                <Link to={`/research#${t.id}`} className="group flex h-full flex-col p-6 transition-colors hover:bg-nu-50/60">
                  <span className="font-mono text-xs text-nu-600">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 text-lg font-bold leading-snug text-ink group-hover:text-nu-700">{t.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{t.summary}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {t.keywords.slice(0, 4).map((k) => (
                      <span key={k} className="chip">{k}</span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
            <li className="bg-ink">
              <Link to="/research" className="group flex h-full min-h-[12rem] flex-col justify-between p-6 text-white">
                <span className="eyebrow text-signal">All themes</span>
                <span className="flex items-center justify-between text-lg font-bold">
                  すべての研究テーマ
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          </ol>
        </div>
      </section>

      {/* ニュース + 研究発表 */}
      <section className="border-y border-line bg-white py-16 sm:py-24">
        <div className="container-site grid gap-16 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeading index="02" eyebrow="News" title="最新情報" action={{ label: 'ニュース一覧', to: '/news' }} />
            <div className="divide-y divide-line border-y border-line">
              {latestNews.map((n) => (
                <NewsEntry key={n.id} item={n} compact />
              ))}
            </div>
          </div>
          <div>
            <SectionHeading index="03" eyebrow="Publications" title="最新の研究発表" action={{ label: '研究発表一覧', to: '/publications' }} />
            <div className="divide-y divide-line border-y border-line">
              {latestPublications.map((p) => (
                <PublicationEntry key={p.id} publication={p} showYear />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* プロジェクト */}
      <section className="py-16 sm:py-24">
        <div className="container-site">
          <SectionHeading index="04" eyebrow="Projects" title="進行中のプロジェクト" action={{ label: 'プロジェクト一覧', to: '/projects' }} />
          <div className="grid gap-5 md:grid-cols-2">
            {featuredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* メンバー */}
      <section className="border-t border-line bg-white py-16 sm:py-24">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="overflow-hidden rounded-lg border border-line">
            <img src={groupPhotos[0].image} alt={`${groupPhotos[0].fiscalYear}年度 研究室メンバー集合写真`} loading="lazy" className="w-full" />
          </div>
          <div>
            <SectionHeading index="05" eyebrow="Members" title="研究室メンバー" />
            <p className="-mt-4 mb-6 text-sm text-muted">
              教員・招へい教員 {faculty.length} 名、学生 {currentMembers.length - faculty.length} 名が在籍しています。
            </p>
            <ul className="grid grid-cols-2 gap-3">
              {faculty.slice(0, 4).map((m) => (
                <li key={m.id} className="flex items-center gap-3">
                  {m.image && <img src={m.image} alt="" loading="lazy" className="h-11 w-11 rounded-full border border-line object-cover" />}
                  <span className="leading-tight">
                    <span className="block text-[0.7rem] text-muted">{m.role}</span>
                    <span className="block text-sm font-bold">{m.nameJa}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Link to="/members" className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-nu-700 hover:text-nu-900">
              メンバー一覧
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 学生募集 + アクセス */}
      <section className="relative overflow-hidden bg-ink py-16 text-white sm:py-24">
        <div className="bg-grid absolute inset-0" aria-hidden />
        <div className="container-site relative grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow text-signal">Join us</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl"><span className="inline-block">一緒にスーパーコンピュータの</span>
              <span className="inline-block">未来をつくりませんか</span></h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">{aboutContent.recruitment}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about#recruitment" className="inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-white">
                学生の受け入れについて
                <ArrowRight />
              </Link>
              <Link to="/members#contact" className="inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white">
                お問い合わせ
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/[0.03] p-6">
            <p className="eyebrow text-signal">Access</p>
            <p className="mt-3 font-bold">{accessInfo.organization}</p>
            <p className="mt-1 text-sm text-white/70">
              {accessInfo.address} {accessInfo.floor}
            </p>
            <p className="mt-4 text-sm text-white/70">
              最寄り駅：{accessInfo.stationLine}「{accessInfo.station}」
            </p>
            <Link to="/access" className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-signal">
              アクセス詳細
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
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
