import type { Metadata } from "next"

import { X_HANDLE } from "@/config/site"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { ProjectItem } from "@/features/portfolio/components/projects/project-item"
import { PROJECTS } from "@/features/portfolio/data/projects"

const title = "Projects"
const description =
  "A collection of web applications, AI systems, and tools I've built."

const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    url: "/projects",
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

export default function ProjectsPage() {
  return (
    <>
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          {
            name: "Home",
            href: "/",
          },
          {
            name: "Projects",
            href: "/projects",
          },
        ])}
      />

      <PageHeading>
        <PageHeadingTagline>Featured Works</PageHeadingTagline>
        <PageHeadingTitle>
          Applications & systems I’ve crafted.
        </PageHeadingTitle>
      </PageHeading>

      <div className="h-4" />
      <div className="screen-line-top h-3" />

      <div className="divide-y divide-line border-x border-line">
        {PROJECTS.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>

      <div className="screen-line-top h-4" />
    </>
  )
}
