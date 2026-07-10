/**
 * @file suppliers.js
 * @description Single source of truth for The Commons supplier network.
 * Both the card carousel and the compact list view read from this file —
 * never hardcode supplier names, districts, or initials in components.
 *
 * PLACEHOLDER SUPPLIER DATA — confirm these are real partner businesses
 * with actual permission to list them before production launch. "Ms New
 * National Bricks Manufacturer" in particular reads as a real, identifiable
 * business name (M/S prefix convention) rather than an invented placeholder —
 * verify a real relationship exists before the VERIFIED STOCKIST badge and
 * capacity/specialty claims go live publicly.
 */

// Common South Asian business-name prefixes (Messrs / M/S / Ms) that should
// not drive the avatar initial — "Ms New National Bricks" initials as the
// business name proper, not the honorific.
const BUSINESS_NAME_PREFIXES = /^(m\/s\.?|ms\.?|messrs\.?)\s+/i;

/**
 * Derive a supplier's avatar initial from its display name, skipping
 * business prefixes ("Ms", "M/S", "Messrs") rather than taking a literal
 * first letter — a literal rule breaks on prefixed names.
 * @param {string} name - Supplier display name.
 * @returns {string} Single uppercase initial.
 */
export function getSupplierInitial(name) {
  const stripped = name.replace(BUSINESS_NAME_PREFIXES, '').trim();
  return (stripped.charAt(0) || name.charAt(0)).toUpperCase();
}

export const SUPPLIERS = [
  {
    id: 'bengal-bricks',
    name: 'Bengal Bricks Ltd.',
    district: 'Savar',
    radius: '30km radius',
    specialty:
      'Premium automated kiln operations with guaranteed high-crushing strength output.',
    capacity: '50K / month',
    image: '/images/suppliers/bengal-bricks-savar.webp',
    imageAlt:
      'Brick kilns and drying fields along the river at Savar, chimneys rising over rows of raw bricks.',
  },
  {
    id: 'delta-materials',
    name: 'Delta Materials',
    district: 'Gazipur',
    radius: '50km radius',
    specialty:
      'Specializing in overburnt (Jhama) materials for structural foundation work.',
    capacity: '25K / month',
    image: '/images/suppliers/delta-materials-gazipur.jpg',
    imageAlt:
      'Workers carrying bricks through stacked kiln yards beneath a tall chimney, in high-contrast monochrome.',
  },
  {
    id: 'ms-new-national-bricks',
    name: 'Ms New National Bricks Manufacturer',
    district: 'Narayanganj',
    radius: 'Nationwide',
    specialty:
      'We specialize in supplying various types of construction bricks and offer customer perks such as free transportation.',
    capacity: 'On request',
    image: '/images/suppliers/ms-new-national-bricks-manufacturer-narayanganj.webp',
    imageAlt:
      'A striped kiln chimney rising over stacked red bricks and drying yards at a Narayanganj brickworks.',
  },
];
