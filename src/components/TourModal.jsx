import {
  FaTimes, FaMapMarkerAlt, FaClock, FaUsers, FaCheckCircle,
  FaTimesCircle, FaCalendarAlt, FaBed, FaUser, FaGlobe,
  FaTelegramPlane, FaChevronRight
} from 'react-icons/fa';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { TELEGRAM_LINK } from '../data/tours';

export default function TourModal({ tour, onClose }) {
  if (!tour) return null;

  const telegramUrl = `${TELEGRAM_LINK}?start=tour_${tour.id}`;

  return (
    <Sheet open={!!tour} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl p-0 border-l border-border bg-[#111] flex flex-col max-w-full"
      >
        {/* Visually hidden title for accessibility */}
        <SheetTitle className="sr-only">{tour.title}</SheetTitle>
        <SheetDescription className="sr-only">{tour.tagline}</SheetDescription>

        <ScrollArea className="h-full w-full">
          {/* Hero image */}
          <div className="relative h-48 sm:h-64 shrink-0">
            <img src={tour.heroImage} alt={tour.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-black/30 to-transparent" />

            {/* Close */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm hover:bg-black text-white h-9 w-9"
            >
              <FaTimes />
            </Button>

            <Badge className="absolute top-4 left-4 text-[10px]">{tour.category}</Badge>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-primary text-[10px] tracking-widest uppercase mb-1">
                <FaMapMarkerAlt className="inline mr-1" />
                Sri Lanka · {tour.region}
              </p>
              <h2 className="font-display text-3xl font-bold text-white">{tour.title}</h2>
              <p className="text-white/60 text-sm mt-1">{tour.tagline}</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-6 space-y-8">
            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { icon: FaClock, label: 'Duration', value: tour.duration },
                { icon: FaUsers, label: 'Group Size', value: tour.groupSize },
                { icon: FaCalendarAlt, label: 'Departures', value: tour.startDate },
              ].map(({ icon: Icon, label, value }) => (
                <Card key={label} className="bg-white/5 border-white/10">
                  <CardContent className="p-3">
                    <Icon className="text-primary mb-1.5 text-sm" />
                    <p className="text-white/40 text-[10px] tracking-wider uppercase">{label}</p>
                    <p className="text-white text-xs font-medium mt-0.5 leading-snug">{value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enquire CTA */}
            <Button size="lg" className="w-full tracking-widest uppercase" asChild>
              <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
                <FaTelegramPlane /> Enquire on Telegram
              </a>
            </Button>

            {/* Highlights */}
            <div>
              <SectionHeading>Tour Highlights</SectionHeading>
              {Array.isArray(tour.highlights) && tour.highlights.length > 0 && typeof tour.highlights[0] === 'object' && tour.highlights[0].area ? (
                <div className="space-y-4">
                  {tour.highlights.map((group) => (
                    <div key={group.area}>
                      <p className="text-primary text-xs font-semibold tracking-wider uppercase mb-2 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-[10px]" />
                        {group.area}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-4">
                        {group.places.map((place) => (
                          <div key={place} className="flex items-center gap-2 text-sm text-white/70">
                            <FaChevronRight className="text-primary/60 text-[8px] shrink-0" />
                            {place}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tour.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-sm text-white/70">
                      <FaChevronRight className="text-primary text-[10px] shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Day-by-day itinerary */}
            <div>
              <SectionHeading>Day-by-Day Itinerary</SectionHeading>
              <div className="relative pl-6">
                <div className="absolute left-2 top-2 bottom-2 w-px bg-white/10" />
                <div className="space-y-5">
                  {tour.itinerary.map((p, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-4 top-1 w-2 h-2 rounded-full bg-primary" />
                      <p className="text-primary text-[10px] font-semibold tracking-widest uppercase mb-0.5">{p.day}</p>
                      <p className="text-white text-sm font-semibold flex items-center gap-1.5">
                        <FaMapMarkerAlt className="text-white/40 text-[10px] shrink-0" />
                        {p.location}
                      </p>
                      <p className="text-white/50 text-xs mt-1 leading-relaxed">{p.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Accommodation */}
            <div>
              <SectionHeading>Accommodation</SectionHeading>
              <div className="space-y-3">
                {tour.accommodation.map((a) => (
                  <Card key={a.name} className="bg-white/5 border-white/10">
                    <CardContent className="p-4 flex items-start gap-3">
                      <FaBed className="text-primary mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold">{a.name}</p>
                        <p className="text-white/50 text-xs">{a.type} · {a.location}</p>
                      </div>
                      <Badge variant="outline" className="text-primary border-primary/40 text-[10px] shrink-0">
                        {a.nights}N
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Tour Guide */}
            <div>
              <SectionHeading>Your Tour Guide</SectionHeading>
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-5 flex gap-4">
                  <img
                    src={tour.guide.photo}
                    alt={tour.guide.name}
                    className="w-16 h-16 rounded-full object-cover shrink-0 border-2 border-primary/40"
                  />
                  <div>
                    <p className="text-white font-semibold flex items-center gap-2">
                      <FaUser className="text-primary text-xs" />
                      {tour.guide.name}
                    </p>
                    <p className="text-white/40 text-xs mt-0.5">{tour.guide.experience} experience</p>
                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                      <FaGlobe className="text-white/30 text-xs" />
                      {tour.guide.languages.map((l) => (
                        <Badge key={l} variant="outline" className="text-[10px] border-white/20 text-white/50">
                          {l}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-white/50 text-xs mt-3 leading-relaxed">{tour.guide.about}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Included / Not included */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <SectionHeading>What's Included</SectionHeading>
                <div className="space-y-2">
                  {tour.included.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs text-white/70">
                      <FaCheckCircle className="text-green-400 mt-0.5 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <SectionHeading>Not Included</SectionHeading>
                <div className="space-y-2">
                  {tour.notIncluded.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs text-white/60">
                      <FaTimesCircle className="text-red-400/70 mt-0.5 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom note */}
            {tour.customNote && (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3">
                <p className="text-amber-200/90 text-xs leading-relaxed text-center">
                  ✨ {tour.customNote}
                </p>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="pb-6">
              <Button size="lg" className="w-full tracking-widest uppercase" asChild>
                <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
                  <FaTelegramPlane /> Enquire &amp; Book on Telegram
                </a>
              </Button>
              <p className="text-center text-white/30 text-xs mt-3">
                Our travel expert will respond within 2 hours on Telegram
              </p>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function SectionHeading({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h3 className="font-display text-base font-semibold text-white tracking-wider uppercase whitespace-nowrap">
        {children}
      </h3>
      <Separator className="flex-1 bg-white/10" />
    </div>
  );
}
