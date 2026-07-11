/**
 * @file main.jsx
 * @description Application entry point for the "Brickhunter" React storefront.
 * Initializes React 18, mounts the root App component, sets up StrictMode,
 * and boots the Lenis smooth-scroll engine.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import Lenis from 'lenis';
import App from './App.jsx';
import './index.css';

// Initialize Lenis smooth scroll globally
const lenis = new Lenis({
  lerp: 0.1,
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Ensure the root container exists in the HTML before rendering
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element to mount the application.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
