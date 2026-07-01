/**
 * @file useIsTouch.js
 * @description Custom hook to detect touch capability (pointer: coarse) using media queries.
 * Useful for disabling hover states, WebGL renders, or smoothing configurations.
 */

import { useEffect, useState } from 'react';

/**
 * Custom hook to detect touch screen devices.
 * @returns {boolean} Whether the device utilizes coarse touch pointer inputs.
 */
export default function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // TODO: Connect media query listeners.
    // 1. Evaluate pointer coarse query: '(pointer: coarse)'.
    // 2. Add listener to trigger state changes dynamically if a user swaps pointers.
    // 3. Clean up event listeners.

    const touchQuery = window.matchMedia('(pointer: coarse)');
    setIsTouch(touchQuery.matches);

    const handleQueryChange = (e) => {
      setIsTouch(e.matches);
    };

    touchQuery.addEventListener('change', handleQueryChange);

    return () => {
      touchQuery.removeEventListener('change', handleQueryChange);
    };
  }, []);

  return isTouch;
}
