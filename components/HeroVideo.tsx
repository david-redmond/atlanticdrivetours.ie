"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShowVideo(true);
  }, []);

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
