import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  title: string
  action?: { label: string; to: string }
  children?: ReactNode
}

export default function SectionHeading({ title, action, children }: Props) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b-2 border-ink pb-2">
      <div>
        <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
        {children}
      </div>
      {action && (
        <Link to={action.to} className="shrink-0 text-sm text-nu-700 hover:underline">
          {action.label} »
        </Link>
      )}
    </div>
  )
}
