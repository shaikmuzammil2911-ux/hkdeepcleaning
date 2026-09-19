import React from 'react';
import { Hero } from '../components/Hero';
import { ServiceGrid } from '../components/ServiceGrid';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { AboutSection } from '../components/AboutSection';
import { BeforeAfterGallery } from '../components/BeforeAfterGallery';
import { Testimonials } from '../components/Testimonials';
import { ServiceAreas } from '../components/ServiceAreas';
import { FAQSection } from '../components/FAQSection';
import { CTASection } from '../components/CTASection';

interface HomePageProps {
  onOpenBooking: (serviceSlug?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  return (
    <div>
      {/* 1. Hero Section matching image.png */}
      <Hero onOpenBooking={() => onOpenBooking()} />

      {/* 2. 8+ Services Grid Section */}
      <ServiceGrid onOpenBooking={onOpenBooking} />

      {/* 3. Why Choose Us Feature Bar */}
      <WhyChooseUs />

      {/* 4. About Us Preview Section */}
      <AboutSection />

      {/* 5. Before & After Gallery */}
      <BeforeAfterGallery limit={4} />

      {/* 6. Testimonials Section */}
      <Testimonials />

      {/* 7. Service Areas & In-Page Booking Form */}
      <ServiceAreas onOpenBooking={() => onOpenBooking()} />

      {/* 8. FAQ Section */}
      <FAQSection limit={6} />

      {/* 9. High-converting CTA Banner */}
      <CTASection onOpenBooking={() => onOpenBooking()} />
    </div>
  );
};
