# [devanshnair.me](https://devanshnair.me)

A personal developer portfolio and interactive showcase for **Devansh Nair** — Full Stack Developer & Competitive Programmer.

→ **Live Site**: [devanshnair.me](https://devanshnair.me)

---

## Overview

### Key Features

* **Unified Developer Heatmap**: Aggregates activity across **GitHub** (commits & pull requests), **LeetCode** (problem submissions & solved count), and **Codeforces** (contests & ratings) into a single unified contribution graph.
* **Curated Portfolio Showcase**:
  * Detailed **Experience** breakdown with company milestones and technical impact.
  * Interactive **Projects** catalogue with live demo previews and repository links.
  * **Hackathons** and competitive programming accomplishments.
  * **Education**, **Awards**, and **Certifications**.
* **Command Menu & Power-User Hotkeys**:
  * Global `Cmd + K` search palette across portfolio sections and blog posts.
  * Sequence navigation hotkeys (`g>h` for Home, `g>e` for Experience, `g>p` for Projects, `g>a` for Hackathons, `g>l` for Blog).
* **Technical SEO & AI-Ready**:
  * Rich **Schema.org / JSON-LD** structured data (`Person`, `ProfilePage`, `WebSite`, `BlogPosting`).
  * Dynamic edge **Open Graph (OG)** social preview cards at 1200x630 resolution.
  * Standardized `/llms.txt` endpoint for AI search engines (Perplexity, ChatGPT, Gemini).
  * Auto-generated `sitemap.xml` and `robots.txt`.
* **Dark / Light CAD Aesthetic**:
  * Pixel-perfect vector `DN` mark and CAD technical grid accents.
  * Responsive, mobile-first layouts with smooth spring transitions.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org) (App Router, Turbopack, Server Components) |
| **Language** | [TypeScript](https://www.typescriptlang.org) (Strict Mode) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) & [Base UI](https://base-ui.com) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com) |
| **Animations** | [Motion](https://motion.dev) (React 19) |
| **Content Engine** | [Fumadocs](https://fumadocs.vercel.app) & MDX |
| **Activity APIs** | GitHub GraphQL, LeetCode GraphQL API, Codeforces API |

---

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org) (v20+ recommended)
* [pnpm](https://pnpm.io) (`corepack enable pnpm` or `npm i -g pnpm`)
* [Bun](https://bun.sh) (for build and registry scripts)

### Installation

```bash
# Clone repository
git clone git@github.com:Devanshnair/Portfolio-DevanshNair.git
cd Portfolio-DevanshNair

# Install dependencies
pnpm install

# Start local development server
pnpm dev
```

The site will run locally at `http://localhost:3000` (or `https://ncdai.localhost` if configured in your hosts).

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts the Next.js development server with hot-reloading |
| `pnpm build` | Compiles registry and builds optimized production bundle |
| `pnpm start` | Runs the production build locally |
| `pnpm check-types` | Validates TypeScript types across the entire project |
| `pnpm lint` | Runs ESLint rules and checks code quality |
| `pnpm format:write` | Formats codebase with Prettier |
| `pnpm test:run` | Runs unit tests with Vitest |

---

## License

This project is licensed under the [MIT License](./LICENSE). Personal content, name, and branding are proprietary to Devansh Nair.
