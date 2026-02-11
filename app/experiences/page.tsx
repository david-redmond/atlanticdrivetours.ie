'use client';

import Link from 'next/link';
import { useTranslation } from '@/contexts/TranslationContext';

export default function ExperiencesPage() {
  const { t } = useTranslation();

  const experiences = [
    {
      id: 'emerald',
      title: t('experiences.emerald.title'),
      description: t('experiences.emerald.description'),
      duration: t('experiences.emerald.duration'),
      highlights: [
        t('experiences.emerald.highlights.0'),
        t('experiences.emerald.highlights.1'),
        t('experiences.emerald.highlights.2'),
        t('experiences.emerald.highlights.3'),
      ],
    },
    {
      id: 'shamrock',
      title: t('experiences.shamrock.title'),
      description: t('experiences.shamrock.description'),
      duration: t('experiences.shamrock.duration'),
      highlights: [
        t('experiences.shamrock.highlights.0'),
        t('experiences.shamrock.highlights.1'),
        t('experiences.shamrock.highlights.2'),
        t('experiences.shamrock.highlights.3'),
      ],
    },
    {
      id: 'harp',
      title: t('experiences.harp.title'),
      description: t('experiences.harp.description'),
      duration: t('experiences.harp.duration'),
      highlights: [
        t('experiences.harp.highlights.0'),
        t('experiences.harp.highlights.1'),
        t('experiences.harp.highlights.2'),
        t('experiences.harp.highlights.3'),
      ],
    },
    {
      id: 'clover',
      title: t('experiences.clover.title'),
      description: t('experiences.clover.description'),
      duration: t('experiences.clover.duration'),
      highlights: [
        t('experiences.clover.highlights.0'),
        t('experiences.clover.highlights.1'),
        t('experiences.clover.highlights.2'),
        t('experiences.clover.highlights.3'),
      ],
    },
  ];

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]">
            {t('experiences.title')}
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            {t('experiences.subtitle')}
          </p>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Experience Image */}
              <div 
                className="h-64 bg-cover bg-center relative"
                style={{
                  backgroundImage: experience.id === 'emerald'
                    ? 'url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80)'
                    : experience.id === 'shamrock'
                    ? 'url(https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80)'
                    : experience.id === 'harp'
                    ? 'url(https://images.unsplash.com/photo-1539650116574-75c0c6d73a6e?w=800&q=80)'
                    : 'url(https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity"></div>
              </div>

              {/* Experience Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                    {experience.title}
                  </h2>
                  <span className="bg-[var(--primary)] text-white px-3 py-1 rounded text-sm font-medium">
                    {experience.duration}
                  </span>
                </div>
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                  {experience.description}
                </p>
                <ul className="mb-6 space-y-2">
                  {experience.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start text-sm text-[var(--text-secondary)]">
                      <span className="text-[var(--primary)] mr-2 mt-1">✓</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-block w-full text-center bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--primary-dark)] transition-colors"
                >
                  {t('experiences.bookNow')}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-lg p-8 md:p-12 text-white mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {t('experiences.whyChoose')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold mb-3">
                {t('experiences.comfortableVehicles')}
              </h3>
              <p className="text-blue-100 text-sm">
                {t('experiences.comfortableVehiclesDesc')}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">👨‍✈️</div>
              <h3 className="text-xl font-semibold mb-3">
                {t('experiences.experiencedGuides')}
              </h3>
              <p className="text-blue-100 text-sm">
                {t('experiences.experiencedGuidesDesc')}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-3">
                {t('experiences.personalizedService')}
              </h3>
              <p className="text-blue-100 text-sm">
                {t('experiences.personalizedServiceDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4 text-[var(--text-primary)]">
            {t('experiences.readyToExplore')}
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-8">
            {t('experiences.readyToExploreDesc')}
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

