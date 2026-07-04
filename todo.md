# To-Do List: "The Monolith" Premium Brick Storefront

## Phase 1: Setup & Scaffolding

- [x] **Initialize Version Control:** Run `git init` in the terminal to track changes and provide a rollback safety net before using AI [2].
- [x] **Generate Base App:** Use Claude Code to scaffold a new React + Vite application with Tailwind CSS [3, 4].
- [x] **Apply Global Styles:** Configure Tailwind for a dark mode aesthetic, minimalist fonts, and high-contrast typography to ensure cognitive simplicity [5, 6].

## Phase 2: Hero Section & 3D Integration

- [x] **Build Hero Layout:** Create a striking above-the-fold hero section featuring a bold 3-word tagline [7].
- [x] **Embed Spline Model:** Create a responsive iframe/container and embed the interactive 3D Spline scene of the brick.
- [x] **Test 3D Interactivity:** Ensure the user can drag, click, and spin the brick without layout breakage or lag on both desktop and mobile [8] (now complete with video fallback).

## Phase 3: Luxury Copy & Product Features

- [x] **Add Product Feature Section:** Implement the "Markup Marché" style copy, using absurd, scientific-sounding luxury jargon (e.g., "Thermally-cured earthen silicate") [9, 10].
- [x] **Implement CTA:** Build the frictionless checkout button priced at $1,250 [11].
- [x] **Micro-interactions:** Add subtle hover states to the checkout button to enhance the premium feel [7].

## Phase 4: High-Energy Interactivity (GSAP)

- [x] **Install Dependencies:** Add GSAP to the project (`npm install gsap`).
- [x] **Implement ScrollSmoother:** Apply GSAP's `ScrollSmoother` to hijack native scrolling and make it "buttery smooth" [12, 13].
- [x] **Add ScrollTrigger Animations:** Use `ScrollTrigger` to create a parallax effect and smooth text-reveal animations as the user scrolls from the Hero to the Features section [12].

## Phase 5: Frictionless UX & Performance Testing

- [x] **Speed Check:** Ensure the site loads in under 3 seconds to prevent user drop-off [14].
- [ ] Compress 3D View_Brick.mp4 for web delivery (target <2MB, H.264 codec, 720p max)
- [x] **Mobile Optimization:** Verify that all interactive elements and buttons are easy to tap on mobile devices to remove friction [15].
- [x] **Clean Code Check:** Review the code to ensure no unnecessary plugins or bloated assets are slowing down the experience [16, 17].

## Phase 6: Quality Assurance & Submission

- [x] **Commit & Push:** Commit the final code version and push the repository to GitHub [2].
- [x] **AI Code Review:** Integrate CodeRabbit into the GitHub repository to automatically scan for bugs, edge cases, and vulnerabilities before final deployment [2, 18].
- [ ] **Draft Pitch Doc:** Write the 150-word vision, tools, and prompting style summary.
- [ ] **Record Video Pitch:** Record the maximum 3-minute video showing the intention, AI prompts used, and a live demonstration of the site's interactivity and fluidity.

