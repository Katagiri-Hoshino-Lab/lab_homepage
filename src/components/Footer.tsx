import { Link } from 'react-router-dom'
import { accessInfo } from '@data/access'
import { externalLinks, isExternal, navigation, siteMeta } from '@data/site'
import { ArrowUpRight } from './Icons'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper text-ink/75">
      <div className="container-site grid gap-10 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-bold text-ink">{siteMeta.siteName}</p>
          <p className="mt-3 text-sm leading-relaxed">
            {accessInfo.organization}
            <br />
            {accessInfo.address} {accessInfo.floor}
          </p>
        </div>

        <nav aria-label="サイトマップ">
          <p className="mb-3 text-sm font-bold text-ink">サイトマップ</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {navigation.filter((item) => !isExternal(item.href)).map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="hover:text-nu-700 hover:underline">{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-3 text-sm font-bold text-ink">関連リンク</p>
          <ul className="space-y-2 text-sm">
            {externalLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-nu-700 hover:underline"
                >
                  {link.label}
                  <ArrowUpRight />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="container-site py-4 text-xs text-muted">
          © {new Date().getFullYear()} Katagiri-Hoshino Lab, Nagoya University.
        </p>
      </div>
    </footer>
  )
}
