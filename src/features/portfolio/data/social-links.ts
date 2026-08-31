import type { SocialProfile } from "@/features/portfolio/types/social-links"

/**
 * Keyed registry of social profiles — the single source of truth. Icons are
 * bound separately in `social-link-icons.tsx` (keyed by the same `SocialName`),
 * so adding a profile here forces the icon map to stay in sync at compile time.
 */
export const SOCIAL = {
  linkedin: {
    title: "LinkedIn",
    handle: "devansh-nair",
    href: "https://www.linkedin.com/in/devansh-nair/",
    sameAs: true,
  },
  github: {
    title: "GitHub",
    handle: "Devanshnair",
    href: "https://github.com/Devanshnair",
    sameAs: true,
  },
  leetcode: {
    title: "LeetCode",
    handle: "Devanshnair",
    href: "https://leetcode.com/u/Devanshnair/",
    sameAs: true,
  },
  codeforces: {
    title: "Codeforces",
    handle: "devanshnair",
    href: "https://codeforces.com/profile/devanshnair",
    sameAs: true,
  },
} satisfies Record<string, SocialProfile>

export type SocialName = keyof typeof SOCIAL

export type SocialLink = SocialProfile & { name: SocialName }

export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(SOCIAL) as [SocialName, SocialProfile][]
).map(([name, profile]) => ({ name, ...profile }))
