import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import TextReveal from './TextReveal.jsx';
import useIsTouch from '../hooks/useIsTouch.js';
import { SECTION_IDS } from '../utils/constants.js';

// Configuration definitions
const COLORS = [
  { id: 'terracotta', label: 'Terracotta', hex: '#c4623d', class: 'bg-[#c4623d]' },
  { id: 'rust', label: 'Rust', hex: '#8b3a1f', class: 'bg-[#8b3a1f]' },
  { id: 'charcoal', label: 'Charcoal', hex: '#1c1f22', class: 'bg-[#1c1f22]' },
  { id: 'sand', label: 'Sand', hex: '#e3d7c5', class: 'bg-[#e3d7c5]' },
  { id: 'brass', label: 'Brass', hex: '#c8a96a', class: 'bg-[#c8a96a]' }
];

const SIZES = [
  { id: 'standard', label: 'Standard', dims: '215 × 102.5 × 65 mm', rowAspect: 'aspect-[8.6/0.65]' },
  { id: 'roman', label: 'Roman', dims: '290 × 90 × 40 mm', rowAspect: 'aspect-[11.6/0.4]' },
  { id: 'norman', label: 'Norman', dims: '290 × 90 × 57 mm', rowAspect: 'aspect-[11.6/0.57]' }
];

const TEXTURES = [
  { id: 'smooth', label: 'Smooth', desc: 'Sleek structural refinement' },
  { id: 'textured', label: 'Textured', desc: 'Coarse mineral granularity' },
  { id: 'waterstruck', label: 'Waterstruck', desc: 'Kiln-washed fluid lines' },
  { id: 'molded', label: 'Hand-Molded', desc: 'Organic thumbpress details' }
];

const FINISHES = [
  { id: 'matte', label: 'Matte', desc: 'Natural earth non-reflective' },
  { id: 'glazed', label: 'Glazed', desc: 'Crystalline silica sheen' },
  { id: 'fired', label: 'Kiln-Fired', desc: 'Burnt oxidized carbon halo' },
  { id: 'metallic', label: 'Metallic', desc: 'Raw brass dusting highlights' }
];

/**
 * Interactive Playground / Configurator component.
 * Features 1.5vh scroll pinning, interactive CSS brick wall visualizer on the left,
 * and high-end configurator sliders/controls with framer-motion layoutId on the right.
 */
