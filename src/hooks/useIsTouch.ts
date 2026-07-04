import { useEffect, useState } from 'react';

/**
 * Custom hook to detect touch screen devices.
 * @returns {boolean} Whether the device utilizes coarse touch pointer inputs.
 */
export default function useIsTouch(): boolean {
  const [isTouch, setIsTouch] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const touchQuery = window.matchMedia('(pointer: coarse)');
    setIsTouch(touchQuery.matches);

    const handleQueryChange = (e: MediaQueryListEvent) => {
      setIsTouch(e.matches);
    };

    touchQuery.addEventListener('change', handleQueryChange);

    return () => {
      touchQuery.removeEventListener('change', handleQueryChange);
    };
  }, []);

  return isTouch;
}
