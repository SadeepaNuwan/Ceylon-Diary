import { useState, useEffect } from 'react';
import { FaSearch, FaTimes, FaBars } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import travelLogo from '@/assets/travel-logo-transparent.png';

export default function Navbar({ onSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Tours', href: '#tours' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  function handleSearch(e) {
    e.preventDefault();
    onSearch?.(searchVal);
    setSearchOpen(false);
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-sm py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-1.5 sm:gap-2">
          <img src={travelLogo} alt="Travel Logo" className="h-10 sm:h-14 w-auto" style={{ filter: 'brightness(0) invert(1)', opacity: 0.95 }} />
          <span className="font-display text-white text-lg sm:text-2xl tracking-widest font-semibold">Ceylon Diary</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
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

        {/* Search & mobile toggle */}
        <div className="flex items-center gap-3">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <Input
                autoFocus
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search tours…"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 w-28 sm:w-44 h-8 text-sm"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white/60 hover:text-white hover:bg-transparent"
                onClick={() => setSearchOpen(false)}
              >
                <FaTimes />
              </Button>
            </form>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white/70 hover:text-white hover:bg-transparent"
              onClick={() => setSearchOpen(true)}
            >
              <FaSearch />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8 text-white hover:bg-transparent"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm px-4 sm:px-6 py-4 flex flex-col gap-4 border-t border-white/10">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/70 hover:text-white text-sm tracking-widest uppercase"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
