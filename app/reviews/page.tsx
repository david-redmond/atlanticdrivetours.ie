'use client';

import Link from 'next/link';
import { useTranslation } from '@/contexts/TranslationContext';

export default function ReviewsPage() {
  const { t } = useTranslation();

  const reviews = [
    {
      id: 1,
      name: t('reviews.review1.name'),
      location: t('reviews.review1.location'),
      rating: 5,
      date: t('reviews.review1.date'),
      comment: t('reviews.review1.comment'),
      service: t('reviews.review1.service'),
    },
    {
      id: 2,
      name: t('reviews.review2.name'),
      location: t('reviews.review2.location'),
      rating: 5,
      date: t('reviews.review2.date'),
      comment: t('reviews.review2.comment'),
      service: t('reviews.review2.service'),
    },
    {
      id: 3,
      name: t('reviews.review3.name'),
      location: t('reviews.review3.location'),
      rating: 5,
      date: t('reviews.review3.date'),
      comment: t('reviews.review3.comment'),
      service: t('reviews.review3.service'),
    },
    {
      id: 4,
      name: t('reviews.review4.name'),
      location: t('reviews.review4.location'),
      rating: 5,
      date: t('reviews.review4.date'),
      comment: t('reviews.review4.comment'),
      service: t('reviews.review4.service'),
    },
    {
      id: 5,
      name: t('reviews.review5.name'),
      location: t('reviews.review5.location'),
      rating: 5,
      date: t('reviews.review5.date'),
      comment: t('reviews.review5.comment'),
      service: t('reviews.review5.service'),
    },
    {
      id: 6,
      name: t('reviews.review6.name'),
      location: t('reviews.review6.location'),
      rating: 5,
      date: t('reviews.review6.date'),
      comment: t('reviews.review6.comment'),
      service: t('reviews.review6.service'),
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={`text-2xl ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]">
            {t('reviews.title')}
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            {t('reviews.subtitle')}
          </p>
        </div>

        {/* Overall Rating */}
        <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-lg p-8 text-center text-white mb-12">
          <div className="flex items-center justify-center mb-4">
            {renderStars(5)}
          </div>
          <h2 className="text-4xl font-bold mb-2">
            {t('reviews.averageRating')}
          </h2>
          <p className="text-xl text-blue-100">
            {t('reviews.basedOnReviews', { count: reviews.length })}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                    {review.name}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {review.location}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex mb-1">{renderStars(review.rating)}</div>
                  <span className="text-xs text-[var(--text-secondary)]">
                    {review.date}
                  </span>
                </div>
              </div>

              {/* Service Tag */}
              <div className="mb-4">
                <span className="inline-block bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 rounded text-xs font-medium">
                  {review.service}
                </span>
              </div>

              {/* Review Comment */}
              <p className="text-[var(--text-secondary)] leading-relaxed italic">
                &ldquo;{review.comment}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12 text-center">
          <h2 className="text-3xl font-semibold mb-4 text-[var(--text-primary)]">
            {t('reviews.shareExperience')}
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-8">
            {t('reviews.shareExperienceDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-[var(--primary)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[var(--primary-dark)] transition-colors"
            >
              {t('reviews.leaveReview')}
            </Link>
            <Link
              href="/services"
              className="inline-block bg-transparent border-2 border-[var(--primary)] text-[var(--primary)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--primary)] hover:text-white transition-colors"
            >
              {t('reviews.viewServices')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
