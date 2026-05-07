import { useState } from 'react';
import TourCard from './TourCard';
import { useTours } from '../data/tours';
import { useTranslation } from 'react-i18next';
import { Separator } from '@/components/ui/separator';

export default function ToursSection({ onViewTour }) {
  const { tours, CATEGORIES } = useTours();
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = tours.filter((tour) => activeCategory === 'all' || tour.categoryKey === activeCategory);

  return (
    <section id="tours" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-4">
            {t('tours.tagline', 'Discover Sri Lanka')}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            {t('tours.title', 'POPULAR TOURS')}
          </h2>
          <Separator className="w-12 mx-auto bg-primary" />
        </div>

        {/* Premium Category filters */}
        <div className="flex gap-3 justify-start sm:justify-center mb-16 overflow-x-auto pb-4 scrollbar-hide sm:flex-wrap px-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-500 ${
                activeCategory === cat.key
                  ? 'bg-primary text-white border-primary shadow-[0_0_25px_-5px_rgba(232,93,4,0.5)] scale-105'
                  : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {filtered.map((tour, i) => (
              <div key={tour.id}>
                <TourCard tour={tour} index={i} onClick={onViewTour} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">{t('tours.search.empty', 'No tours found. Try a different search.')}</p>
          </div>
        )}
      </div>
    </section>
  );
}
