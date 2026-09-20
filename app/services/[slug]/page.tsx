import React from 'react';
import PublicLayoutWrapper from '@/components/PublicLayoutWrapper';
import { Breadcrumbs } from '@/src/components/Breadcrumbs';
import { CTASection } from '@/src/components/CTASection';
import { ServiceCard } from '@/src/components/ServiceCard';
import { getServiceBySlug, getActiveServices } from '@/lib/db';
import { companyInfo } from '@/src/data/companyInfo';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  Phone,
  Calendar,
  Sparkles,
  ArrowRight,
  MapPin
} from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) {
    return { title: 'Service Not Found | Hari Krishna Deep Cleaning' };
  }

  return {
    title: service.seo_title || `${service.name} in Hyderabad | Hari Krishna Deep Cleaning`,
    description: service.seo_description || service.short_description,
    openGraph: {
      title: `${service.name} Hyderabad | Hari Krishna Deep Cleaning`,
      description: service.short_description,
      images: service.hero_image_url ? [{ url: service.hero_image_url }] : [],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const allServices = await getActiveServices();
  const relatedServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <PublicLayoutWrapper>
      <Breadcrumbs
        items={[
          { name: 'Services', path: '/services' },
          { name: service.name }
        ]}
      />

      {/* Hero Section of Service */}
      <section className="bg-gradient-to-b from-teal-50/60 via-white to-white py-12 sm:py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-teal-100/80 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-teal-900 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                <span>HYDERABAD PROFESSIONAL SERVICE</span>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-5xl text-teal-950 tracking-tight mb-4">
                {service.name}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 font-normal">
                {service.description || service.short_description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <a
                  href={`tel:${companyInfo.phoneClean}`}
                  className="btn-gold px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book {service.name}</span>
                </a>

                <a
                  href={`tel:${companyInfo.phoneClean}`}
                  className="btn-teal px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call: {companyInfo.phone}</span>
                </a>

                <a
                  href={companyInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-gold-300" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-gold-600" />
                <span>Available across Gachibowli, Madhapur, Jubilee Hills &amp; Hyderabad</span>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200">
                <img
                  src={service.hero_image_url || '/images/hero-cleaner.jpg'}
                  alt={`${service.name} by Hari Krishna Deep Cleaning Services Hyderabad`}
                  className="w-full h-[380px] sm:h-[450px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 bg-teal-950/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-white flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-gold-400">
                      Standard Quality SOP
                    </div>
                    <div className="text-xs font-semibold text-slate-200">
                      Deep Sanitization &bull; Eco-Friendly
                    </div>
                  </div>
                  <a
                    href={`tel:${companyInfo.phoneClean}`}
                    className="bg-gold-500 hover:bg-gold-400 text-teal-950 px-3 py-1.5 rounded-xl text-xs font-bold"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                EXPLORE MORE
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-teal-950">
                Related Cleaning Services
              </h2>
            </div>
            <a
              href="/services"
              className="text-xs font-bold text-teal-800 hover:text-gold-600 flex items-center gap-1"
            >
              <span>All Services</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <ServiceCard
                key={rel.id}
                service={{
                  id: rel.id,
                  title: rel.name,
                  slug: rel.slug,
                  shortDescription: rel.short_description,
                  fullDescription: rel.description,
                  image: rel.hero_image_url || '/images/hero-cleaner.jpg',
                  tag: 'PROFESSIONAL',
                  iconName: 'Sparkles',
                  features: [],
                  whatWeClean: [],
                  process: [],
                  whyChooseThis: [],
                  suitableFor: [],
                  faqs: [],
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title={`Book ${service.name} in Hyderabad Today`}
        subtitle="Contact our Hyderabad team for fast quote estimates and verified professional cleaning staff."
      />
    </PublicLayoutWrapper>
  );
}
