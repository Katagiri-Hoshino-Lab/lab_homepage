import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navigation, siteMeta } from '@data/site'
import { CloseIcon, MenuIcon } from './Icons'

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 text-white" aria-label={`${siteMeta.siteName} トップへ`}>
          <LabMark />
          <span className="leading-tight">
            <span className="block text-[0.65rem] tracking-wider text-white/60">名古屋大学 情報基盤センター</span>
            <span className="block text-[0.95rem] font-bold tracking-wide">片桐・星野研究室</span>
          </span>
        </Link>

        <nav aria-label="メイン" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `relative block rounded px-3 py-2 text-sm transition-colors ${
                      isActive ? 'text-white' : 'text-white/70 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && <span className="absolute inset-x-3 -bottom-[13px] h-0.5 bg-signal" />}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="-mr-2 rounded p-2 text-white lg:hidden"
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
          className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-ink lg:hidden"
        >
          <ul className="container-site divide-y divide-white/10 py-2">
            <li>
              <NavLink to="/" end className={({ isActive }) => mobileItem(isActive)}>
                <span>トップ</span>
                <span className="eyebrow text-white/40">Home</span>
              </NavLink>
            </li>
            {navigation.map((item) => (
              <li key={item.href}>
                <NavLink to={item.href} className={({ isActive }) => mobileItem(isActive)}>
                  <span>{item.label}</span>
                  <span className="eyebrow text-white/40">{item.labelEn}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

const mobileItem = (active: boolean) =>
  `flex items-center justify-between py-4 text-base ${active ? 'text-signal' : 'text-white'}`

/** サーバラックのステータス LED を模した研究室マーク */
function LabMark() {
  const leds = ['bg-signal', 'bg-signal/40', 'bg-signal', 'bg-signal/40', 'bg-signal', 'bg-signal/70', 'bg-signal', 'bg-signal/70', 'bg-signal/30']
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-signal/30 bg-ink-800" aria-hidden>
      <span className="grid grid-cols-3 gap-[3px]">
        {leds.map((c, i) => (
          <span key={i} className={`block h-[5px] w-[5px] rounded-full ${c}`} />
        ))}
      </span>
    </span>
  )
}
