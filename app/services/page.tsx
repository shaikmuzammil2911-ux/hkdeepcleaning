import React from 'react';
import PublicLayoutWrapper from '@/components/PublicLayoutWrapper';
import { Breadcrumbs } from '@/src/components/Breadcrumbs';
import { ServiceGrid } from '@/src/components/ServiceGrid';
import { CTASection } from '@/src/components/CTASection';
import { FAQSection } from '@/src/components/FAQSection';
import { Metadata } from 'next';

import { getActiveServices } from '@/lib/db';

export const revalidate = 0; // Immediate live dynamic updates

export default async function ServicesPage() {
  const services = await getActiveServices();

  return (
    <PublicLayoutWrapper>
      <Breadcrumbs items={[{ name: 'Cleaning Services' }]} />
      <ServiceGrid services={services} showAll={true} />
      <FAQSection />
      <CTASection />
    </PublicLayoutWrapper>
  );
}
