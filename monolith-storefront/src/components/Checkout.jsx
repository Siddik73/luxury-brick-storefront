/**
 * @file Checkout.jsx
 * @description Pretentious luxury call-to-action (CTA) section.
 * Contains mouse-interactive parallax price tags, cryptographic verification labels,
 * and the primary transaction button priced at $1,250 USD.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealText from './RevealText.jsx';
import { SECTION_IDS, COPY_TEXT } from '../utils/constants.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * Checkout Section component.
 * @returns {React.ReactElement} The rendered section.
 */
export default function Checkout() {
  const containerRef = useRef(null);
  const priceRef = useRef(null);

  useEffect(() => {
    // TODO: Implement interactive mouse parallax for the price tag.
    // 1. Listen for mouse movements across the viewport.
    // 2. Translate priceRef slightly relative to cursor distance from screen center (subtle LERP).
    // 3. Clean up event listeners on unmount.

    const ctx = gsap.context(() => {
      // Fade in checkout contents on scroll
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );
    }, containerRef);

    // Mouse parallax for the gold price text
    const handleMouseMove = (e) => {
      if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
      
      // clientX/Y are viewport-relative; pageX/Y include scroll offset and
      // would translate the price ~100px off its slot this deep in the page
      const x = (window.innerWidth / 2 - e.clientX) / 60;
      const y = (window.innerHeight / 2 - e.clientY) / 60;

      gsap.to(priceRef.current, {
        x,
        y,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleAcquisition = () => {
    // TODO: Implement cryptographic signature flow or transaction simulation
    alert('Cryptographic signature verification initiated. Prioritizing dispatch protocols.');
  };

  return (
    <section
      id={SECTION_IDS.CHECKOUT}
      ref={containerRef}
      className="flex min-h-screen flex-col items-center justify-center border-t border-ash/20 bg-void px-5 py-32 md:px-16"
    >
      <div className="flex w-full max-w-[800px] flex-col items-center text-center">
        <span className="mb-12 font-mono text-xs uppercase tracking-[0.3em] text-ash">
          Protocols &bull; 04
        </span>

        <RevealText
          as="h2"
          className="mb-8 font-serif text-5xl font-normal leading-[1.1] text-bone md:text-[80px] md:leading-[90px]"
        >
          {COPY_TEXT.CHECKOUT_HEADER}
        </RevealText>

        <p className="mb-20 font-serif text-lg italic tracking-wide text-bone/60">
          {COPY_TEXT.CHECKOUT_SUBTEXT}
        </p>

        {/* Parallax Price Indicator */}
        <div
          ref={priceRef}
          className="mb-24 font-mono text-[32px] font-bold tracking-tighter text-gold md:text-[56px] select-none"
        >
          $1,250.00 USD
        </div>

        {/* Acquisition Button */}
        <div className="group relative mb-24 w-full max-w-md">
          <button
            type="button"
            onClick={handleAcquisition}
            className="magnetic relative z-10 min-h-[44px] w-full border border-ash/30 bg-transparent py-8 font-sans text-xs uppercase tracking-[0.4em] text-bone transition-all duration-700 hover:border-bone hover:bg-bone hover:text-void active:scale-[0.98]"
          >
            Acquire Now
          </button>
          <div className="absolute -bottom-1 left-0 h-px w-full bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
        </div>

        {/* Cryptographic Ref Footer */}
        <div className="flex w-full flex-col items-center justify-between gap-6 font-mono text-[9px] uppercase tracking-widest text-ash/40 md:flex-row">
          <span>Ref: MNLTH-S001</span>
          <span className="hidden md:block">|</span>
          <span>Verification Required</span>
          <span className="hidden md:block">|</span>
          <span>Global priority dispatch</span>
        </div>
      </div>
    </section>
  );
}
