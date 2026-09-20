'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Home, Building2, HardHat, Bath, Utensils, Castle, Truck } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { ServiceCard } from './ServiceCard';
import { useBooking } from '@/components/BookingContext';

interface ServiceGridProps {
  onOpenBooking?: (serviceSlug?: string) => void;
  showAll?: boolean;
  services?: any[];
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({ onOpenBooking, services }) => {
  const { openBooking } = useBooking();
  const handleBooking = (slug?: string) => {
    if (onOpenBooking) {
      onOpenBooking(slug);
    } else {
      openBooking(slug);
    }
  };

  const displayServices = services && services.length > 0 ? services : servicesData;

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Home': return <Home className="w-5 h-5" />;
      case 'Castle': return <Castle className="w-5 h-5" />;
      case 'HardHat': return <HardHat className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'Utensils': return <Utensils className="w-5 h-5" />;
      case 'Bath': return <Bath className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Truck': return <Truck className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="services-section" className="py-16 sm:py-20 bg-slate-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-teal-100/80 px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-teal-900 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>OUR SERVICES</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-4xl text-teal-950 tracking-tight mb-3">
            Professional Cleaning Services in Hyderabad
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            We offer a wide range of deep-cleaning solutions for homes, offices, villas and commercial spaces in Hyderabad.
          </p>
        </div>

        {/* Mobile Quick Service Buttons */}
        <div className="grid grid-cols-2 gap-2.5 mb-8 md:hidden">
          {displayServices.map((svc: any) => {
            const title = svc.name || svc.title;
            const iconName = svc.iconName || 'Sparkles';
            return (
              <Link
                key={`mob-${svc.id || svc.slug}`}
                href={`/services/${svc.slug}`}
                className="bg-white rounded-xl p-3 border border-teal-100 shadow-xs flex items-center gap-2.5 active:bg-teal-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-800 text-white flex items-center justify-center flex-shrink-0">
                  {getServiceIcon(iconName)}
                </div>
                <span className="text-xs font-bold text-teal-950 line-clamp-1">
                  {title}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Desktop / Tablet Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayServices.map((service: any) => (
            <ServiceCard
              key={service.id || service.slug}
              service={service}
              onQuickBook={handleBooking}
            />
          ))}
        </div>

        {/* Bottom Bar: Explore all services CTA */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/services"
            className="btn-teal px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
          >
            <span>Explore All 8 Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={() => handleBooking()}
            className="btn-gold px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all"
          >
            <span>Book Custom Service</span>
          </button>
        </div>

      </div>
    </section>
  );
};
