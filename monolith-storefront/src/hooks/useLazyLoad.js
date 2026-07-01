/**
 * @file useLazyLoad.js
 * @description Custom hook utilizing the browser's IntersectionObserver API
 * to dynamically defer loading of heavy elements (like images or embeds) until they enter the viewport.
 */

import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook for lazy-loading elements.
 * @param {Object} [options] - IntersectionObserver configurations.
 * @param {string} [options.rootMargin='50px'] - Margins surrounding the root.
 * @param {number} [options.threshold=0.01] - Viewport entry percentage trigger.
 * @returns {[React.RefObject, boolean]} Target DOM reference to attach, and state indicating if it has entered.
 */
export default function useLazyLoad(options = {}) {
  const [hasEntered, setHasEntered] = useState(false);
  const elementRef = useRef(null);

  const { rootMargin = '50px', threshold = 0.01 } = options;

  useEffect(() => {
    // TODO: Initialize IntersectionObserver targeting elementRef.
    // 1. Check if Element exists and IntersectionObserver is supported.
    // 2. Set hasEntered to true when triggered.
    // 3. Unobserve on trigger (load only once).
    // 4. Clean up observer.

    const element = elementRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.unobserve(element); // Trigger only once
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [rootMargin, threshold]);

  return [elementRef, hasEntered];
}
