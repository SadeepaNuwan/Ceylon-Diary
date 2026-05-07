import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';

export default function TestimonialsSection() {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: 'Sarah & Mark Clarke',
      country: 'United Kingdom',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
      tour: t('testimonials.reviews.clarke.tour', 'Ancient Heritage Full Circle'),
      rating: 5,
      text: t('testimonials.reviews.clarke.text', 'Sri Lanka blew us away — and this tour showed us sides of the island we\'d never have found alone. Chamara\'s knowledge of the ancient kingdoms was extraordinary. Sigiriya at sunrise with no crowds was a highlight of our lives.'),
    },
    {
      name: 'Elena Ferrari',
      country: 'Italy',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      tour: t('testimonials.reviews.ferrari.tour', 'Wildlife Safari Circuit'),
      rating: 5,
      text: t('testimonials.reviews.ferrari.text', 'We spotted 7 leopards in two days at Yala — Ruwan knew exactly where to look. The Wild Coast Tented Lodge was unbelievably luxurious. I\'ve done safaris in Africa; Sri Lanka\'s wildlife is in a different league for intimacy.'),
    },
    {
      name: 'Raj Nambiar',
      country: 'Australia',
      photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80',
      tour: t('testimonials.reviews.nambiar.tour', 'Hill Country & Tea'),
      rating: 5,
      text: t('testimonials.reviews.nambiar.text', 'The train ride from Ella through the tea country is the most scenic journey I\'ve ever taken. Staying inside the Heritance Tea Factory hotel was such a unique experience. Pradeep made every stop feel like a discovery.'),
    },
  ];

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-4">
            {t('testimonials.tagline', 'Real stories')}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            {t('testimonials.title', 'TESTIMONIALS')}
          </h2>
          <Separator className="w-12 mx-auto bg-primary" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              className="bg-[#111]/80 backdrop-blur-md border-white/10 relative overflow-hidden group hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_10px_40px_-15px_rgba(232,93,4,0.3)] transition-all duration-500"
            >
              {/* Premium gradient overlay that appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="p-6 relative z-10">
                <FaQuoteLeft className="text-primary/20 text-4xl absolute top-6 right-6 group-hover:scale-110 group-hover:text-primary/30 transition-all duration-500" />

                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img src={t.photo} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-white/10 group-hover:border-primary/50 transition-colors duration-500" loading="lazy" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm tracking-wide">{t.name}</p>
                    <p className="text-white/40 text-xs mt-0.5">{t.country}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-2">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FaStar key={i} className="text-primary text-[10px]" />
                  ))}
                </div>
                <p className="text-primary/80 text-[10px] tracking-[0.2em] uppercase mb-4">{t.tour}</p>
                <p className="text-white/60 text-sm leading-relaxed font-light">{t.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
