"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/** Client: show the video only when the user has not requested reduced motion. */
function getMotionAllowed() {
  return !window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/** Server/hydration: keep the still poster until the client confirms preference. */
function getMotionAllowedServer() {
  return false;
}

type HeroVideoProps = {
  /** Path to the looping background video (e.g. /gallery/clip.mp4). */
  src: string;
  /** Poster/fallback image shown before the video loads, for no-JS, and for reduced-motion users. */
  poster: string;
  /** Accessible description for the poster image. */
  alt: string;
};

/**
 * Decorative looping hero background. Renders the poster image as the base
 * (covers no-JS and the brief load gap) and overlays a muted, looping,
 * autoplaying video on top. Respects `prefers-reduced-motion`: motion-sensitive
 * users keep the still poster and the video is never loaded.
 */
export default function HeroVideo({ src, poster, alt }: HeroVideoProps) {
  const showVideo = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionAllowed,
    getMotionAllowedServer
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (showVideo) {
      videoRef.current?.play().catch(() => {
        /* Autoplay may be blocked; poster image remains as the fallback. */
      });
    }
  }, [showVideo]);

  return (
    <>
      <Image
        src={poster}
        alt={alt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          aria-hidden
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </>
  );
}
