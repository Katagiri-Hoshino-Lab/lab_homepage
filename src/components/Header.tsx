import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navigation, siteMeta } from '@data/site'
import { CloseIcon, MenuIcon } from './Icons'

const headerNavigation = [{ label: 'トップ', labelEn: 'Home', href: '/' }, ...navigation]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-white/95 backdrop-blur-sm">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link to="/" className="group flex shrink-0 items-center gap-2" aria-label={`${siteMeta.siteName} トップへ`}>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-gradient-to-br from-blue-600 to-blue-800 text-sm font-bold text-white" aria-hidden>H</span>
          <span className="text-xs font-semibold text-ink group-hover:text-blue-700 sm:text-sm">{siteMeta.shortName}</span>
        </Link>
        <nav aria-label="メイン" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {headerNavigation.map((item) => (
              <li key={item.href}>
                <NavLink to={item.href} end={item.href === '/'} className={({ isActive }) => navItem(isActive)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="-mr-2 rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="メイン" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-white lg:hidden">
          <ul className="container-site space-y-1 py-3">
            {headerNavigation.map((item) => (
              <li key={item.href}>
                <NavLink to={item.href} end={item.href === '/'} className={({ isActive }) => `${navItem(isActive)} flex items-center justify-between !px-4 !py-3`}>
                  <span>{item.label}</span>
                  <span className="text-xs opacity-60">{item.labelEn}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

const navItem = (active: boolean) =>
  `block whitespace-nowrap rounded-md border px-2 py-2 text-[0.8125rem] font-medium transition-colors ${
    active ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`
