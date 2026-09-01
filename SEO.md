# Production-grade SEO guide for modern web applications

This guide breaks down every layer of modern Search Engine Optimization (SEO), Open Graph (OG) sharing, structured data, web indexing, and performance optimization implemented in this production repository. Use this reference whenever building or auditing web applications.

---

## 1. The 7 core pillars of production SEO

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          1. Meta & Page Head                            │
│           (Title, Description, Canonical, Keywords, Robots)             │
├─────────────────────────────────────────────────────────────────────────┤
│                     2. Open Graph & Social Cards                        │
│             (og:title, og:image, og:description, Twitter Cards)         │
├─────────────────────────────────────────────────────────────────────────┤
│                   3. Dynamic OG Generation (next/og)                    │
│           (1200x630 ImageResponse, CDN cached, Dynamic Text)            │
├─────────────────────────────────────────────────────────────────────────┤
│                    4. Favicons & Web App Manifest                       │
│           (SVG icon, favicon.ico, Apple Touch Icon, PWA JSON)           │
├─────────────────────────────────────────────────────────────────────────┤
│                   5. Structured Data (Schema.org / JSON-LD)             │
│            (ProfilePage, Person, WebSite, BlogPosting, Breadcrumbs)     │
├─────────────────────────────────────────────────────────────────────────┤
│                   6. Search Engine Crawling & Discovery                 │
│               (sitemap.xml, robots.txt, Canonical URLs)                 │
├─────────────────────────────────────────────────────────────────────────┤
│                   7. AI & LLM Indexing (llms.txt)                       │
│          (Structured markdown manifest for LLMs, Perplexity, GPT)       │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Meta tags and page head

Search engines use `<head>` metadata to understand your page title, snippet summary, and indexation rules.

### Best practices:
1. **Title tags**:
   * Format: `Page Title – Site Name` (e.g. `Experience – Devansh Nair` or `Devansh Nair – Software Engineer`).
   * Keep between **50–60 characters** so it doesn't get truncated in Google search results.
   * Use Next.js title template in `layout.tsx`:
     ```ts
     title: {
       template: `%s – ${SITE_INFO.name}`,
       default: `${USER.displayName} – ${USER.jobTitle}`,
     }
     ```
2. **Meta descriptions**:
   * Keep between **140–160 characters**.
   * Must be actionable, descriptive, and contain key search terms naturally.
3. **Canonical URLs**:
   * Prevents duplicate content penalties if your page is accessible via multiple query params or URLs.
   * In Next.js:
     ```ts
     export const metadata: Metadata = {
       metadataBase: new URL("https://devanshnair.me"),
       alternates: {
         canonical: "/experience",
       },
     }
     ```
4. **Keywords**:
   * Curate an array of 5–10 relevant terms (e.g. `["Devansh Nair", "Software Engineer", "Competitive Programmer", "Next.js", "React"]`).

---

## 3. Favicons and app icons

Browsers, mobile bookmarks, search results snippets, and progressive web apps require multiple icon formats:

| File | Purpose | Recommended Size / Format |
| :--- | :--- | :--- |
| `public/icon.svg` | Modern desktop & mobile browser tab icon (supports dark/light mode vector rendering) | Vector SVG (`512x512` viewBox) |
| `public/favicon.ico` | Legacy desktop browser fallback | 32x32 / 48x48 Multi-layer ICO |
| `public/apple-touch-icon.png` | iOS Home Screen Bookmark & Safari shortcut | 180x180 PNG (opaque background) |
| `manifest.webmanifest` | PWA manifest for Android & Chrome installation | JSON linking 180px and vector icons |

### Next.js implementation in `layout.tsx`:
```ts
icons: {
  icon: [
    { url: "/icon.svg", type: "image/svg+xml" },
    { url: "/favicon.ico", sizes: "32x32" },
  ],
  apple: {
    url: "/apple-touch-icon.png",
    type: "image/png",
    sizes: "180x180",
  },
}
```

---

## 4. Open Graph (OG) and Twitter preview cards

When someone pastes your link on **LinkedIn, Twitter/X, WhatsApp, Discord, Slack, or Telegram**, the platform scrapes your page's Open Graph tags to generate a preview card.

### Essential OG tags:
* `og:title` — Headline of the link.
* `og:description` — 1-2 sentence preview.
* `og:image` — Preview image (must be **1200 x 630 pixels** with 1.91:1 aspect ratio).
* `og:url` — Canonical page link.
* `og:type` — `"website"`, `"profile"`, or `"article"`.
* `twitter:card` — `"summary_large_image"` for full-width card display.
* `twitter:creator` — Your handle (e.g. `@Devanshnair`).

---

## 5. Dynamic OG image generation (`next/og` / `ImageResponse`)

Instead of creating static JPGs manually for every project, subpage, or blog post, this repository uses **Next.js dynamic edge OG generation** at `/og/simple`.

