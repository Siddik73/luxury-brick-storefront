/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: 'var(--bg-deep)',
        ember: 'var(--clay-primary)',
        'clay-deep': 'var(--clay-deep)',
        bone: 'var(--text-primary)',
        ash: 'var(--text-muted)',
        gold: 'var(--accent)',
        onyx: 'var(--bg-surface)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
