import { useTranslation } from 'react-i18next';
import enToursData from '../locales/en/tours.json';
import ruToursData from '../locales/ru/tours.json';

export const TELEGRAM_LINK = enToursData.telegramLink;
export const tours = enToursData.tours;

export function useTours() {
  const { i18n, t } = useTranslation();
  const data = i18n.language.startsWith('en') ? enToursData : ruToursData;
  const categoryById = new Map(enToursData.tours.map((tour) => [tour.id, tour.category]));
  const englishDurationById = new Map(enToursData.tours.map((tour) => [tour.id, tour.duration]));
  const localizedTours = data.tours.map((tour) => ({
    ...tour,
    categoryKey: categoryById.get(tour.id) ?? tour.category,
    duration: localizeDuration(tour.duration, englishDurationById.get(tour.id), i18n.language),
  }));

  const heroSlides = localizedTours.map((tour, i) => ({
    id: tour.id,
    title: tour.title.toUpperCase(),
    subtitle: tour.tagline,
    image: tour.heroImage,
    region: tour.region,
    duration: tour.duration,
    slideNumber: String(i + 1).padStart(2, '0'),
  }));

  const CATEGORIES = [
    { key: 'all', label: t('tours.categories.All') },
    { key: 'Full Circuit', label: t('tours.categories.Full Circuit') },
    { key: 'Wildlife & Safari', label: t('tours.categories.Wildlife & Safari') },
    { key: 'Beach & Leisure', label: t('tours.categories.Beach & Leisure') },
    { key: 'Heritage & Culture', label: t('tours.categories.Heritage & Culture') }
  ];

  return { tours: localizedTours, heroSlides, CATEGORIES };
}

function localizeDuration(duration, englishDuration, language) {
  if (!language.startsWith('ru') || !englishDuration) return duration;

  const match = englishDuration.match(/(\d+)\s*Days?\s*\/\s*(\d+)\s*Nights?/i);
  if (!match) return duration;

  return `${match[1]} ${russianPlural(Number(match[1]), ['день', 'дня', 'дней'])} / ${match[2]} ${russianPlural(Number(match[2]), ['ночь', 'ночи', 'ночей'])}`;
}

function russianPlural(count, forms) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
  return forms[2];
}
