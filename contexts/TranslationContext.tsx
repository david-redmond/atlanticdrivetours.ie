'use client';

import React, { createContext, useContext, useState } from 'react';
import { Locale, defaultLocale, t, TranslationParams } from '@/lib/translations';

interface TranslationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: TranslationParams) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return defaultLocale;
    try {
      const savedLocale = localStorage.getItem('locale') as Locale | null;
      if (savedLocale && (savedLocale === 'en' || savedLocale === 'ga')) {
        return savedLocale;
      }
    } catch {
      // localStorage unavailable (e.g. private mode)
    }
    return defaultLocale;
  });

  // Save locale to localStorage when it changes
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('locale', newLocale);
    } catch {
      // localStorage unavailable
    }
  };

  const translate = (key: string, params?: TranslationParams): string => {
    return t(locale, key, params);
  };

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t: translate }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
