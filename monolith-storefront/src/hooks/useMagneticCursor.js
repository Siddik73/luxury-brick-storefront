/**
 * @file useMagneticCursor.js
 * @description Custom hook that binds mouse movement listeners, handles
 * position interpolation (lerp), and applies elastic pull physics on hovered magnet items.
 */

import { useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * Custom hook to manage custom cursor interactions.
 * @param {React.RefObject} cursorRef - Ref object of the cursor DOM element.
 */
export default function useMagneticCursor(cursorRef) {
  useEffect(() => {
    // Disable custom cursor on touch/pointer coarse configurations
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    document.body.classList.add('custom-cursor-active');

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    let activeMagnet = null;

    // TODO: Connect mouse movement coordinates.
    // 1. Listen for mousemove to set mouse.x and mouse.y.
    // 2. Interpolate pos.x and pos.y towards mouse positions using LERP factor (e.g., 0.15).
    // 3. Translate the cursor element.
    // 4. Attach mouseenter and mouseleave listeners to all '.magnetic' elements to trigger elastic pull animations.

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Render loop using GSAP's optimized ticker
    const tick = () => {
      const ease = activeMagnet ? 0.25 : 0.15; // Speed up follow rate when snapped to a magnet
      pos.x += (mouse.x - pos.x) * ease;
      pos.y += (mouse.y - pos.y) * ease;
      
      gsap.set(cursor, { x: pos.x, y: pos.y });
    };

    gsap.ticker.add(tick);

    // Magnetic snaps implementation
    const magneticElements = document.querySelectorAll('.magnetic');
    
    const handleMouseEnter = (e) => {
      activeMagnet = e.currentTarget;
      gsap.to(cursor, {
        scale: 2.5,
        backgroundColor: '#C5A059', // Accent gold color on hover
        boxShadow: '0 0 16px 4px rgba(197,160,89,0.4)',
        duration: 0.3,
      });
    };

    const handleMouseLeave = (e) => {
      activeMagnet = null;
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: '#F0F0F0', // Reset to bone color
        boxShadow: '0 0 0px 0px rgba(240, 240, 240, 0)',
        duration: 0.3,
      });
      // Snap target element back elastically
      gsap.to(e.currentTarget, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    const handleMagnetMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const relativeX = e.clientX - (rect.left + rect.width / 2);
      const relativeY = e.clientY - (rect.top + rect.height / 2);
      
      // Pull target element towards mouse
      gsap.to(e.currentTarget, {
        x: relativeX * 0.3,
        y: relativeY * 0.3,
        duration: 0.4,
        ease: 'power2.out',
      });

      // Snapping cursor anchor to magnet center
      mouse.x = rect.left + rect.width / 2 + relativeX * 0.4;
      mouse.y = rect.top + rect.height / 2 + relativeY * 0.4;
    };

    magneticElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
      el.addEventListener('mousemove', handleMagnetMove);
    });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(tick);

      magneticElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.removeEventListener('mousemove', handleMagnetMove);
      });
    };
  }, [cursorRef]);
}
