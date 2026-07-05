/**
 * @file Specs.jsx
 * @description Specifications component displaying metrics in a responsive, high-contrast Bento Grid layout.
 * Includes interactive cards with hover states and entering transitions.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealText from './RevealText.jsx';
import { SECTION_IDS, PRODUCT_SPECS } from '../utils/constants.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * Specs Bento Grid component.
 * @returns {React.ReactElement} The rendered section.
 */
export default function Specs() {
  const containerRef = useRef(null);

  useEffect(() => {
    // TODO: Create a staggered reveal animation using GSAP for the spec cards.
    // 1. Target class '.spec-card'.
    // 2. Animate opacity from 0 and translateY from 30px to 0.
    // 3. Stagger the entry duration by 0.1s for each card to create flow.

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.spec-card');
      
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={SECTION_IDS.SPECS}
      ref={containerRef}
      className="relative bg-void px-5 py-32 md:px-16"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Editorial Section Header */}
        <RevealText
          as="h2"
          className="mb-24 max-w-4xl font-serif text-4xl leading-tight text-bone md:text-7xl"
        >
          Technical Specifications of Absolute Structuralism.
        </RevealText>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-6">
          {PRODUCT_SPECS.map((spec) => {
            const isLarge = spec.layout === 'large';
            
            return (
              <div
                key={spec.label}
                className={`spec-card group relative flex aspect-square flex-col justify-between overflow-hidden border border-ash/20 bg-onyx p-12 transition-colors duration-500 hover:border-bone ${
                  isLarge ? 'md:col-span-3' : 'md:col-span-2'
                }`}
              >
                {/* Archival photograph layer */}
                {spec.image && (
                  <>
                    <img
                      src={spec.image}
                      alt={spec.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover opacity-35 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-50"
                    />
                    {/* Contrast scrim so label and value stay legible over the photo */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-onyx/75"
                      aria-hidden="true"
                    />
                  </>
                )}

                {/* Metric Label */}
                <span className="relative z-10 font-mono text-xs uppercase tracking-widest text-ash group-hover:text-bone transition-colors duration-300">
                  {spec.label}
                </span>

                {/* Metric Numeric Value */}
                <div className="relative z-10 flex flex-col gap-2">
                  <span className="font-mono text-5xl font-normal tracking-tighter text-ember md:text-7xl">
                    {spec.value}
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-ash/40 group-hover:text-ash/70 transition-colors duration-300">
                    {spec.subtext}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
