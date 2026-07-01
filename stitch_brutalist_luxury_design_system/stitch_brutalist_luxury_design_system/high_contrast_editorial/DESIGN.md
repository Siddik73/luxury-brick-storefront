---
name: High-Contrast Editorial
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
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
  secondary: '#ffb4a2'
  on-secondary: '#621100'
  secondary-container: '#ff562d'
  on-secondary-container: '#560d00'
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
  secondary-fixed: '#ffdad2'
  secondary-fixed-dim: '#ffb4a2'
  on-secondary-fixed: '#3d0700'
  on-secondary-fixed-variant: '#8a1c00'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-xl:
    fontFamily: Playfair Display
    fontSize: clamp(4rem, 10vw, 8rem)
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-h1:
    fontFamily: Playfair Display
    fontSize: 4rem
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-h2:
    fontFamily: Playfair Display
    fontSize: 2.5rem
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-h3:
    fontFamily: Playfair Display
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: '1.6'
    letterSpacing: 0.05em
  numeric-md:
    fontFamily: JetBrains Mono
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: -0.02em
  numeric-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0em
spacing:
  unit: 4px
  container-max: 1440px
  gutter: 32px
  margin-desktop: 64px
  margin-mobile: 24px
  stack-lg: 80px
  stack-md: 40px
  stack-sm: 16px
---

## Brand & Style
The design system embodies an "Editorial Luxury" aesthetic, blending the precision of high-end fashion journalism with a modern, high-contrast digital edge. The brand personality is authoritative, sophisticated, and uncompromising. It targets a premium audience that values clarity and bold visual statements.

The style is **High-Contrast / Bold** with a focus on dramatic typography and vast whitespace. It utilizes a "Void Black" foundation to allow "Ember Red" accents to vibrate with intensity. The interface should feel like a premium printed monograph—structured, spacious, and deliberate.

## Colors
The palette is built on **Void Black (#000000)** as the primary canvas, creating an infinite depth that allows content to recede or pop forward. **Ember Red (#FF3B00)** serves as the high-energy secondary color, used exclusively for critical calls to action, active states, and essential brand moments. 

A tertiary dark gray (#1A1A1A) provides subtle separation for containers, while the neutral white (#F5F5F5) is used for maximum legibility of body text against the dark backdrop.

## Typography
The typographic hierarchy is the core of this design system. It uses three distinct font families to create a narrative flow:
- **Playfair Display** provides an elegant, high-contrast serif for headings. The oversized H1 (Display XL) is the signature element, creating a dramatic entry point.
- **Inter** handles all long-form reading and functional UI text, ensuring maximum readability and a clean, modernist feel.
- **JetBrains Mono** is utilized strictly for technical data, prices, and specs, lending a precise, "engineered" quality to the luxury aesthetic.

Maintain tight leading on headlines to emphasize their structural density, while keeping body text airy with a 1.6 line-height.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to maintain the integrity of white space, transitioning to a fluid model on smaller devices. 

- **Desktop:** 12-column grid, 1440px max width, 32px gutters, and generous 64px outer margins.
- **Tablet:** 8-column grid, 32px margins.
- **Mobile:** 4-column grid, 24px margins.

Spacing is aggressive. Vertical "stacks" should be used to separate content blocks, with 80px (stack-lg) between major editorial sections to allow the typography to breathe.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** and sharp contrast rather than traditional shadows. 
- **Level 0 (Base):** Void Black (#000000).
- **Level 1 (Cards/Surface):** Ember Black (#1A1A1A).
- **Level 2 (Modals/Popovers):** Ember Black with a 1px solid border of #333333.

Shadows are avoided to maintain the flat, editorial feel. Instead, use thin, high-contrast outlines (1px) to define boundaries where necessary.

## Shapes
This design system utilizes **Sharp (0)** roundedness. All UI elements—buttons, cards, inputs, and images—must have 0px corner radii. This reinforces the brutalist, architectural nature of the brand. Lines should be crisp and intersections should be precise.

## Components
- **Buttons:** Rectangular, sharp corners. Primary buttons are Ember Red with White text. Secondary buttons are Ghost-style (Void Black background, 1px White border).
- **Inputs:** Underlined or fully boxed with a 1px #333333 border. Focus state switches border to Ember Red. Labels use Inter Bold at 12px, uppercase.
- **Chips:** Small, sharp-edged blocks using JetBrains Mono for a "tag" or "serialized" look.
- **Cards:** No shadows. Use background-color (#1A1A1A) to differentiate from the base.
- **Lists:** Separated by 1px solid dividers in #1A1A1A. Use JetBrains Mono for list numbering to emphasize sequence.
- **Imagery:** Use high-contrast photography. Images should always be sharp-edged; never use rounded corners on media.