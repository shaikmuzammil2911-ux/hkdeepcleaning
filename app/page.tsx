import React from 'react';
import PublicLayoutWrapper from '@/components/PublicLayoutWrapper';
import { Hero } from '@/src/components/Hero';
import { ServiceGrid } from '@/src/components/ServiceGrid';
import { AboutSection } from '@/src/components/AboutSection';
import { BeforeAfterGallery } from '@/src/components/BeforeAfterGallery';
import { Testimonials } from '@/src/components/Testimonials';
import { FAQSection } from '@/src/components/FAQSection';
import { ServiceAreas } from '@/src/components/ServiceAreas';
import { CTASection } from '@/src/components/CTASection';
import { LatestPostsSection } from '@/components/LatestPostsSection';
import { getPublishedPosts, getActiveServices, getActiveGallery, getActiveTestimonials, getActiveFAQs } from '@/lib/db';

export const revalidate = 0; // Immediate live dynamic updates

export default async function HomePage() {
  const [latestPosts, services, gallery, testimonials, faqs] = await Promise.all([
    getPublishedPosts(3),
    getActiveServices(),
    getActiveGallery(),
    getActiveTestimonials(),
    getActiveFAQs(),
  ]);

  return (
    <PublicLayoutWrapper>
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. Services Grid */}
      <ServiceGrid services={services} />

      {/* 3. About Us Section */}
      <AboutSection />

      {/* 4. Interactive Before & After Gallery */}
      <BeforeAfterGallery limit={4} items={gallery} />

      {/* 5. Cleaning Tips & Posts Section */}
      <LatestPostsSection posts={latestPosts} />

      {/* 6. Real Customer Testimonials */}
      <Testimonials items={testimonials} />

      {/* 7. Frequently Asked Questions */}
      <FAQSection items={faqs} />

      {/* 8. Service Areas across Hyderabad */}
      <ServiceAreas />

      {/* 9. Bottom Call to Action */}
      <CTASection />
    </PublicLayoutWrapper>
  );
}