export default function Playground() {
  const isTouch = useIsTouch();
  const sectionRef = useRef(null);

  // Configuration States
  const [activeColor, setActiveColor] = useState(COLORS[0]);
  const [activeSize, setActiveSize] = useState(SIZES[0]);
  const [activeTexture, setActiveTexture] = useState(TEXTURES[0]);
  const [activeFinish, setActiveFinish] = useState(FINISHES[0]);

  const [hoveredBrick, setHoveredBrick] = useState(null);

  // Setup scroll pinning tracking on the 150vh parent
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Transform opacity and position based on scroll position
  const configuratorY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0, 0, 0]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8]);

  // Construct wall row arrangements for the running-bond pattern
  const renderRow = (isEven) => {
    const bricksCount = isEven ? 5 : 4;
    const items = [];

    for (let i = 0; i < bricksCount; i++) {
      const isHalf = isEven && (i === 0 || i === bricksCount - 1);
      const flexClass = isHalf ? 'flex-[1]' : 'flex-[2]';

      items.push(
        <div
          key={i}
          className={`${flexClass} h-full relative`}
          onMouseEnter={isTouch ? undefined : () => setHoveredBrick(`${isEven ? 'even' : 'odd'}-${i}`)}
          onMouseLeave={isTouch ? undefined : () => setHoveredBrick(null)}
        >
          <motion.div
            layout
            className={`relative w-full h-full border border-void shadow-[2px_2px_4px_rgba(0,0,0,0.3)] transition-all duration-500 ${activeColor.class} ${
              activeTexture.id === 'waterstruck' ? 'rounded-[4%_8%_6%_5%_/_6%_4%_7%_5%]' : ''
            } ${
              activeTexture.id === 'molded' ? 'rounded-[8%_5%_9%_6%] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.1),_inset_-2px_-2px_4px_rgba(0,0,0,0.3)]' : ''
            }`}
          >
            {/* Texture Overlays */}
            {activeTexture.id === 'textured' && (
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:4px_4px]" />
            )}
            {activeTexture.id === 'waterstruck' && (
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,#000_2px,transparent_2px)] bg-[size:10px_10px] filter blur-[0.5px]" />
            )}
            {activeTexture.id === 'molded' && (
              <div className="absolute inset-0 opacity-10 bg-gradient-to-tr from-black via-transparent to-white" />
            )}

            {/* Finish Overlays */}
            {activeFinish.id === 'glazed' && (
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/25 border-t border-r border-white/20" />
            )}
            {activeFinish.id === 'fired' && (
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.45)_90%)]" />
            )}
            {activeFinish.id === 'metallic' && (
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-void/35 border-t border-l border-gold/15" />
            )}

            {/* Hover Tooltip display */}
            <AnimatePresence>
              {hoveredBrick === `${isEven ? 'even' : 'odd'}-${i}` && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: -45 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  className="absolute left-1/2 -translate-x-1/2 bg-void/95 border border-ash/20 py-1.5 px-3 z-30 pointer-events-none rounded-none backdrop-blur-md whitespace-nowrap shadow-xl"
                >
                  <span className="font-mono text-[8px] uppercase tracking-widest text-bone">
                    {activeColor.label} &bull; {activeSize.dims}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      );
    }

    return items;
  };

  return (
    <section
      id={SECTION_IDS.PLAYGROUND}
      ref={sectionRef}
      className="relative w-full h-[150vh] bg-void border-t border-ash/10"
    >
      {/* Sticky viewport content container */}
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Column: Live Visualizer Wall */}
        <motion.div 
          style={{ opacity: leftOpacity }}
          className="w-full md:w-[50%] h-[45vh] md:h-full bg-onyx/50 border-r border-ash/10 flex flex-col justify-center items-center p-8 md:p-16 relative"
        >
          {/* Section Header */}
          <div className="absolute top-10 left-8 md:left-16 z-20">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ash">Configurator &bull; 01</span>
            <TextReveal as="h2" className="font-serif text-2xl text-bone mt-2">Materiality Visualizer</TextReveal>
          </div>

          {/* Staggered Brick Wall Container */}
          <div className="w-full max-w-lg flex flex-col gap-1.5 p-6 border border-ash/5 bg-void/40 backdrop-blur-sm mt-16 md:mt-0">
            <div className={`flex gap-1.5 justify-center w-full ${activeSize.rowAspect}`}>{renderRow(false)}</div>
            <div className={`flex gap-1.5 justify-center w-full ${activeSize.rowAspect}`}>{renderRow(true)}</div>
            <div className={`flex gap-1.5 justify-center w-full ${activeSize.rowAspect}`}>{renderRow(false)}</div>
            <div className={`flex gap-1.5 justify-center w-full ${activeSize.rowAspect}`}>{renderRow(true)}</div>
            <div className={`flex gap-1.5 justify-center w-full ${activeSize.rowAspect}`}>{renderRow(false)}</div>
            <div className={`flex gap-1.5 justify-center w-full ${activeSize.rowAspect}`}>{renderRow(true)}</div>
          </div>

          {/* Dynamic Specs Tag */}
          <div className="absolute bottom-10 left-8 md:left-16 font-mono text-[9px] text-ash/40 uppercase tracking-widest">
            STAGGERED RUNNING BOND BONDING PATTERN
          </div>
        </motion.div>

        {/* Right Column: Control Parameters Panel */}
        <motion.div 
          style={{ y: configuratorY }}
          className="w-full md:w-[50%] h-[55vh] md:h-full bg-void overflow-y-auto flex flex-col justify-center px-8 py-12 md:px-20 md:py-24"
        >
          <div className="max-w-md w-full mx-auto flex flex-col gap-10">
            
            {/* Control 1: Palette Colors */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash">01 &bull; Geological Shade</span>
              <div className="flex flex-wrap gap-2.5">
                {COLORS.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => setActiveColor(col)}
                    className="relative flex items-center justify-center min-h-[44px] px-5 py-2 font-mono text-[9px] uppercase tracking-widest text-bone transition-all duration-300 border border-ash/20 hover:border-bone bg-transparent"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 ${col.class} border border-void`} />
                      {col.label}
                    </span>
                    {activeColor.id === col.id && (
                      <motion.div
                        layoutId="activeColorBg"
                        className="absolute inset-0 border border-ember bg-ember/5"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Dimensions */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash">02 &bull; Dimensional Scale</span>
              <div className="flex flex-wrap gap-2.5">
                {SIZES.map((sz) => (
                  <button
                    key={sz.id}
                    onClick={() => setActiveSize(sz)}
                    className="relative flex flex-col items-start justify-center min-h-[44px] px-6 py-2.5 font-mono text-[9px] uppercase tracking-widest text-bone transition-all duration-300 border border-ash/20 hover:border-bone bg-transparent"
                  >
                    <span className="relative z-10 font-bold">{sz.label}</span>
                    <span className="relative z-10 text-[8px] text-ash mt-0.5">{sz.dims}</span>
                    {activeSize.id === sz.id && (
                      <motion.div
                        layoutId="activeSizeBg"
                        className="absolute inset-0 border border-ember bg-ember/5"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Tactile Texture */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash">03 &bull; Surface Texture</span>
              <div className="flex flex-wrap gap-2.5">
                {TEXTURES.map((tex) => (
                  <button
                    key={tex.id}
                    onClick={() => setActiveTexture(tex)}
                    className="relative flex flex-col items-start justify-center min-h-[44px] px-5 py-2 font-mono text-[9px] uppercase tracking-widest text-bone transition-all duration-300 border border-ash/20 hover:border-bone bg-transparent"
                  >
                    <span className="relative z-10 font-bold">{tex.label}</span>
                    <span className="relative z-10 text-[8px] text-ash mt-0.5">{tex.desc}</span>
                    {activeTexture.id === tex.id && (
                      <motion.div
                        layoutId="activeTextureBg"
                        className="absolute inset-0 border border-ember bg-ember/5"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 4: Kiln Finish */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash">04 &bull; Kiln Finish</span>
              <div className="flex flex-wrap gap-2.5">
                {FINISHES.map((fin) => (
                  <button
                    key={fin.id}
                    onClick={() => setActiveFinish(fin)}
                    className="relative flex flex-col items-start justify-center min-h-[44px] px-5 py-2 font-mono text-[9px] uppercase tracking-widest text-bone transition-all duration-300 border border-ash/20 hover:border-bone bg-transparent"
                  >
                    <span className="relative z-10 font-bold">{fin.label}</span>
                    <span className="relative z-10 text-[8px] text-ash mt-0.5">{fin.desc}</span>
                    {activeFinish.id === fin.id && (
                      <motion.div
                        layoutId="activeFinishBg"
                        className="absolute inset-0 border border-ember bg-ember/5"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
