/**
 * @file constants.js
 * @description Global configuration variables, copywriting content, section anchors,
 * and design specifications for the "Brickhunter" application.
 */

// Anchor section identifier names
export const SECTION_IDS = {
  HERO: 'hero',
  PROVENANCE: 'provenance',
  SPECS: 'specs',
  PLAYGROUND: 'playground',
  CHECKOUT: 'checkout',
  COMMONS: 'commons',
};

// Site Copy Details (Pretentious Luxury Branding Jargon)
export const COPY_TEXT = {
  HERO_TAGLINE: 'Unyielding. Elemental. Absolute.',
  HERO_DESCRIPTION: 'Thermally-cured earthen silicate curated for the modern apex. A singular manifestation of permanence and refined brutalist geometry.',
  
  CHECKOUT_HEADER: 'Acquire the Monolith.',
  CHECKOUT_SUBTEXT: 'One unit. One custodian. No reproductions.',

  FOOTER_COPYRIGHT: '© 2026 Brickhunter. Architectural integrity secured.',
};

// Specifications bento details
export const PRODUCT_SPECS = [
  {
    label: 'Thermal Synthesis',
    value: '1,200°C',
    subtext: 'Solidification point inside continuous active updraft kilns.',
    layout: 'large',
    image: '/images/brick-kiln-fired.webp',
    imageAlt: 'Brick firing kiln at 1,200°C',
  },
  {
    label: 'Mass Index',
    value: '4.2 kg',
    subtext: 'Optimal structural inertia and resistance index.',
    layout: 'large',
    image: '/images/brick-measuring-tool.webp',
    imageAlt: 'Precision measuring tool for brick mass index',
  },
  {
    label: 'Curation Defect Limit',
    value: '0.001%',
    subtext: 'Ultrasonic integrity verification.',
    layout: 'small',
    image: '/images/brick-quality-inspection.webp',
    imageAlt: 'Ultrasonic quality inspection of brick',
  },
  {
    label: 'Earthen Origin',
    value: '1890',
    subtext: 'Historical silicate riverbed deposits.',
    layout: 'small',
    image: '/images/brick-geological-origin.webp',
    imageAlt: 'Geological origin of silicate riverbed deposits',
  },
  {
    label: 'Projected Life',
    value: '∞ Yrs',
    subtext: 'Guaranteed elemental permanence.',
    layout: 'small',
    image: '/images/brick-aged-patina.webp',
    imageAlt: 'Aged patina showing elemental permanence',
  },
];

// Narrative scroll details
export const PROVENANCE_STORY = [
  {
    step: 1,
    title: 'Compressed Earth.',
    tagline: 'Sourced from mineral-laced ancient deposits. Untouched by modernity.',
    body: 'An elemental convergence of geological time and human precision. Silicon, alumina, and iron oxides are compressed at extreme pressure indexes to eliminate air pockets.',
  },
  {
    step: 2,
    title: 'Calcined Fire.',
    tagline: 'Fired at 1,200°C for seventy-two continuous hours. Hand-verified.',
    body: 'Heat reorganizes crystalline structure. Clay memories are permanently crystallized into a state of structural grace, creating our signature ember glow.',
  },
  {
    step: 3,
    title: 'Timeless Structure.',
    tagline: 'Engineered to outlast its owner. Outlast the architecture.',
    body: 'A quiet protest against the ephemeral trends of digital screens. The Monolith stands as a raw, tangible anchor in a passing world.',
  },
];
