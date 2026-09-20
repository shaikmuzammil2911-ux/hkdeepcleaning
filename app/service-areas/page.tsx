import React from 'react';
import PublicLayoutWrapper from '@/components/PublicLayoutWrapper';
import { Breadcrumbs } from '@/src/components/Breadcrumbs';
import { ServiceAreas } from '@/src/components/ServiceAreas';
import { CTASection } from '@/src/components/CTASection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Areas in Hyderabad | Hari Krishna Deep Cleaning Services',
  description: 'Deep cleaning services available across Gachibowli, Madhapur, Jubilee Hills, HITECH City, Banjara Hills, Kondapur, Kukatpally, and all Hyderabad areas.',
};

export default function ServiceAreasPage() {
  return (
    <PublicLayoutWrapper>
      <Breadcrumbs items={[{ name: 'Service Areas' }]} />
      <ServiceAreas />
      <CTASection />
    </PublicLayoutWrapper>
  );
}
