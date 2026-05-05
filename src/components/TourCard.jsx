import { FaClock, FaUsers, FaArrowRight } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const isComingSoon = (tour) => tour.startDate?.toLowerCase().includes('coming soon');

export default function TourCard({ tour, index, onClick }) {
  const comingSoon = isComingSoon(tour);

  return (
    <Card
      className={`group overflow-hidden border-border/50 transition-colors duration-300 h-full ${
        comingSoon ? 'opacity-70 cursor-default' : 'cursor-pointer hover:border-primary/40'
      }`}
      onClick={() => !comingSoon && onClick(tour.id)}
    >
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={tour.cardImage}
          alt={tour.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${!comingSoon ? 'group-hover:scale-110' : ''}`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        {comingSoon && <div className="absolute inset-0 bg-black/40" />}

        {/* Top row */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            <Badge className="text-[10px] w-fit">{tour.category}</Badge>
            {comingSoon && (
              <Badge variant="outline" className="text-[10px] w-fit border-white/40 text-white/80 bg-black/40">
                Coming Soon
              </Badge>
            )}
          </div>
          <span className="text-white/20 font-display text-4xl font-bold leading-none">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Bottom info */}
        <CardContent className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-primary text-[10px] tracking-widest uppercase mb-1">{tour.region}</p>
          <h3 className="font-display text-xl font-semibold text-white leading-tight mb-3">{tour.title}</h3>

          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-1.5 text-white/60 text-xs">
              <FaClock className="text-[10px]" />
              {tour.duration}
            </span>
            <span className="flex items-center gap-1.5 text-white/60 text-xs">
              <FaUsers className="text-[10px]" />
              {tour.groupSize}
            </span>
          </div>

          {/* Hover CTA — only for live packages */}
          {!comingSoon && (
            <div className="overflow-hidden h-0 group-hover:h-10 transition-all duration-300 mt-0 group-hover:mt-3">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-white/30 text-white hover:bg-primary hover:border-primary hover:text-white tracking-widest uppercase text-[10px]"
              >
                View Package <FaArrowRight className="text-[10px]" />
              </Button>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
