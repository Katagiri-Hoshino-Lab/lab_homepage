import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icons'
import PageHeader from '../components/PageHeader'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function NotFoundPage() {
  useDocumentTitle('ページが見つかりません')

  return (
    <>
      <PageHeader eyebrow="404" title="ページが見つかりません" lead="お探しのページは移動または削除された可能性があります。" />
      <div className="container-site py-16">
        <Link to="/" className="inline-flex items-center gap-2 font-medium text-nu-700 hover:text-nu-900">
          トップページへ戻る
          <ArrowRight />
        </Link>
      </div>
    </>
  )
}
