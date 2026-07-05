/**
 * @file Provenance.jsx
 * @description Story section detailing the geological and thermal creation of
 * the product. Features a visual vertical progress timeline linked to scroll position.
 */

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealText from './RevealText.jsx';
import { SECTION_IDS, PROVENANCE_STORY } from '../utils/constants.js';

gsap.registerPlugin(ScrollTrigger);

// Archive plate photographs per story step (steps without an entry keep the placeholder)
const PROVENANCE_MEDIA = {
  1: {
    src: '/images/brick-clay-raw.webp',
    alt: 'A macro photograph of raw compressed earth clay, showing the layered geological striations of silica, alumina, and iron oxides that form the foundation of The Monolith. The textured surface reveals mineral deposits and sedimentary layers untouched by modernity.',
    refLabel: 'Ref. 01-CLAY',
  },
  2: {
    src: '/images/brick-kiln-fired.webp',
    alt: 'A brick glowing ember-red inside an industrial kiln at 1,200°C, surrounded by radiant heat and firing racks. The intense thermal exposure crystallizes the clay into permanent structural form over seventy-two continuous hours.',
    refLabel: 'Ref. 02-KILN',
  },
  3: {
    src: '/images/brick-structure-analysis.webp',
    alt: 'Structural analysis of premium brick',
    refLabel: 'Ref. 03-STRUCT',
    eager: true,
  },
};

/**
 * ProvenanceImage component — museum-catalog style archive plate.
 * Static photograph with an ember radial glow, corner reference labels,
 * gold hover underline, and a fade-up reveal driven by IntersectionObserver.
 * @param {object} props
 * @param {string} props.src - Web path of the image to display.
 * @param {string} props.alt - Descriptive alt text.
 * @param {string} props.refLabel - Museum catalog reference label (top-left corner).
 * @param {boolean} [props.eager=false] - Load immediately instead of lazily.
 */
function ProvenanceImage({ src, alt, refLabel, eager = false }) {
  const imageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <figure
      ref={imageRef}
      className={`provenance-image-wrapper ${isVisible ? 'is-visible' : ''} relative w-full aspect-[4/3] bg-onyx border border-ash overflow-hidden group`}
    >
      {/* Subtle ember radial glow behind the image for premium feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle at 50% 60%, rgba(216, 53, 40, 0.4) 0%, transparent 70%)'
        }}
        aria-hidden="true"
      />

      {/* The archive plate photograph */}
      <img
        src={src}
        alt={alt}
        className="relative w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={(e) => {
          e.currentTarget.src = '/brick-fallback.png';
          e.currentTarget.alt = 'The Monolith — compressed earth foundation';
        }}
      />

      {/* Subtle dark gradient at the bottom for depth */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-t from-void/50 via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* Corner labels — museum-catalog style */}
      <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.2em] text-bone/70 uppercase">
        {refLabel}
      </span>
      <span className="absolute bottom-3 right-3 font-mono text-[10px] tracking-[0.2em] text-bone/70 uppercase">
        Archive Plate
      </span>

      {/* Thin gold underline accent on hover */}
      <div
        className="absolute bottom-0 left-0 h-px bg-gold transition-all duration-700 ease-out w-0 group-hover:w-full"
        aria-hidden="true"
      />
    </figure>
  );
}

/**
 * Provenance component (The Scroll Story).
 * @returns {React.ReactElement} The rendered section.
 */
export default function Provenance() {
  const containerRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
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
                    &ldquo;{story.tagline}&rdquo;
                  </p>
                  
                  <p className="max-w-md leading-relaxed text-ash/70">
                    {story.body}
                  </p>
                </div>

                {/* Media/Visual Placeholder Block */}
                <div
                  className={`order-2 flex w-full items-center justify-center md:col-span-6 ${
                    isLeft ? 'justify-end' : 'md:order-1 justify-start'
                  }`}
                >
                  {PROVENANCE_MEDIA[story.step] ? (
                    <ProvenanceImage {...PROVENANCE_MEDIA[story.step]} />
                  ) : (
                    <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden bg-onyx border border-ash/10">
                      <div className="absolute inset-0 bg-gradient-to-tr from-void via-onyx to-[#222]" />
                      <div className="pointer-events-none absolute bottom-6 right-6 font-mono text-[9px] uppercase tracking-widest text-ash/30">
                        Archive Ref: 0{story.step}-V1
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
