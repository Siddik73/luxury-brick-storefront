import { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion, useAnimationFrame } from 'framer-motion';
import TextReveal from './TextReveal.jsx';
import useIsTouch from '../hooks/useIsTouch.js';

// Segment-specific copywriting and details
const SEGMENT_COPY = {
  decorative: {
    title: "Specify atmosphere.",
    desc: "An elemental convergence of geological time and human intention. Crafted for architectural signatures and refined interiors."
  },
  construction: {
    title: "Build to last.",
    desc: "Heavyweight structural clay load-bearing masonry units. Engineered for extreme engineering tolerances and permanent structure."
  },
  artisan: {
    title: "Heritage, fired.",
    desc: "Hand-fired at 1,200°C in historic restoration kilns. The raw texture of ancient riverbeds preserved in permanent clay."
  },
  ecommerce: {
    title: "Brick, delivered.",
    desc: "Acquire the standard-setting luxury clay brick directly to your project site. Simplified, high-end procurement."
  }
};

/**
 * Hero Section component.
 * Features scroll-pinned cinematic background video scrubbed via useAnimationFrame,
 * staggered typography mask reveals, segment-aware copy, and a magnetic CTA.
 */
export default function Hero({ activeSegment = 'decorative' }) {
  const isTouch = useIsTouch();
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Setup scroll tracking on the 200vh parent container for pinning
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform values for cinematic transition details
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.85, 0.4, 0.15]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45, 0.7], [1, 0.5, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.7], [0, -60]);
  const blurValue = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(8px)"]);

  // Scrub video currentTime smoothly based on scroll
  useAnimationFrame(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      // Let hover play logic handle it
      return;
    }

    const duration = video.duration;
    if (isNaN(duration) || duration <= 0) return;

    const progress = scrollYProgress.get();

    // Idle state: autoplay and loop at the top (scroll progress close to 0)
    if (progress < 0.005) {
      if (video.paused && !isTouch) {
        video.play().catch(err => console.log('Autoplay blocked:', err));
      }
      return;
    }

    // Scroll scrubbing state: pause and bind to scroll position
    if (!video.paused && !isTouch) {
      video.pause();
    }

    const targetTime = progress * duration;
    const currentTime = video.currentTime;
    const lerpFactor = 0.15; // Smooth interpolation to remove scrolling jitter

    if (Math.abs(targetTime - currentTime) > 0.01) {
      video.currentTime = currentTime + (targetTime - currentTime) * lerpFactor;
    }
  });

  // Handle hover-to-unfreeze for cinematic free exploration
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isTouch) return;

    if (isHovered) {
      video.play().catch(err => console.log('Playback paused by browser policy:', err));
    } else {
      // If scroll is not at the top, pause it to resume scroll scrubbing
      if (scrollYProgress.get() >= 0.005) {
        video.pause();
      }
    }
    // scrollYProgress is a stable MotionValue reference; omitting it is intentional.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, isTouch]);

  const handleVideoError = () => {
    setVideoError(true);
  };

  const copy = SEGMENT_COPY[activeSegment] || SEGMENT_COPY.decorative;

  return (
    <section id="hero" ref={containerRef} className="relative h-[200vh] w-full bg-void">
      {/* Sticky full-viewport frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
        
        {/* Dynamic vignette gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-void/10 via-void/50 to-void z-10 pointer-events-none" />

        {/* Video Canvas Container */}
        <motion.div 
          style={{ scale: videoScale, filter: blurValue, opacity: videoOpacity }}
          className="absolute inset-0 w-full h-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {videoError ? (
            <img
              src="/brick-fallback.png"
              alt="The brick in dramatic studio lighting"
              className="w-full h-full object-cover opacity-60"
            />
          ) : (
            <video
              ref={videoRef}
              src="/videos/brick-3D view-video.mp4"
              className="w-full h-full object-cover"
              style={{ opacity: videoLoaded ? 1 : 0 }}
              autoPlay
              muted
              playsInline
              loop
              preload="metadata"
              poster="/images/brick-poster.webp"
              onLoadedData={() => {
                setVideoLoaded(true);
                if (videoRef.current && scrollYProgress.get() >= 0.005) {
                  videoRef.current.pause(); // Only pause on load if we are already scrolled down
                }
              }}
              onError={handleVideoError}
            />
          )}
          
          {/* Skeleton Shimmer loader */}
          {!videoLoaded && !videoError && (
            <div className="absolute inset-0 bg-onyx flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-ash/5 to-transparent animate-shimmer absolute inset-0" />
              <span className="font-mono text-xs uppercase tracking-widest text-ash animate-pulse z-10">
                Laying Foundation...
              </span>
            </div>
          )}
        </motion.div>

        {/* Copy Overlay Grid */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-20 flex flex-col items-center text-center px-6 max-w-4xl mt-12"
        >
          <TextReveal 
            key={activeSegment}
            as="h1" 
            splitBy="characters"
            className="font-serif text-5xl uppercase tracking-tighter text-bone md:text-[80px] md:leading-[90px] mb-8"
          >
            {copy.title}
          </TextReveal>

          <p className="font-sans text-base leading-relaxed tracking-wide text-ash max-w-xl mb-12">
            {copy.desc}
          </p>

          <div className="flex gap-6 items-center">
            <a
              href="#checkout"
              className="magnetic min-h-[44px] touch-manipulation flex items-center justify-center bg-ember px-10 py-4 font-sans text-xs uppercase tracking-[0.2em] text-bone transition-all duration-300 hover:bg-gold hover:text-void active:scale-[0.98] border border-ember"
            >
              Specify &mdash; <span className="font-mono ml-2">$1,250</span>
            </a>
            <a
              href="#provenance"
              className="font-mono text-xs uppercase tracking-widest text-ash hover:text-bone border-b border-ash/20 pb-1 transition-colors duration-300"
            >
              Curation Story
            </a>
          </div>
        </motion.div>

        {/* Branding indicator */}
        <div className="absolute bottom-10 left-6 z-20 hidden md:block md:left-16 font-mono text-[9px] uppercase tracking-[0.3em] text-ash/40">
          SPECIFY &bull; SOURCE &bull; SPECIFY
        </div>

        {/* Scroll down mouse/bar */}
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 z-20 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-ash/40">Scroll to Layer</span>
          <div className="w-[1px] h-12 bg-ash/20 relative">
            <div className="w-[3px] h-[3px] bg-ember absolute top-0 left-1/2 -translate-x-1/2 rounded-full" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
