import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { isExternal, navigation, siteMeta } from '@data/site'
import { ArrowUpRight, CloseIcon, MenuIcon } from './Icons'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-t-[3px] border-t-nu-600 border-b border-b-line bg-white">
      <div className="container-site flex h-[3.75rem] items-center justify-between gap-6">
        <Link to="/" className="shrink-0 leading-tight text-ink" aria-label={`${siteMeta.siteName} トップへ`}>
          <span className="block text-[0.7rem] text-muted">名古屋大学 情報基盤センター</span>
          <span className="block text-base font-bold">片桐・星野研究室</span>
        </Link>

        <nav aria-label="メイン" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                {isExternal(item.href) ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-2 text-[0.85rem] text-ink/75 hover:text-nu-700"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                ) : (
                  <NavLink
                    to={item.href}
                    end={item.href === '/'}
                    className={({ isActive }) =>
                      `relative block px-2 py-2 text-[0.85rem] ${
                        isActive ? 'font-bold text-nu-700' : 'text-ink/75 hover:text-nu-700'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && <span className="absolute inset-x-2 -bottom-[11px] h-0.5 bg-nu-600" />}
                      </>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="メイン"
          className="h-[calc(100dvh-3.75rem)] overflow-y-auto border-t border-line bg-white lg:hidden"
        >
          <ul className="container-site divide-y divide-line py-2">
            {navigation.map((item) => (
              <li key={item.href}>
                {isExternal(item.href) ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={mobileItem(false)}>
                    <span className="flex items-center gap-1.5">
                      {item.label}
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted" />
                    </span>
                    <span className="text-xs text-muted">{item.labelEn}</span>
                  </a>
                ) : (
                  <NavLink to={item.href} end={item.href === '/'} className={({ isActive }) => mobileItem(isActive)}>
                    <span>{item.label}</span>
                    <span className="text-xs text-muted">{item.labelEn}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

const mobileItem = (active: boolean) =>
  `flex items-center justify-between py-4 text-base ${active ? 'font-bold text-nu-700' : 'text-ink'}`

