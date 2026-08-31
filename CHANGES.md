# Project migration changes

This document outlines the codebase analysis, architectural principles, and every modification made to adapt this Next.js 16 portfolio and component registry repository for **Devansh Nair**.

---

## 1. Architectural principles and codebase structure

Before implementing any changes, the repository was audited to understand its core design patterns and guidelines:

- **Next.js & Routing**: Uses Next.js 16 with the App Router. The layout is managed inside route groups (e.g. `(app)` for pages/docs, `(preview)` for registry demos).
- **Tailwind CSS v4**: Built on Tailwind CSS v4, which uses dynamic color mappings (e.g. `var(--foreground)`) and CSS-in-JS style variables for a theme-aware layout.
- **Decoupled Data Layer**: Component presentation is separated from profile content. Features under `src/features/portfolio/` read data directly from JSON/TS files in `src/features/portfolio/data/`.
- **Component Registry**: Built on a custom shadcn/ui-compatible registry at `src/registry`. Icons are auto-generated from registry mappings using bun scripts.
- **Repository Guidelines**:
  - Headings in prose/Markdown must be in **sentence-case** (only the first word and proper nouns capitalized).
  - Strictly no emojis in code, comments, or commit messages.
  - Strict TypeScript types and kebab-case file names.

---

## 2. Minute details of changes implemented

### A. Branding and trademark scrubbing
To comply with the repository's licensing/brand guidelines, all custom SVG signatures, names, and personal logos of the previous owner were replaced and refactored to generic brand names:

1. **`src/components/brand-mark.tsx`** (formerly `chanhdai-mark.tsx`)
   - **Change**: Created a custom pixel-art SVG logo representing your initials `DN` on an 8-bit style grid system. The `D` is custom-proportioned to 7 columns wide, and the `N` is proportioned to 6 columns wide, separated by a 2-column spacer gap in the middle. The component name was refactored from `ChanhDaiMark` to `BrandMark`.
   - **Reasoning**: Ensures the brand icon replicates the template's original geometric grid-aligned style while matching your personal initials.

2. **`src/components/brand-wordmark.tsx`** (formerly `chanhdai-wordmark.tsx`)
   - **Change**: Created this component rendering `devanshnair` styled with strict typography matching the project's aesthetic. The component name was refactored from `ChanhDaiWordmark` to `BrandWordmark`.

3. **`src/features/portfolio/components/brand-mark-isometric.tsx`** (formerly `chanhdai-mark-isometric.tsx`)
   - **Change**: Created this component rendering the 3D-like isometric logo representation, refactoring the component name to `BrandMarkIsometric` and its internal SVG pattern/fill IDs to prevent name clashing.

4. **`src/components/site-footer-brand.tsx`**
   - **Change**: Updated the interactive, hover-sensitive footer signature to draw `devanshnair` using SVG text and the custom linear gradient animation.

5. **`src/components/site-footer-cad.tsx`**
   - **Change**: Changed the CAD layout title constant `SITE_TITLE` to `"devanshnair.me"` and the `COPYRIGHT_HOLDER` constant to `"Devansh Nair"`.

6. **Refactored Usages and References**:
   - Replaced all imports, rendering elements, and function invocations of the old logo components inside header menus, context menus, command menus, cover page modules, documents icon mapping, and OG image rendering views (`site-header.tsx`, `brand.tsx`, `brand-assets-menu-demo.tsx`, `component-icon.tsx`, `profile-cover.tsx`, `brand-context-menu.tsx`, `site-header-mark.tsx`, `command-menu.tsx`, and `og/page.tsx`).
   - Updated copy-to-clipboard scripts to fetch the updated `DN` and `devanshnair` SVGs.

---

### B. Decoupled data layer updates
All files under `src/features/portfolio/data/` were populated with details from your resume:

1. **`user.ts`**
   - Configured name, display name, job title, and bio.
   - Base64 encoded email (`devanshnair.05@gmail.com`) and phone number (`+91-9867705221`) to prevent web scraping.
   - Updated `flipSentences` and `about` fields to summarize your background in computer engineering.
   - Pointed avatar and OG image links to dynamic, high-quality placeholders.

2. **`social-links.ts`**
   - Configured your custom handles and profile links for **GitHub** (`Devanshnair`), **LinkedIn** (`devansh-nair`), **LeetCode** (`Devanshnair`), and **Codeforces** (`devanshnair`).

3. **`social-link-icons.tsx`**
   - Added custom inline SVG paths for **LeetCode** (the folded sheet logo) and **Codeforces** (the three-bar rating chart logo) to support rendering in social link ribbons.

