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
import { useTours } from './data/tours';

export default function App() {
  const [activeTourId, setActiveTourId] = useState(null);
  const { tours } = useTours();

  const activeTour = tours.find((t) => t.id === activeTourId) ?? null;

  function handleViewTour(id) {
    setActiveTourId(id);
    window.scrollTo({ top: 0 });
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar />
      <Hero onViewTour={handleViewTour} />
      <InspireSection />
      <ToursSection onViewTour={handleViewTour} />
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
