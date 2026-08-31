"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"
import { copyToClipboardWithEvent } from "@/utils/copy"
import { useRouter } from "@bprogress/next/app"
import { useTiks } from "@rexa-developer/tiks/react"
import {
  BoxIcon,
  BriefcaseBusinessIcon,
  CircleCheckBigIcon,
  CornerDownLeftIcon,
  CrownIcon,
  DownloadIcon,
  FileTextIcon,
  GraduationCapIcon,
  LayersIcon,
  MonitorIcon,
  MoonStarIcon,
  RssIcon,
  SunMediumIcon,
  TextInitialIcon,
  TrophyIcon,
  TypeIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useHotkeys } from "react-hotkeys-hook"
import { toast } from "sonner"

import { trackEvent } from "@/lib/events"
import { useClickSound } from "@/hooks/soundcn/use-click-sound"
import { useMutationObserver } from "@/hooks/use-mutation-observer"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import type { DocPreview } from "@/features/doc/types/document"
import { SOCIAL_ICONS } from "@/features/portfolio/components/social-link-icons"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"

import { BrandMark, getMarkSVG } from "./brand-mark"
import { getWordmarkSVG } from "./brand-wordmark"
import { NewsIcon, SearchIcon } from "./icons"
import { Button } from "./ui/button"
import { Kbd, KbdGroup } from "./ui/kbd"

type CommandKind = "command" | "page" | "link"

type CommandLinkItem = {
  title: string
  href: string
  kind: CommandKind
  icon?: React.ReactElement
  iconImage?: string
  shortcut?: string
  keywords?: string[]
  openInNewTab?: boolean
}

const MENU_LINKS: CommandLinkItem[] = [
  {
    title: "Home",
    href: "/",
    kind: "page",
    icon: <BrandMark />,
    shortcut: "GH",
  },
  {
    title: "Experience",
    href: "/experience",
    kind: "page",
    icon: <BriefcaseBusinessIcon />,
    shortcut: "GE",
  },
  {
    title: "Projects",
    href: "/projects",
    kind: "page",
    icon: <BoxIcon />,
    shortcut: "GP",
  },
  {
    title: "Hackathons",
    href: "/hackathons",
    kind: "page",
    icon: <TrophyIcon />,
    shortcut: "GA",
  },
  {
    title: "Blog",
    href: "/blog",
    kind: "page",
    icon: <NewsIcon />,
    shortcut: "GL",
  },
]

const PORTFOLIO_LINKS: CommandLinkItem[] = [
  {
    title: "Hello",
    href: "/#hello",
    kind: "page",
    icon: <TextInitialIcon />,
  },
  {
    title: "Stack",
    href: "/#stack",
    kind: "page",
    icon: <LayersIcon />,
  },
  {
    title: "Experience",
    href: "/#experience",
    kind: "page",
    icon: <BriefcaseBusinessIcon />,
  },
  {
    title: "Projects",
    href: "/#projects",
    kind: "page",
    icon: <BoxIcon />,
  },
  {
    title: "Hackathons",
    href: "/#hackathons",
    kind: "page",
    icon: <TrophyIcon />,
  },
  {
    title: "Education",
    href: "/#education",
    kind: "page",
    icon: <GraduationCapIcon />,
  },
  {
    title: "Awards",
    href: "/#awards",
    kind: "page",
    icon: <CrownIcon />,
  },
  {
    title: "Certifications",
    href: "/#certs",
    kind: "page",
    icon: <CircleCheckBigIcon />,
  },
]

const SOCIAL_LINK_ITEMS: CommandLinkItem[] = SOCIAL_LINKS.map((item) => ({
  title: item.title,
  href: item.href,
  kind: "link",
  icon: SOCIAL_ICONS[item.name],
  openInNewTab: true,
}))

const OTHER_LINK_ITEMS: CommandLinkItem[] = [
  {
    title: "Download vCard",
    href: "/vcard",
    kind: "command",
    icon: <DownloadIcon />,
  },
  {
    title: "llms.txt",
    href: "/llms.txt",
    kind: "link",
    icon: <FileTextIcon />,
    openInNewTab: true,
  },
  {
    title: "RSS Feed",
    href: "/rss",
    kind: "link",
    icon: <RssIcon />,
    openInNewTab: true,
  },
]