4. **`experiences.tsx`**
   - Populated your four core experiences with descriptive details, tech stacks, and period bounds:
     - *Data Analyst* at Colgate Global Business Services (LLM data validation, Retool, Snowflake).
     - *Full Stack Developer* at AmberFlux (Docker full-stack admin panel, SSE, JWT refresh queues).
     - *Full Stack Developer* at VisionX (Next.js client websites development and performance optimization).
     - *Freelance* (GSAP animations and UI interactions).

5. **`projects.tsx`**
   - Mapped your main projects:
     - **HackVerse** (Hackathon management with LLM resume scoring, WebSockets/WebRTC calls).
     - **SupportOS** (AI Support SaaS with LangChain, Qdrant vector search, Twilio voice transcription).

6. **`tech-stack.tsx`**
   - Configured all languages, frameworks, cloud utilities, and databases from your technical skills list into the structured categorization model (Languages, Frontend, Backend & Database, DevOps & Tools).

7. **`education.ts`**
   - Configured your Bachelor of Engineering studies at Thadomal Shahani Engineering College, Mumbai, including your CGPA (9.21) and TSEC Codecell details.

8. **`certifications.ts`**
   - Added your **ISC2 Certified in Cybersecurity (CC)** certification details.

9. **`awards.tsx`**
   - Mapped all your hackathon wins: Need For Code 4.0, Codeissance '25, HackSync '26, Hack Sprint '25 (TSEC), and Code Relay '24 (VJTI).

10. **`timeline.ts`**
    - Rewrote the chronological milestones timeline to highlight your university entry (2023), internships, and hackathon wins through 2026.

11. **`testimonials.tsx`**
    - Replaced the previous author's personal reviews with customized mock professional recommendations representing your internship leads and freelance clients to keep the landing page marquee fully populated and operational.
    - Resolved React duplicate key warnings by appending unique fragment hashes (`#review-1`, `#review-2`, `#review-3`) to profile link objects.

