type IconProps = { className?: string }

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
}

export const ArrowUpRight = ({ className = 'h-3.5 w-3.5' }: IconProps) => (
  <svg {...base} className={className}><path d="M7 17 17 7M8 7h9v9" /></svg>
)

export const MenuIcon = ({ className = 'h-6 w-6' }: IconProps) => (
  <svg {...base} className={className}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
)

export const CloseIcon = ({ className = 'h-6 w-6' }: IconProps) => (
  <svg {...base} className={className}><path d="M6 6l12 12M18 6 6 18" /></svg>
)

export const SearchIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg {...base} className={className}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
)

export const MailIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg {...base} className={className}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
)

export const PinIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg {...base} className={className}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
)

export const ChevronDown = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg {...base} className={className}><path d="m6 9 6 6 6-6" /></svg>
)
