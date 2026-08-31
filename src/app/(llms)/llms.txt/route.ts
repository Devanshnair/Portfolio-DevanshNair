import { SITE_INFO } from "@/config/site"
import { getBlogPosts } from "@/features/doc/data/documents"

const allPosts = getBlogPosts()

const content = `# devanshnair.me

> A personal developer portfolio showcasing my work as a Full Stack Developer.

- [About](${SITE_INFO.url}/#hello): A quick intro to me, my tech stack, and how to connect.
- [Experience](${SITE_INFO.url}/experience): Highlights from my career and key roles I've taken on.
- [Projects](${SITE_INFO.url}/projects): Selected projects that show my skills and creativity.
- [Hackathons](${SITE_INFO.url}/hackathons): Hackathon victories and finalist projects.
- [Education](${SITE_INFO.url}/#education): Where I studied, what I focused on, and what I built along the way.
- [Awards](${SITE_INFO.url}/#awards): My key awards and competitive programming honors.
- [Certifications](${SITE_INFO.url}/#certs): Certifications and credentials I've earned.
- [Blog](${SITE_INFO.url}/blog): Every blog post, newest first, with publish dates.

## Blog

${allPosts.map((item) => `- [${item.metadata.title}](${SITE_INFO.url}/blog/${item.slug}): ${item.metadata.description}`).join("\n")}
`

export const revalidate = false
export const dynamic = "force-static"

export async function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  })
}
