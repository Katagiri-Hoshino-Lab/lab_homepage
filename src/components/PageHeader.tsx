import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: string
  lead?: ReactNode
}

export default function PageHeader({ eyebrow, title, lead }: Props) {
  return (
    <section className="relative overflow-hidden bg-ink pb-12 pt-28 text-white sm:pb-16 sm:pt-36">
      <img
        src={import.meta.env.BASE_URL + 'img/hero-bg2.jpg'}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" aria-hidden />
      <div className="container-site relative">
        <p className="eyebrow text-signal">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">{title}</h1>
        {lead && <p className="mt-5 max-w-3xl text-[0.95rem] leading-relaxed text-white/75 sm:text-base">{lead}</p>}
      </div>
    </section>
  )
}
