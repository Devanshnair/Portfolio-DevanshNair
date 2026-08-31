import type { Route } from "next"

import type { NavItem } from "@/types/nav"
import { SOCIAL } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.NEXT_PUBLIC_APP_URL || "https://devanshnair.me",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
}

export const LICENSE = {
  name: "MIT License",
  url: "https://github.com/Devanshnair/Portfolio-DevanshNair/blob/main/LICENSE",
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

export const MAIN_NAV: NavItem<Route>[] = [
  {
    title: "Experience",
    href: "/experience" as Route,
  },
  {
    title: "Projects",
    href: "/projects" as Route,
  },
  {
    title: "Hackathons",
    href: "/hackathons" as Route,
  },
  {
    title: "Blog",
    href: "/blog" as Route,
  },
]

export const MOBILE_NAV: NavItem<Route>[] = [
  {
    title: "Home",
    href: "/" as Route,
  },
  ...MAIN_NAV,
]

export const X_HANDLE = "@Devanshnair"
export const GITHUB_USERNAME = SOCIAL.github.handle
export const SOURCE_CODE_GITHUB_REPO = "Devanshnair/Portfolio-DevanshNair"
export const SOURCE_CODE_GITHUB_URL =
  "https://github.com/Devanshnair/Portfolio-DevanshNair"

export const UTM_PARAMS = {
  utm_source: "devanshnair.me",
}
