import en from '@/locales/en.json';
import ga from '@/locales/ga.json';

export type Locale = 'en' | 'ga';

export const locales: Locale[] = ['en', 'ga'];
export const defaultLocale: Locale = 'en';

export const translations = {
  en,
  ga,
} as const;

export type TranslationKey = keyof typeof en;
type TranslationValue = string | { [key: string]: TranslationValue };
export type TranslationParams = Record<string, string | number>;

// Helper function to get nested translation value
export function getNestedValue(obj: TranslationValue, path: string): string {
  const keys = path.split('.');
  let value: TranslationValue = obj;
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = (value as Record<string, TranslationValue>)[key];
    } else {
      return path; // Return path if not found (fallback)
    }
  }
  return typeof value === 'string' ? value : path;
}

function interpolate(template: string, params?: TranslationParams): string {
  if (!params) return template;
  return Object.entries(params).reduce(
    (result, [key, value]) =>
      result.replaceAll(`{{${key}}}`, String(value)),
    template,
  );
}

// Translation function
export function t(
  locale: Locale,
  key: string,
  params?: TranslationParams,
): string {
  const translation = translations[locale];
  const template = getNestedValue(translation as unknown as TranslationValue, key);
  return interpolate(template, params);
}
