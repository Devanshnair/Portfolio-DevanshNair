import type { Metadata, Route } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getTableOfContents } from "fumadocs-core/content/toc"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import type { BlogPosting as PageSchema, WithContext } from "schema-dts"

import { JSON_LD_ID } from "@/config/json-ld"
import { X_HANDLE } from "@/config/site"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { absoluteUrl } from "@/lib/utils"
import { Kbd } from "@/components/ui/kbd"
import { Button } from "@/components/base/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { Prose } from "@/components/base/ui/typography"
import { MDX } from "@/components/mdx"
import { TOCInline } from "@/components/toc-inline"
import { TOCMinimap } from "@/components/toc-minimap"
import { DocKeyboardShortcuts } from "@/features/doc/components/doc-keyboard-shortcuts"
import {
  DocContainer,
  DocContentCol,
  DocGrid,
  DocLeftCol,
  DocRightCol,
} from "@/features/doc/components/doc-layout"
import { LLMCopyButtonWithViewOptions } from "@/features/doc/components/doc-page-actions"
import { DocPageRoot } from "@/features/doc/components/doc-page-root"
import { DocShareMenu } from "@/features/doc/components/doc-share-menu"
import {
  findNeighbour,
  getBlogPosts,
  getDocBySlug,
} from "@/features/doc/data/documents"
import type { Doc } from "@/features/doc/types/document"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  const docs = getBlogPosts()
  return docs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const slug = (await params).slug
  const doc = getDocBySlug(slug)

  if (!doc) {
    return notFound()
  }

  const { title, description, image, createdAt, updatedAt } = doc.metadata

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [
        {
          url:
            image ||
            `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: createdAt,
      modifiedTime: updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        image ||
          `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
      ],
      creator: X_HANDLE,
      site: X_HANDLE,
    },
  }
}

function getPageJsonLd(doc: Doc): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": absoluteUrl(`/blog/${doc.slug}`),
    headline: doc.metadata.title,
    description: doc.metadata.description,
    image: doc.metadata.image
      ? absoluteUrl(doc.metadata.image)
      : absoluteUrl(
          `/og/simple?title=${encodeURIComponent(doc.metadata.title)}&description=${encodeURIComponent(doc.metadata.description)}`
        ),
    datePublished: new Date(doc.metadata.createdAt).toISOString(),
    dateModified: new Date(doc.metadata.updatedAt).toISOString(),
    author: {
      "@id": JSON_LD_ID.person,
    },
    publisher: {
      "@id": JSON_LD_ID.person,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${doc.slug}`),
    },
    isPartOf: {
      "@type": "Blog",
      "@id": absoluteUrl("/blog"),
      name: "Blog",
      url: absoluteUrl("/blog"),
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const doc = getDocBySlug(slug)

  if (!doc) {
    notFound()
  }

  const toc = getTableOfContents(doc.content)

  const allDocs = getBlogPosts()
  const { previous, next } = findNeighbour(allDocs, slug)

  return (
    <>
      <JsonLdScript data={getPageJsonLd(doc)} />

      <JsonLdScript
        data={jsonLdBreadcrumbList([
          {
            name: "Home",
            href: "/",
          },
          {
            name: "Blog",
            href: "/blog",
          },
          {
            name: doc.metadata.title,
            href: `/blog/${slug}`,
          },
        ])}
      />

      <DocKeyboardShortcuts
        previous={previous ? (`/blog/${previous.slug}` as Route) : null}
        next={next ? (`/blog/${next.slug}` as Route) : null}
      />

      <DocPageRoot>
        <DocContainer>
          <div className="screen-line-bottom h-px" />

          <div className="flex items-center justify-between p-2 pl-4">
            <Button
              className="h-7 gap-2 border-none px-0 tracking-wider text-muted-foreground hover:text-foreground hover:no-underline"
              variant="link"
              size="sm"
              nativeButton={false}
              render={
                <Link href="/blog">
                  <ArrowLeftIcon />
                  Blog
                </Link>
              }
            />

            <div className="flex items-center gap-2">
              <LLMCopyButtonWithViewOptions
                markdownUrl={`/blog/${doc.slug}.mdx`}
              />

              <DocShareMenu
                title={doc.metadata.title}
                url={`/blog/${doc.slug}`}
              />

              {previous && (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        className="size-7 border-none"
                        variant="secondary"
                        size="icon-sm"
                        nativeButton={false}
                        render={
                          <Link
                            href={`/blog/${previous.slug}`}
                            aria-label="Previous post"
                          >
                            <ArrowLeftIcon />
                          </Link>
                        }
                      />
                    }
                  />
                  <TooltipContent className="pr-2 pl-3">
                    <div className="flex items-center gap-3">
                      Previous post
                      <Kbd>
                        <ArrowLeftIcon />
                      </Kbd>
                    </div>
                  </TooltipContent>
                </Tooltip>
              )}

              {next && (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        className="size-7 border-none"
                        variant="secondary"
                        size="icon-sm"
                        nativeButton={false}
                        render={
                          <Link
                            href={`/blog/${next.slug}`}
                            aria-label="Next post"
                          >
                            <ArrowRightIcon />
                          </Link>
                        }
                      />
                    }
                  />
                  <TooltipContent className="pr-2 pl-3">
                    <div className="flex items-center gap-3">
                      Next post
                      <Kbd>
                        <ArrowRightIcon />
                      </Kbd>
                    </div>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>

          <div className="screen-line-top screen-line-bottom py-px">
            <div className="h-4" />
          </div>

          <h1
            data-slot="doc-title"
            className="screen-line-bottom px-4 text-4xl font-medium tracking-tight text-balance"
          >
            {doc.metadata.title}
          </h1>
        </DocContainer>

        <DocGrid>
          <DocLeftCol />

          <DocContentCol>
            <Prose className="px-(--page-padding) pt-8 [--page-padding:--spacing(4)]">
              <p className="text-muted-foreground">
                {doc.metadata.description}
              </p>

              <TOCInline className="lg:hidden" items={toc} />

              <div>
                <MDX code={doc.content} />
              </div>
            </Prose>

            <div className="screen-line-top h-4" />
          </DocContentCol>

          <DocRightCol>
            <div className="sticky top-[calc(var(--doc-cols-top,0)+(--spacing(3)))] translate-x-2 opacity-0 in-data-doc-cols-ready:opacity-100">
              <TOCMinimap items={toc} />
            </div>
          </DocRightCol>
        </DocGrid>
      </DocPageRoot>
    </>
  )
}
