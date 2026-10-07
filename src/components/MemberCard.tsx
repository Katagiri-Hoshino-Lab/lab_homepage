import type { Member } from '@data/members'
import { memberEmail } from '../lib/email'
import { ArrowUpRight, MailIcon } from './Icons'

export function MemberAvatar({ member, className = 'h-20 w-20' }: { member: Member; className?: string }) {
  if (member.image) {
    return (
      <img
        src={member.image}
        alt={member.nameJa}
        loading="lazy"
        className={`${className} shrink-0 rounded-full border border-line bg-paper object-cover`}
      />
    )
  }
  // 写真がないメンバーは姓の頭文字で代替表示
  return (
    <span
      className={`${className} grid shrink-0 place-items-center rounded-full border border-line bg-nu-50 text-xl font-bold text-nu-700`}
      aria-hidden
    >
      {member.nameJa.charAt(0)}
    </span>
  )
}

export default function MemberCard({ member, large }: { member: Member; large?: boolean }) {
  const email = memberEmail(member)

  return (
    <article className={`card flex items-center gap-4 ${large ? 'p-5 sm:p-6' : 'p-4'}`}>
      <MemberAvatar member={member} className={large ? 'h-20 w-20 sm:h-24 sm:w-24' : 'h-14 w-14'} />
      <div className="min-w-0">
        <p className="eyebrow text-nu-600">{member.role}</p>
        <h3 className={`font-bold text-ink ${large ? 'mt-1 text-lg' : 'text-base'}`}>{member.nameJa}</h3>
        <p className="font-mono text-xs text-muted">{member.nameEn}</p>
        {(email || member.url) && (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
            {email && (
              <a href={`mailto:${email}`} className="inline-flex items-center gap-1 text-nu-700 hover:underline">
                <MailIcon className="h-3.5 w-3.5" />
                <span className="break-all">{email}</span>
              </a>
            )}
            {member.url && (
              <a
                href={member.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-nu-700 hover:underline"
              >
                Web
                <ArrowUpRight className="h-3 w-3" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
