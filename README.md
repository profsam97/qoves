# Qoves

Landing page for **Qoves** — a platform for facial transformation without surgery. Built with high-quality animations, modular architecture, and pixel precision.

🔗 **Live Site:** [www.qoves.io](https://qoves-yyfc.vercel.app)
📦 **Repository:** [github.com](https://github.com/profsam97/qoves.git) 
---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.2.4 | App Router + Turbopack |
| [React](https://react.dev/) | 19.2.4 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | ^5 | Type safety |
| [SCSS Modules](https://sass-lang.com/) | sass ^1.99 | Component-scoped styling (no Tailwind) |
| [GSAP](https://gsap.com/) | ^3.15 | ScrollTrigger + MotionPathPlugin animations |
| [Recharts](https://recharts.org/) | ^3.8.1 | Bell curve data visualization |
| [ESLint](https://eslint.org/) | ^9 | Linting |

**Fonts:** PP Neue Montreal (display) + F37 Zagma Mono (monospace) — self-hosted in `public/assets/fonts/`.

---

## Sections Overview

| # | Section | Component | Status |
|---|---------|-----------|--------|
| 1 | Personalised Plan | `components/PersonalisedPlan/` | ✅ Complete |
| 2 | Facial Analysis | `components/FacialAnalysis/` | ✅ Complete |
| 3 | FAQ | `components/Faq/` | ✅ Complete |
| 4 | Closing | `components/Closing/` | 🟡 In Polish |

Page composition (`app/page.tsx`):

```
<PersonalisedPlan /> → <FacialAnalysis /> → <Faq /> → <Closing />
```

---

## Project Structure

```
app/
  layout.tsx              # Root layout — imports globals.scss
  page.tsx                # Renders all 4 sections in sequence
  globals.scss            # @font-face declarations + CSS reset
  styles/
    _tokens.scss          # Design tokens (colors, fonts, spacing, radii, breakpoints, easings)
    _mixins.scss          # Responsive breakpoints (md/lg/xl), reduced-motion, eyebrow, hairline-y

components/
  PersonalisedPlan/       # Section 1 — eyebrow pill, H1 word stagger, before/after showcase,
                          #   SVG MotionPath connectors, 4 step cards with hover glow
  FacialAnalysis/         # Section 2 — full-bleed gradient bg, 6 glass cards + portrait layout,
                          #   Recharts bell curve, CSS progress bar, GSAP scroll reveals
  Faq/                    # Section 3 — two-level accordion (category → questions), CSS height
                          #   transitions, icon toggling, hardcoded FAQ data
  Closing/                # Section 4 — pinned 2-slide scroll-scrub, bg blur/scale transition,
                          #   dark ↔ light overlay crossfade, glass cards

hooks/
  useIsomorphicLayoutEffect.ts   # SSR-safe useLayoutEffect

lib/
  gsap.ts                 # Registers ScrollTrigger once (client-only guard)

public/assets/
  design/                 # Figma reference screenshots
  fonts/                  # PP Neue Montreal + Zagma Mono
  img/                    # Section imagery (before/after, portraits, card backgrounds)
  icons/                  # FAQ accordion icons (plus, minus, close)
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev        # Turbopack dev server — http://localhost:3000
```

### Production Build

```bash
npm run build      # Production build (verify before deploying)
npm run start      # Serve the production build
```

### Linting

```bash
npm run lint       # ESLint
```

---

## Architecture Highlights

### SCSS Modules — Relative Imports

Turbopack's `sassOptions.includePaths` proved unreliable. All `.module.scss` files use explicit relative paths:

```scss
@use "../../app/styles/tokens" as *;
@use "../../app/styles/mixins" as *;
```

### GSAP Patterns

- All animation code lives in `"use client"` components.
- Plugins are registered at module scope with a `typeof window` guard (or via `@/lib/gsap`).
- Animations use `useIsomorphicLayoutEffect` + `gsap.context(fn, rootRef)` for automatic cleanup (`ctx.revert()` on unmount).
- **`gsap.fromTo()` is always preferred over `gsap.from()`** for ScrollTrigger reveals — `from` can leave invisible inline styles if the trigger fires late.
- Above-the-fold triggers use `start: "top 95%"`; below-the-fold uses `"top 85%"` or `"top 90%"`.

### Component Pattern

Each section follows a **server wrapper → client children** pattern:

```
index.tsx          (server component — static shell)
  └─ Header.tsx    (client — GSAP word-stagger reveals)
  └─ Content.tsx   (client — ScrollTrigger animations, interactivity)
```

### Eyebrow Pill Badge

Reusable pattern across section headers (`.eyebrow` + `.eyebrowInner` with the `@include eyebrow` mixin).

### FAQ Accordion

Two-level state (`openCategory` + `openQuestion`) with CSS `grid-template-rows: 0fr → 1fr` transitions — no GSAP needed for the accordion itself.

---

## What Could Improve

| Area | Detail |
|------|--------|
| **Animation**| the current animation especially for the before and after needs to be worked on, due to the limited timeframe, i was able to complete it. 
| **Accessibility (a11y)** | Add ARIA attributes to the FAQ accordion (`aria-expanded`, `aria-controls`), keyboard navigation, and focus management across interactive components. |
| **SEO & Metadata** | Add Open Graph tags, meta descriptions, and structured data (JSON-LD) for richer search results and social sharing. |
| **Testing** | No test suite currently. Unit tests (Vitest or Jest) and E2E tests (Playwright) would improve confidence in changes. |
| **CI/CD** | Add a GitHub Actions pipeline for automated lint, build, and deploy checks on pull requests. |
| **Dark Mode** | Design tokens in `_tokens.scss` are light-only. A dark palette could be introduced via CSS custom properties or a second token map. |
| **Content Management** | FAQ data is hardcoded in `components/Faq/data.ts`. Moving to a CMS or MDX would make content updates easier for non-developers. |
