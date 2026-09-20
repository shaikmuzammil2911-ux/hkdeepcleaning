import React from 'react';
import PublicLayoutWrapper from '@/components/PublicLayoutWrapper';
import { Breadcrumbs } from '@/src/components/Breadcrumbs';
import { FAQSection } from '@/src/components/FAQSection';
import { CTASection } from '@/src/components/CTASection';
import { Metadata } from 'next';

import { getActiveFAQs } from '@/lib/db';

export const revalidate = 0; // Immediate live dynamic updates

export default async function FAQPage() {
  const faqs = await getActiveFAQs();

  return (
    <PublicLayoutWrapper>
      <Breadcrumbs items={[{ name: 'FAQ' }]} />
      <FAQSection items={faqs} />
      <CTASection />
    </PublicLayoutWrapper>
  );
}
