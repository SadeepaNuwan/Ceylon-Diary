import { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight, FaClock } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { heroSlides } from '../data/tours';

export default function Hero({ onViewTour }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = useCallback(
    (next) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent(next);
        setAnimating(false);
      }, 400);
    },
    [animating]
  );

  const prev = () => go((current - 1 + heroSlides.length) % heroSlides.length);
  const next = () => go((current + 1) % heroSlides.length);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  });

  const slide = heroSlides[current];

  return (
    <section id="home" className="relative h-screen min-h-[500px] sm:min-h-[600px] overflow-hidden">
      {/* Background image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${animating ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundImage: `url(${slide.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-28 sm:pb-24 pt-24">
        <div className={`transition-all duration-500 ${animating ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'}`}>
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-3">
            {slide.region} · {slide.slideNumber} / {String(heroSlides.length).padStart(2, '0')}
          </p>

          <h1 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-4 max-w-3xl">
            {slide.title}
          </h1>

          <p className="text-white/60 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-md">{slide.subtitle}</p>

          <div className="flex flex-wrap items-center gap-5 mb-8">
            <span className="flex items-center gap-2 text-white/70 text-sm">
              <FaClock className="text-primary text-xs" />
              {slide.duration}
            </span>
          </div>

          <Button
            size="lg"
            onClick={() => onViewTour(slide.id)}
            className="tracking-widest uppercase text-sm px-8"
          >
            Explore Package &nbsp;→
          </Button>
        </div>
      </div>

      {/* Slide numbers on the right — hidden on mobile */}
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-3 items-end">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            className={`flex items-center gap-2 transition-all ${
              i === current ? 'opacity-100' : 'opacity-30 hover:opacity-60'
            }`}
          >
            {i === current && <div className="w-8 h-px bg-white" />}
            <span className={`font-display ${i === current ? 'text-white text-base' : 'text-white text-xs'}`}>
              {s.slideNumber}
            </span>
          </button>
        ))}
      </div>

      {/* Arrow controls */}
      <div className="absolute bottom-20 sm:bottom-8 right-4 sm:right-8 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={prev}
          className="border-white/30 hover:border-primary hover:bg-primary/20 text-white h-10 w-10"
        >
          <FaChevronLeft className="text-xs" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={next}
          className="border-white/30 hover:border-primary hover:bg-primary/20 text-white h-10 w-10"
        >
          <FaChevronRight className="text-xs" />
        </Button>
      </div>

      {/* Bottom info strip */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/40 backdrop-blur-sm hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 grid grid-cols-3 divide-x divide-white/10">
          {heroSlides.slice(0, 3).map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              className={`px-6 text-left transition-colors hover:bg-white/5 ${i > 0 ? 'pl-6' : ''}`}
            >
              <p className="text-white/40 text-[10px] tracking-widest uppercase mb-1">{s.region}</p>
              <p className={`text-xs font-medium leading-tight ${i === current ? 'text-white' : 'text-white/50'}`}>
                {s.title.substring(0, 30)}
              </p>
              <p className="text-primary text-[10px] mt-1 flex items-center gap-1">
                <FaClock className="text-[9px]" />{s.duration}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
