import { useState, useEffect, useCallback } from 'react';
import { FaTimes } from 'react-icons/fa';
import travelLogo from '@/assets/travel-logo-transparent.png';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language.startsWith('ru') ? 'en' : 'ru');
  };

  const navLinks = [
    { label: t('nav.home', 'Home'), href: '#home' },
    { label: t('nav.about', 'About'), href: '#about' },
    { label: t('nav.tours', 'Tours'), href: '#tours' },
    { label: t('nav.gallery', 'Gallery'), href: '#gallery' },
    { label: t('nav.contact', 'Contact'), href: '#contact' },
  ];

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 sm:gap-3 relative z-[60] min-w-0">
            <img src={travelLogo} alt="Ceylon Dreams" className="h-10 sm:h-14 w-auto shrink-0" style={{ filter: 'brightness(0) invert(1)', opacity: 0.95 }} />
            <span className="font-display text-white text-lg sm:text-2xl tracking-widest font-semibold truncate">Ceylon Dreams</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-10 rounded-full border border-white/10 bg-black/15 px-7 py-3 backdrop-blur-sm">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-white/70 hover:text-white text-xs tracking-widest uppercase font-medium transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 relative z-[60] shrink-0">
            <button
              onClick={toggleLanguage}
              className="min-h-11 min-w-11 border-0 bg-transparent px-2 text-white/85 hover:text-white font-display text-sm sm:text-base font-semibold tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/80"
              aria-label={i18n.language.startsWith('ru') ? t('nav.switchToEnglish', 'Switch to English') : t('nav.switchToRussian', 'Switch to Russian')}
            >
              {i18n.language.startsWith('ru') ? 'EN' : 'RU'}
            </button>

            <button
              className="lg:hidden relative min-h-11 min-w-11 flex items-center justify-center rounded-full border border-white/15 bg-black/25 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/80"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span
                className={`absolute w-5 h-[2px] bg-current transition-all duration-300 ${
                  menuOpen ? 'rotate-45 top-[15px]' : 'rotate-0 top-[10px]'
                }`}
              />
              <span
                className={`absolute w-5 h-[2px] bg-current transition-all duration-300 top-[15px] ${
                  menuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}
              />
              <span
                className={`absolute w-5 h-[2px] bg-current transition-all duration-300 ${
                  menuOpen ? '-rotate-45 top-[15px]' : 'rotate-0 top-[20px]'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-screen mobile menu overlay ── */}
      <div
        className={`fixed inset-0 z-[55] lg:hidden transition-all duration-500 ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Glassmorphic background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(160deg, rgba(13,13,13,0.97) 0%, rgba(20,14,8,0.98) 50%, rgba(13,13,13,0.97) 100%)',
            backdropFilter: 'blur(20px) saturate(1.2)',
          }}
        />

        {/* Close button */}
        <button
          onClick={closeMenu}
          aria-label="Close menu"
          className={`absolute top-6 right-6 z-10 p-2 text-white/60 hover:text-white transition-all duration-300 ${
            menuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-90'
          }`}
          style={{ transitionDelay: menuOpen ? '100ms' : '0ms' }}
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Decorative elements */}
        <div
          className={`absolute top-20 right-8 w-40 h-40 rounded-full transition-all duration-700 delay-200 ${
            menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{
            background: 'radial-gradient(circle, hsl(24 95% 46% / 0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className={`absolute bottom-32 left-6 w-56 h-56 rounded-full transition-all duration-700 delay-300 ${
            menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{
            background: 'radial-gradient(circle, hsl(24 95% 46% / 0.08) 0%, transparent 70%)',
          }}
        />

        {/* Navigation links */}
        <nav className="relative h-full flex flex-col items-center justify-center gap-1 px-6">
          {navLinks.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={closeMenu}
              className={`group relative py-4 transition-all duration-500 ${
                menuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{
                transitionDelay: menuOpen ? `${150 + i * 80}ms` : '0ms',
              }}
            >
              {/* Link label */}
              <span className="font-display text-2xl sm:text-3xl font-semibold text-white/80 tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-white group-active:text-primary">
                {l.label}
              </span>
              {/* Animated underline on hover */}
              <span className="block h-[2px] w-0 group-hover:w-full mx-auto mt-1.5 bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-300" />
            </a>
          ))}

          {/* Bottom language toggle & accent line */}
          <div
            className={`mt-8 flex flex-col items-center gap-6 transition-all duration-500 ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: menuOpen ? `${150 + navLinks.length * 80 + 80}ms` : '0ms' }}
          >
            <button
              onClick={toggleLanguage}
              className="min-h-11 px-6 py-2 rounded-full border border-white/20 bg-white/5 text-white font-display text-lg tracking-widest active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/80"
            >
              {i18n.language.startsWith('ru') ? t('nav.switchToEnglish', 'SWITCH TO ENGLISH') : t('nav.switchToRussian', 'SWITCH TO RUSSIAN')}
            </button>

            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-primary/50" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">
                {t('nav.exploreSriLanka', 'Explore Sri Lanka')}
              </span>
              <div className="w-8 h-px bg-primary/50" />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
