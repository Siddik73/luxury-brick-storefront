/**
 * @file RevealText.jsx
 * @description Reusable wrapper to split lines/words of text into overflow-hidden blocks,
 * then animate them sliding up (reveal) using GSAP ScrollTrigger when scrolled into view.
 */

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Helper to split text strings into structural DOM nodes for word-by-word animation.
 * @param {React.ReactNode} node - The children nodes.
 * @returns {React.ReactNode} The formatted nodes.
 */
function splitToWords(node) {
  if (typeof node === 'string') {
    const words = node.split(/(\s+)/);
    return words.map((word, i) =>
      word.trim() === '' ? (
        word
      ) : (
        <span key={i} className="reveal-word inline-block overflow-hidden">
          <span className="reveal-word-inner inline-block translate-y-full">{word}</span>
        </span>
      )
    );
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => <React.Fragment key={i}>{splitToWords(child)}</React.Fragment>);
  }

  return node;
}

/**
 * RevealText component.
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Text content to animate.
 * @param {React.ElementType} [props.as='h2'] - Wrapper HTML element tag.
 * @param {string} [props.className] - CSS class names.
 * @returns {React.ReactElement} The rendered text.
 */
export default function RevealText({ children, as: Tag = 'h2', className }) {
  const elementRef = useRef(null);

  useEffect(() => {
    // TODO: Create a GSAP animation to reveal split words.
    // 1. Target all sub-spans with the class '.reveal-word-inner'.
    // 2. Animate them from translation `y: '100%'` to `y: '0%'`.
    // 3. Stagger the entry by 0.05s using ScrollTrigger.

    const ctx = gsap.context(() => {
      const words = elementRef.current?.querySelectorAll('.reveal-word-inner');
      if (!words || words.length === 0) return;

      gsap.fromTo(
        words,
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1,
          stagger: 0.03,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elementRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, elementRef);

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={elementRef} className={className}>
      {splitToWords(children)}
    </Tag>
  );
}

