/**
 * GA4 measurement ID for the server root layout to pass into `CookieBanner`.
 *
 * - Prefer `GA_MEASUREMENT_ID` for Docker / docker-compose (set at **container runtime**).
 * - `NEXT_PUBLIC_GA_ID` still works when set at **build** time (e.g. Vercel) or in `.env.local` for `next dev`.
 */
export function getGaMeasurementId(): string {
  return (
    process.env.GA_MEASUREMENT_ID?.trim() ||
    process.env.NEXT_PUBLIC_GA_ID?.trim() ||
    ""
  );
}