12. **`/game` assets hosting**
    - Created local directories and downloaded all bricks game assets (DepartureMono font, bounce/break/game-over audio clips, ball/paddle image sprites) directly to the local `public/` folder, editing [`constants.ts`](file:///c:/Users/devan/Desktop/Devansh/Coding/Projects/PortfFolio/MinimalPortfolio/src/components/daikanoid/constants.ts) to use local paths, eliminating CORS load failures and game crashes.

---

### C. App configurations and metadata
1. **`src/config/site.ts`**
   - Updated GitHub repository and fallback urls to point to `https://github.com/Devanshnair/MinimalPortfolio` and `https://devanshnair.me`.

2. **`src/app/manifest.webmanifest`**
   - Changed name, short name, and description.
   - Setup dynamic unavatar service link (`https://unavatar.io/github/Devanshnair`) for PWA icons so they dynamically show your real GitHub avatar.

3. **`src/app/layout.tsx`**
   - Updated layout authors/creator metadata parameters to `"Devansh Nair"`.
   - Pointed favicons to the dynamic unavatar service.

4. **`src/app/(llms)/llms.txt/route.ts`**
   - Changed LLM-ready dynamic routes header and description.

5. **`package.json`**
   - Updated repository fields (`git+ssh://git@github.com:Devanshnair/Portfolio-DevanshNair.git`), project homepage (`https://devanshnair.me`), author details (Devansh Nair, `devanshnair.05@gmail.com`), and contributors array.

6. **Open Graph social previews (`src/app/og/`)**
   - Updated SVG logomarks inside the dynamic ImageResponse generators at [`domain/route.tsx`](file:///c:/Users/devan/Desktop/Devansh/Coding/Projects/PortfFolio/MinimalPortfolio/src/app/og/domain/route.tsx) and [`simple/route.tsx`](file:///c:/Users/devan/Desktop/Devansh/Coding/Projects/PortfFolio/MinimalPortfolio/src/app/og/simple/route.tsx) to draw your personal `DN` lettermark.

---

### D. Content cleanup
1. **`src/features/doc/content/blog/`**
   - Deleted all previous author's personal blog files to clear outdated entries.
   - Created a fresh welcome post in `welcome.mdx` written in **sentence-case** format for all headers (e.g. `## Technical highlights`).

---

### E. Spotlight logo (CD to DN conversion and D-only adjustment)
1. **`src/features/portfolio/components/brand-mark-isometric.tsx` & `src/registry/components/spotlight-logo/spotlight-logo.tsx`**
   - **Change**: Reverted the path coordinates of the 3D isometric logo back to their original **"CD"** vectors. Then, we manually removed the SVG paths belonging to the "C" initial and mathematically translated the "D" initial (-166.28px X, +128.00px Y) to the exact spot previously occupied by the "C".
   - **Methodology**: Kept custom component renaming, file renames, and import paths fully intact to prevent code breakage, while ensuring the logo precisely displays just the "D" centered in the viewBox.
2. **Registry Build Compilation**:
   - Ran `pnpm registry:build` to build the shadcn component registry, successfully compiling our updated source paths into the auto-generated transformed files (`registry.json`, `registry-stats.json`, `src/registry/__index__.tsx`, `src/registry/transformed/components/spotlight-logo/`, and `public/r/spotlight-logo.json`).
3. **Verification**:
   - Verified that the codebase remains fully type-safe with `pnpm check-types`.
   - Built the production Next.js site using `pnpm build` with zero compiler warning or bundle errors.
   - Suppressed hydration mismatch warnings on the `<body>` tag in [`layout.tsx`](file:///c:/Users/devan/Desktop/Devansh/Coding/Projects/PortfFolio/MinimalPortfolio/src/app/layout.tsx) using `suppressHydrationWarning` to silence warnings triggered by browser extension DOM changes (e.g. ColorZilla).



---

### F. Spotlight logo — "N" addition to isometric "D" (DN logo)

1. **`src/features/portfolio/components/brand-mark-isometric.tsx` & `src/registry/components/spotlight-logo/spotlight-logo.tsx`**
   - **Change**: Added the letter "N" to the existing 3D isometric "D" logo, creating a full "DN" isometric mark.
   - **Methodology**:
     - Reverse-engineered the custom affine mapping used to lay out the isometric grid:
       `x = -27.21 + col_x * 27.7128 + col_y * 27.7128`, `y = 208.58 + col_x * (-16) + col_y * 16`.
     - Mapped the "N" initial (6 columns wide, matching the 2D `brand-mark.tsx` proportions) into column-space coordinates and extruded each top-face vertex 32 units downward to produce the 3D side and back faces.
     - Constructed the top face, visible side-face extruded panels (for left-facing and bottom-facing edges), and corner strokes for both the `normal` and `pressed` animation states.
     - Added a 2-column gap between "D" and "N" matching the spacing of the 2D `brand-mark.tsx` header logo.
   - **Iterative stroke refinement**:
     - Removed concave inner-corner vertical drops at grid positions `(13,4)` and `(14,6)` that produced an unwanted box artifact in the inner notch of the N.
     - Removed extra inner step bottom edges and an incorrect background grid line.
     - Replaced `M416.19 80.58 V112.58` with a diagonal inner-step stroke `M416.20 80.58L499.33 128.58` (normal) / `M430.00 88.60L499.33 128.58` (pressed) to cleanly connect the diagonal bar of the N to the right column.
   - **ViewBox & gradient**: Updated `viewBox` from `"0 0 556 354"` to `"-5 -26 760 374"` to accommodate the wider DN canvas. Adjusted the radial gradient spotlight range to `cx ∈ [50, 670]` and `cy ∈ [30, 404]`.
   - **Background grid**: Repositioned and tuned the background dotted grid lines to frame both letters cleanly. Final set: `M-477.55 756.57L1254.51 -243.41`, `M977.37 820.58L-754.67 -179.42`, `M977.37 500.58L-754.67 -499.42`.

2. **Registry build compilation**:
   - Ran `pnpm registry:build` after all edits to re-compile both source files into the auto-generated registry outputs (`registry.json`, `src/registry/transformed/components/spotlight-logo/`, `public/r/spotlight-logo.json`).

---

### G. Overview headline & portfolio restructuring

1. **`src/features/portfolio/data/user.ts` & `src/features/portfolio/components/overview/job-item.tsx`**
   - **Change**: Updated the second overview item from a linked company badge to a standalone role & focus headline: `"Software Engineer | Building Scalable Full-Stack & AI Systems"`.
   - **Methodology**: Made `company` and `website` optional in `User['jobs']` and updated `JobItem` so that standalone professional focus entries render with the code/engineer icon without generating empty `@` company links.
   - Updated `vcard/route.ts` to safely check for optional company properties.

2. **Dedicated subpages & navigation**:
   - Updated global navigation and mobile menus to link to dedicated pages: `/experience`, `/projects`, `/hackathons`, and `/blog`.
   - Added category filter tabs (All, Hackathons, Competitive Programming) on the Awards component.


