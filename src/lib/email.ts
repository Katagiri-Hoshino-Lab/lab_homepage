import { emailDomainRules, type Member } from '@data/members'

export function memberEmail(member: Pick<Member, 'emailLocalPart' | 'emailDomainRule'>): string | null {
  if (!member.emailLocalPart || !member.emailDomainRule) return null
  return member.emailLocalPart + emailDomainRules[member.emailDomainRule]
}
