import type { Metadata } from "next"

import { X_HANDLE } from "@/config/site"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { ExperienceItem } from "@/features/portfolio/components/experiences/experience-item"
import { EXPERIENCES } from "@/features/portfolio/data/experiences"

const title = "Experience"
const description =
  "My professional journey, internships, and freelance software engineering work."

const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/experience",
  },
  openGraph: {
    url: "/experience",
    type: "website",
    images: {
      url: ogImage,
      width: 1200,
      height: 630,
      alt: title,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: X_HANDLE,
    creator: X_HANDLE,
    images: [ogImage],
  },
}

export default function ExperiencePage() {
  return (
    <>
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          {
            name: "Home",
            href: "/",
          },
          {
            name: "Experience",
            href: "/experience",
          },
        ])}
      />

      <PageHeading>
        <PageHeadingTagline>Career & Work</PageHeadingTagline>
        <PageHeadingTitle>Professional experience.</PageHeadingTitle>
      </PageHeading>

      <div className="h-4" />
      <div className="screen-line-top h-3" />

      <div className="divide-y divide-line border-x border-line px-4">
        {EXPERIENCES.map((experience) => (
          <div key={experience.id} className="py-2">
            <ExperienceItem experience={experience} />
          </div>
        ))}
      </div>

      <div className="screen-line-top h-4" />
    </>
  )
}
