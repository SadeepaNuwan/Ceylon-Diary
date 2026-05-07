import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { FaClock, FaUsers, FaArrowRight } from 'react-icons/fa';

const isComingSoon = (tour) => tour.startDate?.toLowerCase().includes('coming soon') || tour.startDate?.toLowerCase().includes('скоро');

export default function TourCard({ tour, index, onClick }) {
  const { t } = useTranslation();
  const comingSoon = isComingSoon(tour);

  return (
    <Card
      className={`group overflow-hidden rounded-2xl border-white/5 bg-[#111] transition-all duration-500 h-[400px] sm:h-[450px] ${
        comingSoon ? 'opacity-70 cursor-default' : 'cursor-pointer hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_10px_40px_-15px_rgba(232,93,4,0.25)]'
      }`}
      onClick={() => !comingSoon && onClick(tour.id)}
    >
      <div className="relative h-full w-full">
        <img
          src={tour.cardImage}
          alt={tour.title}
          className={`w-full h-full object-cover transition-transform duration-1000 ${!comingSoon ? 'group-hover:scale-110' : ''}`}
          loading="lazy"
        />
        {/* Improved gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent sm:via-[#080808]/40 transition-opacity duration-500" />
        {comingSoon && <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />}

        {/* Top row */}
        <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
          <div className="flex flex-col gap-2 z-10">
            {/* Glassmorphic Badge */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 text-white px-3 py-1.5 rounded-full text-[9px] tracking-widest uppercase font-semibold w-fit shadow-lg">
              {tour.category}
            </div>
            {comingSoon && (
              <div className="bg-primary/90 text-white px-3 py-1 rounded-full text-[9px] tracking-widest uppercase font-semibold w-fit shadow-lg">
                {t('tours.card.comingSoon', 'Coming Soon')}
              </div>
            )}
          </div>
          {/* Stylized Number */}
          <span className="text-white/10 font-display text-5xl font-bold leading-none tracking-tighter group-hover:text-white/20 transition-colors duration-500 z-10">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Bottom info */}
        <CardContent className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <p className="text-primary text-[10px] tracking-[0.2em] uppercase mb-2 font-semibold">
            {tour.region}
          </p>
          <h3 className="font-display text-2xl font-bold text-white leading-tight mb-4 drop-shadow-md">
            {tour.title}
          </h3>

          <div className="flex flex-col gap-1.5 mb-2">
            <span className="flex items-center gap-2 text-white/70 text-xs font-medium">
              <FaClock className="text-primary/70 text-xs" />
              {tour.duration}
            </span>
            <span className="flex items-center gap-2 text-white/70 text-xs font-medium">
              <FaUsers className="text-primary/70 text-xs" />
              {tour.groupSize}
            </span>
          </div>

          {/* Premium CTA — always visible on mobile, hover-reveal on desktop */}
          {!comingSoon && (
            <div className="overflow-hidden h-12 md:h-0 md:group-hover:h-12 transition-all duration-500 mt-4 md:mt-0 md:group-hover:mt-4 ease-out">
              <div className="w-full h-10 border border-white/20 rounded-full flex items-center justify-between px-4 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors duration-300">
                <span className="text-white text-[10px] tracking-widest uppercase font-semibold">
                  {t('tours.card.viewPackage', 'View Package')}
                </span>
                <FaArrowRight className="text-white text-xs group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
