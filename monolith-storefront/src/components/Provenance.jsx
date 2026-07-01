/**
 * @file Provenance.jsx
 * @description Story section detailing the geological and thermal creation of
 * the product. Features a visual vertical progress timeline linked to scroll position.
 */

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealText from './RevealText.jsx';
import { SECTION_IDS, PROVENANCE_STORY } from '../utils/constants.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * Provenance component (The Scroll Story).
 * @returns {React.ReactElement} The rendered section.
 */
export default function Provenance() {
  const containerRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    // TODO: Implement ScrollTrigger scroll-driven progress line scaling.
    // 1. Link progressLineRef scaleY (origin top) from 0 to 1 as the user scrolls
    //    from the top to the bottom of containerRef.
    // 2. Animate paragraph elements (provenance-text) entry as they scroll into view.

    const ctx = gsap.context(() => {
      // Scale progress indicator line on scroll
      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        }
      );

      // Reveal text block translations on entry
      const textBlocks = gsap.utils.toArray('.provenance-text-block');
      textBlocks.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={SECTION_IDS.PROVENANCE}
      ref={containerRef}
      className="relative w-full border-t border-ash/20 bg-void py-16"
    >
      {/* Scroll-driven Progress Line (Desktop only) */}
      <div className="pointer-events-none absolute left-5 top-0 bottom-0 hidden w-px bg-ash/20 md:left-16 md:block">
        <div
          ref={progressLineRef}
          className="h-full w-full origin-top bg-ember"
          style={{ transform: 'scaleY(0)' }}
        />
      </div>

      <div className="mx-auto max-w-[1440px]">
        {PROVENANCE_STORY.map((story, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={story.step}
              className="relative flex min-h-screen w-full items-center py-24"
            >
              <div className="container mx-auto grid grid-cols-1 gap-12 px-5 md:grid-cols-12 md:px-16">
                
                {/* Content Block */}
                <div
                  className={`provenance-text-block order-1 flex flex-col justify-center md:col-span-5 ${
                    isLeft ? 'md:col-start-2' : 'md:order-2 md:col-start-8'
                  }`}
                >
                  <p className="mb-6 flex items-center gap-4 font-mono text-sm tracking-[0.3em] text-ash">
                    <span className="text-ember">{story.step}</span>
                    <span className="h-px w-12 bg-ash/20" />
                  </p>
                  
                  <RevealText
                    as="h2"
                    className="mb-8 font-serif text-3xl font-normal tracking-tight text-bone md:text-5xl"
                  >
                    {story.title}
                  </RevealText>
                  
                  <p className="mb-8 font-serif text-xl italic leading-relaxed text-ash">
                    "{story.tagline}"
                  </p>
                  
                  <p className="max-w-md leading-relaxed text-ash/70">
                    {story.body}
                  </p>
                </div>

                {/* Media/Visual Placeholder Block */}
                <div
                  className={`order-2 flex items-center justify-center md:col-span-6 ${
                    isLeft ? 'justify-end' : 'md:order-1 justify-start'
                  }`}
                >
                  <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden bg-onyx border border-ash/10">
                    <div className="absolute inset-0 bg-gradient-to-tr from-void via-onyx to-[#222]" />
                    <div className="pointer-events-none absolute bottom-6 right-6 font-mono text-[9px] uppercase tracking-widest text-ash/30">
                      Archive Ref: 0{story.step}-V1
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
