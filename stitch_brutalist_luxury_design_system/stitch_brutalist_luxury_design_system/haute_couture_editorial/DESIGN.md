---
name: Haute Couture Editorial
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#cfc4c5'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#988e90'
  outline-variant: '#4c4546'
  surface-tint: '#c6c6c6'
  primary: '#c6c6c6'
  on-primary: '#303030'
  primary-container: '#000000'
  on-primary-container: '#757575'
  inverse-primary: '#5e5e5e'
  secondary: '#ffb4a8'
  on-secondary: '#690100'
  secondary-container: '#ff5540'
  on-secondary-container: '#5c0000'
  tertiary: '#c8c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#000000'
  on-tertiary-container: '#767575'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#ffdad4'
  secondary-fixed-dim: '#ffb4a8'
  on-secondary-fixed: '#410000'
  on-secondary-fixed-variant: '#930100'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 80px
    fontWeight: '400'
    lineHeight: 90px
    letterSpacing: -0.02em
  headline-intro:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 52px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  body-lg:
    fontFamily: Source Serif 4
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Source Serif 4
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 28px
  technical-marker:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
  label-standard:
    fontFamily: Source Serif 4
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
spacing:
  section-gap: 12rem
  container-padding: 4rem
  gutter: 2rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
  stack-lg: 3rem
---

## Brand & Style

This design system shifts away from raw utility toward the sophisticated atmosphere of a high-end fashion house. The brand personality is enigmatic, authoritative, and uncompromisingly elegant, evoking the quiet confidence of a luxury gallery.

The aesthetic blends **Minimalism** with **Editorial** influences. It prioritizes vast negative space, razor-sharp alignment, and high-contrast visuals. The goal is to create a "mystery" through restraint—where what is left out is as important as what is included. Expect heavy whitespace, cinematic imagery, and a dramatic tension between classical serif typography and occasional technical markers.

## Colors

The palette is restricted to a triad of power: **Void Black**, **Ember Red**, and **Pure White**.

- **Void Black (#000000):** The foundational canvas. It provides the "mystery" and depth required for a high-end editorial feel.
- **Ember Red (#FF0000):** Used with extreme surgical precision for critical actions, active states, or brand signatures.
- **Pure White (#FFFFFF):** Reserved for primary typography and essential iconography to ensure maximum legibility against the dark void.
- **Tonal Black (#1A1A1A):** Used for subtle layering and container separation without breaking the immersion of the dark mode.

## Typography

Typography is the primary vehicle for the "Haute Couture" narrative. 

- **Primary Serif:** Source Serif 4 provides a scholarly and premium feel for long-form reading and standard labels. The base body size is elevated to 18px to command more screen real estate and improve the reading rhythm.
- **Editorial Flourish:** Playfair Display (Italic) is mandatory for all section introductions, secondary narrative headlines, and pull quotes. This introduces a sense of human craft and "flair" against the rigid layout.
- **Technical Markers:** JetBrains Mono is used exclusively for non-narrative data: prices, coordinates, section numbers (e.g., 01, 02), and technical specs. It should never be used for general UI labels or buttons.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy with exaggerated margins to evoke the feel of a printed luxury lookbook.

- **Negative Space:** Major sections are separated by a minimum of 12rem (192px) of vertical space. This "breathable" air is essential to the gallery atmosphere.
- **Grid:** A 12-column grid is used for desktop, but content often sits off-center or spans asymmetric column groups (e.g., spanning columns 3 through 10) to create a more curated, less "templated" appearance.
- **Responsive Adaptations:** On mobile, the 12rem gaps scale down to 6rem. Container padding remains generous (min 2rem) to ensure elements never feel crowded by the screen edges.

## Elevation & Depth

In this design system, depth is achieved through **Tonal Layers** and **Void Shadows**, rather than traditional elevation.

- **Flat Surfaces:** Most containers should have no visible border or shadow, relying on the contrast between Void Black and Tonal Black to define boundaries.
- **Hard Edges:** When separation is required, use ultra-thin (0.5px to 1px) lines in Tonal Black or Ember Red.
- **No Blurs:** Avoid glassmorphism or soft blurs. The aesthetic should feel sharp, crisp, and physical.
- **Spotlights:** Use subtle radial gradients (Ember Red at 5% opacity) behind hero products to create a "stage lighting" effect.

## Shapes

The shape language is strictly **Sharp (0)**. 

Every UI element—from buttons and input fields to image containers and hover states—must use 90-degree angles. This geometric rigidity reinforces the architectural, "Couture" nature of the design system. Rounded corners are prohibited as they introduce a softness that conflicts with the high-fashion authority of the brand.

## Components

- **Buttons:** Large, rectangular blocks with a Void Black fill and a 1px White border. Text is set in Source Serif 4 (Uppercase). On hover, the background transitions to Ember Red.
- **Technical Markers:** Section numbers or prices use JetBrains Mono, positioned often in the top-left or bottom-right of a container as a "tag."
- **Input Fields:** A single 1px White bottom border. No background fill. Labels sit above the line in Source Serif 4 (Small Caps).
- **Cards:** No borders or shadows. Cards are defined by the imagery they contain. Text overlays should use Playfair Display Italic for the title and a Technical Marker for the category.
- **Navigation:** Minimalist top bar with wide tracking between items. Active states are indicated by an Ember Red dot (2px) beneath the label.
- **Section Dividers:** Horizontal lines spanning the full container width, 1px thickness, Tonal Black (#1A1A1A).