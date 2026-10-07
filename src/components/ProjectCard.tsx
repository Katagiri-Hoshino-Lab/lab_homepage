import type { Project } from '@data/projects'
import { ArrowUpRight } from './Icons'

export default function ProjectCard({ project: p }: { project: Project }) {
  const ongoing = p.status === 'ongoing'
  const period = p.endLabel ? `${p.startLabel} – ${p.endLabel}` : p.startLabel

  return (
    <article className="card flex h-full flex-col p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`border px-2 py-0.5 text-xs ${ongoing ? 'border-nu-600 text-nu-700' : 'border-line text-muted'}`}>
          {ongoing ? '進行中' : '終了'}
        </span>
        <span className="chip">{p.category}</span>
        <span className="ml-auto tabular-nums text-xs text-muted">{period}</span>
      </div>

      <h3 className="mt-4 font-bold leading-snug text-ink">
        {p.url ? (
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:text-nu-700">
            {p.title}
            <ArrowUpRight className="ml-1 inline h-3.5 w-3.5 align-baseline text-nu-600" />
          </a>
        ) : (
          p.title
        )}
      </h3>

      {p.summary && <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>}

      <dl className="mt-auto grid gap-1 border-t border-line pt-4 text-xs leading-relaxed [&>div]:grid [&>div]:grid-cols-[4.5rem_1fr]">
        {p.funding && (
          <div>
            <dt className="text-muted">資金</dt>
            <dd>{p.funding}</dd>
          </div>
        )}
        {p.principalInvestigator && (
          <div>
            <dt className="text-muted">代表者</dt>
            <dd>
              {p.principalInvestigator}
              {p.organization && <span className="text-muted">（{p.organization}）</span>}
            </dd>
          </div>
        )}
        {p.coInvestigators && p.coInvestigators.length > 0 && (
          <div>
            <dt className="text-muted">分担者</dt>
            <dd>{p.coInvestigators.join('、')}</dd>
          </div>
        )}
      </dl>
    </article>
  )
}
