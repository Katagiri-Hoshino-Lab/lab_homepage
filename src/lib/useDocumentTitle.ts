import { useEffect } from 'react'
import { siteMeta } from '@data/site'

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${siteMeta.siteName}` : siteMeta.siteName
  }, [title])
}
