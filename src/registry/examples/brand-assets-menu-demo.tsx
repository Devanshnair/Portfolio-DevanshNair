"use client"

import Link from "next/link"

import { BrandAssetsMenu } from "@/registry/transformed/components/brand-assets-menu"

export default function BrandAssetsMenuDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <BrandAssetsMenu
        logomark={<BrandMark />}
        logomarkSVG={LOGOMARK_SVG}
        logotypeSVG={LOGOTYPE_SVG}
        brandGuidelinesURL="https://devanshnair.me/welcome"
        brandAssetsURL="https://github.com/Devanshnair"
      >
        <Link href="/" aria-label="Home">
          <BrandMark className="h-8 text-foreground" />
        </Link>
      </BrandAssetsMenu>

      <div className="text-sm text-muted-foreground">
        <span className="hidden pointer-fine:inline-block">
          Right-click the logo
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Press & hold the logo
        </span>
      </div>
    </div>
  )
}

const LOGOMARK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 128"><path fill="currentColor" d="M16 0h32v128H16z M48 0h48v32H48z M48 96h48v32H48z M96 32h32v64H96z M160 0h32v128h-32z M224 0h32v128h-32z M192 32h16v32h-16z M208 64h16v32h-16z"/></svg>'

const LOGOTYPE_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 2048 256"><text x="0" y="60%" dominant-baseline="central" font-size="160" font-weight="900" fill="currentColor" font-family="monospace">devanshnair</text></svg>'

function BrandMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 256 128"
      aria-hidden
      {...props}
    >
      <path
        fill="currentColor"
        d="M16 0h32v128H16z M48 0h48v32H48z M48 96h48v32H48z M96 32h32v64H96z M160 0h32v128h-32z M224 0h32v128h-32z M192 32h16v32h-16z M208 64h16v32h-16z"
      />
    </svg>
  )
}
