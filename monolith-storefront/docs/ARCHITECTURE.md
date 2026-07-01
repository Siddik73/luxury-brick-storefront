# 🏗️ Architecture

**Project:** The Monolith
**Type:** Static, client-side single-page application (no backend)

## 📑 Table of Contents

- [1. High-Level System Diagram](#1-high-level-system-diagram)
- [2. Tech Stack Breakdown](#2-tech-stack-breakdown)
- [3. Component Hierarchy](#3-component-hierarchy)
- [4. Data Flow & State Management](#4-data-flow--state-management)
- [5. Key Design Decisions & Rationale](#5-key-design-decisions--rationale)
- [6. Performance Considerations](#6-performance-considerations)
- [7. Browser Compatibility Matrix](#7-browser-compatibility-matrix)
- [8. Future Scalability Notes](#8-future-scalability-notes)

---

## 1. High-Level System Diagram

There is no backend, no database, and no API layer — this is a fully static bundle served from a CDN. The only network calls at runtime are to third-party services (Google Fonts, the Spline scene host).

```text
┌─────────────────────────────────────────────────────────────────┐
│                           Browser                                │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                     index.html                              │  │
│  │  (preconnect hints, font <link>, favicon, meta tags)         │  │
│  └───────────────────────────┬───────────────────────────────┘  │
│                               │ mounts                            │
│  ┌───────────────────────────▼───────────────────────────────┐  │
│  │                    React App (src/App.tsx)                  │  │
│  │                                                               │  │
│  │  ┌─────────────┐   ┌───────────────────────────────────┐   │  │
│  │  │ MagneticCursor│  │        #smooth-wrapper              │   │  │
│  │  └─────────────┘   │  (GSAP ScrollSmoother root)          │   │  │
│  │                     │  ┌─────────────────────────────┐   │   │  │
│  │                     │  │  Hero → Provenance → Specs   │   │   │  │
│  │                     │  │  → Playground (lazy) →       │   │   │  │
│  │                     │  │  Checkout → Footer            │   │   │  │
│  │                     │  └─────────────────────────────┘   │   │  │
│  │                     └───────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────┬──────────────────────┬────────────────────┘
                       │                      │
                       ▼                      ▼
          ┌─────────────────────┐  ┌───────────────────────────┐
          │ fonts.googleapis.com │  │ Spline scene host          │
          │ fonts.gstatic.com    │  │ (prod.spline.design/...)   │
          │ (Playfair Display,   │  │ lazy-loaded, desktop only  │
          │  Inter, JetBrains    │  │ — swapped for a static      │
          │  Mono)                │  │  <img> on touch devices     │
          └─────────────────────┘  └───────────────────────────┘
```

Build-time, the pipeline is:

```text
src/*.tsx, src/*.ts, src/styles/*.css
        │
        ▼
  tsc -b (type-check)
        │
        ▼
  vite build (Rollup under the hood)
        │
        ▼
  dist/  →  static host (Netlify, per README badges)
```

## 2. Tech Stack Breakdown

| Layer | Technology | Notes |
| --- | --- | --- |
| **Framework** | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | Function components + hooks only, no class components |
| **Build tool** | [Vite 6](https://vitejs.dev/) | Dev server + Rollup-based production bundler |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) | Semantic color tokens defined in [`tailwind.config.js`](../tailwind.config.js) (`void`, `ember`, `bone`, `ash`, `gold`, `onyx`) |
| **Animation** | [GSAP 3](https://gsap.com/) (`ScrollTrigger`, `ScrollSmoother`) | Scroll-linked reveals, parallax, and momentum scrolling |
| **3D** | [Spline](https://spline.design/) via `@splinetool/react-spline` | Lazy-loaded interactive brick scene in the Hero |
| **Physics** | [Matter.js](https://brm.io/matter-js/) | Drives the drag-and-collide brick sandbox in [`Playground.tsx`](../src/components/Playground.tsx) |
| **Audio** | Native Web Audio API | No library — see [`src/utils/sound.ts`](../src/utils/sound.ts) |
| **Linting/Formatting** | ESLint 8 (legacy config) + Prettier | Config in [`.eslintrc.cjs`](../.eslintrc.cjs) / [`.prettierrc.json`](../.prettierrc.json) |
| **CI** | GitHub Actions | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) — checkout, install, lint, build on every push/PR to `main` |
| **Deployment** | Static hosting (Netlify) | No server-side rendering; `dist/` is deployed as-is |

## 3. Component Hierarchy

```text
main.tsx
└── App.tsx
    ├── MagneticCursor              (fixed, renders null on touch)
    ├── <nav>                        (inline in App.tsx — not extracted)
    └── #smooth-wrapper / #smooth-content   (GSAP ScrollSmoother DOM anchors)
        └── <main>
            ├── Hero                (isTouch prop)
            │   └── RevealText      (as="h1")
            │   └── Spline          (lazy, desktop only) | <img> fallback (touch)
            ├── Provenance
            │   └── RevealText      (as="h2", one per story block)
            ├── Specs
            │   └── RevealText      (as="h2")
            ├── Playground          (lazy-loaded via React.lazy + Suspense)
            └── Checkout
                └── RevealText      (as="h1")
        └── Footer
```

**Parent → child prop flow:**

- `App.tsx` owns `isTouch` (detected once via `matchMedia('(pointer: coarse)')`) and passes it down to `MagneticCursor` and `Hero` — the only two components that need to branch behavior for touch devices.
- `RevealText` ([`src/components/RevealText.tsx`](../src/components/RevealText.tsx)) is a shared, polymorphic component (`as="h1" | "h2"`) reused by `Hero`, `Provenance`, `Specs`, and `Checkout` for the word-by-word scroll reveal animation — it has no dependency on any parent's state beyond its `children` and `as` props.
- `Playground` is fully self-contained: it owns its own Matter.js engine instance and imports `sound.ts` directly; it receives no props from `App.tsx`.

## 4. Data Flow & State Management

There is **no global state library** (no Redux, Zustand, Context API for app state) — state is intentionally minimal and local:

| State | Owner | Mechanism |
| --- | --- | --- |
| `isTouch` | `App.tsx` | `useState` + `matchMedia` listener, passed as props |
| `isHovering` (cursor glow) | `MagneticCursor.tsx` | Local `useState`, driven by DOM `mouseenter`/`mouseleave` on `.magnetic` elements |
| ScrollSmoother / ScrollTrigger instances | `App.tsx`, individual section components | Refs (`useRef`) + imperative GSAP API calls inside `useEffect`, not React state — GSAP manages its own internal state and mutates the DOM directly |
| Matter.js physics world | `Playground.tsx` | Refs holding the `Engine`/`Render`/`Runner` instances; physics state lives entirely inside Matter.js, outside React's render cycle |
| Web Audio `AudioContext` | `sound.ts` | Module-level singleton, lazily constructed on first call |

This is a deliberate choice: nearly all of the "state" in this app is animation and physics state that GSAP and Matter.js already manage internally and imperatively. Wrapping that in React state would mean fighting two different reconciliation models (React's virtual DOM vs. GSAP's/Matter's direct DOM and canvas manipulation) for no benefit — see [Section 5](#5-key-design-decisions--rationale) below.

## 5. Key Design Decisions & Rationale

- **Refs + imperative GSAP/Matter calls instead of React state for animation.** Animation libraries like GSAP and physics engines like Matter.js are built around direct, high-frequency mutation of the DOM/canvas (60fps). Routing that through `setState` would trigger unnecessary re-renders and fight the libraries' own render loops. Instead, `useRef` + `useEffect` is used to hand DOM nodes to GSAP/Matter once, and let them own subsequent updates.

- **`isTouch` detected once in `App.tsx`, passed down as a prop, not re-detected per component.** Both `ScrollTrigger.isTouch` (used for ScrollSmoother) and `matchMedia('(pointer: coarse)')` (used for the cursor/Hero fallback) are cheap checks, but centralizing the detection avoids each component running its own listener and keeps the "what counts as touch" definition consistent across the app.

- **`Spline` and `Playground` are both lazy-loaded via `React.lazy()` + `Suspense`.** Confirmed via `npm run build`: the Spline runtime and Matter.js each pull in several hundred KB to 2MB+ of dependencies (WASM physics, gaussian-splat compression, etc.). Splitting them out of the main bundle means the Hero's headline and CTA are interactive long before either heavy dependency finishes downloading — see [`Hero.tsx`](../src/components/Hero.tsx) and [`App.tsx`](../src/App.tsx).

- **3D scene is swapped for a static image on touch devices, not just disabled.** WebGL scenes commonly lag on mobile GPUs; rather than show a blank box or force mobile users to load a scene they can't smoothly interact with anyway, `Hero.tsx` renders a static brick photograph (`src/assets/images/brick-fallback.png`) when `isTouch` is true.

- **`RevealText` is a single shared component rather than four separate implementations.** All scroll-triggered heading reveals (Hero, Provenance, Specs, Checkout) use identical timing, easing, and stagger logic — extracting it once avoids four copies of the same GSAP `ScrollTrigger` boilerplate drifting out of sync.

- **No global state management library.** With state this localized (see [Section 4](#4-data-flow--state-management)), introducing Redux/Zustand/Context would add indirection without solving a real problem. This may need revisiting if the app grows a cart, user accounts, or multi-page routing.

- **ESLint 8 / legacy `.eslintrc.cjs` instead of ESLint 9 flat config.** ESLint 8 is EOL, but was chosen to match the existing config format already in the repo at the time linting was introduced, avoiding an unrelated migration. Tracked as a future cleanup item.

## 6. Performance Considerations

- **Code splitting:** `Spline` and `Playground` are dynamically imported (`React.lazy`), keeping them out of the initial JS payload. Verified via build output — the main bundle dropped from ~377KB to ~289KB after splitting `Playground` alone.
- **Font loading:** Fonts are loaded via `<link rel="preconnect">` + `<link rel="stylesheet">` in `index.html`, *not* a CSS `@import` — `@import` blocks in series and can't be discovered by the browser's preload scanner as early.
- **Reduced motion support:** `src/styles/animations.css` includes a `prefers-reduced-motion` media query that collapses all animation/transition durations to near-zero, and `App.tsx`'s ScrollSmoother setup checks this too.
- **Touch-device ScrollSmoother bypass:** `ScrollSmoother.create()` is skipped entirely when `ScrollTrigger.isTouch` is true, falling back to native momentum scrolling rather than fighting the OS's own scroll physics on mobile.
- **Known cost center:** `src/assets/images/brick-fallback.png` is currently ~7.4MB, unoptimized, and not converted to WebP — this is the single largest opportunity for improvement and is tracked in the [README Roadmap](../README.md#roadmap).
- **Large third-party payloads:** the Spline runtime (~2MB) and Matter.js physics chunk (~2MB) are both lazy and load only when their respective sections are needed, but neither is currently tree-shaken beyond what each library ships by default.

## 7. Browser Compatibility Matrix

| Browser | Desktop | Mobile | Notes |
| --- | --- | --- | --- |
| **Chrome / Edge (Chromium)** | ✅ Fully supported | ✅ Fully supported | Primary development target |
| **Firefox** | ✅ Fully supported | ✅ Fully supported | GSAP/Matter.js both have broad Firefox support |
| **Safari (macOS)** | ✅ Supported | — | WebGL (Spline) performance may vary on older hardware |
| **Safari (iOS)** | — | ✅ Supported via touch fallback | 3D scene replaced with static image (see [Section 5](#5-key-design-decisions--rationale)); ScrollSmoother disabled in favor of native scroll |
| **Samsung Internet** | — | ⚠️ Untested | Expected to work via the same touch-fallback path as iOS Safari, not explicitly verified |
| **Internet Explorer** | ❌ Not supported | ❌ Not supported | Vite's modern output target and CSS custom properties are not IE-compatible; no polyfills are included |

Compatibility is primarily driven by:

- **`matchMedia('(pointer: coarse)')`** — supported in all evergreen browsers, used to gate touch-specific behavior.
- **CSS `backdrop-filter`** (used on the nav) — supported in all evergreen browsers; degrades to a solid background in browsers without support, which is an acceptable fallback.
- **WebGL** (required by Spline) — the primary compatibility risk on desktop; there is currently no non-touch fallback for a desktop browser with WebGL disabled or unavailable.

## 8. Future Scalability Notes

- **Extract inline logic into the placeholder hooks.** `src/hooks/useIsTouch.ts`, `useScrollAnimation.ts`, and `useLazyLoad.ts` currently exist as empty files — the logic they're named for lives inline in `App.tsx`. If more components need touch detection or scroll-linked behavior, extracting these now would prevent duplicated `matchMedia`/GSAP boilerplate.
- **`src/utils/physics.ts` and `constants.ts` are currently empty.** `Playground.tsx` inlines its Matter.js setup (engine, bodies, collision handlers) directly in the component. As the physics sandbox grows (more brick shapes, configurable gravity, a scoring system), that logic should move into `physics.ts`, and shared magic numbers (brick dimensions, colors, price) should move into `constants.ts`.
- **No routing exists yet.** This is a single-page, single-route app. If the project grows to include multiple product pages, a checkout confirmation route, or an admin view, introducing `react-router` (or Next.js, given the PRD's original tech-stack suggestion) would be a bigger structural shift than adding a library — plan for it before it's urgent.
- **No test suite exists.** See [`CONTRIBUTING.md`](../CONTRIBUTING.md#testing-guidelines) — Vitest + React Testing Library is the natural fit given the existing Vite + TypeScript setup.
- **CI currently only verifies the build; it does not deploy.** `.github/workflows/ci.yml` runs lint + build on push/PR but has no deploy step wired to Netlify/Vercel credentials. Formalizing this (with environment secrets) would remove the manual deploy step entirely.
- **No backend today, but the `.env.example` already reserves `VITE_API_URL`.** If a real backend (payments, inventory, a "Certificate of Ownership" flow per the PRD) is introduced, keep client-side state minimal and prefer server-driven state (React Query, SWR, or similar) over expanding local component state further.
