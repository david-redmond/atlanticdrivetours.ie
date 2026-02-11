'use client';

import Link from 'next/link';
import { useTranslation } from '@/contexts/TranslationContext';
import { getServices } from '@/data/services';

export default function Footer() {
  const { t, locale } = useTranslation();
  const services = getServices(locale);

  return (
    <footer className="bg-white text-[var(--footer-text)] border-t border-[var(--border)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">
              {t('footer.contactUs')}
            </h3>
            <div className="space-y-2 text-[var(--text-secondary)] text-sm">
              <p>
                <strong>{t('common.companyName')}</strong>
                <br />
                {t('footer.location')}
              </p>
              <p>
                <strong>Call:</strong>{' '}
                <a
                  href="tel:+353123456789"
                  className="text-[var(--primary)] hover:underline"
                >
                  {t('footer.phone')}
                </a>
                <br />
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:info@example.com"
                  className="text-[var(--primary)] hover:underline"
                >
                  {t('footer.email')}
                </a>
              </p>
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-[var(--text-primary)]">
              {t('footer.ourServices')}
            </h4>
            <div className="space-y-2 text-sm">
              {services.slice(0, 6).map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="block text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-[var(--text-primary)]">
              {t('footer.quickLinks')}
            </h4>
            <div className="space-y-2 text-sm">
              <Link
                href="/contact"
                className="block text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              >
                {t('footer.makeEnquiry')}
              </Link>
              <Link
                href="/contact"
                className="block text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              >
                {t('footer.makePayment')}
              </Link>
              <Link
                href="/about"
                className="block text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              >
                {t('footer.credentials')}
              </Link>
              <Link
                href="/contact"
                className="block text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              >
                {t('footer.privacyPolicy')}
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-[var(--text-primary)]">
              {t('footer.customerService')}
            </h4>
            <div className="space-y-2 text-sm">
              <Link
                href="/reviews"
                className="block text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              >
                {t('footer.testimonials')}
              </Link>
              <Link
                href="/about"
                className="block text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              >
                {t('footer.termsConditions')}
              </Link>
              <Link
                href="/contact"
                className="block text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              >
                {t('footer.sitemap')}
              </Link>
              <Link
                href="/contact"
                className="block text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              >
                {t('footer.locationMap')}
              </Link>
            </div>
          </div>
        </div>

        {/* Pricing Note */}
        <div className="border-t border-[var(--border)] pt-8 mb-8">
          <div className="text-center">
            <p className="font-semibold text-[var(--text-primary)] mb-2">
              {t('footer.pricingNote')}
            </p>
            <div className="h-px bg-[var(--border)] my-4"></div>
            <p className="text-sm text-[var(--text-secondary)]">
              {t('footer.pricingDescription')}
            </p>
            <div className="h-px bg-[var(--border)] my-4"></div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[var(--border)] pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-[var(--primary)] rounded"></div>
              <p className="text-sm text-[var(--text-secondary)]">
                © {new Date().getFullYear()} {t('common.companyName')}. | {t('footer.websiteBy')}{' '}
                <a
                  href="https://www.go-solutions.ie"
                  className="text-[var(--primary)] hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.go-solutions.ie
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