### How it works:
* An API route handles `GET` requests (e.g. `/og/simple?title=...&description=...`).
* Uses `@vercel/og` (`ImageResponse`) with JSX and custom fonts (`GeistSans`, `GeistMono`).
* Automatically draws:
  * Dark architectural background grid.
  * Your custom **`DN` pixel logo**.
  * Dynamic page title and subtitle.
* Generates an instant, CDN-cached 1200x630 PNG response.

### Using it on any page:
```ts
export async function generateMetadata(): Promise<Metadata> {
  const title = "My Project Title"
  const description = "Overview of the project"
  const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  }
}
```

---

## 6. Structured data (Schema.org / JSON-LD)

JSON-LD (JavaScript Object Notation for Linked Data) embeds machine-readable entities into the page HTML. Google uses JSON-LD to understand who you are, what you do, and build **Google Knowledge Graph cards** and rich search results.

### Implemented Schema types in this project:

1. **`WebSite` (Root `layout.tsx`)**:
   Declares the website name, author entity reference, and canonical domain.
2. **`Person` (Root `config/json-ld.ts`)**:
   Declares your full name, job title, social profiles (`sameAs`: GitHub, LinkedIn, LeetCode, Codeforces), email, address, and worksFor relationships.
3. **`ProfilePage` (Homepage `page.tsx`)**:
   Declares the homepage as a personal profile page linking directly to the `Person` schema entity.
4. **`BlogPosting` (Blog pages `blog/[slug]/page.tsx`)**:
   Declares the article headline, description, author, datePublished, dateModified, and canonical URL.
5. **`BreadcrumbList`**:
   Declares the breadcrumb hierarchy (`Home > Blog > Post Title`) so Google displays breadcrumb navigation in search results.

---

## 7. Search engine crawling (`sitemap.xml` & `robots.txt`)

Search engine spiders (Googlebot, Bingbot) request `robots.txt` and `sitemap.xml` upon discovering your domain.

### A. `src/app/robots.ts`
```ts
import type { MetadataRoute } from "next"
import { SITE_INFO } from "@/config/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/preview/"],
    },
    sitemap: `${SITE_INFO.url}/sitemap.xml`,
  }
}
```

### B. `src/app/sitemap.ts`
* Automatically enumerates all public static routes (`/`, `/experience`, `/projects`, `/hackathons`, `/blog`, `/timeline`).
* Dynamically fetches all markdown/MDX blog posts and generates `<url>`, `<lastmod>`, and `<priority>`.

---

## 8. AI search & LLM indexing (`llms.txt`)

Modern AI search engines (Perplexity, ChatGPT Search, Google Gemini) scrape a standardized `/llms.txt` file at the root of a domain to quickly index and cite accurate information.

### What's in `/llms.txt`:
* Concise summary of your role and technical expertise.
* Direct markdown links to each section of your portfolio (`experience`, `projects`, `hackathons`, `education`, `awards`, `certifications`).
* Listing of recent blog articles with descriptions.

---

## 9. Performance & Core Web Vitals (Technical SEO)

Google directly ranks pages based on **Core Web Vitals**:
1. **LCP (Largest Contentful Paint)**: Time to render the main hero content. Target: `< 2.5s`.
   * Achieved via Next.js server components and pre-rendered static HTML (SSG).
2. **CLS (Cumulative Layout Shift)**: Preventing elements from jumping around while loading. Target: `< 0.1`.
   * Achieved via explicit SVG viewBox sizes, font swap fallbacks, and fixed container constraints.
3. **INP (Interaction to Next Paint)**: Responsiveness to user clicks and hotkeys. Target: `< 200ms`.
   * Achieved via lightweight client components, lazy-loaded dialogs (`CommandMenu`), and cached data lookups.

---

## 10. Production pre-deployment SEO checklist

Before pushing any new project live, run through this 10-point checklist:

- [x] **1. Domain & Base URL**: `NEXT_PUBLIC_APP_URL` configured in `.env` / `config/site.ts`.
- [x] **2. Unique Titles & Descriptions**: Every route has a descriptive title and 150-char summary.
- [x] **3. Canonical URLs**: `metadataBase` and `alternates.canonical` defined.
- [x] **4. Local Favicons**: `icon.svg`, `favicon.ico`, and `apple-touch-icon.png` in `public/`.
- [x] **5. Web Manifest**: `manifest.webmanifest` valid and linking to local icons.
- [x] **6. Dynamic OG Cards**: `/og/simple` generating crisp 1200x630 preview images.
- [x] **7. JSON-LD Schemas**: `Person`, `WebSite`, and `ProfilePage` valid without schema errors.
- [x] **8. Sitemap**: `/sitemap.xml` generates clean URLs without 404s.
- [x] **9. Robots.txt**: `/robots.txt` allows crawling and points to sitemap.
- [x] **10. Type & Build Check**: `pnpm check-types` and `pnpm build` pass with 0 errors.
