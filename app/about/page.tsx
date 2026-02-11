'use client';

import Link from 'next/link';
import { useTranslation } from '@/contexts/TranslationContext';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]">
            {t('about.title')}
          </h1>
          <p className="text-xl text-[var(--text-secondary)]">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-semibold mb-6 text-[var(--text-primary)]">
              {t('about.ourStory')}
            </h2>
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed text-lg">
              {t('about.story1')}
            </p>
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed text-lg">
              {t('about.story2')}
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
              {t('about.ourMission')}
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {t('about.missionDescription')}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
              {t('about.ourValues')}
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {t('about.valuesDescription')}
            </p>
          </div>
        </div>

        {/* Services Overview */}
        <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-lg p-8 md:p-12 text-white">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            {t('about.whatWeDo')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">
                {t('about.transportationServices.title')}
              </h3>
              <p className="text-blue-100">
                {t('about.transportationServices.description')}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">
                {t('about.paintingDecorating.title')}
              </h3>
              <p className="text-blue-100">
                {t('about.paintingDecorating.description')}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-semibold mb-4 text-[var(--text-primary)]">
            {t('about.readyToWork')}
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-8">
            {t('about.readyToWorkDescription')}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[var(--primary)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[var(--primary-dark)] transition-colors"
          >
            {t('common.contact')}
          </Link>
        </div>
      </div>
    </div>
  );
}
