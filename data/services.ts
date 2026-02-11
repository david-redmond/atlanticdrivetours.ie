import { Locale, t } from '@/lib/translations';

export interface Service {
  id: string;
  titleKey: string;
  descriptionKey: string;
  fullDescriptionKey: string;
  image: string;
  featuresKeys: string[];
}

export const serviceIds = [
  'school-transport',
  'tourist-trips',
  'airport-transfers',
  'private-driver-hire',
  'corporate-transport',
  'event-transport',
] as const;

export type ServiceId = typeof serviceIds[number];

export function getServices(locale: Locale) {
  return serviceIds.map((id) => ({
    id,
    title: t(locale, `services.${id}.title`),
    description: t(locale, `services.${id}.description`),
    fullDescription: t(locale, `services.${id}.fullDescription`),
    image: `/images/${id}.jpg`,
    features: [
      t(locale, `services.${id}.features.0`),
      t(locale, `services.${id}.features.1`),
      t(locale, `services.${id}.features.2`),
      t(locale, `services.${id}.features.3`),
      t(locale, `services.${id}.features.4`),
    ],
  }));
}
