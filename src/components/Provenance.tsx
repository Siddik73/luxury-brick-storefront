import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealText from './RevealText';

gsap.registerPlugin(ScrollTrigger);

const BLOCKS = [
  {
    n: '01',
    title: 'Compressed Earth.',
    quote: 'Sourced from ancient riverbeds. Mineral-laced. Untouched by modernity.',
    body: 'An elemental convergence of geological time and human intention. Each layer represents an epoch of silence.',
    align: 'left' as const,
  },
  {
    n: '02',
    title: 'Calcined Fire.',
    quote: 'Hand-fired at 1,200°C for seventy-two continuous hours. No shortcuts. No machines.',
    body: "The transformative power of heat crystallizes the earth's memory into a permanent state of grace.",
    align: 'right' as const,
  },
  {
    n: '03',
    title: 'Timeless Structure.',
    quote: 'Engineered to outlast its owner. To outlast the building. To outlast the century.',
    body: 'A commitment to permanence in a world of ephemeral trends. The final form of brutalist elegance.',
    align: 'left' as const,
  },
];

export default function Provenance() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const texts = gsap.utils.toArray<HTMLElement>('.provenance-text');
      gsap.fromTo(
        texts,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const blocks = gsap.utils.toArray<HTMLElement>('.provenance-block');
      blocks.forEach((block) => {
        const image = block.querySelector('.provenance-image');
        if (!image) return;

        gsap.to(image, {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: block,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
      }).fromTo(progressLineRef.current, { scaleY: 0 }, { scaleY: 1, ease: 'none' });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="provenance" ref={sectionRef} className="relative w-full border-t border-ash/20">
      <div className="pointer-events-none absolute left-5 top-0 bottom-0 hidden w-px bg-ash/20 md:left-16 md:block">
        <div
          ref={progressLineRef}
          className="provenance-progress-line h-full w-full origin-top bg-ember"
        />
      </div>

      {BLOCKS.map((block) => (
        <div
          key={block.n}
          className="provenance-block relative flex min-h-screen w-full items-center overflow-hidden py-24"
        >
          <div className="container mx-auto grid grid-cols-1 gap-6 px-5 md:grid-cols-12 md:px-16">
            <div
              className={`provenance-text order-1 md:col-span-5 ${
                block.align === 'left' ? 'md:col-start-2' : 'md:order-2 md:col-start-8'
              }`}
            >
              <p className="mb-8 flex items-center gap-4 font-mono tracking-[0.3em] text-ash">
                <span className="text-ember">{block.n}</span>
                <span className="h-px w-12 bg-ash/40" />
              </p>
              <RevealText as="h2" className="mb-8 font-serif text-3xl tracking-tight text-bone md:text-5xl">
                {block.title}
              </RevealText>
              <p className="mb-10 font-serif text-xl italic text-ash">{block.quote}</p>
              <p className="max-w-sm leading-relaxed text-ash/60">{block.body}</p>
            </div>
            <div
              className={`order-2 flex md:col-span-6 ${
                block.align === 'left' ? 'justify-end' : 'md:order-1 justify-start'
              }`}
            >
              <div className="h-[50vh] w-full overflow-hidden bg-onyx md:h-[70vh]">
                <div
                  className="provenance-image h-full w-full bg-gradient-to-br from-onyx via-[#1a1a1a] to-void"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
