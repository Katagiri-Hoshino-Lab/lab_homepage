import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { isExternal } from '../lib/format'

type Props = {
  href: string
  className?: string
  children: ReactNode
  'aria-label'?: string
}

/** 内部パスは Router の Link、外部 URL は新しいタブで開く <a> を描画する */
export default function SmartLink({ href, className, children, ...rest }: Props) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link to={href} className={className} {...rest}>
      {children}
    </Link>
  )
}
