/**
 * @file App.jsx
 * @description Main Layout and controller for the Brutalist Luxury storefront.
 * Sets up GSAP ScrollSmoother (disabled on touch devices), custom cursor, navigation,
 * and mounts the sections (Hero, Provenance, Specs, Playground, Checkout, Footer).
 */

import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother'; // Note: ScrollSmoother requires GSAP Premium/Club GSAP. Fallback to normal scrolling if unavailable.

import Hero from './components/Hero.jsx';
import Provenance from './components/Provenance.jsx';
import Specs from './components/Specs.jsx';
import Checkout from './components/Checkout.jsx';
import Footer from './components/Footer.jsx';
import MagneticCursor from './components/MagneticCursor.jsx';

import useIsTouch from './hooks/useIsTouch.js';

// Lazy load playground to optimize initial load speed
const Playground = lazy(() => import('./components/Playground.jsx'));

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function App() {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const isTouch = useIsTouch();

  useEffect(() => {
    // TODO: Implement GSAP ScrollSmoother initialization.
    // 1. Check if device has touch capability (disable ScrollSmoother on touch devices for native physics).
    // 2. Initialize ScrollSmoother targeting #smooth-wrapper and #smooth-content.
    // 3. Fallback gracefully to default scrolling if GSAP ScrollSmoother is not licensed/imported.
    
    let smootherInstance = null;

    if (!isTouch && typeof ScrollSmoother !== 'undefined') {
      try {
        smootherInstance = ScrollSmoother.create({
          wrapper: wrapperRef.current,
          content: contentRef.current,
          smooth: 1.5,
          effects: true,
        });
      } catch (error) {
        console.warn('ScrollSmoother initialization failed, falling back to native scrolling:', error);
      }
    }

    return () => {
      if (smootherInstance) {
        smootherInstance.kill();
      }
    };
  }, [isTouch]);

  return (
    <div className="min-h-screen bg-void font-sans text-bone selection:bg-ember selection:text-bone">
      {/* Custom magnetic cursor tracking mouse movements */}
      <MagneticCursor />

      {/* Global Header Navigation */}
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-ash/10 bg-void/80 px-5 py-6 backdrop-blur-md md:px-16">
        <div className="font-serif text-2xl uppercase tracking-tighter text-bone">The Monolith</div>
        <div className="hidden gap-12 md:flex">
          <a href="#provenance" className="magnetic flex min-h-[44px] items-center font-sans text-xs uppercase tracking-widest text-ash transition-colors duration-300 hover:text-bone">
            Provenance
          </a>
          <a href="#specs" className="magnetic flex min-h-[44px] items-center font-sans text-xs uppercase tracking-widest text-ash transition-colors duration-300 hover:text-bone">
            Specs
          </a>
          <a href="#playground" className="magnetic flex min-h-[44px] items-center font-sans text-xs uppercase tracking-widest text-ash transition-colors duration-300 hover:text-bone">
            Playground
          </a>
        </div>
        <button
          type="button"
          className="magnetic min-h-[44px] border border-bone bg-transparent px-8 py-2 font-sans text-xs uppercase tracking-widest text-bone transition-all duration-300 hover:bg-bone hover:text-void active:scale-95"
        >
          Acquire
        </button>
      </nav>

      {/* Smooth scroll container hierarchy */}
      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content" ref={contentRef}>
          <main>
            <Hero />
            <Provenance />
            <Specs />
            
            <Suspense fallback={
              <div className="flex h-[80vh] items-center justify-center bg-onyx">
                <span className="font-mono text-xs uppercase tracking-widest text-bone">Loading Playground...</span>
              </div>
            }>
              <Playground />
            </Suspense>

            <Checkout />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
