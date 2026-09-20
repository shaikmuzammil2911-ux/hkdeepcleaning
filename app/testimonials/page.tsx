import React from 'react';
import PublicLayoutWrapper from '@/components/PublicLayoutWrapper';
import { Breadcrumbs } from '@/src/components/Breadcrumbs';
import { Testimonials } from '@/src/components/Testimonials';
import { CTASection } from '@/src/components/CTASection';
import { Metadata } from 'next';

import { getActiveTestimonials } from '@/lib/db';

export const revalidate = 0; // Immediate live dynamic updates

export default async function TestimonialsPage() {
  const testimonials = await getActiveTestimonials();

  return (
    <PublicLayoutWrapper>
      <Breadcrumbs items={[{ name: 'Testimonials' }]} />
      <Testimonials items={testimonials} />
      <CTASection />
    </PublicLayoutWrapper>
  );
}
