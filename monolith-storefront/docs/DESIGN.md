# 🎨 Design Document

**Project:** Brickhunter
**Aesthetic:** Brutalist Luxury

> This document is preserved as originally written during the design phase. See [`docs/PRD.md`](PRD.md) for the product requirements and [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) for what was actually implemented.

## 📑 Table of Contents

- [2.1 Visual Identity: "Brutalist Luxury"](#21-visual-identity-brutalist-luxury)
- [2.2 Wireframe & Layout Flow](#22-wireframe--layout-flow)
- [2.3 Interaction Design & Motion Strategy](#23-interaction-design--motion-strategy)
- [2.4 Deliverables for Submission Preparation](#24-deliverables-for-submission-preparation)

---

## 2.1 Visual Identity: "Brutalist Luxury"

The aesthetic blends high-fashion editorial design with raw industrial brutalism.

### 🎨 Color Palette

| Role | Color | Hex |
| --- | --- | --- |
| **Background** | Void Black — to make the red pop | `#0A0A0A` |
| **Primary (The Brick)** | Ember Red, with subtle noise texture for realism | `#D83528` |
| **Typography** | Bone White, for high contrast | `#F0F0F0` |
| **Accents** | Muted Gold, for the "luxury" price tags | `#C5A059` |

### 🔤 Typography

| Use | Font |
| --- | --- |
| **Headings** | `Playfair Display` or `Bodoni` (Serif) — evokes history and class |
| **Body** | `Inter` or `Roboto` (Sans-Serif) — clean, technical, and modern |

## 2.2 Wireframe & Layout Flow

### Section 1: The Hero *(0s – 3s)*

- **Visual:** A pitch-black screen. In the center, a hyper-realistic red brick floats slowly, rotating gently. Lighting is moody (chiaroscuro).
- **Action:** User clicks anywhere to "Enter."

### Section 2: The Scroll Story *(3s – 15s)*

- **Visual:** The user scrolls down. As they scroll, the camera zooms in on the brick's texture. Text slides in from the sides with heavy opacity transitions.
- **Text Block 1:** `"Compressed Earth."`
- **Text Block 2:** `"Calcined Fire."`
- **Text Block 3:** `"Timeless Structure."`

### Section 3: The Physics Playground (The Game) *(15s+)*

- **Visual:** A flat-lay camera angle of a construction site or just the ground.
- **Mechanic:** The brick from above drops into this zone.
- **Controls:**
  1. **Left Click + Drag:** Grab and throw the brick.
  2. **Right Click:** Rotate the view (Orbit Controls).
- **Goal:** Try to build a wall — or just cause chaos.

## 2.3 Interaction Design & Motion Strategy

- 🧲 **Cursor:** Custom cursor that acts as a magnetic field. When near the brick, the magnet effect pulls the brick slightly toward the mouse (physics engine integration).
- 📳 **Haptics:** Visual feedback when throwing the brick — the screen shakes slightly on impact.
- 🔊 **Sound Design (Critical):** The prompt to the AI should include adding an `AudioContext`. Every movement of the brick needs a "clay/stone" rustling sound, and every impact needs a heavy bass thud.

## 2.4 Deliverables for Submission Preparation

- 🎤 **Pitch:**

  > "I wanted to see if I could make you fall in love with something you'd normally kick over. Using AI, I built a physics-based luxury brand."

- 🎬 **Video Strategy:** Start the video by throwing the brick in the game first to grab attention, then scroll back to walk through the rest of the experience.
