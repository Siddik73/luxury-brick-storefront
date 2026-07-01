export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-between gap-8 border-t border-ash/10 bg-void px-5 py-16 md:flex-row md:px-16">
      <div className="font-serif text-xl uppercase tracking-tighter text-bone">The Monolith</div>
      <div className="flex gap-10">
        <a
          href="#"
          className="magnetic flex min-h-[44px] touch-manipulation items-center font-sans text-xs uppercase tracking-widest text-ash transition-opacity duration-200 hover:text-bone"
        >
          Privacy
        </a>
        <a
          href="#"
          className="magnetic flex min-h-[44px] touch-manipulation items-center font-sans text-xs uppercase tracking-widest text-ash transition-opacity duration-200 hover:text-bone"
        >
          Terms
        </a>
        <a
          href="#"
          className="magnetic flex min-h-[44px] touch-manipulation items-center font-sans text-xs uppercase tracking-widest text-ash transition-opacity duration-200 hover:text-bone"
        >
          Contact
        </a>
      </div>
      <p className="font-sans text-xs uppercase tracking-widest text-ash">
        © 2026 The Monolith. Architectural integrity secured.
      </p>
    </footer>
  );
}
