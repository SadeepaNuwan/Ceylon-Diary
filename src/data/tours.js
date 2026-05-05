import data from './tours.json';

export const TELEGRAM_LINK = data.telegramLink;

export const tours = data.tours;

export const heroSlides = tours.map((t, i) => ({
  id: t.id,
  title: t.title.toUpperCase(),
  subtitle: t.tagline,
  image: t.heroImage,
  region: t.region,
  duration: t.duration,
  slideNumber: String(i + 1).padStart(2, '0'),
}));
