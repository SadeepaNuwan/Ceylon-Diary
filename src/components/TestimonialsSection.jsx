import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const testimonials = [
  {
    name: 'Emily & Tom Clarke',
    country: 'United Kingdom',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    tour: 'Ancient Heritage Full Circle',
    rating: 5,
    text: 'Sri Lanka blew us away — and this tour showed us sides of the island we\'d never have found alone. Chamara\'s knowledge of the ancient kingdoms was extraordinary. Sigiriya at sunrise with no crowds was a highlight of our lives.',
  },
  {
    name: 'Luca Ferrari',
    country: 'Italy',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    tour: 'Wildlife Safari Circuit',
    rating: 5,
    text: 'We spotted 7 leopards in two days at Yala — Ruwan knew exactly where to look. The Wild Coast Tented Lodge was unbelievably luxurious. I\'ve done safaris in Africa; Sri Lanka\'s wildlife is in a different league for intimacy.',
  },
  {
    name: 'Priya Nambiar',
    country: 'Australia',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80',
    tour: 'Hill Country & Tea',
    rating: 5,
    text: 'The train ride from Ella through the tea country is the most scenic journey I\'ve ever taken. Staying inside the Heritance Tea Factory hotel was such a unique experience. Pradeep made every stop feel like a discovery.',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-3">Real stories</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">TESTIMONIALS</h2>
          <Separator className="w-12 mx-auto bg-primary" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} className="bg-white/5 border-white/10 relative">
              <CardContent className="p-6">
                <FaQuoteLeft className="text-primary/20 text-4xl absolute top-4 right-4" />

                <div className="flex items-center gap-3 mb-4">
                  <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover" loading="lazy" />
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.country}</p>
                  </div>
                </div>

                <div className="flex gap-0.5 mb-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FaStar key={i} className="text-primary text-xs" />
                  ))}
                </div>
                <p className="text-primary/70 text-[10px] tracking-wider uppercase mb-3">{t.tour}</p>
                <p className="text-white/60 text-sm leading-relaxed">{t.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
