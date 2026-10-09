import type { Publication } from '@data/publications'
import { ArrowUpRight } from './Icons'

export const publicationCategoryLabel: Record<Publication['category'], string> = {
  journal: '論文誌',
  international: '国際会議',
  workshop: 'ワークショップ',
  domestic: '国内発表',
  invited: '招待講演',
  poster: 'ポスター',
}

type Props = {
  publication: Publication
  showYear?: boolean
}

export default function PublicationEntry({ publication: p, showYear }: Props) {
  const links = [
    { label: 'DOI', href: p.doiUrl },
    { label: 'arXiv', href: p.arxivUrl },
    { label: 'PDF', href: p.pdfUrl },
    { label: 'Link', href: p.url },
  ].filter((l): l is { label: string; href: string } => Boolean(l.href))

  return (
    <article className="grid gap-2 py-5 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
      <div className="flex items-center gap-2 sm:flex-col sm:items-start sm:gap-1">
        {showYear && <span className="font-mono text-sm text-muted">{p.year}</span>}
        <span className="eyebrow text-nu-600">{publicationCategoryLabel[p.category]}</span>
      </div>
      <div>
        <h3 className="font-medium leading-snug text-ink">{p.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.authors.join(', ')}</p>
        <p className="mt-1 text-sm italic leading-relaxed text-ink/80">
          {p.venue}
          {p.pages && <span className="not-italic">, pp. {p.pages}</span>}
        </p>
        {links.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded border border-line bg-white px-2 py-0.5 font-mono text-xs text-nu-700 transition-colors hover:border-nu-400"
              >
                {l.label}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
