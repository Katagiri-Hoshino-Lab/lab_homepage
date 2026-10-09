import { useEffect, useRef, useState } from 'react'
import { groupPhotos, type GroupPhoto } from '@data/gallery'
import { alumniCareerSummary, alumniGroups, currentMembers, emailDomainRules, formerStaff } from '@data/members'
import { CloseIcon } from '../components/Icons'
import MemberCard from '../components/MemberCard'
import PageHeader from '../components/PageHeader'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const faculty = currentMembers.filter((m) => m.category !== 'student' && m.category !== 'staff')
const staff = currentMembers.filter((m) => m.category === 'staff')
const students = currentMembers.filter((m) => m.category === 'student')
const gradeOrder = ['D3', 'D2', 'D1', 'M2', 'M1', 'B4', '研究生']
const studentGrades = gradeOrder
  .map((grade) => ({ grade, members: students.filter((m) => (m.grade ?? m.role) === grade) }))
  .filter((g) => g.members.length > 0)
const alumniByYear = [...alumniGroups].sort((a, b) => Number(b.fiscalYear) - Number(a.fiscalYear))
const alumniCount = alumniGroups.reduce((n, g) => n + g.members.length, 0)

const sections = [
  { id: 'faculty', label: '教員' },
  { id: 'students', label: '学生' },
  { id: 'contact', label: '連絡先' },
  { id: 'alumni', label: '卒業生' },
  { id: 'former-staff', label: '過去のスタッフ' },
  { id: 'photos', label: '集合写真' },
]

