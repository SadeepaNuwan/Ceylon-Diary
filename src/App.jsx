import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ToursSection from './components/ToursSection';
import TourModal from './components/TourModal';
import InspireSection from './components/InspireSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { tours } from './data/tours';

export default function App() {
  const [activeTourId, setActiveTourId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const activeTour = tours.find((t) => t.id === activeTourId) ?? null;

  function handleViewTour(id) {
    setActiveTourId(id);
    window.scrollTo({ top: 0 });
  }

  function handleSearch(q) {
    setSearchQuery(q);
    document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar onSearch={handleSearch} />
      <Hero onViewTour={handleViewTour} />
      <InspireSection />
      <ToursSection onViewTour={handleViewTour} searchQuery={searchQuery} />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />

      {activeTour && (
        <TourModal tour={activeTour} onClose={() => setActiveTourId(null)} />
      )}
    </div>
  );
}
