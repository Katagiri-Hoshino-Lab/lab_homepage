import { projects, type Project } from '@data/projects'
import PageHeader from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const byStartDesc = (a: Project, b: Project) => parseInt(b.startLabel) - parseInt(a.startLabel)

const groups = [
  { status: 'ongoing', title: '進行中のプロジェクト' },
  { status: 'completed', title: '終了したプロジェクト' },
].map((g) => ({ ...g, items: projects.filter((p) => p.status === g.status).sort(byStartDesc) }))

export default function ProjectsPage() {
  useDocumentTitle('プロジェクト')

  return (
    <>
      <PageHeader
        title="プロジェクト"
        lead="科学研究費助成事業をはじめとする競争的資金により、国内外の大学・研究機関と共同で研究プロジェクトを推進しています。"
      />

      <div className="container-site space-y-16 py-14 sm:py-20">
        {groups.map((g) => (
          <section key={g.status}>
            <div className="mb-6 flex items-baseline gap-3 border-b-2 border-ink pb-2">
              <h2 className="text-xl font-bold sm:text-2xl">{g.title}</h2>
              <span className="tabular-nums text-sm text-muted">{g.items.length}</span>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {g.items.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
