import React from 'react';
import PublicLayoutWrapper from '@/components/PublicLayoutWrapper';
import { Breadcrumbs } from '@/src/components/Breadcrumbs';
import { ServiceGrid } from '@/src/components/ServiceGrid';
import { CTASection } from '@/src/components/CTASection';
import { FAQSection } from '@/src/components/FAQSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Cleaning Services in Hyderabad | Hari Krishna Deep Cleaning',
  description: 'Explore our full range of 8+ professional cleaning services in Hyderabad: Home deep cleaning, Villa, Office, Kitchen, Bathroom, Floor, and Move-in cleaning.',
};

export default function ServicesPage() {
  return (
    <PublicLayoutWrapper>
      <Breadcrumbs items={[{ name: 'Cleaning Services' }]} />
      <ServiceGrid showAll={true} />
      <FAQSection />
      <CTASection />
    </PublicLayoutWrapper>
  );
}
