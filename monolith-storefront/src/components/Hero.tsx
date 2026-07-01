import { lazy, Suspense, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import RevealText from './RevealText';
import brickFallback from '../assets/images/brick-fallback.png';

const Spline = lazy(() => import('@splinetool/react-spline'));

// TODO: replace with the exported "The Monolith" brick scene URL from Spline.
const SPLINE_SCENE_URL = 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode';

interface HeroProps {
  isTouch?: boolean;
}

export default function Hero({ isTouch = false }: HeroProps) {
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.4 }
    );
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-32 md:px-16"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center text-center">
        <RevealText
          as="h1"
          className="mb-8 max-w-5xl font-serif text-5xl uppercase tracking-tighter text-bone md:text-[80px] md:leading-[90px]"
        >
          Unyielding.
          <br />
          Elemental.
          <br />
          Absolute.
        </RevealText>

        {/* 3D scene on desktop; static image fallback on touch devices, since WebGL scenes commonly lag on mobile GPUs */}
        <div className="magnetic group relative my-16 w-full max-w-3xl border border-ember/30 transition-colors duration-500 hover:border-ember">
          <div className="relative h-[80vh] w-full overflow-hidden bg-onyx">
            {isTouch ? (
              <img
                src={brickFallback}
                alt="The Monolith — a single ember-red brick"
                className="h-full w-full object-contain"
              />
            ) : (
              <Suspense
                fallback={
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-mono text-xs uppercase tracking-widest text-bone">
                      Loading...
                    </span>
                  </div>
                }
              >
                <Spline scene={SPLINE_SCENE_URL} className="h-full w-full" />
              </Suspense>
            )}
            <div className="pointer-events-none absolute bottom-6 right-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ash opacity-50">
              {isTouch ? 'The Monolith' : 'Interactive 3D Preview'}
            </div>
          </div>
        </div>

        <div ref={subRef} className="flex max-w-2xl flex-col items-center">
          <p className="mb-12 text-lg leading-relaxed tracking-wide text-ash">
            Thermally-cured earthen silicate for the modern apex. A singular manifestation of
            permanence and refined geometry.
          </p>
          <a
            href="#checkout"
            className="magnetic flex min-h-[44px] touch-manipulation items-center bg-ember px-14 py-6 font-sans text-xs uppercase tracking-[0.2em] text-bone transition-colors duration-300 hover:bg-bone hover:text-void active:scale-[0.98]"
          >
            Acquire the Monolith &mdash; <span className="font-mono">$1,250</span>
          </a>
        </div>
      </div>
    </section>
  );
}
