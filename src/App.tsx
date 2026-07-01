import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, ScrollSmoother } from 'gsap/all';
import Hero from './components/Hero';
import Provenance from './components/Provenance';
import Specs from './components/Specs';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import MagneticCursor from './components/MagneticCursor';

const Playground = lazy(() => import('./components/Playground'));

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const touchQuery = window.matchMedia('(pointer: coarse)');
    setIsTouch(touchQuery.matches);

    const onChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    touchQuery.addEventListener('change', onChange);
    return () => touchQuery.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    // ScrollSmoother is disabled on touch devices: native momentum scrolling
    // feels better on mobile and avoids fighting the OS's own scroll physics.
    let smoother: ScrollSmoother | undefined;

    if (!ScrollTrigger.isTouch) {
      smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.5,
        effects: true,
      });
    }

    return () => {
      smoother?.kill();
    };
  }, []);

  return (
    <div className="min-h-screen bg-void font-sans text-bone">
      <MagneticCursor isTouch={isTouch} />

      <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-ash/10 bg-void/80 px-5 py-6 backdrop-blur-md md:px-16">
        <div className="font-serif text-2xl uppercase tracking-tighter text-bone">The Monolith</div>
        <div className="hidden gap-12 md:flex">
          <a
            href="#provenance"
            className="magnetic flex min-h-[44px] touch-manipulation items-center font-sans text-xs uppercase tracking-widest text-ash transition-colors duration-300 hover:text-bone"
          >
            Provenance
          </a>
          <a
            href="#specs"
            className="magnetic flex min-h-[44px] touch-manipulation items-center font-sans text-xs uppercase tracking-widest text-ash transition-colors duration-300 hover:text-bone"
          >
            Specs
          </a>
          <a
            href="#checkout"
            className="magnetic flex min-h-[44px] touch-manipulation items-center border-b border-bone pb-1 font-sans text-xs font-bold uppercase tracking-widest text-bone"
          >
            Experience
          </a>
        </div>
        <button
          type="button"
          className="magnetic min-h-[44px] touch-manipulation border border-bone bg-transparent px-8 py-2 font-sans text-xs uppercase tracking-widest text-bone transition-all duration-300 hover:bg-bone hover:text-void active:scale-95"
        >
          Buy Now
        </button>
      </nav>

      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content" ref={contentRef}>
          <main>
            <Hero isTouch={isTouch} />
            <Provenance />
            <Specs />
            <Suspense fallback={null}>
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

export default App;
