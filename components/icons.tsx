/**
 * Small inline SVG icons used for decorative link accents (e.g. footer
 * Specialist links). Stroke-based, inherit `currentColor`, and marked
 * aria-hidden since the adjacent text label conveys meaning.
 */

type IconProps = { className?: string };

export function TrophyIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M7 6H4.5A1.5 1.5 0 0 0 3 7.5C3 9.5 4.5 11 7 11" />
      <path d="M17 6h2.5A1.5 1.5 0 0 1 21 7.5C21 9.5 19.5 11 17 11" />
    </svg>
  );
}

export function GolfFlagIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 21V3" />
      <path d="M6 4h10l-2.5 3L16 10H6" />
      <path d="M6 21h6" />
    </svg>
  );
}

export function ShipIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 14l1.5 5.5a1 1 0 0 0 .96.73h13.08a1 1 0 0 0 .96-.73L21 14" />
      <path d="M4 14l8-3 8 3" />
      <path d="M12 11V6" />
      <path d="M9 6h6" />
      <path d="M12 3v3" />
    </svg>
  );
}

export function RouteIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M8 19h6a3 3 0 0 0 0-6H10a3 3 0 0 1 0-6h6" />
    </svg>
  );
}
