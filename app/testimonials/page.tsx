import React from 'react';
import PublicLayoutWrapper from '@/components/PublicLayoutWrapper';
import { Breadcrumbs } from '@/src/components/Breadcrumbs';
import { Testimonials } from '@/src/components/Testimonials';
import { CTASection } from '@/src/components/CTASection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Testimonials & Reviews | Hari Krishna Deep Cleaning Hyderabad',
  description: 'Read real customer reviews and testimonials from homeowners, villa owners, and businesses across Hyderabad.',
};

export default function TestimonialsPage() {
  return (
    <PublicLayoutWrapper>
      <Breadcrumbs items={[{ name: 'Testimonials' }]} />
      <Testimonials />
      <CTASection />
    </PublicLayoutWrapper>
  );
}
