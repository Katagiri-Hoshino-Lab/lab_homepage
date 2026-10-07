export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${y}.${m}.${d}`
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href)
}
