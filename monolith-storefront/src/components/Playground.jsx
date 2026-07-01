/**
 * @file Playground.jsx
 * @description Interactive 2D/3D physics environment utilizing Matter.js.
 * Allows users to interact with multiple instances of "The Monolith" brick, throwing,
 * stacking, and colliding them with haptic sound feedback (AudioContext thuds and rustles).
 */

import React, { useEffect, useRef, useState } from 'react';
import { createPhysicsWorld } from '../utils/physics.js';
import { playThud, playRustle } from '../utils/sound.js';
import { SECTION_IDS } from '../utils/constants.js';

/**
 * Interactive Playground component.
 * @returns {React.ReactElement} The rendered section.
 */
export default function Playground() {
  const canvasContainerRef = useRef(null);
  const worldInstanceRef = useRef(null);
  const [activeBricksCount, setActiveBricksCount] = useState(0);

  useEffect(() => {
    // TODO: Initialize Matter.js Physics Engine and render it within canvasContainerRef.
    // 1. Invoke `createPhysicsWorld` targeting the container's client dimensions.
    // 2. Set up collision event listeners in Matter.js to trigger `playThud()` on block impacts.
    // 3. Attach drag events to play `playRustle()` when blocks are grabbed or dragged.
    // 4. Implement resize boundaries handler.

    let physicsWorld = null;

    if (canvasContainerRef.current) {
      physicsWorld = createPhysicsWorld(canvasContainerRef.current, {
        onCollisionStart: () => {
          // Play heavy bass thud sound on collision
          playThud();
          
          // Trigger subtle haptic screen shake class on the wrapper
          if (canvasContainerRef.current) {
            canvasContainerRef.current.classList.add('animate-haptic-shake');
            setTimeout(() => {
              canvasContainerRef.current?.classList.remove('animate-haptic-shake');
            }, 400);
          }
        },
        onBlockGrab: () => {
          // Play rustling sound when grabbing block
          playRustle();
        },
        onCountChange: (count) => {
          setActiveBricksCount(count);
        }
      });

      worldInstanceRef.current = physicsWorld;
    }

    return () => {
      if (physicsWorld) {
        physicsWorld.destroy();
      }
    };
  }, []);

  const handleReset = () => {
    if (worldInstanceRef.current) {
      worldInstanceRef.current.reset();
    }
  };

  const handleAddBrick = () => {
    if (worldInstanceRef.current) {
      worldInstanceRef.current.addBrick();
    }
  };

  return (
    <section
      id={SECTION_IDS.PLAYGROUND}
      className="relative w-full border-t border-ash/20 bg-void"
    >
      {/* Physics Canvas Wrapper */}
      <div
        ref={canvasContainerRef}
        className="h-[80vh] w-full bg-onyx transition-all duration-300 [&_canvas]:block [&_canvas]:w-full [&_canvas]:h-full"
      />

      {/* Floating Control Panel */}
      <div className="absolute right-6 top-8 z-10 flex flex-col gap-4 bg-void/80 p-6 backdrop-blur-md border border-ash/10 md:right-16 md:top-12">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[9px] uppercase tracking-widest text-ash">System Matrix</span>
          <span className="font-serif text-lg text-bone">Dynamic Structuralism</span>
        </div>
        
        <div className="h-px bg-ash/10 my-1" />

        <div className="flex flex-col gap-2 font-mono text-[10px] uppercase text-ash/80">
          <span>Active Units: <strong className="text-ember font-bold">{activeBricksCount}</strong></span>
          <span>Gravity: 1.0 G</span>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <button
            type="button"
            onClick={handleAddBrick}
            className="magnetic min-h-[44px] border border-ash/20 bg-transparent px-6 py-2 font-sans text-xs uppercase tracking-widest text-bone transition-all duration-300 hover:border-bone hover:bg-bone hover:text-void active:scale-95"
          >
            Deploy Unit
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            className="magnetic min-h-[44px] border border-ash/20 bg-transparent px-6 py-2 font-sans text-xs uppercase tracking-widest text-bone transition-all duration-300 hover:border-ember hover:bg-ember hover:text-bone active:scale-95"
          >
            Reset Matrix
          </button>
        </div>
      </div>
      
      {/* Instruct Overlay */}
      <div className="pointer-events-none absolute bottom-8 left-6 z-10 hidden font-mono text-[10px] uppercase tracking-widest text-ash/40 md:block md:left-16">
        Click + Drag to throw units &bull; Deploy multiple to test boundaries
      </div>
    </section>
  );
}
