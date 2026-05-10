import { FaTelegramPlane, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Separator } from '@/components/ui/separator';
import { TELEGRAM_LINK } from '../data/tours';

export default function ContactSection() {
  const { t } = useTranslation();

  const channels = [
    {
      icon: FaTelegramPlane,
      label: t('contact.telegram.label', 'Telegram'),
      sub: t('contact.telegram.sub', 'Fastest response · 2 hrs'),
      href: TELEGRAM_LINK,
      gradient: 'from-[#229ED9]/10 to-transparent',
      glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(34,158,217,0.3)]',
      iconColor: 'text-[#229ED9]',
      borderColor: 'group-hover:border-[#229ED9]/50',
    },
    {
      icon: FaEnvelope,
      label: t('contact.email.label', 'Email'),
      sub: 'hello@travelco.com',
      href: 'mailto:hello@travelco.com',
      gradient: 'from-primary/10 to-transparent',
      glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(232,93,4,0.3)]',
      iconColor: 'text-primary',
      borderColor: 'group-hover:border-primary/50',
    },
    {
      icon: FaPhoneAlt,
      label: t('contact.phone.label', 'Phone'),
      sub: '+79998310941',
      href: 'tel:+79998310941',
      gradient: 'from-white/5 to-transparent',
      glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.15)]',
      iconColor: 'text-white/80',
      borderColor: 'group-hover:border-white/30',
    },
  ];

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-4">
            {t('contact.tagline', 'Get in touch')}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            {t('contact.title', 'CONTACT US')}
          </h2>
          <Separator className="w-12 mx-auto bg-primary mb-6" />
          <p className="text-white/60 text-sm leading-relaxed">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {channels.map(({ icon: Icon, label, sub, href, gradient, glow, iconColor, borderColor }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col items-center text-center p-8 rounded-2xl bg-[#111]/80 backdrop-blur-md border border-white/5 transition-all duration-500 hover:-translate-y-2 ${glow} ${borderColor}`}
            >
              {/* Subtle top gradient */}
              <div className={`absolute inset-0 bg-gradient-to-b ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

              <div className="relative mb-6">
                <div className={`w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className={`text-2xl ${iconColor}`} />
                </div>
              </div>
              
              <div>
                <p className="text-white font-semibold mb-1 group-hover:text-primary transition-colors">
                  {label}
                </p>
                <p className="text-white/40 text-xs">{sub}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
