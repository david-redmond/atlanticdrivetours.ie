"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = {
  href: string;
  event: string;
  eventParams?: Record<string, string | number | boolean>;
  /** Render a plain anchor (for external links like WhatsApp / tel:) instead of next/link. */
  external?: boolean;
  className?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
  children: ReactNode;
};

/**
 * Link/anchor that fires a GA4 event on click. Lets server components add
 * conversion tracking to CTAs without becoming client components themselves.
 */
export default function TrackedLink({
  href,
  event,
  eventParams,
  external,
  className,
  ariaLabel,
  target,
  rel,
  children,
}: TrackedLinkProps) {
  const handleClick = () => trackEvent(event, eventParams);

  if (external) {
    return (
      <a
        href={href}
        className={className}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
