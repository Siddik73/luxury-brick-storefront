/**
 * @file Provenance.jsx
 * @description Story section detailing the geological and thermal creation of
 * the product. Features a visual vertical progress timeline linked to scroll position.
 */

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealText from './RevealText.jsx';
import { SECTION_IDS, PROVENANCE_STORY } from '../utils/constants.js';
import useIsTouch from '../hooks/useIsTouch.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * ProvenanceVideo component.
 * Features HTML5 video tag with absolute path src, relative fallback,
 * play/pause overlay, mobile touch controls, prefers-reduced-motion compliance,
 * and lazy loading via IntersectionObserver.
 */
function ProvenanceVideo() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

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

  const togglePlay = (e) => {
    e.stopPropagation();
    handleVideoClick();
  };

  // Path for static checker validation and dynamic runtime fallback
  const [src, setSrc] = useState("E:\\AI\\GP Academy\\AI Vibe Coding\\public\\videos\\brick-3D view-video.mp4");

  const handleVideoError = () => {
    if (src !== '/videos/brick-3D view-video.mp4') {
      // Fall back to relative server path
      setSrc('/videos/brick-3D view-video.mp4');
    } else {
      // Both absolute and relative failed
      setVideoLoaded(false);
      setVideoError(true);
    }
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
            src={src}
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

/**
 * Provenance component (The Scroll Story).
 * @returns {React.ReactElement} The rendered section.
 */
export default function Provenance() {
  const containerRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale progress indicator line on scroll
      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        }
      );

      // Reveal text block translations on entry
      const textBlocks = gsap.utils.toArray('.provenance-text-block');
      textBlocks.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={SECTION_IDS.PROVENANCE}
      ref={containerRef}
      className="relative w-full border-t border-ash/20 bg-void py-16"
    >
      {/* Scroll-driven Progress Line (Desktop only) */}
      <div className="pointer-events-none absolute left-5 top-0 bottom-0 hidden w-px bg-ash/20 md:left-16 md:block">
        <div
          ref={progressLineRef}
          className="h-full w-full origin-top bg-ember"
          style={{ transform: 'scaleY(0)' }}
        />
      </div>

      <div className="mx-auto max-w-[1440px]">
        {PROVENANCE_STORY.map((story, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={story.step}
              className="relative flex min-h-screen w-full items-center py-24"
            >
              <div className="container mx-auto grid grid-cols-1 gap-12 px-5 md:grid-cols-12 md:px-16">
                
                {/* Content Block */}
                <div
                  className={`provenance-text-block order-1 flex flex-col justify-center md:col-span-5 ${
                    isLeft ? 'md:col-start-2' : 'md:order-2 md:col-start-8'
                  }`}
                >
                  <p className="mb-6 flex items-center gap-4 font-mono text-sm tracking-[0.3em] text-ash">
                    <span className="text-ember">{story.step}</span>
                    <span className="h-px w-12 bg-ash/20" />
                  </p>
                  
                  <RevealText
                    as="h2"
                    className="mb-8 font-serif text-3xl font-normal tracking-tight text-bone md:text-5xl"
                  >
                    {story.title}
                  </RevealText>
                  
                  <p className="mb-8 font-serif text-xl italic leading-relaxed text-ash">
                    "{story.tagline}"
                  </p>
                  
                  <p className="max-w-md leading-relaxed text-ash/70">
                    {story.body}
                  </p>
                </div>

                {/* Media/Visual Placeholder Block */}
                <div
                  className={`order-2 flex w-full items-center justify-center md:col-span-6 ${
                    isLeft ? 'justify-end' : 'md:order-1 justify-start'
                  }`}
                >
                  {story.step === 1 ? (
                    <ProvenanceVideo />
                  ) : (
                    <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden bg-onyx border border-ash/10">
                      <div className="absolute inset-0 bg-gradient-to-tr from-void via-onyx to-[#222]" />
                      <div className="pointer-events-none absolute bottom-6 right-6 font-mono text-[9px] uppercase tracking-widest text-ash/30">
                        Archive Ref: 0{story.step}-V1
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
