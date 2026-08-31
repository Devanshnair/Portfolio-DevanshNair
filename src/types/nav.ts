import type { Route } from "next"

export type NavItem<T extends string = Route> = {
  title: string
  href: T
}
