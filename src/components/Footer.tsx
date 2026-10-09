import { Link } from 'react-router-dom'
import { accessInfo } from '@data/access'
import { externalLinks, navigation, siteMeta } from '@data/site'
import { ArrowUpRight } from './Icons'

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold text-white">{siteMeta.siteName}</p>
          <p className="mt-3 text-sm leading-relaxed">
            {accessInfo.organization}
            <br />
            {accessInfo.address} {accessInfo.floor}
          </p>
        </div>

        <nav aria-label="サイトマップ">
          <p className="eyebrow mb-4 text-signal">Sitemap</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">トップ</Link>
            </li>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="hover:text-white">{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4 text-signal">Links</p>
          <ul className="space-y-2 text-sm">
            {externalLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white"
                >
                  {link.label}
                  <ArrowUpRight />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-site py-5 font-mono text-xs text-white/50">
          © {new Date().getFullYear()} Katagiri-Hoshino Lab, Nagoya University.
        </p>
      </div>
    </footer>
  )
}
