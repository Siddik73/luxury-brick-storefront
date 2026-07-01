/**
 * @file useScrollAnimation.js
 * @description Reusable hook to register standard GSAP ScrollTrigger timelines.
 * Simplifies tracking entries, parallax transforms, and scroll-driven opacity changes.
 */

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to register scrolling animations on an element.
 * @param {React.RefObject} targetRef - Target element to trigger animation.
 * @param {Object} options - Config options.
 * @param {gsap.TweenVars} options.fromVars - Staging styles.
 * @param {gsap.TweenVars} options.toVars - Target styles.
 * @param {string} [options.start='top 80%'] - ScrollTrigger trigger entry point.
 * @param {string} [options.end='bottom 20%'] - ScrollTrigger exit point.
 * @param {boolean} [options.scrub=false] - Link animation directly to scrolling distance.
 */
export default function useScrollAnimation(targetRef, { fromVars, toVars, start = 'top 80%', end = 'bottom 20%', scrub = false }) {
  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    // TODO: Create GSAP ScrollTrigger timeline.
    // 1. Initialize a gsap context.
    // 2. Map `fromVars` and `toVars` to a tween targeting `element`.
    // 3. Attach ScrollTrigger configurations using properties passed in the options.
    // 4. Revert context on cleanup.

    const ctx = gsap.context(() => {
      gsap.fromTo(element, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub,
          toggleActions: scrub ? undefined : 'play none none reverse',
        },
      });
    }, element);

    return () => ctx.revert();
  }, [targetRef, fromVars, toVars, start, end, scrub]);
}