export function CommandMenu({
  docs = [],
  enabledHotkeys = false,
}: {
  docs?: DocPreview[]
  blocks?: unknown[]
  enabledHotkeys?: boolean
}) {
  const router = useRouter()

  const { setTheme } = useTheme()

  const [open, setOpen] = useState(false)

  const [selectedCommandKind, setSelectedCommandKind] =
    useState<CommandKind | null>(null)

  const [click] = useClickSound()

  const { success: tiksSuccess } = useTiks()

  useHotkeys(
    "mod+k, slash",
    (e) => {
      e.preventDefault()

      setOpen((open) => {
        if (!open) {
          trackEvent({
            name: "open_command_menu",
            properties: {
              method: "keyboard",
              key: e.key === "/" ? "/" : e.metaKey ? "cmd+k" : "ctrl+k",
            },
          })
        }
        return !open
      })
    },
    { enabled: enabledHotkeys }
  )

  const handleOpenLink = useCallback(
    (href: string, openInNewTab = false) => {
      setOpen(false)

      trackEvent({
        name: "command_menu_action",
        properties: {
          action: "navigate",
          href: href,
          open_in_new_tab: openInNewTab,
        },
      })

      if (openInNewTab) {
        window.open(href, "_blank", "noopener")
      } else {
        router.push(href)
      }
    },
    [router]
  )

  const handleCopyText = useCallback(
    (text: string, message: string) => {
      setOpen(false)
      copyToClipboardWithEvent(text, {
        name: "command_menu_action",
        properties: {
          action: "copy",
          text: text,
        },
      })
      toast.success(message)
      tiksSuccess()
    },
    [tiksSuccess]
  )

  const createThemeHandler = useCallback(
    (theme: "light" | "dark" | "system") => () => {
      click()
      setOpen(false)

      trackEvent({
        name: "command_menu_action",
        properties: {
          action: "change_theme",
          theme: theme,
        },
      })

      setTheme(theme)
    },
    [click, setTheme]
  )

  const blogLinks = useMemo(
    () =>
      docs
        .filter(
          (doc) => doc.category === "blog" || doc.category !== "components"
        )
        .map<CommandLinkItem>((doc) => ({
          title: doc.title,
          href: `/blog/${doc.slug}`,
          kind: "page",
          keywords: ["blog"],
        })),
    [docs]
  )

  const handleLinkHighlight = useCallback((link: CommandLinkItem) => {
    setSelectedCommandKind(link.kind)
  }, [])

  const handleCommandHighlight = useCallback(() => {
    setSelectedCommandKind("command")
  }, [])

  return (
    <>
      <CommandMenuTrigger
        onClick={() => {
          setOpen(true)
          trackEvent({
            name: "open_command_menu",
            properties: {
              method: "click",
            },
          })
        }}
      />

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandMenuInput />

        <div className="rounded-xl bg-background ring-1 ring-border">
          <CommandList className="min-h-80 scroll-fade">
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandLinkGroup
              heading="Menu"
              links={MENU_LINKS}
              onLinkHighlight={handleLinkHighlight}
              onLinkSelect={handleOpenLink}
            />

            <CommandLinkGroup
              heading="Portfolio"
              links={PORTFOLIO_LINKS}
              onLinkHighlight={handleLinkHighlight}
              onLinkSelect={handleOpenLink}
            />

            {blogLinks.length > 0 && (
              <CommandLinkGroup
                heading="Blog"
                links={blogLinks}
                fallbackIcon={<NewsIcon />}
                onLinkHighlight={handleLinkHighlight}
                onLinkSelect={handleOpenLink}
              />
            )}

            <CommandLinkGroup
              heading="Social Links"
              links={SOCIAL_LINK_ITEMS}
              onLinkHighlight={handleLinkHighlight}
              onLinkSelect={handleOpenLink}
            />

            <CommandGroup heading="Brand Assets">
              <CommandMenuItem
                onHighlight={handleCommandHighlight}
                onSelect={() => {
                  handleCopyText(getMarkSVG(), "Mark as SVG copied")
                }}
              >
                <BrandMark />
                Copy Mark as SVG
              </CommandMenuItem>

              <CommandMenuItem
                onHighlight={handleCommandHighlight}
                onSelect={() => {
                  handleCopyText(getWordmarkSVG(), "Logotype as SVG copied")
                }}
              >
                <TypeIcon />
                Copy Logotype as SVG
              </CommandMenuItem>
            </CommandGroup>

            <CommandGroup heading="Theme">
              <CommandMenuItem
                keywords={["theme"]}
                onHighlight={handleCommandHighlight}
                onSelect={createThemeHandler("light")}
              >
                <SunMediumIcon />
                Light
              </CommandMenuItem>
              <CommandMenuItem
                keywords={["theme"]}
                onHighlight={handleCommandHighlight}
                onSelect={createThemeHandler("dark")}
              >
                <MoonStarIcon />
                Dark
              </CommandMenuItem>
              <CommandMenuItem
                keywords={["theme"]}
                onHighlight={handleCommandHighlight}
                onSelect={createThemeHandler("system")}
              >
                <MonitorIcon />
                System
              </CommandMenuItem>
            </CommandGroup>

            <CommandLinkGroup
              heading="Other"
              links={OTHER_LINK_ITEMS}
              onLinkHighlight={handleLinkHighlight}
              onLinkSelect={handleOpenLink}
            />
          </CommandList>
        </div>

        <CommandMenuFooter selectedCommandKind={selectedCommandKind} />
      </CommandDialog>
    </>
  )
}

