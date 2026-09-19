import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomBar } from './components/MobileBottomBar';
import { BookingModal } from './components/BookingModal';
import { ScrollToTop } from './components/ScrollToTop';
import { LoadingScreen } from './components/LoadingScreen';
import { useScrollReveal } from './hooks/useScrollReveal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ServiceAreasPage } from './pages/ServiceAreasPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | undefined>();
  const location = useLocation();

  // Re-run scroll reveal on every route change
  useScrollReveal();

  const handleOpenBooking = (serviceSlug?: string) => {
    setSelectedServiceSlug(serviceSlug);
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setSelectedServiceSlug(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFDFD] text-slate-900 font-sans relative">
      {/* Fast Initial Brand Loading Transition */}
      <LoadingScreen />

      {/* Scroll restoration */}
      <ScrollToTop />

      {/* 1. Desktop Top Bar */}
      <TopBar />

      {/* 2. Main Sticky Glass Navbar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* 3. Page Routes */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onOpenBooking={handleOpenBooking} />} />
          <Route path="/about" element={<AboutPage onOpenBooking={() => handleOpenBooking()} />} />
          <Route path="/services" element={<ServicesPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/services/:slug" element={<ServiceDetailPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/gallery" element={<GalleryPage onOpenBooking={() => handleOpenBooking()} />} />
          <Route path="/testimonials" element={<TestimonialsPage onOpenBooking={() => handleOpenBooking()} />} />
          <Route path="/service-areas" element={<ServiceAreasPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage onOpenBooking={() => handleOpenBooking()} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* 4. Dark Teal Footer */}
      <Footer />

      {/* 5. Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* 6. Mobile Bottom Action Bar (Fixed on small screens) */}
      <MobileBottomBar onOpenBooking={() => handleOpenBooking()} />

      {/* 7. Quick Booking Modal Popup */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
        serviceSlug={selectedServiceSlug}
      />
    </div>
  );
};
