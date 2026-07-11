# Contributing to Brickhunter

First off — thank you for considering a contribution to the most important brick e-commerce platform ever built. Whether you're fixing a typo in a price tag or refactoring the physics engine that lets people throw a $1,250 brick across the screen, every contribution is treated with the same reverence we apply to the brick itself: unyielding, elemental, absolute.

This document exists so that contributing feels as smooth as our ScrollSmoother implementation. Please read it before opening an issue or pull request.

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior as described there.

## How to Report a Bug

Bugs happen — even to load-bearing masonry units. Before opening a new issue:

1. Search [existing issues](../../issues) to check it hasn't already been reported.
2. If it's new, open an issue using the **[Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md)** — it will prompt you for reproduction steps, expected behavior, screenshots, and environment details.
3. Be as specific as possible. "The brick doesn't fall right" is less useful than "bricks spawned in the Playground pass through the ground collider on Firefox 126, Windows 11."

## How to Suggest an Enhancement

Have an idea for making the brick even more unreasonably premium? We want to hear it.

1. Check the [Roadmap](README.md#roadmap) and [existing issues](../../issues) first to avoid duplicates.
2. Open an issue using the **[Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md)**, describing the problem it solves and your proposed solution.
3. For larger changes (new sections, new dependencies, architectural shifts), open the issue for discussion *before* writing code — it saves everyone time.

## Local Development Setup

1. **Fork** the repository and clone your fork:

   ```bash
   git clone https://github.com/<your-username>/luxury-brick-storefront.git
   cd luxury-brick-storefront
   ```

2. **Install dependencies** (Node.js 20+ required):

   ```bash
   npm install
   ```

3. **Create a branch** off `main` (see [Branch Naming](#branch-naming) below):

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Start the dev server**:

   ```bash
   npm run dev
   ```

   The app runs at `http://localhost:5173` with hot module reload.

5. **Make your changes**, then verify the production build still compiles before opening a PR:

   ```bash
   npm run build
   ```

## Pull Request Process

1. Ensure your branch is up to date with `main` and resolves cleanly (`git rebase main` or merge, whichever your team prefers).
2. Confirm `npm run build` passes locally — the CI workflow (`.github/workflows/ci.yml`) will re-run this on every PR.
3. Fill out the **[Pull Request template](.github/PULL_REQUEST_TEMPLATE.md)** completely, including the checklist (local testing, mobile responsiveness, console errors, docs).
4. Keep PRs focused — one feature or fix per PR. Large, sprawling PRs are harder to review and more likely to be asked to split.
5. Link any related issues in the PR description (e.g. `Closes #12`).
6. A maintainer will review, request changes if needed, and merge once approved. Squash-merge is preferred to keep `main`'s history readable.

## Coding Standards

### Linting & Formatting

- **ESLint** and **Prettier** configs are included (`.eslintrc.cjs`, `.prettierrc.json`) and are required for all contributions. Run your editor's ESLint/Prettier integration, or install the CLI tools locally, before committing.
- Code should be free of lint errors and formatted per the project's Prettier config prior to opening a PR.

### Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/). Format:

```text
<type>(<optional scope>): <short description>

[optional body]

[optional footer(s)]
```

Common types:

| Type | Use for |
| --- | --- |
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation-only changes |
| `style` | Formatting, whitespace — no logic change |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | A performance improvement |
| `test` | Adding or correcting tests |
| `chore` | Build process, tooling, or dependency updates |

Examples:

```text
feat(playground): add reset-view button to respawn bricks
fix(hero): correct Spline fallback on touch devices
docs(readme): add architecture link
```

### Branch Naming

Prefix branches by their purpose:

| Prefix | Use for |
| --- | --- |
| `feature/` | New features (e.g. `feature/sound-effects`) |
| `bugfix/` | Non-urgent bug fixes (e.g. `bugfix/cursor-lag`) |
| `hotfix/` | Urgent production fixes (e.g. `hotfix/build-failure`) |

## Style Guide

### Component Naming

- Components are `PascalCase` and one component per file: `Hero.tsx`, `Provenance.tsx`, `MagneticCursor.tsx`.
- The default export of a component file matches the filename exactly.
- Custom hooks are `camelCase`, prefixed with `use`, and live in `src/hooks/`: `useMagneticCursor.ts`, `useIsTouch.ts`.

### File Structure

```text
src/
├── assets/        # Images, fonts, static media
├── components/    # One component per file, PascalCase
├── hooks/         # Reusable hooks, camelCase with `use` prefix
├── styles/        # Global CSS (index.css, animations.css)
├── utils/         # Framework-agnostic helper functions
├── App.tsx        # Root component
└── main.tsx       # Entry point
```

Keep components focused — if a component's animation logic, physics logic, or sound logic grows large, prefer extracting it into `hooks/` or `utils/` rather than letting the component file balloon.

### Tailwind Usage

- Use the project's **semantic color tokens** (`void`, `ember`, `bone`, `ash`, `gold`, `onyx`) defined in `tailwind.config.js` — never raw hex values in component markup.
- Prefer Tailwind utility classes over custom CSS. Reach for `src/styles/animations.css` only for keyframes or pseudo-element styles Tailwind can't express directly (e.g. `::-webkit-scrollbar`).
- Mobile-first: write base (mobile) styles first, then layer on `md:`/`lg:` breakpoints.
- Interactive elements must include `min-h-[44px]` and `touch-manipulation` for touch accessibility, consistent with the existing CTAs.
- Add the `magnetic` class to any element that should be picked up by the custom cursor's hover effect.

## Testing Guidelines

There is currently no automated test suite in this project. Until one is introduced:

- Manually verify your change in the browser at both desktop and mobile viewport widths before opening a PR.
- Check the browser console for errors or warnings introduced by your change.
- If your change touches animation (GSAP), the 3D scene (Spline), or physics (Matter.js), confirm it behaves correctly with `prefers-reduced-motion` enabled and on a touch-emulated device, since these paths have dedicated fallbacks.
- Contributions that introduce a testing framework (Vitest + React Testing Library is a natural fit for this stack) are very welcome — see the [Roadmap](README.md#roadmap).

---

Thank you for helping make Brickhunter unyielding, elemental, and absolute. 🧱
