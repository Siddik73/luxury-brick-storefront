/**
 * @file main.jsx
 * @description Application entry point for "The Monolith" React storefront.
 * Initializes React 18, mounts the root App component, and sets up StrictMode.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

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
