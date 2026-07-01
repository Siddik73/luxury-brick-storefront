import { useEffect, useRef, useState } from 'react';

const LERP_FACTOR = 0.15;

interface MagneticCursorProps {
  isTouch?: boolean;
}

export default function MagneticCursor({ isTouch: isTouchProp }: MagneticCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const [detectedTouch, setDetectedTouch] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const isTouch = isTouchProp ?? detectedTouch;

  useEffect(() => {
    if (isTouchProp !== undefined) return;

    const touchQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    setDetectedTouch(touchQuery.matches);

    const onTouchChange = (e: MediaQueryListEvent) => setDetectedTouch(e.matches);
    touchQuery.addEventListener('change', onTouchChange);
    return () => touchQuery.removeEventListener('change', onTouchChange);
  }, [isTouchProp]);

  useEffect(() => {
    if (isTouch) return;

    document.body.style.cursor = 'none';

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    const magneticEls = Array.from(document.querySelectorAll<HTMLElement>('.magnetic'));
    magneticEls.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    window.addEventListener('mousemove', onMouseMove);

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * LERP_FACTOR;
      pos.current.y += (target.current.y - pos.current.y) * LERP_FACTOR;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMouseMove);
      magneticEls.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      ref={dotRef}
      className={`pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-bone transition-[box-shadow,transform] duration-200 ease-out ${
        isHovering ? 'scale-[2] shadow-[0_0_12px_4px_rgba(197,160,89,0.7)]' : 'scale-100 shadow-none'
      }`}
    />
  );
}
