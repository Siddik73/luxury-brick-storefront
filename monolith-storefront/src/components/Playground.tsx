import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { playThud, playRustle } from '../utils/sound';

const BRICK_COUNT = 12;
const BRICK_WIDTH = 86;
const BRICK_HEIGHT = 41;
const RUSTLE_INTERVAL_MS = 150;

export default function Playground() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const bricksRef = useRef<Matter.Body[]>([]);
  const lastRustleAt = useRef(0);
  const hoveredBodyRef = useRef<Matter.Body | null>(null);

  const spawnBricks = (world: Matter.World, width: number) => {
    bricksRef.current.forEach((brick) => Matter.World.remove(world, brick));
    bricksRef.current = [];

    const bricks = Array.from({ length: BRICK_COUNT }, () => {
      const x = Math.random() * (width - BRICK_WIDTH * 2) + BRICK_WIDTH;
      const y = -Math.random() * 600 - 50;
      const angle = (Math.random() - 0.5) * 0.6;
      return Matter.Bodies.rectangle(x, y, BRICK_WIDTH, BRICK_HEIGHT, {
        angle,
        restitution: 0.4,
        friction: 0.3,
        render: {
          fillStyle: '#D83528',
          strokeStyle: '#0A0A0A',
          lineWidth: 1,
        },
      });
    });

    Matter.World.add(world, bricks);
    bricksRef.current = bricks;
  };

  useEffect(() => {
    const container = sceneRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const engine = Matter.Engine.create();
    const world = engine.world;
    engineRef.current = engine;

    const render = Matter.Render.create({
      element: container,
      engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
      },
    });
    renderRef.current = render;

    const ground = Matter.Bodies.rectangle(width / 2, height + 25, width * 2, 50, {
      isStatic: true,
      render: { fillStyle: '#161616' },
    });
    const leftWall = Matter.Bodies.rectangle(-25, height / 2, 50, height * 2, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(width + 25, height / 2, 50, height * 2, {
      isStatic: true,
    });
    Matter.World.add(world, [ground, leftWall, rightWall]);

    spawnBricks(world, width);

    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Matter.World.add(world, mouseConstraint);
    render.mouse = mouse;

    Matter.Events.on(engine, 'collisionStart', () => {
      playThud();
    });

    const handlePointerMove = () => {
      const found = Matter.Query.point(bricksRef.current, mouse.position)[0] ?? null;
      if (found && found !== hoveredBodyRef.current) {
        hoveredBodyRef.current = found;
        const now = performance.now();
        if (now - lastRustleAt.current > RUSTLE_INTERVAL_MS) {
          lastRustleAt.current = now;
          playRustle();
        }
      } else if (!found) {
        hoveredBodyRef.current = null;
      }
    };
    render.canvas.addEventListener('mousemove', handlePointerMove);

    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    const handleResize = () => {
      if (!container) return;
      render.canvas.width = container.clientWidth;
      render.canvas.height = container.clientHeight;
      render.options.width = container.clientWidth;
      render.options.height = container.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      render.canvas.removeEventListener('mousemove', handlePointerMove);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  const handleReset = () => {
    const engine = engineRef.current;
    const container = sceneRef.current;
    if (!engine || !container) return;
    spawnBricks(engine.world, container.clientWidth);
  };

  return (
    <section id="playground" className="relative w-full bg-onyx">
      <div ref={sceneRef} className="h-[80vh] w-full [&_canvas]:shadow-[0_20px_60px_rgba(0,0,0,0.6)]" />
      <button
        type="button"
        onClick={handleReset}
        className="magnetic absolute right-6 top-32 z-10 min-h-[44px] touch-manipulation border border-bone bg-void/80 px-6 py-2 font-mono text-xs uppercase tracking-widest text-bone backdrop-blur-sm transition-all duration-300 hover:bg-bone hover:text-void active:scale-95"
      >
        Reset View
      </button>
    </section>
  );
}
