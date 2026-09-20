import React from 'react';
import PublicLayoutWrapper from '@/components/PublicLayoutWrapper';
import { Breadcrumbs } from '@/src/components/Breadcrumbs';
import { FAQSection } from '@/src/components/FAQSection';
import { CTASection } from '@/src/components/CTASection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Hari Krishna Deep Cleaning Hyderabad',
  description: 'Find answers to common questions about home deep cleaning, pricing, duration, chemicals used, and booking process in Hyderabad.',
};

export default function FAQPage() {
  return (
    <PublicLayoutWrapper>
      <Breadcrumbs items={[{ name: 'FAQ' }]} />
      <FAQSection />
      <CTASection />
    </PublicLayoutWrapper>
  );
}
