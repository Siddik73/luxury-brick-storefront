import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealText from './RevealText';
import useIsTouch from '../hooks/useIsTouch';

gsap.registerPlugin(ScrollTrigger);

const BLOCKS = [
  {
    n: '01',
    title: 'Compressed Earth.',
    quote: 'Sourced from ancient riverbeds. Mineral-laced. Untouched by modernity.',
    body: 'An elemental convergence of geological time and human intention. Each layer represents an epoch of silence.',
    align: 'left' as const,
  },
  {
    n: '02',
    title: 'Calcined Fire.',
    quote: 'Hand-fired at 1,200°C for seventy-two continuous hours. No shortcuts. No machines.',
    body: "The transformative power of heat crystallizes the earth's memory into a permanent state of grace.",
    align: 'right' as const,
  },
  {
    n: '03',
    title: 'Timeless Structure.',
    quote: 'Engineered to outlast its owner. To outlast the building. To outlast the century.',
    body: 'A commitment to permanence in a world of ephemeral trends. The final form of brutalist elegance.',
    align: 'left' as const,
  },
];

/**
 * ProvenanceVideo component.
 * Features HTML5 video tag with absolute path src, relative fallback,
 * play/pause overlay, mobile touch controls, prefers-reduced-motion compliance,
 * and lazy loading via IntersectionObserver.
 */
function ProvenanceVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);

  const isTouch = useIsTouch();

  // Respect prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  const shouldAutoplay = !isTouch && !prefersReducedMotion;

  // IntersectionObserver to lazy load video within 200px of viewport
  useEffect(() => {
    if (shouldLoad) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
        }
      },
      {
        rootMargin: '200px',
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [shouldLoad]);

  // Keep track of internal playing state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [videoLoaded]);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch((err) => console.log('Video play error:', err));
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleVideoClick();
  };

  const handleVideoError = () => {
    const video = videoRef.current;
    if (video) {
      const currentSrc = video.src || '';
      if (currentSrc.includes('AI%20Vibe') || currentSrc.includes('AI Vibe') || currentSrc.includes('E:') || currentSrc.includes('e:')) {
        video.src = '/videos/brick-3D view-video.mp4';
        video.load();
        return;
      }
    }
    setVideoLoaded(false);
    setVideoError(true);
  };

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="The Monolith 3D brick rotating in dramatic lighting"
      className="relative aspect-video w-full bg-onyx border border-ash rounded-none overflow-hidden mt-8 group touch-manipulation"
      onClick={isTouch ? handleVideoClick : undefined}
    >
      {/* Subtle pulsing ember red placeholder before video loads */}
      {!videoLoaded && !videoError && (
        <div className="absolute inset-0 bg-ember animate-pulse z-10" />
      )}

      {/* Fallback UI if video fails to load */}
      {videoError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-onyx">
          <span className="font-mono text-xl tracking-wider text-gold border-b border-gold pb-1">
            01 / 03
          </span>
        </div>
      ) : (
        shouldLoad && (
          <video
            ref={videoRef}
            src="E:\AI\GP Academy\AI Vibe Coding\public\videos\brick-3D view-video.mp4"
            autoPlay={shouldAutoplay}
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/brick-poster.webp"
            className="w-full h-full object-cover"
            onLoadedData={() => setVideoLoaded(true)}
            onError={handleVideoError}
          />
        )
      )}

      {/* Play/Pause hover button for desktop only */}
      {!isTouch && videoLoaded && !videoError && (
        <button
          onClick={togglePlay}
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-ember text-bone opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 focus:outline-none focus:opacity-100"
          aria-label={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? (
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}

export default function Provenance() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const texts = gsap.utils.toArray<HTMLElement>('.provenance-text');
      gsap.fromTo(
        texts,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const blocks = gsap.utils.toArray<HTMLElement>('.provenance-block');
      blocks.forEach((block) => {
        const image = block.querySelector('.provenance-image');
        if (!image) return;

        gsap.to(image, {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: block,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
      }).fromTo(progressLineRef.current, { scaleY: 0 }, { scaleY: 1, ease: 'none' });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="provenance" ref={sectionRef} className="relative w-full border-t border-ash/20">
      <div className="pointer-events-none absolute left-5 top-0 bottom-0 hidden w-px bg-ash/20 md:left-16 md:block">
        <div
          ref={progressLineRef}
          className="provenance-progress-line h-full w-full origin-top bg-ember"
        />
      </div>

      {BLOCKS.map((block) => (
        <div
          key={block.n}
          className="provenance-block relative flex min-h-screen w-full items-center overflow-hidden py-24"
        >
          <div className="container mx-auto grid grid-cols-1 gap-6 px-5 md:grid-cols-12 md:px-16">
            <div
              className={`provenance-text order-1 md:col-span-5 ${
                block.align === 'left' ? 'md:col-start-2' : 'md:order-2 md:col-start-8'
              }`}
            >
              <p className="mb-8 flex items-center gap-4 font-mono tracking-[0.3em] text-ash">
                <span className="text-ember">{block.n}</span>
                <span className="h-px w-12 bg-ash/40" />
              </p>
              <RevealText as="h2" className="mb-8 font-serif text-3xl tracking-tight text-bone md:text-5xl">
                {block.title}
              </RevealText>
              <p className="mb-10 font-serif text-xl italic text-ash">{block.quote}</p>
              <p className="max-w-sm leading-relaxed text-ash/60">{block.body}</p>
            </div>
            <div
              className={`order-2 flex w-full md:col-span-6 ${
                block.align === 'left' ? 'justify-end' : 'md:order-1 justify-start'
              }`}
            >
              {block.n === '01' ? (
                <ProvenanceVideo />
              ) : (
                <div className="h-[50vh] w-full overflow-hidden bg-onyx md:h-[70vh]">
                  <div
                    className="provenance-image h-full w-full bg-gradient-to-br from-onyx via-[#1a1a1a] to-void"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
