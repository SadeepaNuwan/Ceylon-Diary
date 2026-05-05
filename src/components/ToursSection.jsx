import { useState } from 'react';
import TourCard from './TourCard';
import { tours } from '../data/tours';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const CATEGORIES = ['All', ...new Set(tours.filter((t) => !t.startDate?.toLowerCase().includes('coming soon')).map((t) => t.category))];

export default function ToursSection({ onViewTour, searchQuery }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = tours.filter((t) => {
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    const q = searchQuery?.toLowerCase() || '';
    const matchesSearch =
      !q ||
      t.title.toLowerCase().includes(q) ||
      t.region.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.tagline.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="tours" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Discover Sri Lanka
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            POPULAR TOURS
          </h2>
          <Separator className="w-12 mx-auto bg-primary" />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className={`tracking-widest uppercase text-xs ${
                activeCategory !== cat ? 'border-white/20 text-white/50 hover:text-white hover:border-white/50 hover:bg-transparent' : ''
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Search result notice */}
        {searchQuery && (
          <p className="text-white/40 text-sm text-center mb-8">
            Showing results for "<span className="text-white/70">{searchQuery}</span>"
            {' '}— {filtered.length} tour{filtered.length !== 1 ? 's' : ''} found
          </p>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4">
            {filtered.map((tour, i) => (
              <div key={tour.id} className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] xl:w-[calc(25%-12px)]">
                <TourCard tour={tour} index={i} onClick={onViewTour} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No tours found. Try a different search.</p>
          </div>
        )}
      </div>
    </section>
  );
}
