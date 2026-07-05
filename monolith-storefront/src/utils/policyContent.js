/**
 * @file policyContent.js
 * @description Content for the Security, Curation Policy, and Legal Archives
 * protocol pages. Written in the site's clipped archival voice. Legal Archives
 * copy is draft placeholder text pending owner/legal review before launch.
 */

export const POLICY_PAGES = {
  security: {
    kicker: 'Protocols • 05',
    title: 'Security.',
    intro:
      'Custody is a discipline. Every transaction, verification, and hand-off is sealed, logged, and archived.',
    placeholder: false,
    sections: [
      {
        heading: 'Transaction Integrity',
        body: 'Payment is processed through PCI-DSS compliant custodial processors. Card credentials never touch Monolith archives. Each settlement is sealed with a unique ledger entry and confirmed to the custodian in writing.',
        note: 'Encrypted in transit. Encrypted at rest.',
      },
      {
        heading: 'Authenticity Verification',
        body: 'Every unit is ultrasonically mapped before dispatch. The internal signature — a unique acoustic profile of the fired clay — is stored in the archive and printed on the accompanying certificate. Hand-verified.',
        note: 'Ultrasonic signature • Certificate MNLTH-S001 series.',
      },
      {
        heading: 'Custody Chain',
        body: 'Dispatch occurs in a sealed crate under tamper-evident wax. Each courier waypoint is logged against the ledger entry. Transfer of custody concludes only upon signature at the destination.',
        note: 'Global priority dispatch. Waypoint-logged.',
      },
      {
        heading: 'Data Restraint',
        body: 'The archive retains only what dispatch requires: a name, an address, a means of contact. Records are never sold, shared, or repurposed. Erasure is available upon written request.',
        note: 'Minimal retention. No third-party disclosure.',
      },
    ],
  },

  'curation-policy': {
    kicker: 'Protocols • 06',
    title: 'Curation Policy.',
    intro:
      'Curation is refusal. Of every firing, almost nothing is selected. This is what selection means.',
    placeholder: false,
    sections: [
      {
        heading: 'Selection Criteria',
        body: 'Silicate purity of the source riverbed deposit. Mass tolerance within ±0.05 kg of the 4.2 kg index. Chromatic band held to the ember-oxide range. Any deviation ends consideration.',
        note: 'Earthen origin: historical silicate riverbed deposits, est. 1890.',
      },
      {
        heading: 'The 0.001% Limit',
        body: 'Each candidate undergoes ultrasonic integrity verification. An internal void, a hairline fracture, an inconsistency of density invisible to the eye — any of these constitutes failure. The curation defect limit is 0.001%. It is not a target. It is a ceiling.',
        note: 'Ultrasonic integrity verification • Continuous active updraft kilns.',
      },
      {
        heading: 'Failure Protocol',
        body: 'Units that fail inspection are not discounted. They are not sold as seconds. They are crushed and returned to the deposit site from which they were drawn. The archive records their existence; the market never sees them.',
        note: 'No seconds. No outlet. Returned to earth.',
      },
      {
        heading: 'One Custodian',
        body: 'One unit. One custodian. No reproductions. Custody may be transferred, but never divided; the ledger recognizes a single name at a time.',
        note: 'Ref: MNLTH-S001.',
      },
    ],
  },

  'legal-archives': {
    kicker: 'Protocols • 07',
    title: 'Legal Archives.',
    intro:
      'The terms that govern acquisition, custody, and recourse. Read before acquiring.',
    placeholder: true,
    sections: [
      {
        heading: 'Terms of Acquisition',
        body: 'Acquisition constitutes acceptance of these terms. Title transfers upon confirmed settlement and signature at destination. The Monolith is an art object; it is not certified for structural use.',
        note: '[PLACEHOLDER — NEEDS LEGAL REVIEW]',
      },
      {
        heading: 'Returns',
        body: 'A unit may be returned within 30 days of custody transfer, provided the tamper-evident seal is unbroken and the crate intact. Return dispatch is arranged by the archive. Settlement is restored upon re-verification of the unit’s ultrasonic signature.',
        note: '[PLACEHOLDER — NEEDS LEGAL REVIEW]',
      },
      {
        heading: 'Warranty of Permanence',
        body: 'The archive guarantees elemental permanence: the unit will not degrade, delaminate, or lose structural integrity under ordinary custodial conditions. The guarantee excludes deliberate percussion, immersion, and structural load.',
        note: '[PLACEHOLDER — NEEDS LEGAL REVIEW]',
      },
      {
        heading: 'Limitation of Liability',
        body: 'Liability is limited to the acquisition price of the unit. The archive is not liable for consequential, incidental, or custodial losses arising after transfer of title.',
        note: '[PLACEHOLDER — NEEDS LEGAL REVIEW]',
      },
      {
        heading: 'Governing Law',
        body: 'These terms are governed by the laws of the jurisdiction in which the archive is registered. Disputes are resolved by binding arbitration at the archive’s registered seat.',
        note: '[PLACEHOLDER — NEEDS LEGAL REVIEW]',
      },
    ],
  },
};
