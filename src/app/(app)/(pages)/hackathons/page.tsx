import type { Metadata } from "next"

import { X_HANDLE } from "@/config/site"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { HackathonItem } from "@/features/portfolio/components/hackathons/hackathon-item"
import { HACKATHONS } from "@/features/portfolio/data/hackathons"

const title = "Hackathons"
const description =
  "Competitions, problem statements, projects built, and competition learnings."

const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/hackathons",
  },
  openGraph: {
    url: "/hackathons",
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

export default function HackathonsPage() {
  return (
    <>
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          {
            name: "Home",
            href: "/",
          },
          {
            name: "Hackathons",
            href: "/hackathons",
          },
        ])}
      />

      <PageHeading>
        <PageHeadingTagline>Competitions & Builds</PageHeadingTagline>
        <PageHeadingTitle>Hackathons & challenges.</PageHeadingTitle>
      </PageHeading>

      <div className="h-4" />
      <div className="screen-line-top h-3" />

      <div className="divide-y divide-line border-x border-line">
        {HACKATHONS.map((hackathon) => (
          <HackathonItem key={hackathon.id} hackathon={hackathon} />
        ))}
      </div>

      <div className="screen-line-top h-4" />
    </>
  )
}
