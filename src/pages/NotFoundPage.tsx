import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function NotFoundPage() {
  useDocumentTitle('ページが見つかりません')

  return (
    <>
      <PageHeader title="ページが見つかりません" lead="お探しのページは移動または削除された可能性があります。" />
      <div className="container-site py-16">
        <Link to="/" className="link">
          トップページへ戻る
        </Link>
      </div>
    </>
  )
}
