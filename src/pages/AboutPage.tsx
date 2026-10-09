import { Link } from 'react-router-dom'
import { currentMembers } from '@data/members'
import { researchThemes } from '@data/research'
import { aboutContent } from '@data/site'
import { MemberAvatar } from '../components/MemberCard'
import { ArrowRight } from '../components/Icons'
import PageHeader from '../components/PageHeader'
import { memberEmail } from '../lib/email'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const leaders = currentMembers.filter((m) => m.category === 'faculty' || m.category === 'associate-professor')
const contact = currentMembers.find((m) => m.id === aboutContent.contactMemberId)

export default function AboutPage() {
  useDocumentTitle('研究室概要')
  const contactEmail = contact ? memberEmail(contact) : null

  return (
    <>
      <PageHeader eyebrow="About" title="研究室概要" lead={aboutContent.intro} />

      <div className="container-site space-y-20 py-14 sm:py-20">
        <section className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div>
            <p className="eyebrow text-nu-600">Principal Investigators</p>
            <h2 className="mt-2 text-2xl font-bold">研究室を率いる教員</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {leaders.map((m) => (
              <div key={m.id} className="card flex items-center gap-5 p-6">
                <MemberAvatar member={m} className="h-24 w-24" />
                <div>
                  <p className="eyebrow text-nu-600">{m.role}</p>
                  <p className="mt-1 text-xl font-bold">{m.nameJa}</p>
                  <p className="font-mono text-xs text-muted">{m.nameEn}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div>
            <p className="eyebrow text-nu-600">Focus</p>
            <h2 className="mt-2 text-2xl font-bold">研究の特色</h2>
          </div>
          <div>
            <ol className="divide-y divide-line border-y border-line">
              {researchThemes.map((t, i) => (
                <li key={t.id}>
                  <Link to={`/research#${t.id}`} className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-4">
                    <span className="font-mono text-sm text-nu-600">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-medium group-hover:text-nu-700">{t.title}</span>
                    <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-nu-700" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div>
            <p className="eyebrow text-nu-600">Affiliation</p>
            <h2 className="mt-2 text-2xl font-bold">所属・連携</h2>
          </div>
          <p className="max-w-3xl leading-[1.95] text-ink/85">{aboutContent.affiliation}</p>
        </section>

        <section id="recruitment" className="scroll-mt-24 overflow-hidden rounded-xl bg-ink text-white">
          <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[16rem_1fr]">
            <div>
              <p className="eyebrow text-signal">Join us</p>
              <h2 className="mt-2 text-2xl font-bold">学生の受け入れ</h2>
            </div>
            <div>
              <p className="max-w-3xl leading-[1.95] text-white/80">{aboutContent.recruitment}</p>
              {contact && contactEmail && (
                <p className="mt-6 text-sm text-white/70">
                  お問い合わせ：{contact.nameJa}（{contact.role}）
                  <a href={`mailto:${contactEmail}`} className="ml-2 font-mono text-signal underline-offset-4 hover:underline">
                    {contactEmail}
                  </a>
                </p>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/research" className="inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 text-sm font-bold text-ink hover:bg-white">
                  研究紹介を見る
                  <ArrowRight />
                </Link>
                <Link to="/access" className="inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-3 text-sm text-white hover:border-white">
                  アクセス
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
