export type TechStack = {
  key: string
  title: string
  href: string
  icon: React.ReactElement
  darkIcon?: React.ReactElement
  /** Brand hex color (with #) used for hover text/fill transition on monochrome icons */
  hex?: string
  /** Brand hex color (with #) used for dark mode hover transition on monochrome icons */
  darkHex?: string
  /** When true, uses CSS grayscale filter instead of color var for hover (for multi-color SVGs) */
  useGrayscaleFilter?: boolean
  /** When true, suppresses the hover color effect in dark mode (for black/near-black brand icons) */
  darkModeNoHover?: boolean
  categories: string[]
}
