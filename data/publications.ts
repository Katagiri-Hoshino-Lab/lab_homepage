// 論文・発表データ。content/publications/<年>/<ID>.yaml を自動で読み込む。
// 追加・修正の方法は docs/UPDATING.md を参照。
import { loadEntries } from './content'

export type PublicationCategory = 'journal' | 'international' | 'workshop' | 'domestic' | 'invited' | 'poster'

type PublicationSource = {
  title: string
  authors: string[]
  venue: string
  year: number
  date?: string
  category: PublicationCategory
  pages?: string
  doi?: string
  arxiv?: string
  pdf?: string
  url?: string
  featured?: boolean
}

export type Publication = PublicationSource & {
  id: string
  doiUrl?: string
  arxivUrl?: string
  pdfUrl?: string
}

// 同じ年の中での並び順（日付がない場合に使う）
const categoryOrder: PublicationCategory[] = ['journal', 'international', 'workshop', 'invited', 'poster', 'domestic']

const modules = import.meta.glob<PublicationSource>('../content/publications/*/*.yaml', { eager: true, import: 'default' })

export const publications: Publication[] = loadEntries(modules)
  .map((p) => ({
    ...p,
    doiUrl: p.doi ? `https://doi.org/${p.doi}` : undefined,
    arxivUrl: p.arxiv ? `https://arxiv.org/abs/${p.arxiv}` : undefined,
    pdfUrl: p.pdf,
  }))
  .sort(
    (a, b) =>
      b.year - a.year ||
      (b.date ?? '').localeCompare(a.date ?? '') ||
      categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category) ||
      a.title.localeCompare(b.title),
  )