export default function MembersPage() {
  useDocumentTitle('メンバー')
  const [photo, setPhoto] = useState<GroupPhoto | null>(null)
  const [current, ...pastPhotos] = groupPhotos

  return (
    <>
      <PageHeader
        eyebrow="Members"
        title="メンバー"
        lead={`教員・招へい教員 ${faculty.length} 名、学生 ${students.length} 名が在籍しています。これまでに ${alumniCount} 名が研究室を巣立っていきました。`}
      />

      <nav aria-label="ページ内" className="sticky top-16 z-20 border-b border-line bg-paper/95 backdrop-blur">
        <ul className="container-site scrollbar-none flex gap-6 overflow-x-auto text-sm">
          {sections.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  // HashRouter と衝突しないよう、ページ内移動は scrollIntoView で行う
                  e.preventDefault()
                  document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="block py-3 text-muted hover:text-ink"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-site space-y-20 py-12 sm:py-16">
        <button type="button" onClick={() => setPhoto(current)} className="block w-full overflow-hidden rounded-lg border border-line">
          <img src={current.image} alt={`${current.fiscalYear}年度 研究室メンバー集合写真`} className="w-full" />
        </button>

        <section id="faculty" className="scroll-mt-32">
          <SectionTitle eyebrow="Faculty" title="教員" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {faculty.map((m) => (
              <MemberCard key={m.id} member={m} large />
            ))}
          </div>
          {staff.length > 0 && (
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {staff.map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          )}
        </section>

        <section id="students" className="scroll-mt-32">
          <SectionTitle eyebrow="Students" title="学生" />
          <div className="space-y-8">
            {studentGrades.map((g) => (
              <div key={g.grade} className="grid gap-4 lg:grid-cols-[6rem_1fr]">
                <h3 className="font-mono text-xl font-medium text-nu-600">{g.grade}</h3>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {g.members.map((m) => (
                    <MemberCard key={m.id} member={m} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-32">
          <SectionTitle eyebrow="Contact" title="メールアドレスについて" />
          <div className="card grid gap-4 p-6 text-sm sm:grid-cols-2">
            <div>
              <p className="font-bold">教員</p>
              <p className="mt-1 font-mono text-muted">
                &lt;アカウント名&gt;<span className="text-ink">{emailDomainRules.staff_cc}</span>
              </p>
            </div>
            <div>
              <p className="font-bold">学生</p>
              <p className="mt-1 font-mono text-muted">
                &lt;アカウント名&gt;<span className="text-ink">{emailDomainRules.student_hpc}</span>
              </p>
            </div>
            <p className="text-muted sm:col-span-2">各メンバーのアドレスは上記のカードに記載しています。研究室見学・共同研究のご相談は教員までお問い合わせください。</p>
          </div>
        </section>

        <section id="alumni" className="scroll-mt-32">
          <SectionTitle eyebrow="Alumni" title="卒業生" />
          <div className="divide-y divide-line border-y border-line">
            {alumniByYear.map((g) => (
              <div key={g.fiscalYear} className="grid gap-2 py-4 sm:grid-cols-[8rem_1fr]">
                <p className="font-mono text-sm text-muted">{g.fiscalYear}年度</p>
                <ul className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm">
                  {g.members.map((m) => (
                    <li key={m.nameJa}>
                      <span className="mr-1.5 font-mono text-xs text-nu-600">{m.role}</span>
                      {m.nameJa}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 className="mt-12 text-lg font-bold">主な進路</h3>
          <div className="mt-4 grid gap-6 md:grid-cols-[2fr_1fr]">
            <div>
              <p className="eyebrow mb-3 text-muted">Companies</p>
              <ul className="flex flex-wrap gap-2">
                {alumniCareerSummary.companies.map((c) => (
                  <li key={c} className="chip bg-white">{c}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <div>
                <p className="eyebrow mb-3 text-muted">Graduate schools</p>
                <ul className="space-y-1.5 text-sm">
                  {alumniCareerSummary.graduateSchools.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </div>
              <div>
                <p className="eyebrow mb-3 text-muted">Universities</p>
                <ul className="space-y-1.5 text-sm">
                  {alumniCareerSummary.universities.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="former-staff" className="scroll-mt-32">
          <SectionTitle eyebrow="Former staff" title="過去のスタッフ" />
          <ul className="divide-y divide-line border-y border-line">
            {formerStaff.map((s) => (
              <li key={s.nameEn + s.role} className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <div>
                  <p className="font-bold">{s.nameJa}</p>
                  <p className="font-mono text-xs text-muted">{s.nameEn}</p>
                </div>
                <div className="text-sm">
                  <p>{s.role}</p>
                  <p className="text-muted">{s.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="photos" className="scroll-mt-32">
          <SectionTitle eyebrow="Gallery" title="歴代の集合写真" />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {pastPhotos.map((p) => (
              <li key={p.fiscalYear}>
                <button
                  type="button"
                  onClick={() => setPhoto(p)}
                  className="group block w-full overflow-hidden rounded-md border border-line bg-white text-left"
                >
                  <span className="block aspect-[4/3] overflow-hidden">
                    <img
                      src={p.image}
                      alt={`${p.fiscalYear}年度 集合写真`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="block px-3 py-2 font-mono text-xs text-muted">{p.fiscalYear}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Lightbox photo={photo} onClose={() => setPhoto(null)} />
    </>
  )
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-6">
      <p className="eyebrow text-nu-600">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-bold tracking-tight">{title}</h2>
    </div>
  )
}

function Lightbox({ photo, onClose }: { photo: GroupPhoto | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (photo && !dialog.open) dialog.showModal()
    if (!photo && dialog.open) dialog.close()
  }, [photo])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto max-h-[92vh] w-[min(96vw,80rem)] bg-transparent p-0 backdrop:bg-ink/90"
    >
      {photo && (
        <figure className="relative">
          <img src={photo.image} alt={`${photo.fiscalYear}年度 集合写真`} className="max-h-[85vh] w-full rounded object-contain" />
          <figcaption className="mt-2 text-center font-mono text-sm text-white/80">{photo.fiscalYear}年度</figcaption>
          <button
            type="button"
            onClick={onClose}
            aria-label="閉じる"
            className="absolute right-2 top-2 rounded-full bg-ink/70 p-2 text-white hover:bg-ink"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </figure>
      )}
    </dialog>
  )
}
