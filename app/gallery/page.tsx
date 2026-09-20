import React from 'react';
import PublicLayoutWrapper from '@/components/PublicLayoutWrapper';
import { Breadcrumbs } from '@/src/components/Breadcrumbs';
import { BeforeAfterGallery } from '@/src/components/BeforeAfterGallery';
import { CTASection } from '@/src/components/CTASection';
import { Metadata } from 'next';

import { getActiveGallery } from '@/lib/db';

export const revalidate = 0; // Immediate live dynamic updates

export default async function GalleryPage() {
  const gallery = await getActiveGallery();

  return (
    <PublicLayoutWrapper>
      <Breadcrumbs items={[{ name: 'Gallery' }]} />
      <BeforeAfterGallery limit={24} showFilters={true} items={gallery} />
      <CTASection />
    </PublicLayoutWrapper>
  );
}
