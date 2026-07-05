/**
 * @file ProtocolPage.jsx
 * @description Shared renderer for the Security, Curation Policy, and Legal
 * Archives pages. Numbered-protocol format matching the site's existing
 * "Protocols • 04" labeling system: mono kicker, serif title, numbered
 * clause blocks with terse trust notes.
 */

import { motion } from 'framer-motion';
import RevealText from './RevealText.jsx';

/**
 * ProtocolPage component.
 * @param {object} props
 * @param {string} props.kicker - Mono protocol label, e.g. "Protocols • 05".
 * @param {string} props.title - Serif page title.
 * @param {string} props.intro - Italic serif introduction line.
 * @param {Array<{heading: string, body: string, note?: string}>} props.sections - Numbered clause blocks.
 * @param {boolean} [props.placeholder=false] - Show the draft-pending-review banner.
 * @returns {React.ReactElement} The rendered page.
 */
export default function ProtocolPage({ kicker, title, intro, sections, placeholder = false }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen w-full bg-void px-5 pb-32 pt-48 md:px-16"
    >
      <div className="mx-auto max-w-[900px]">
        {/* Protocol kicker */}
        <span className="mb-10 block font-mono text-xs uppercase tracking-[0.3em] text-ash">
          {kicker}
        </span>

        {/* Page title */}
        <RevealText
          as="h1"
          className="mb-8 font-serif text-5xl font-normal leading-tight text-bone md:text-7xl"
        >
          {title}
        </RevealText>

        <p className="mb-16 max-w-xl font-serif text-xl italic leading-relaxed text-ash">
          {intro}
        </p>

        {/* Draft banner for content requiring owner/legal review */}
        {placeholder && (
          <div className="mb-16 border border-ember/40 bg-ember/5 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] leading-relaxed text-ember">
              [Placeholder — needs legal review] — This page is drafted copy, not
              executed policy. Returns, warranty, and liability terms are binding
              commitments; review and approve before publication.
            </p>
          </div>
        )}

        {/* Numbered protocol clauses */}
        <div className="border-t border-ash/10">
          {sections.map((section, index) => (
            <section
              key={section.heading}
              className="grid grid-cols-1 gap-4 border-b border-ash/10 py-12 md:grid-cols-12 md:gap-8"
            >
              <span className="font-mono text-sm tracking-[0.3em] text-ember md:col-span-2">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="flex flex-col gap-5 md:col-span-10">
                <h2 className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-bone">
                  {section.heading}
                </h2>
                <p className="max-w-2xl leading-relaxed text-ash/80">{section.body}</p>
                {section.note && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/80">
                    {section.note}
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Return link */}
        <a
          href="#hero"
          className="magnetic mt-16 inline-flex min-h-[44px] items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-ash transition-colors duration-300 hover:text-bone"
        >
          <span aria-hidden="true">&larr;</span> Return to the Monolith
        </a>
      </div>
    </motion.main>
  );
}
