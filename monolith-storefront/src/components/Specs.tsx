import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealText from './RevealText';

gsap.registerPlugin(ScrollTrigger);

const SPECS = [
  { value: '1,200°C', label: 'Firing Temperature', size: 'large' as const },
  { value: '4.2 kg', label: 'Mass Per Unit', size: 'large' as const },
  { value: '0.001%', label: 'Defect Tolerance', size: 'small' as const },
  { value: '1890', label: 'Year Established', size: 'small' as const },
  { value: '∞', label: 'Structural Lifespan', size: 'small' as const },
];

export default function Specs() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.spec-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="specs" className="px-5 py-32 md:px-16">
      <div className="mx-auto max-w-[1440px]">
        <RevealText
          as="h2"
          className="mb-20 max-w-4xl font-serif text-5xl text-bone md:text-[80px] md:leading-[90px]"
        >
          Technical Specifications of Absolute Structuralism.
        </RevealText>
        <div ref={gridRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-6">
          {SPECS.map((spec) => (
            <div
              key={spec.label}
              className={`spec-card flex aspect-square flex-col items-center justify-center border border-ash/30 bg-onyx p-12 text-center transition-colors duration-500 hover:border-bone ${
                spec.size === 'large' ? 'md:col-span-3' : 'md:col-span-2'
              }`}
            >
              <div className="mb-4 font-mono text-5xl tracking-tighter text-ember md:text-7xl">
                {spec.value}
              </div>
              <div className="font-sans text-xs uppercase tracking-[0.2em] text-ash">
                {spec.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
