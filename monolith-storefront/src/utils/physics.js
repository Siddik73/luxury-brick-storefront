/**
 * @file physics.js
 * @description Matter.js helper module. Sets up the engine, renderer, runner,
 * boundaries, and mouse constraint handlers for dragging blocks. Exposes add, reset, and destroy controls.
 */

import Matter from 'matter-js';

const BRICK_WIDTH = 86;
const BRICK_HEIGHT = 41;
const DEFAULT_SPAWN_COUNT = 10;

/**
 * Creates and starts a Matter.js physics world inside a target element.
 * @param {HTMLDivElement} container - Container to mount the canvas renderer.
 * @param {Object} callbacks - Interactive callbacks.
 * @param {Function} [callbacks.onCollisionStart] - Collision callback.
 * @param {Function} [callbacks.onBlockGrab] - Grab/drag callback.
 * @param {Function} [callbacks.onCountChange] - Count callback.
 * @returns {Object} Controlled object to interact with the running world.
 */
export function createPhysicsWorld(container, { onCollisionStart, onBlockGrab, onCountChange }) {
  const width = container.clientWidth;
  const height = container.clientHeight;

  // TODO: Implement Matter.js setup.
  // 1. Create Engine and World.
  // 2. Setup Canvas Renderer and run Matter.Runner.
  // 3. Create static floor/wall bounds.
  // 4. Bind MouseConstraint for drag inputs.
  // 5. Setup collision listeners and dispatch events.

  const engine = Matter.Engine.create();
  const world = engine.world;
  
  // Set gravity configuration (standard down gravity)
  engine.gravity.y = 1;

  const render = Matter.Render.create({
    element: container,
    engine: engine,
    options: {
      width,
      height,
      background: 'transparent',
      wireframes: false,
    },
  });

  // Structural boundary limits
  const ground = Matter.Bodies.rectangle(width / 2, height + 25, width * 2, 50, {
    isStatic: true,
    render: { fillStyle: '#161616' },
  });
  const leftWall = Matter.Bodies.rectangle(-25, height / 2, 50, height * 2, { isStatic: true });
  const rightWall = Matter.Bodies.rectangle(width + 25, height / 2, 50, height * 2, { isStatic: true });

  Matter.World.add(world, [ground, leftWall, rightWall]);

  const bricks = [];

  const addBrick = () => {
    const x = Math.random() * (width - BRICK_WIDTH * 2) + BRICK_WIDTH;
    const y = -Math.random() * 200 - 50;
    const angle = (Math.random() - 0.5) * 0.5;

    const newBrick = Matter.Bodies.rectangle(x, y, BRICK_WIDTH, BRICK_HEIGHT, {
      angle,
      restitution: 0.35, // Elasticity
      friction: 0.4,
      density: 0.002,
      render: {
        fillStyle: '#D83528', // Ember Red
        strokeStyle: '#0A0A0A',
        lineWidth: 1.5,
      },
    });

    bricks.push(newBrick);
    Matter.World.add(world, newBrick);
    
    if (onCountChange) {
      onCountChange(bricks.length);
    }
  };

  // Populate default units
  for (let i = 0; i < DEFAULT_SPAWN_COUNT; i++) {
    addBrick();
  }

  // Interactivity constraints
  const mouse = Matter.Mouse.create(render.canvas);
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.15,
      render: { visible: false },
    },
  });

  Matter.World.add(world, mouseConstraint);
  render.mouse = mouse;

  // Collision Synthesizer binding
  Matter.Events.on(engine, 'collisionStart', (event) => {
    if (onCollisionStart) {
      onCollisionStart();
    }
  });

  // Grab Synthesizer binding
  let isDragging = false;
  Matter.Events.on(mouseConstraint, 'startdrag', () => {
    isDragging = true;
    if (onBlockGrab) {
      onBlockGrab();
    }
  });

  // Runner loop setup
  const runner = Matter.Runner.create();
  Matter.Runner.run(runner, engine);
  Matter.Render.run(render);

  const handleResize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    
    render.canvas.width = w;
    render.canvas.height = h;
    render.options.width = w;
    render.options.height = h;

    Matter.Body.setPosition(ground, { x: w / 2, y: h + 25 });
    Matter.Body.setPosition(rightWall, { x: w + 25, y: h / 2 });
  };

  window.addEventListener('resize', handleResize);

  return {
    addBrick,
    reset: () => {
      bricks.forEach((b) => Matter.World.remove(world, b));
      bricks.length = 0;
      for (let i = 0; i < DEFAULT_SPAWN_COUNT; i++) {
        addBrick();
      }
    },
    destroy: () => {
      window.removeEventListener('resize', handleResize);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    },
  };
}
