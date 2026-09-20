import React from 'react';
import PublicLayoutWrapper from '@/components/PublicLayoutWrapper';
import { Breadcrumbs } from '@/src/components/Breadcrumbs';
import { BeforeAfterGallery } from '@/src/components/BeforeAfterGallery';
import { CTASection } from '@/src/components/CTASection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Before & After Cleaning Gallery | Hari Krishna Deep Cleaning Hyderabad',
  description: 'View real before and after deep cleaning results of homes, kitchens, bathrooms, floors, and commercial spaces across Hyderabad.',
};

export default function GalleryPage() {
  return (
    <PublicLayoutWrapper>
      <Breadcrumbs items={[{ name: 'Gallery' }]} />
      <BeforeAfterGallery limit={12} showFilters={true} />
      <CTASection />
    </PublicLayoutWrapper>
  );
}
