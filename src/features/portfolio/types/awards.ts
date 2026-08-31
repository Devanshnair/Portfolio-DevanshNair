export type AwardCategory = "hackathon" | "competitive-programming"

export type Award = {
  id: string
  prize: string
  title: string
  category?: AwardCategory
  /**
   * Award date used for sorting and display.
   * Format: "YYYY-MM" preferred (e.g., "2018-03"); "YYYY" is also accepted.
   */
  date: string
  icon?: React.ReactElement
  /** Optional rich text description; Markdown and line breaks supported. */
  description?: string
  /** Optional URL to certificate, announcement, or reference material. */
  referenceLink?: string
}
