/**
 * @file Hero.jsx
 * @description Hero component for the landing page. Includes a bold 3-word tagline,
 * descriptions, primary CTA, and an interactive 3D scene (Spline embed) on desktop,
 * falling back to a static optimized image on touch/mobile devices.
 */

import React, { lazy, Suspense } from 'react';
import RevealText from './RevealText.jsx';
import useIsTouch from '../hooks/useIsTouch.js';
import { SECTION_IDS, COPY_TEXT, EXTERNAL_LINKS } from '../utils/constants.js';

// Lazy load react-spline to defer expensive WebGL compilation
const Spline = lazy(() => import('@splinetool/react-spline'));

/**
 * Hero Section component.
 * @returns {React.ReactElement} The rendered section.
 */
export default function Hero() {
  const isTouch = useIsTouch();

  return (
    <section
      id={SECTION_IDS.HERO}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-32 md:px-16"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center text-center">
        {/* Bold 3-word Tagline utilizing text-reveal animation */}
        <RevealText
          as="h1"
          className="mb-8 max-w-5xl font-serif text-5xl uppercase tracking-tighter text-bone md:text-[80px] md:leading-[90px]"
        >
          {COPY_TEXT.HERO_TAGLINE}
        </RevealText>

        {/* 3D Scene Wrapper */}
        <div className="magnetic group relative my-16 w-full max-w-3xl border border-ember/30 transition-colors duration-500 hover:border-ember">
          <div className="relative h-[80vh] w-full overflow-hidden bg-onyx">
            {isTouch ? (
              // Mobile Fallback: Avoid running heavy WebGL scenes on mobile GPUs to save power and keep UI fluid
              <img
                src="/brick-fallback.webp"
                alt="The Monolith — Ember Red Earthen Silicate"
                className="h-full w-full object-contain"
              />
            ) : (
              <Suspense
                fallback={
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-mono text-xs uppercase tracking-widest text-bone">
                      Initializing 3D Space...
                    </span>
                  </div>
                }
              >
                {/* TODO: Integrate interactive Spline scene URL from constants */}
                <Spline scene={EXTERNAL_LINKS.SPLINE_SCENE} className="h-full w-full" />
              </Suspense>
            )}
            
            {/* Visual Indicator Overlay */}
            <div className="pointer-events-none absolute bottom-6 right-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ash opacity-50">
              {isTouch ? 'Static Render' : 'Interactive Orbit Active'}
            </div>
          </div>
        </div>

        {/* Secondary description and CTA block */}
        <div className="flex max-w-2xl flex-col items-center animate-fade-up" style={{ animationDelay: '0.6s' }}>
          <p className="mb-12 text-lg leading-relaxed tracking-wide text-ash">
            {COPY_TEXT.HERO_DESCRIPTION}
          </p>
          <a
            href={`#${SECTION_IDS.CHECKOUT}`}
            className="magnetic flex min-h-[44px] touch-manipulation items-center bg-ember px-14 py-6 font-sans text-xs uppercase tracking-[0.2em] text-bone transition-colors duration-300 hover:bg-bone hover:text-void active:scale-[0.98]"
          >
            Acquire &mdash; <span className="font-mono">$1,250</span>
          </a>
        </div>
      </div>
    </section>
  );
}
