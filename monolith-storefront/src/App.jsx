/**
 * @file App.jsx
 * @description Main Layout and controller for the Brutalist Luxury storefront.
 * Sets up custom cursor, navigation, active segment control, and mounts 
 * the sections under a smooth-scroll layout with framer-motion transitions.
 */

import { useEffect, useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Hero from './components/Hero.jsx';
import Provenance from './components/Provenance.jsx';
import Specs from './components/Specs.jsx';
import Checkout from './components/Checkout.jsx';
import TheCommons from './components/TheCommons.jsx';
import Footer from './components/Footer.jsx';
import MagneticCursor from './components/MagneticCursor.jsx';
import ProtocolPage from './components/ProtocolPage.jsx';
import { POLICY_PAGES } from './utils/policyContent.js';

/** Resolve the current hash to a policy-page route key, or '' for the main page. */
function getRouteFromHash() {
  const hash = window.location.hash;
  return hash.startsWith('#/') ? hash.slice(2) : '';
}

// Lazy load playground to optimize initial load speed
const Playground = lazy(() => import('./components/Playground.jsx'));

export default function App() {
  // Hash route: '' renders the storefront, '#/security' etc. render protocol pages
  const [route, setRoute] = useState(getRouteFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      const nextRoute = getRouteFromHash();
      setRoute(nextRoute);

      if (nextRoute) {
        window.scrollTo(0, 0);
      } else {
        // Returning from a protocol page to an in-page anchor: the section
        // isn't mounted yet on this tick, so defer the scroll one frame.
        const anchorId = window.location.hash.slice(1);
        if (anchorId) {
          setTimeout(() => {
            document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Segment state persisted in localStorage
  const [activeSegment, setActiveSegment] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('brickSegment') || 'decorative';
    }
    return 'decorative';
  });

  // Sync segment palette classes to HTML element
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('segment-decorative', 'segment-construction', 'segment-artisan', 'segment-ecommerce');
    html.classList.add(`segment-${activeSegment}`);
    localStorage.setItem('brickSegment', activeSegment);
  }, [activeSegment]);

  // Handle segment transition using View Transitions API if supported
  const handleSegmentChange = (seg) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setActiveSegment(seg);
      });
    } else {
      setActiveSegment(seg);
    }
  };

  return (
    <div className="min-h-screen bg-void font-sans text-bone selection:bg-ember selection:text-bone">
      {/* Custom magnetic cursor tracking mouse movements */}
      <MagneticCursor />

      {/* Global Header Navigation */}
      <nav className="fixed top-0 z-50 flex w-full flex-col items-center justify-between gap-4 border-b border-ash/10 bg-void/80 px-5 py-6 backdrop-blur-md md:flex-row md:px-16">
        <div className="font-serif text-2xl uppercase tracking-tighter text-bone select-none">Brickhunter</div>
        
        {/* Segment Selector Pills */}
        <div className="flex max-w-full flex-wrap justify-center gap-1.5 rounded-full border border-ash/10 bg-void/50 p-1">
          {[
            { id: 'decorative', label: 'Decorative' },
            { id: 'construction', label: 'Construction' },
            { id: 'artisan', label: 'Artisan' },
            { id: 'ecommerce', label: 'Shop' }
          ].map((seg) => (
            <button
              key={seg.id}
              onClick={() => handleSegmentChange(seg.id)}
              className={`rounded-full px-4 py-1.5 font-mono text-[9px] uppercase tracking-widest transition-all duration-300 border ${
                activeSegment === seg.id
                  ? 'bg-ember text-bone border-ember shadow-md shadow-ember/20'
                  : 'text-ash hover:text-bone border-transparent hover:border-ash/20 bg-transparent'
              }`}
            >
              {seg.label}
            </button>
          ))}
        </div>

        {/* Links + Cart Action */}
        <div className="flex items-center gap-8">
          <div className="hidden gap-8 md:flex">
            <a href="#provenance" className="magnetic flex min-h-[44px] items-center font-mono text-[10px] uppercase tracking-widest text-ash transition-colors duration-300 hover:text-bone">
              Provenance
            </a>
            <a href="#specs" className="magnetic flex min-h-[44px] items-center font-mono text-[10px] uppercase tracking-widest text-ash transition-colors duration-300 hover:text-bone">
              Specs
            </a>
            <a href="#playground" className="magnetic flex min-h-[44px] items-center font-mono text-[10px] uppercase tracking-widest text-ash transition-colors duration-300 hover:text-bone">
              Playground
            </a>
            <a href="#commons" className="magnetic flex min-h-[44px] items-center font-mono text-[10px] uppercase tracking-widest text-ash transition-colors duration-300 hover:text-bone">
              Commons
            </a>
          </div>
          
          <a
            href="#checkout"
            className="magnetic flex items-center gap-2 border border-ash/20 hover:border-bone px-5 py-2 font-mono text-[9px] uppercase tracking-widest text-bone transition-all duration-300"
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            <span>Cart (0)</span>
          </a>
        </div>
      </nav>

      {/* Main layout container with transition animations */}
      <AnimatePresence mode="wait">
        {POLICY_PAGES[route] ? (
          <ProtocolPage key={route} {...POLICY_PAGES[route]} />
        ) : (
          <motion.main
            key={activeSegment}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <Hero activeSegment={activeSegment} />
            <Provenance />
            <Specs />

            <Suspense fallback={
              <div className="flex h-[80vh] items-center justify-center bg-onyx">
                <span className="font-mono text-xs uppercase tracking-widest text-bone">Loading Playground...</span>
              </div>
            }>
              <Playground />
            </Suspense>

            <Checkout />
            <TheCommons />
          </motion.main>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
