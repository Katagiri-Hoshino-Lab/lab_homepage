import { Link } from 'react-router-dom'
import { projects } from '@data/projects'
import { publications } from '@data/publications'
import { researchThemes } from '@data/research'
import { ArrowUpRight } from '../components/Icons'
import PageHeader from '../components/PageHeader'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const projectById = new Map(projects.map((p) => [p.id, p]))
const publicationById = new Map(publications.map((p) => [p.id, p]))

export default function ResearchPage() {
  useDocumentTitle('研究紹介')

  return (
    <>
      <PageHeader
        title="研究紹介"
        lead="生成AIによるコード自動生成から自動チューニング、高精度数値計算、大規模シミュレーション、計算機システムの運用まで、スーパーコンピュータの性能を引き出すための研究を幅広く行っています。"
      />

      <div className="container-site grid gap-12 py-14 sm:py-20 lg:grid-cols-[14rem_1fr]">
        <nav aria-label="研究テーマ" className="hidden lg:block">
          <ol className="sticky top-24 space-y-1 border-l border-line">
            {researchThemes.map((t, i) => (
              <li key={t.id}>
                <Link
                  to={`/research#${t.id}`}
                  className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-muted hover:border-nu-500 hover:text-ink"
                >
                  {t.title}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-16 sm:space-y-20">
          {researchThemes.map((t, i) => {
            const related = (t.relatedProjectIds ?? []).map((id) => projectById.get(id)).filter((p) => p !== undefined)
            const relatedPubs = (t.relatedPublicationIds ?? []).map((id) => publicationById.get(id)).filter((p) => p !== undefined)

            return (
              <section key={t.id} id={t.id} className="scroll-mt-24">
                <h2 className="border-b-2 border-ink pb-2 text-xl font-bold sm:text-2xl">{t.title}</h2>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {t.keywords.map((k) => (
                    <span key={k} className="chip">
                      {k}
                    </span>
                  ))}
                </div>
                <p className="mt-6 leading-[1.95] text-ink/85">{t.summary}</p>

                {t.software && t.software.length > 0 && (
                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {t.software.map((s) => (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card group overflow-hidden transition-colors hover:border-nu-400"
                      >
                        {s.image && (
                          <div className="aspect-[16/8] overflow-hidden border-b border-line bg-paper">
                            <img src={s.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                          </div>
                        )}
                        <div className="p-5">
                          <h3 className="mt-1 flex items-center gap-1 font-bold group-hover:text-nu-700">
                            {s.name}
                            <ArrowUpRight />
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}

                <dl className="mt-8 grid gap-6 border-t border-line pt-6 text-sm md:grid-cols-[10rem_1fr]">
                  <dt className="pt-0.5 font-bold text-muted">関連技術</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {t.technologies.map((tech) => (
                      <span key={tech} className="chip">{tech}</span>
                    ))}
                  </dd>

                  {related.length > 0 && (
                    <>
                      <dt className="pt-0.5 font-bold text-muted">関連プロジェクト</dt>
                      <dd>
                        <ul className="space-y-1.5">
                          {related.map((p) => (
                            <li key={p.id}>
                              {p.url ? (
                                <a href={p.url} target="_blank" rel="noopener noreferrer" className="link">
                                  {p.title}
                                </a>
                              ) : (
                                p.title
                              )}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </>
                  )}

                  {relatedPubs.length > 0 && (
                    <>
                      <dt className="pt-0.5 font-bold text-muted">関連論文</dt>
                      <dd>
                        <ul className="space-y-2.5">
                          {relatedPubs.map((p) => {
                            const href = p.doiUrl ?? p.arxivUrl ?? p.pdfUrl ?? p.url
                            return (
                              <li key={p.id} className="leading-snug">
                                {href ? (
                                  <a href={href} target="_blank" rel="noopener noreferrer" className="link">
                                    {p.title}
                                  </a>
                                ) : (
                                  <span>{p.title}</span>
                                )}
                                <span className="mt-0.5 block text-xs text-muted">
                                  {p.venue}, {p.year}
                                </span>
                              </li>
                            )
                          })}
                        </ul>
                      </dd>
                    </>
                  )}
                </dl>
              </section>
            )
          })}
        </div>
      </div>
    </>
  )
}
