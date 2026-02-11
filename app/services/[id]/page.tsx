'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/contexts/TranslationContext';
import { getServices, serviceIds, ServiceId } from '@/data/services';

export default function ServiceDetailsPage() {
  const { t, locale } = useTranslation();
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : '';
  
  const services = getServices(locale);
  const service = services.find((s) => s.id === id);
  const isValidServiceId = serviceIds.includes(id as ServiceId);

  if (!service || !isValidServiceId) {
    return (
      <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Link href="/services" className="text-[var(--primary)] hover:underline">
            View All Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2 text-[var(--text-secondary)]">
            <li>
              <Link href="/" className="hover:text-[var(--primary)]">
                {t('serviceDetails.breadcrumbHome')}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/services" className="hover:text-[var(--primary)]">
                {t('serviceDetails.breadcrumbServices')}
              </Link>
            </li>
            <li>/</li>
            <li className="text-[var(--text-primary)]">{service.title}</li>
          </ol>
        </nav>

        {/* Service Image */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <div className="h-96 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
            <span className="text-9xl opacity-80">
              {service.id.includes('transport') || service.id.includes('tourist')
                ? '🚌'
                : '🎨'}
            </span>
          </div>
        </div>

        {/* Service Content */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--text-primary)]">
            {service.title}
          </h1>
          <p className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
            {service.fullDescription}
          </p>

          {/* Features Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
              {t('services.whatWeOffer')}
            </h2>
            <ul className="space-y-3">
              {service.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start text-[var(--text-secondary)]"
                >
                  <span className="text-[var(--primary)] mr-3 mt-1 text-xl">
                    ✓
                  </span>
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-[var(--border)]">
            <Link
              href="/contact"
              className="flex-1 text-center bg-[var(--primary)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[var(--primary-dark)] transition-colors"
            >
              {t('common.getAQuote')}
            </Link>
            <Link
              href="/services"
              className="flex-1 text-center border-2 border-[var(--primary)] text-[var(--primary)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--primary)] hover:text-white transition-colors"
            >
              {t('services.viewAllServices')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
