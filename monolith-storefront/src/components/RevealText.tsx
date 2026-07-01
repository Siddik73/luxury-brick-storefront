import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

function splitToWords(node: ReactNode): ReactNode {
  if (typeof node === 'string') {
    const words = node.split(/(\s+)/);
    return words.map((word, i) =>
      word.trim() === '' ? (
        word
      ) : (
        <span key={i} className="reveal-word inline-block overflow-hidden">
          <span className="reveal-word-inner inline-block">{word}</span>
        </span>
      )
    );
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => <span key={i}>{splitToWords(child)}</span>);
  }

  return node;
}

export default function RevealText({ children, as: Tag = 'h2', className }: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>('.reveal-word-inner');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {splitToWords(children)}
    </Tag>
  );
}
