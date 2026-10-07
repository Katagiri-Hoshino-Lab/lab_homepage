// ニュースデータ。content/news/<年>/<ID>.yaml を自動で読み込む。
// 追加・修正の方法は docs/UPDATING.md を参照。
import { assetUrl, loadEntries } from './content'

type NewsSource = {
  date: string
  category: 'award' | 'media' | 'publication' | 'event' | 'seminar' | 'workshop' | 'project'
  title: string
  summary?: string
  url?: string
  image?: string
  /** 関連する論文・発表の ID（content/publications のファイル名） */
  publication?: string
  featured?: boolean
}

export type NewsItem = NewsSource & { id: string }

const modules = import.meta.glob<NewsSource>('../content/news/*/*.yaml', { eager: true, import: 'default' })

export const newsItems: NewsItem[] = loadEntries(modules)
  .map((n) => ({ ...n, image: assetUrl(n.image) }))
  .sort((a, b) => b.date.localeCompare(a.date))
