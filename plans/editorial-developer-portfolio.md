# Editorial Developer Portfolio — Implementation Plan

**Plan file:** `C:\Codes\Portfolio_New\plans\editorial-developer-portfolio.md`
**Target codebase:** `C:\Codes\Portfolio_New` (Next.js 16 + Tailwind v4 + TypeScript)
**Goal:** Transform existing dark/neon/CRT portfolio into premium editorial portfolio per brief.

## User-Confirmed Decisions
- Personal content will be supplied for `TODO` placeholders in `lib/data.ts` (nothing fabricated).
- Keep `/Awards` as separate page; add to navbar for access.
- Deploy target: Vercel (post-MVP).
- Portfolio replaces no existing app — `C:\Codes\Portfolio_New` IS the portfolio codebase.

## Current State (assessed)

**Stack:** Next.js 16 (static export, `trailingSlash: true`), Tailwind v4, TypeScript, framer-motion, lucide-react, shadcn/ui, next/image, ESLint.

**Good:** Centralized `lib/data.ts`, typed `types/index.ts`, reusable `components/sections/`, `public/images/`, framer-motion + lucide-react installed.

**Problems vs. brief:**
- Dark bg `#0C0C0A` → needs warm off-white `#F5F3EE`
- Neon green `#C8F04D` → needs burnt orange `#C65D36`
- Crimson Pro serif headings → needs editorial sans-serif (Geist/Inter)
- IBM Plex Mono body → body should be readable sans-serif; mono for metadata only
- CRT scanlines, side rays, border glows, phosphor grids, terminal previews → remove
- Sidebar rail + mobile bottom nav → needs sticky top nav with wordmark
- Missing: Open Source section, Currently Building section, 7-category Toolkit

## Decisions

1. **Stack preserved:** Next.js 16 + Tailwind v4 + TypeScript + framer-motion (sparingly) + lucide-react.
2. **Typography:** Geist Sans (headings + body) + IBM Plex Mono (metadata, labels, tech stacks). Load via `next/font/google`.
3. **Color system:** CSS variables in `globals.css`: `#F5F3EE` bg, `#171717` text, `#77746E` muted, `#D9D6CF` borders, `#C65D36` accent. No dark mode for MVP.
4. **Navigation:** Sticky top Nav (wordmark + About, Projects, Experience, Open Source, Contact, Awards), subtle bottom border, smooth scroll, active-section via Intersection Observer, mobile hamburger overlay.
5. **Sections:** Hero → About → Selected Projects → Technical Toolkit (7 categories) → Experience & Achievements → Open Source → Currently Building → Contact. Remove Work/Stack/TechStack.
6. **Images:** `next/image` lazy loading, graceful fallback when missing. Project screenshots in `public/images/projects/`.
7. **Content:** All in `lib/data.ts`. Replace AI-generated phrasing. `TODO` placeholders for unknowns — nothing fabricated.
8. **Awards page:** Keep `/Awards` separate, link from navbar.

## 5-Step Plan

### Step 1 — Design system & color tokens
- Rewrite `app/globals.css`: remove CRT/scanline/side-ray/border-glow/phosphor styles; define editorial CSS variables; Geist Sans + IBM Plex Mono font vars; typographic scale; `prefers-reduced-motion` handling; reset.
- Update `app/layout.tsx`: Geist Sans + IBM Plex Mono via `next/font/google`; `bg-[#F5F3EE]` text-[#171717]` on body; remove dark-mode class logic.
- Update `tailwind.config.ts` / `@theme` for editorial colors/fonts.
- Run `npm run typecheck` and `npm run lint`.

### Step 2 — Centralized content config (`lib/data.ts`)
- Rewrite `profileMetadata` (name, email, bio, socials, location, focus, availability — specific, non-AI phrasing).
- Rewrite `projects[]` (name, description, category, stack, year, github, live, image path, varied proportions).
- Add `toolkit[]` with 7 categories.
- Rewrite `experience[]` (chronological with dates, org, role, description).
- Add `openSource[]` (real data from `achievements.json` + GitHub links).
- Add `currentlyBuilding[]` and `contact[]`.
- Mark unknowns as `TODO` — no fabrication.

### Step 3 — Navigation + sections
- Create `components/Nav.tsx`: sticky top nav, wordmark, links (About, Projects, Experience, Open Source, Contact, Awards), subtle border, active indication, mobile hamburger.
- Rewrite `Hero.tsx`: status pill, intro, large heading, CTA buttons, location/focus. Remove SideRays/CRT.
- Rewrite `About.tsx`: two-column editorial layout.
- Rewrite `Projects.tsx` + `ProjectCard.tsx`: editorial grid, varied proportions, hover image scale, remove BorderGlow/CRT.
- Create `Toolkit.tsx`: 7 categorized typographic lists.
- Rewrite `Experience.tsx`: chronological timeline with certifications.
- Create `OpenSource.tsx`, `CurrentlyBuilding.tsx`.
- Rewrite `Contact.tsx`: invitation + email/github/linkedin/resume.
- Compose in `app/page.tsx` with `id` anchors; remove Sidebar/Footer from layout.

### Step 4 — Interactions & responsiveness
- CSS fade-in entrances (framer-motion `whileInView` with `useSafeReducedMotion` bypass).
- Link underline transitions, hover states (accent), project image scale on hover.
- Scroll spy for active nav link; sticky nav; `scroll-margin-top`.
- Responsive: desktop grid, tablet two-column, mobile single column, clamped headings, no horizontal overflow.
- `next/image` lazy loading with width/height.

### Step 5 — Verification & cleanup
- `npm run lint`, `npm run typecheck`, `npm run build`, `npm run dev` — all clean.
- Verify: no console errors, no broken links, all images load + alt text, responsive breakpoints, `prefers-reduced-motion`, keyboard nav.
- Remove all placeholders/lorem; confirm real specific content.
- Cross-check against design philosophy (no gradients, glassmorphism, glowing borders, floating animations, etc.).

## Risks
- **Content authenticity:** User will supply real personal content; agent must NOT invent values.
- **Project screenshots:** `public/images/projects/` may not exist — graceful typographic fallback.
- **Tailwind v4 CSS-first:** use `@import "tailwindcss"` + `@theme` in `globals.css`.

## Validation
- Lint: `npm run lint` → clean.
- Typecheck: `npm run typecheck` → clean.
- Build: `npm run build` → clean.
- Dev: `npm run dev` → loads without console errors.
- QA: links, images, alt text, breakpoints, reduced-motion, keyboard nav, placeholder sweep, design-philosophy cross-check.