export default CommandMenu

function CommandMenuTrigger({ ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="command-menu-trigger"
      className="gap-1.5 border-none px-1.5 text-muted-foreground will-change-[scale] select-none"
      variant="ghost"
      size="sm"
      {...props}
    >
      <SearchIcon />
      <span className="font-normal text-muted-foreground">Search</span>
      <KbdGroup className="ml-auto">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </Button>
  )
}

function CommandMenuInput({
  ...props
}: React.ComponentProps<typeof CommandInput>) {
  return (
    <div className="p-2">
      <CommandInput placeholder="Type a command or search..." {...props} />
    </div>
  )
}

function CommandMenuItem({
  children,
  onHighlight,
  ...props
}: React.ComponentProps<typeof CommandItem> & {
  onHighlight?: () => void
}) {
  const [click] = useClickSound()
  const elementRef = React.useRef<HTMLDivElement>(null)

  useMutationObserver(
    elementRef,
    (mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-selected"
        ) {
          if (elementRef.current?.getAttribute("data-selected") === "true") {
            onHighlight?.()
          }
        }
      }
    },
    { attributes: true }
  )

  return (
    <CommandItem
      ref={elementRef}
      className="gap-3"
      onSelect={() => {
        click()
      }}
      {...props}
    >
      {children}
    </CommandItem>
  )
}

function CommandLinkGroup({
  heading,
  links,
  fallbackIcon,
  onLinkHighlight,
  onLinkSelect,
  ...props
}: React.ComponentProps<typeof CommandGroup> & {
  heading: string
  links: CommandLinkItem[]
  fallbackIcon?: React.ReactElement
  onLinkHighlight?: (link: CommandLinkItem) => void
  onLinkSelect?: (href: string, openInNewTab?: boolean) => void
}) {
  const router = useRouter()

  useEffect(() => {
    links.forEach((link) => {
      if (link.kind === "page" && !link.openInNewTab) {
        router.prefetch(link.href)
      }
    })
  }, [links, router])

  return (
    <CommandGroup heading={heading} {...props}>
      {links.map((link) => {
        const icon =
          link.icon ||
          (link.iconImage ? (
            <img
              className="size-4 shrink-0 rounded-sm"
              src={link.iconImage}
              alt=""
            />
          ) : (
            fallbackIcon
          ))

        return (
          <CommandMenuItem
            key={link.title}
            keywords={link.keywords}
            onHighlight={() => {
              onLinkHighlight?.(link)
            }}
            onSelect={() => {
              onLinkSelect?.(link.href, link.openInNewTab)
            }}
          >
            {icon}
            {link.title}
            {link.shortcut && (
              <CommandShortcut>{link.shortcut}</CommandShortcut>
            )}
          </CommandMenuItem>
        )
      })}
    </CommandGroup>
  )
}

function CommandMenuFooter({
  selectedCommandKind,
}: {
  selectedCommandKind: CommandKind | null
}) {
  const actionText = useMemo(() => {
    switch (selectedCommandKind) {
      case "page":
        return "Go to page"
      case "link":
        return "Open link"
      default:
        return "Select"
    }
  }, [selectedCommandKind])

  return (
    <div className="flex h-10 items-center justify-between px-4 text-xs text-muted-foreground select-none">
      <div className="flex items-center gap-1">
        <span>Navigation</span>
        <KbdGroup>
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
        </KbdGroup>
      </div>

      <div className="flex items-center gap-1">
        <span>{actionText}</span>
        <KbdGroup>
          <Kbd>
            <CornerDownLeftIcon />
          </Kbd>
        </KbdGroup>
      </div>
    </div>
  )
}
