import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from './Icons'

type Props = {
  index?: string
  eyebrow: string
  title: string
  action?: { label: string; to: string }
  children?: ReactNode
  dark?: boolean
}

export default function SectionHeading({ index, eyebrow, title, action, children, dark }: Props) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className={`eyebrow ${dark ? 'text-signal' : 'text-nu-600'}`}>
          {index && <span className={dark ? 'text-white/40' : 'text-muted'}>{index} / </span>}
          {eyebrow}
        </p>
        <h2 className={`mt-2 text-2xl font-bold tracking-tight sm:text-3xl ${dark ? 'text-white' : 'text-ink'}`}>
          {title}
        </h2>
        {children}
      </div>
      {action && (
        <Link
          to={action.to}
          className={`group inline-flex shrink-0 items-center gap-2 text-sm font-medium ${
            dark ? 'text-white hover:text-signal' : 'text-nu-700 hover:text-nu-900'
          }`}
        >
          {action.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  )
}
