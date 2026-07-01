import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealText from './RevealText';

gsap.registerPlugin(ScrollTrigger);

export default function Checkout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      }
    );

    const onMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 80;
      const y = (window.innerHeight / 2 - e.pageY) / 80;
      gsap.to(priceRef.current, { x, y, duration: 0.6, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      id="checkout"
      className="flex min-h-screen flex-col items-center justify-center border-t border-ash/20 px-5 py-32 md:px-6"
    >
      <div ref={sectionRef} className="flex w-full max-w-[800px] flex-col items-center text-center">
        <span className="mb-12 font-serif text-lg italic tracking-wide text-bone opacity-90">
          04 / Acquire
        </span>
        <RevealText
          as="h1"
          className="mb-8 font-serif text-5xl leading-[1.1] text-bone md:text-[80px] md:leading-[90px]"
        >
          Claim Your Monolith.
        </RevealText>
        <p className="mb-20 font-serif text-lg italic tracking-wide text-bone opacity-60">
          One unit. One owner. No reproductions.
        </p>
        <div
          ref={priceRef}
          className="mb-24 font-mono text-[32px] font-bold tracking-tighter text-gold md:text-[56px]"
        >
          $1,250.00 USD
        </div>
        <div className="group relative mb-24 w-full max-w-md">
          <button
            type="button"
            className="magnetic relative z-10 min-h-[44px] w-full touch-manipulation border border-ash/30 bg-transparent py-8 font-sans text-xs uppercase tracking-[0.4em] text-bone transition-all duration-700 hover:border-bone hover:bg-bone hover:text-void active:scale-[0.98]"
          >
            Acquire Now
          </button>
          <div className="absolute -bottom-1 left-0 h-px w-full bg-gold" />
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-6 font-sans text-[11px] uppercase tracking-widest opacity-40 md:flex-row">
          <span className="font-mono">REF: MNLTH-V1-001</span>
          <span className="hidden md:block">|</span>
          <span>Cryptographic verification required</span>
          <span className="hidden md:block">|</span>
          <span>Global priority dispatch</span>
        </div>
      </div>
    </section>
  );
}
