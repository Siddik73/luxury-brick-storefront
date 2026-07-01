/**
 * @file Footer.jsx
 * @description Site footer component featuring a 3-column layout (Brand info,
 * navigational anchors, and legal terms) plus a pretentious email subscription input.
 */

import React from 'react';
import { COPY_TEXT } from '../utils/constants.js';

/**
 * Footer component.
 * @returns {React.ReactElement} The rendered section.
 */
export default function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    // TODO: Connect mailing list dispatch hook or transaction logger
    alert('Credentials registered. Archival alerts initialized.');
  };

  return (
    <footer className="w-full border-t border-ash/10 bg-void px-5 py-20 md:px-16">
      <div className="mx-auto max-w-[1440px] grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
        
        {/* Column 1: Brand Info */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="font-serif text-3xl uppercase tracking-tighter text-bone">The Monolith</div>
          <p className="max-w-xs font-serif text-sm italic leading-relaxed text-ash/60">
            "A singular manifestation of architectural silence and refined geometry."
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="md:col-span-3 flex flex-col gap-4 font-mono text-[10px] uppercase tracking-widest text-ash">
          <span className="font-bold text-bone mb-2">Navigation</span>
          <a href="#hero" className="hover:text-bone transition-colors duration-300">Top</a>
          <a href="#provenance" className="hover:text-bone transition-colors duration-300">Provenance</a>
          <a href="#specs" className="hover:text-bone transition-colors duration-300">Specifications</a>
          <a href="#playground" className="hover:text-bone transition-colors duration-300">Playground</a>
        </div>

        {/* Column 3: Pretentious Newsletter Subscription */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-bone">Archival Alerts</span>
          <p className="font-sans text-xs text-ash/60 leading-relaxed mb-2">
            Receive exclusive dispatches detailing upcoming geological curation phases.
          </p>
          <form onSubmit={handleSubscribe} className="flex border-b border-ash/30 focus-within:border-bone transition-colors duration-300 py-2">
            <input
              type="email"
              required
              placeholder="ENTER CREDENTIALS"
              className="w-full bg-transparent font-mono text-xs uppercase tracking-widest text-bone placeholder-ash/30 outline-none border-none py-1"
            />
            <button
              type="submit"
              className="font-mono text-xs uppercase tracking-widest text-ash hover:text-bone transition-colors duration-300 px-2"
            >
              Submit
            </button>
          </form>
        </div>

      </div>

      {/* Row 2: Legal Details and Copyright */}
      <div className="mx-auto max-w-[1440px] border-t border-ash/10 mt-16 pt-8 flex flex-col gap-6 justify-between font-mono text-[9px] uppercase tracking-widest text-ash/40 md:flex-row">
        <p>{COPY_TEXT.FOOTER_COPYRIGHT}</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-bone/80 transition-colors duration-200">Security</a>
          <a href="#" className="hover:text-bone/80 transition-colors duration-200">Curation Policy</a>
          <a href="#" className="hover:text-bone/80 transition-colors duration-200">Legal Archives</a>
        </div>
      </div>
    </footer>
  );
}
