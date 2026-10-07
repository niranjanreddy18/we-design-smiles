import { useCallback, useEffect, useRef, useState } from "react";

/**
 * VideoScrubber Component
 *
 * Cinematic WebP frame video player using HTML5 Canvas with viewport-triggered autoplay.
 * - Autoplays sequentially at 24 FPS when the hero section is in view.
 * - Pauses automatically when the section scrolls out of view, preserving current frame.
 * - Resumes playback smoothly from preserved frame when scrolling back into view.
 * - Loops seamlessly back to frame 1 after frame 240.
 * - Uses requestAnimationFrame with elapsed time tracking for monitor refresh-rate independence.
 * - Progressively preloads frames in the background; frame 1 loads immediately.
 * - Renders closest available frame if next frame is buffering to prevent blank canvas flickering.
 * - Respects prefers-reduced-motion for accessibility.
 *
 * @param {Object} props
 * @param {string} props.videoFramePath - Base public path to WebP frames directory
 * @param {number} props.totalFrames - Total count of frames to play through
 * @param {string} props.overlayTitle - Heading text displayed in bottom overlay
 * @param {string} props.overlayDescription - Subheading text displayed in bottom overlay
 */
function VideoScrubber({
  videoFramePath = "/videos/video_1_frames",
  totalFrames = 240,
  overlayTitle = "We Design Smiles - Professional Dental Care",
  overlayDescription = "Your journey to perfect smiles starts here.",
  className = "",
  ariaLabel,
}) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  // In-memory image cache indexed by frame index [0 ... totalFrames - 1]
  const frameCache = useRef(new Array(totalFrames).fill(null));
  // Track in-flight frame requests to avoid duplicate network fetches
  const pendingLoads = useRef(new Map());

  // Playback & Timing state refs
  const currentFrameRef = useRef(0);
  const isPlayingRef = useRef(false);
  const lastTimestampRef = useRef(null);
  const accumulatedTimeRef = useRef(0);
  const rafId = useRef(null);
  const lastDrawnIndex = useRef(-1);

  // Lifecycle & Progressive Preload refs
  const isCancelledRef = useRef(false);
  const hasStartedPreload = useRef(false);

  // UI state for initial frame display feedback
  const [isInitialReady, setIsInitialReady] = useState(false);

  // 24 FPS timing constant (~41.67ms per frame)
  const TARGET_FPS = 24;
  const FRAME_INTERVAL = 1000 / TARGET_FPS;

  /**
   * Helper to construct dynamic frame URL
   * Format: /videos/video_1_frames/frame_0001.webp
   */
  const getFrameUrl = useCallback(
    (index) => {
      const frameNumber = String(index + 1).padStart(4, "0");
      return `${videoFramePath}/frame_${frameNumber}.webp`;
    },
    [videoFramePath]
  );

  /**
   * Searches the cache for the closest available loaded frame to prevent blank canvas flickering
   */
  const getClosestLoadedFrameIndex = useCallback(
    (targetIndex) => {
      if (frameCache.current[targetIndex]) {
        return targetIndex;
      }

      let closestIndex = -1;
      let minDistance = Infinity;

      for (let i = 0; i < totalFrames; i++) {
        if (frameCache.current[i]) {
          const distance = Math.abs(i - targetIndex);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
          }
        }
      }

      return closestIndex;
    },
    [totalFrames]
  );

  /**
   * Draws a specific frame (or closest fallback) onto the HTML5 Canvas
   */
  const drawFrame = useCallback(
    (frameIndex) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const closestIndex = getClosestLoadedFrameIndex(frameIndex);
      if (closestIndex === -1) return;

      const image = frameCache.current[closestIndex];
      if (!image || !image.complete || image.naturalWidth === 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Preserve 1280x720 native resolution
      const naturalWidth = image.naturalWidth || 1280;
      const naturalHeight = image.naturalHeight || 720;

      if (canvas.width !== naturalWidth || canvas.height !== naturalHeight) {
        canvas.width = naturalWidth;
        canvas.height = naturalHeight;
      }

      ctx.drawImage(image, 0, 0, naturalWidth, naturalHeight);
      lastDrawnIndex.current = closestIndex;
    },
    [getClosestLoadedFrameIndex]
  );

  /**
   * Loads a single image frame and stores it in frameCache
   * Returns a Promise resolving to the HTMLImageElement or null on error
   */
  const loadSingleFrame = useCallback(
    (index) => {
      if (frameCache.current[index]) {
        return Promise.resolve(frameCache.current[index]);
      }

      if (pendingLoads.current.has(index)) {
        return pendingLoads.current.get(index);
      }

      const promise = new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(index);

        img.onload = () => {
          frameCache.current[index] = img;
          pendingLoads.current.delete(index);

          // If currently stopped or waiting on this frame, draw immediately
          if (currentFrameRef.current === index || lastDrawnIndex.current === -1) {
            drawFrame(currentFrameRef.current);
          }
          resolve(img);
        };

        img.onerror = () => {
          pendingLoads.current.delete(index);
          console.warn(`[VideoScrubber] Failed to load frame ${index + 1}: ${img.src}`);
          resolve(null);
        };
      });

      pendingLoads.current.set(index, promise);
      return promise;
    },
    [drawFrame, getFrameUrl]
  );

  /**
   * Progressively preloads all frames in the background using controlled concurrency.
   * Priority is given to early frames and sequential queue for smooth forward playback.
   */
  const startProgressiveLoading = useCallback(() => {
    if (hasStartedPreload.current || isCancelledRef.current) return;
    hasStartedPreload.current = true;

    // Load Frame 1 immediately with high priority
    loadSingleFrame(0).then((img) => {
      if (img && !isCancelledRef.current) {
        drawFrame(0);
        setIsInitialReady(true);
      }
    });

    // Build progressive queue: forward frames
    const queue = [];
    for (let i = 1; i < totalFrames; i++) {
      queue.push(i);
    }

    // Controlled concurrency pool of 6 connections to avoid network choking
    const CONCURRENCY_LIMIT = 6;
    let activeConnections = 0;

    const processQueue = () => {
      if (isCancelledRef.current) return;

      while (activeConnections < CONCURRENCY_LIMIT && queue.length > 0) {
        const nextIndex = queue.shift();

        // Skip if already loaded
        if (frameCache.current[nextIndex]) continue;

        activeConnections++;
        loadSingleFrame(nextIndex).finally(() => {
          activeConnections--;
          processQueue();
        });
      }
    };

    // Kick off progressive background loader
    processQueue();
  }, [drawFrame, loadSingleFrame, totalFrames]);

  /**
   * IntersectionObserver setup:
   * - Starts progressive loading & autoplays when the hero section enters the viewport.
   * - Pauses animation when leaving the viewport, preserving current frame.
   * - Resumes seamlessly when re-entering the viewport.
   */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    isCancelledRef.current = false;

    /**
     * Recursive animation loop driven by elapsed time at 24 FPS
     */
    function animateLoop(timestamp) {
      if (!isPlayingRef.current || isCancelledRef.current) return;

      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const delta = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;

      // Cap delta to prevent massive jumps if tab was backgrounded or system froze
      accumulatedTimeRef.current += Math.min(delta, 250);

      let shouldRedraw = false;

      // Advance by full frame intervals based on elapsed time
      while (accumulatedTimeRef.current >= FRAME_INTERVAL) {
        currentFrameRef.current = (currentFrameRef.current + 1) % totalFrames;
        accumulatedTimeRef.current -= FRAME_INTERVAL;
        shouldRedraw = true;
      }

      if (shouldRedraw) {
        drawFrame(currentFrameRef.current);
      }

      rafId.current = requestAnimationFrame(animateLoop);
    }

    /**
     * Starts or resumes playback
     */
    function startPlayback() {
      // Check accessibility: if reduced motion is requested, do not animate
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        drawFrame(0);
        return;
      }

      if (isPlayingRef.current) return;

      isPlayingRef.current = true;
      lastTimestampRef.current = null;
      accumulatedTimeRef.current = 0;

      rafId.current = requestAnimationFrame(animateLoop);
    }

    /**
     * Pauses playback, preserving the current frame
     */
    function pausePlayback() {
      isPlayingRef.current = false;

      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }

      lastTimestampRef.current = null;
      accumulatedTimeRef.current = 0;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          startProgressiveLoading();
          startPlayback();
        } else {
          pausePlayback();
        }
      },
      {
        threshold: 0.1, // Trigger when at least 10% of the hero section is visible
      }
    );

    observer.observe(section);

    return () => {
      isCancelledRef.current = true;
      pausePlayback();
      observer.disconnect();
    };
  }, [FRAME_INTERVAL, drawFrame, startProgressiveLoading, totalFrames]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-screen min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-white select-none ${className}`.trim()}
      aria-label={ariaLabel || overlayTitle}
    >
      {/* Subtle background ambient lighting glow */}
      <div
        className="absolute inset-0 bg-radial from-cyan-500/5 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Responsive Canvas Container with 16:9 ratio and max-w-[1200px] */}
      <div className="relative w-full max-w-[1200px] px-3 sm:px-6 lg:px-8 flex items-center justify-center py-6 sm:py-10 md:py-16">
        <div className="relative w-full aspect-video max-h-[82vh] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200/80 bg-slate-100 flex items-center justify-center">
          
          {/* HTML5 Canvas rendering WebP frames */}
          <canvas
            ref={canvasRef}
            width={1280}
            height={720}
            className="w-full h-full object-contain block"
            aria-label={overlayTitle}
          />

          {/* Subtle loading spinner while initial frame 1 is fetching */}
          {!isInitialReady && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-xs text-slate-800 z-20 transition-opacity duration-300"
              aria-live="polite"
            >
              <div className="w-10 h-10 border-3 border-cyan-500/30 border-t-[#06b6d4] rounded-full animate-spin mb-3" />
              <span className="text-xs sm:text-sm font-medium tracking-wide text-slate-600">
                Preparing cinematic experience...
              </span>
            </div>
          )}

          {/* Bottom white gradient transition into next section */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] min-h-[48px] sm:min-h-[72px] md:min-h-[84px] bg-gradient-to-t from-white/95 via-white/80 to-transparent flex flex-col items-center justify-end pb-1.5 sm:pb-3.5 md:pb-4 px-3 sm:px-4 text-center z-10">
            <h2 className="text-xs sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-slate-900 drop-shadow-xs line-clamp-1">
              {overlayTitle}
            </h2>
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-slate-700 font-medium mt-0.5 sm:mt-1 drop-shadow-xs line-clamp-1">
              {overlayDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Subtle animated scroll indicator near bottom of hero */}
      <div
        className="pointer-events-none absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-slate-600 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200/80 shadow-sm">
          Scroll to explore
        </span>
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-[#06b6d4] animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

export default VideoScrubber;