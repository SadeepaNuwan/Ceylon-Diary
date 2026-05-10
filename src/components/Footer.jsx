import { FaMapMarkerAlt } from 'react-icons/fa';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-[#080808] border-t border-border py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Separator className="bg-white/5 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center">
              <FaMapMarkerAlt className="text-primary text-xs" />
            </div>
            <span className="font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 text-lg tracking-[0.2em] font-semibold">
              CEYLON DREAMS
            </span>
          </div>
          <p className="text-white/30 text-xs text-center md:text-left">
            © {new Date().getFullYear()} {t('footer.rights', 'Ceylon Dreams Tours · Sri Lanka. All rights reserved.')}
          </p>
          <div className="flex gap-6">
            {[
              { label: t('footer.links.privacy', 'Privacy'), id: 'privacy' },
              { label: t('footer.links.terms', 'Terms'), id: 'terms' },
              { label: t('footer.links.cookies', 'Cookies'), id: 'cookies' }
            ].map((l) => (
              <a key={l.id} href="#" className="relative text-white/30 hover:text-white text-xs transition-colors duration-300 group">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
