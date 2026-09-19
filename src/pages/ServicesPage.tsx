import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ServiceCard } from '../components/ServiceCard';
import { CTASection } from '../components/CTASection';
import { servicesData } from '../data/servicesData';
import { Sparkles, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

interface ServicesPageProps {
  onOpenBooking: (serviceSlug?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="bg-slate-50/50">
      <Breadcrumbs items={[{ name: 'Our Cleaning Services' }]} />

      {/* Page Header */}
      <section className="bg-gradient-to-b from-teal-50/60 to-white py-14 sm:py-18 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-100/80 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-teal-900 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>SPECIALIZED CLEANING SOLUTIONS</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-teal-950 tracking-tight mb-4">
            8+ Professional Cleaning Services in Hyderabad
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            From luxury villas and modern apartments to corporate workplaces and post-construction sites — discover our end-to-end deep cleaning solutions.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onQuickBook={onOpenBooking}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Standard Quality Guarantee */}
      <section className="py-12 bg-teal-950 text-white border-y border-teal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center gap-4 bg-teal-900/60 p-5 rounded-2xl border border-teal-800">
              <ShieldCheck className="w-8 h-8 text-gold-400 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">100% Eco-Friendly</h4>
                <p className="text-xs text-slate-300 mt-0.5">Kid, elder, and pet-safe certified non-toxic agents.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-teal-900/60 p-5 rounded-2xl border border-teal-800">
              <Clock className="w-8 h-8 text-emerald-400 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">Punctual &amp; Prepared</h4>
                <p className="text-xs text-slate-300 mt-0.5">Arriving on-time with high-power machinery.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-teal-900/60 p-5 rounded-2xl border border-teal-800">
              <CheckCircle2 className="w-8 h-8 text-gold-400 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">Quality Assurance</h4>
                <p className="text-xs text-slate-300 mt-0.5">Supervisor-led inspection before handoff.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection onOpenBooking={() => onOpenBooking()} />
    </div>
  );
};
