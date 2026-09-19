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
      {/* 1. Hero Section - no scroll-reveal, animates via hero-animate classes */}
      <Hero onOpenBooking={() => onOpenBooking()} />

      {/* 2. 8+ Services Grid Section */}
      <div className="scroll-reveal">
        <ServiceGrid onOpenBooking={onOpenBooking} />
      </div>

      {/* 3. Why Choose Us Feature Bar */}
      <div className="scroll-reveal">
        <WhyChooseUs />
      </div>

      {/* 4. About Us Preview Section */}
      <div className="scroll-reveal">
        <AboutSection />
      </div>

      {/* 5. Before & After Gallery */}
      <div className="scroll-reveal">
        <BeforeAfterGallery limit={4} />
      </div>

      {/* 6. Testimonials Section */}
      <div className="scroll-reveal">
        <Testimonials />
      </div>

      {/* 7. Service Areas & In-Page Booking Form */}
      <div className="scroll-reveal">
        <ServiceAreas onOpenBooking={() => onOpenBooking()} />
      </div>

      {/* 8. FAQ Section */}
      <div className="scroll-reveal">
        <FAQSection limit={6} />
      </div>

      {/* 9. High-converting CTA Banner */}
      <div className="scroll-reveal">
        <CTASection onOpenBooking={() => onOpenBooking()} />
      </div>
    </div>
  );
};
