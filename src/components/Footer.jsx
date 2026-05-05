import { FaMapMarkerAlt } from 'react-icons/fa';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-border py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Separator className="bg-white/5 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <FaMapMarkerAlt className="text-white text-[10px]" />
            </div>
            <span className="font-display text-white tracking-widest font-semibold">TRAVEL</span>
          </div>
          <p className="text-white/30 text-xs text-center">
            © {new Date().getFullYear()} Travel Co. · Sri Lanka. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((l) => (
              <a key={l} href="#" className="text-white/30 hover:text-white/70 text-xs transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
