import { Link } from 'react-router-dom'
import { currentMembers } from '@data/members'
import { researchThemes } from '@data/research'
import { aboutContent } from '@data/site'
import { MemberAvatar } from '../components/MemberCard'
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
      <PageHeader title="研究室概要" lead={aboutContent.intro} />

      <div className="container-site space-y-20 py-14 sm:py-20">
        <section className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div>
            <h2 className="border-l-4 border-nu-600 pl-3 text-xl font-bold">研究室を率いる教員</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {leaders.map((m) => (
              <div key={m.id} className="card flex items-center gap-5 p-6">
                <MemberAvatar member={m} className="h-24 w-24" />
                <div>
                  <p className="text-sm text-muted">{m.role}</p>
                  <p className="mt-1 text-xl font-bold">{m.nameJa}</p>
                  <p className="tabular-nums text-xs text-muted">{m.nameEn}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div>
            <h2 className="border-l-4 border-nu-600 pl-3 text-xl font-bold">研究の特色</h2>
          </div>
          <div>
            <ol className="divide-y divide-line border-y border-line">
              {researchThemes.map((t) => (
                <li key={t.id}>
                  <Link to={`/research#${t.id}`} className="group block py-3.5">
                    <span className="font-medium group-hover:text-nu-700 group-hover:underline">{t.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div>
            <h2 className="border-l-4 border-nu-600 pl-3 text-xl font-bold">所属・連携</h2>
          </div>
          <p className="max-w-3xl leading-[1.95] text-ink/85">{aboutContent.affiliation}</p>
        </section>

        <section id="recruitment" className="scroll-mt-24 border border-line bg-paper">
          <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[16rem_1fr]">
            <div>
              <h2 className="border-l-4 border-nu-600 pl-3 text-xl font-bold">学生の受け入れ</h2>
            </div>
            <div>
              <p className="max-w-3xl leading-[1.95] text-ink/85">{aboutContent.recruitment}</p>
              {contact && contactEmail && (
                <p className="mt-6 text-sm text-ink/80">
                  お問い合わせ：{contact.nameJa}（{contact.role}）
                  <a href={`mailto:${contactEmail}`} className="link ml-2">
                    {contactEmail}
                  </a>
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
