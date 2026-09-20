import React from 'react';
import PublicLayoutWrapper from '@/components/PublicLayoutWrapper';
import { Breadcrumbs } from '@/src/components/Breadcrumbs';
import { AboutSection } from '@/src/components/AboutSection';
import { CTASection } from '@/src/components/CTASection';
import { Testimonials } from '@/src/components/Testimonials';
import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/db';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: `About Us | ${settings.business_name}`,
    description: settings.about_text || 'Learn more about Hari Krishna Deep Cleaning Services in Hyderabad.',
  };
}

export default function AboutPage() {
  return (
    <PublicLayoutWrapper>
      <Breadcrumbs items={[{ name: 'About Us' }]} />
      <AboutSection />
      <Testimonials />
      <CTASection />
    </PublicLayoutWrapper>
  );
}
