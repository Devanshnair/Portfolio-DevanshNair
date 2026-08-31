"use client"

import { TECH_STACK } from "../data/tech-stack"
import type { TechStack as TechStackType } from "../types/tech-stack"
import { Panel, PanelHeader, PanelTitle } from "./panel"
import { PanelTitleCopy } from "./panel-title-copy"

const ID = "stack"

export function TechStack() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Stack</a>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <div className="relative [--badge-height:--spacing(6)] [--col-left-width:--spacing(48)]">
        <div
          className="pointer-events-none absolute inset-y-0 left-(--col-left-width) -z-1 w-px bg-[linear-gradient(to_bottom,var(--line)_4px,transparent_2px)] bg-size-[1px_6px] bg-repeat-y max-sm:hidden"
          aria-hidden
        />

        {Object.entries(groupByCategory(TECH_STACK)).map(
          ([category, items], index) => {
            const categoryId = `${ID}-${category
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")}`

            return (
              <div
                key={category}
                className="grid items-start gap-y-2 border-b border-line py-4 last:border-none sm:grid-cols-[var(--col-left-width)_1fr]"
              >
                <div
                  id={categoryId}
                  className="pl-4 text-sm/(--badge-height) text-muted-foreground"
                >
                  <span
                    className="mr-1.5 font-mono text-muted-foreground/50 select-none"
                    aria-hidden
                  >
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  {category}
                </div>

                <ul
                  aria-labelledby={categoryId}
                  className="flex flex-wrap gap-1.5 px-4"
                >
                  {items.map((item) => (
                    <li key={item.key} className="flex">
                      <TechBadge item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            )
          }
        )}
      </div>
    </Panel>
  )
}

function TechBadge({ item }: { item: TechStackType }) {
  const icon = item.darkIcon ? (
    <>
      <span className="contents dark:hidden">{item.icon}</span>
      <span className="contents hidden dark:contents">{item.darkIcon}</span>
    </>
  ) : (
    item.icon
  )

  const baseClass =
    "flex h-(--badge-height) items-center justify-center gap-1.25 rounded-full bg-zinc-50/80 px-2 font-mono text-xs text-foreground inset-ring-1 inset-ring-border dark:bg-zinc-900/80 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0"

  if (item.useGrayscaleFilter) {
    // Multi-color SVG: use CSS grayscale filter — same pattern as experience company logos
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener"
        className={`${baseClass} [&_svg]:opacity-75 [&_svg]:grayscale [&_svg]:transition-[filter,opacity] [&_svg]:duration-300 [&_svg]:ease-[cubic-bezier(0.42,0,0.58,1)] hover:[&_svg]:opacity-100 hover:[&_svg]:grayscale-0`}
      >
        {icon}
        {item.title}
      </a>
    )
  }

  // Monochrome SVG: transition fill color via CSS custom property --brand-color
  // darkModeNoHover: for black/near-black brand icons that would be invisible on dark backgrounds
  const colorHoverClass = item.darkModeNoHover
    ? "hover:[&_svg]:text-[var(--brand-color)] dark:hover:[&_svg]:text-muted-foreground"
    : "hover:[&_svg]:text-[var(--brand-color)] dark:hover:[&_svg]:text-[var(--brand-color-dark)]"

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener"
      style={
        {
          "--brand-color": item.hex,
          "--brand-color-dark": item.darkHex ?? item.hex,
        } as React.CSSProperties
      }
      className={`${baseClass} [&_svg]:text-muted-foreground [&_svg]:transition-colors [&_svg]:duration-300 ${colorHoverClass}`}
    >
      {icon}
      {item.title}
    </a>
  )
}

function groupByCategory(
  items: TechStackType[]
): Record<string, TechStackType[]> {
  return items.reduce<Record<string, TechStackType[]>>((acc, item) => {
    for (const category of item.categories) {
      ;(acc[category] ??= []).push(item)
    }
    return acc
  }, {})
}
