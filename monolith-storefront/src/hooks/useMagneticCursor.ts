import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';

export function useMagneticCursor(cursorRef: RefObject<HTMLDivElement>) {
  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let activeMagnet: HTMLElement | null = null;

    const magnets = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));

    const onMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const ticker = () => {
      const ease = activeMagnet ? 0.18 : 0.16;
      pos.x += (target.x - pos.x) * ease;
      pos.y += (target.y - pos.y) * ease;
      gsap.set(cursor, { x: pos.x, y: pos.y });
    };
    gsap.ticker.add(ticker);

    const cleanups = magnets.map((el) => {
      const enter = () => {
        activeMagnet = el;
        gsap.to(cursor, { scale: 2.2, duration: 0.3, ease: 'power2.out' });
      };
      const move = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        gsap.to(el, { x: relX * 0.3, y: relY * 0.3, duration: 0.4, ease: 'power2.out' });
        target.x = rect.left + rect.width / 2 + relX * 0.5;
        target.y = rect.top + rect.height / 2 + relY * 0.5;
      };
      const leave = () => {
        activeMagnet = null;
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      };
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', leave);
      return () => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      };
    });

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(ticker);
      cleanups.forEach((fn) => fn());
    };
  }, [cursorRef]);
}
