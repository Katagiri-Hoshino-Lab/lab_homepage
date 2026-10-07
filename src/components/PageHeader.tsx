import type { ReactNode } from 'react'

type Props = {
  title: string
  lead?: ReactNode
}

export default function PageHeader({ title, lead }: Props) {
  return (
    <section className="border-b border-line bg-paper pt-16">
      <div className="container-site py-9 sm:py-12">
        <h1 className="border-l-4 border-nu-600 pl-4 text-2xl font-bold leading-snug sm:text-[1.9rem]">{title}</h1>
        {lead && <p className="mt-5 max-w-3xl text-[0.95rem] leading-relaxed text-ink/80">{lead}</p>}
      </div>
    </section>
  )
}
