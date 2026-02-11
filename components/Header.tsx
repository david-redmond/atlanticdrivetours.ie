'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Locale } from '@/lib/translations';

export default function Header() {
  const { t, locale, setLocale } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-white'
      }`}
    >
      {/* Top Bar - Language Switcher */}
      <div className="hidden lg:block bg-[var(--muted)] border-b border-[var(--border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-end py-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-[var(--text-muted)] mr-2 uppercase tracking-wide">Language:</span>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-2 py-1 rounded-md transition-all ${
                  locale === 'en'
                    ? 'bg-[var(--primary)] ring-2 ring-[var(--primary)] ring-offset-1'
                    : 'opacity-70 hover:opacity-100 hover:bg-[var(--muted)]'
                }`}
                aria-label="Switch to English"
                title="English"
              >
                <span className="text-2xl">🇺🇸</span>
              </button>
              <button
                onClick={() => handleLanguageChange('ga')}
                className={`px-2 py-1 rounded-md transition-all ${
                  locale === 'ga'
                    ? 'bg-[var(--primary)] ring-2 ring-[var(--primary)] ring-offset-1'
                    : 'opacity-70 hover:opacity-100 hover:bg-[var(--muted)]'
                }`}
                aria-label="Switch to Irish"
                title="Gaeilge"
              >
                <span className="text-2xl">🇮🇪</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between py-4">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Atlantic Drive Tours"
              width={240}
              height={80}
              className="h-16 md:h-20 w-auto object-contain transition-all duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            <Link
              href="/"
              className="px-4 py-2 text-[var(--text-primary)] hover:text-[var(--primary)] hover:bg-[var(--muted)] transition-all font-medium text-sm uppercase tracking-wide rounded-md"
            >
              {t('common.home')}
            </Link>
            <Link
              href="/services"
              className="px-4 py-2 text-[var(--text-primary)] hover:text-[var(--primary)] hover:bg-[var(--muted)] transition-all font-medium text-sm uppercase tracking-wide rounded-md"
            >
              {t('common.services')}
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 text-[var(--text-primary)] hover:text-[var(--primary)] hover:bg-[var(--muted)] transition-all font-medium text-sm uppercase tracking-wide rounded-md"
            >
              {t('common.about')}
            </Link>
            <Link
              href="/experiences"
              className="px-4 py-2 text-[var(--text-primary)] hover:text-[var(--primary)] hover:bg-[var(--muted)] transition-all font-medium text-sm uppercase tracking-wide rounded-md"
            >
              {t('common.experiences')}
            </Link>
            <Link
              href="/reviews"
              className="px-4 py-2 text-[var(--text-primary)] hover:text-[var(--primary)] hover:bg-[var(--muted)] transition-all font-medium text-sm uppercase tracking-wide rounded-md"
            >
              {t('common.reviews')}
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-all font-medium text-sm uppercase tracking-wide rounded-md"
            >
              {t('common.contact')}
            </Link>
          </div>

          {/* Mobile Menu Button & Language Switcher */}
          <div className="lg:hidden flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-2 py-1 rounded-md transition-all ${
                  locale === 'en'
                    ? 'ring-2 ring-[var(--primary)] ring-offset-1'
                    : 'opacity-70 hover:opacity-100'
                }`}
                aria-label="Switch to English"
                title="English"
              >
                <span className="text-xl">🇺🇸</span>
              </button>
              <button
                onClick={() => handleLanguageChange('ga')}
                className={`px-2 py-1 rounded-md transition-all ${
                  locale === 'ga'
                    ? 'ring-2 ring-[var(--primary)] ring-offset-1'
                    : 'opacity-70 hover:opacity-100'
                }`}
                aria-label="Switch to Irish"
                title="Gaeilge"
              >
                <span className="text-xl">🇮🇪</span>
              </button>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[var(--text-primary)] p-2 hover:bg-[var(--muted)] rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-[var(--border)]">
            <div className="flex flex-col space-y-1 pt-4">
              <Link
                href="/"
                className="px-4 py-2 text-[var(--text-primary)] hover:text-[var(--primary)] hover:bg-[var(--muted)] transition-colors font-medium rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('common.home')}
              </Link>
              <Link
                href="/services"
                className="px-4 py-2 text-[var(--text-primary)] hover:text-[var(--primary)] hover:bg-[var(--muted)] transition-colors font-medium rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('common.services')}
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 text-[var(--text-primary)] hover:text-[var(--primary)] hover:bg-[var(--muted)] transition-colors font-medium rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('common.about')}
              </Link>
              <Link
                href="/experiences"
                className="px-4 py-2 text-[var(--text-primary)] hover:text-[var(--primary)] hover:bg-[var(--muted)] transition-colors font-medium rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('common.experiences')}
              </Link>
              <Link
                href="/reviews"
                className="px-4 py-2 text-[var(--text-primary)] hover:text-[var(--primary)] hover:bg-[var(--muted)] transition-colors font-medium rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('common.reviews')}
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-colors font-medium rounded-md text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('common.contact')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
