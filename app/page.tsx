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
import { getPublishedPosts } from '@/lib/db';

export const revalidate = 60; // Revalidate every 60s or on-demand

export default async function HomePage() {
  const latestPosts = await getPublishedPosts(3);

  return (
    <PublicLayoutWrapper>
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. Services Grid */}
      <ServiceGrid />

      {/* 3. About Us Section */}
      <AboutSection />

      {/* 4. Interactive Before & After Gallery */}
      <BeforeAfterGallery limit={4} />

      {/* 5. Cleaning Tips & Posts Section */}
      <LatestPostsSection posts={latestPosts} />

      {/* 6. Real Customer Testimonials */}
      <Testimonials />

      {/* 7. Frequently Asked Questions */}
      <FAQSection />

      {/* 8. Service Areas across Hyderabad */}
      <ServiceAreas />

      {/* 9. Bottom Call to Action */}
      <CTASection />
    </PublicLayoutWrapper>
  );
}
