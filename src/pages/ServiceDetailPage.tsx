import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CTASection } from '../components/CTASection';
import { ServiceCard } from '../components/ServiceCard';
import { servicesData } from '../data/servicesData';
import { companyInfo } from '../data/companyInfo';
import {
  Phone,
  Calendar,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Clock,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  MapPin
} from 'lucide-react';

interface ServiceDetailPageProps {
  onOpenBooking: (serviceSlug?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ onOpenBooking }) => {
  const { slug } = useParams<{ slug: string }>();
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  const service = servicesData.find((s) => s.slug === slug);

  // If service not found, redirect to services page
  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const relatedServices = servicesData.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Services', path: '/services' },
          { name: service.title }
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
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 font-normal">
                {service.fullDescription}
              </p>

              {/* Service Features Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-teal-50/50 p-2.5 rounded-xl border border-teal-100/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => onOpenBooking(service.slug)}
                  className="btn-gold px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book {service.title}</span>
                </button>

                <a
                  href={`tel:${companyInfo.phoneClean}`}
                  className="btn-teal px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call: +91 95738 97750</span>
                </a>

                <a
                  href={`https://wa.me/${companyInfo.whatsappClean}?text=${encodeURIComponent(
                    `Hello Hari Krishna Deep Cleaning Services, I would like to enquire about ${service.title} in Hyderabad.`
                  )}`}
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
                <span>Available across Kavuri Hills, Madhapur, Jubilee Hills &amp; Hyderabad</span>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200">
                <img
                  src={service.image}
                  alt={`${service.title} by Hari Krishna Deep Cleaning Services Hyderabad`}
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
                  <button
                    onClick={() => onOpenBooking(service.slug)}
                    className="bg-gold-500 hover:bg-gold-400 text-teal-950 px-3 py-1.5 rounded-xl text-xs font-bold"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* What We Clean Detailed Breakdown */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-800 bg-teal-100/70 px-3.5 py-1 rounded-full">
              COMPREHENSIVE CHECKLIST
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-teal-950 mt-2">
              What We Clean in {service.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Detailed breakdown of areas and items sanitized by our trained crew.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.whatWeClean.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-800 text-gold-400 flex items-center justify-center font-bold mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-teal-950 mb-4 pb-2 border-b border-slate-100">
                    {cat.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {cat.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our 5-Step Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-800 bg-teal-50 px-3 py-1 rounded-full">
              HOW WE WORK
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-teal-950 mt-2">
              Our 5-Step Cleaning Process
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Methodical, safe, and thorough workflow followed on every site.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {service.process.map((step) => (
              <div
                key={step.step}
                className="bg-teal-50/50 border border-teal-100 rounded-2xl p-5 relative flex flex-col justify-between hover:bg-teal-50 transition-colors"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-teal-800 text-white flex items-center justify-center font-black text-sm mb-3 shadow-sm">
                    {step.step}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-teal-950 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose & Suitable For */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Why Choose This */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-800 text-gold-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-teal-950">
                  Why Choose Us for {service.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {service.whyChooseThis.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suitable For */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gold-200 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold-500 text-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-teal-950">
                  Who Is This Service Best For?
                </h3>
              </div>
              <ul className="space-y-3">
                {service.suitableFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Service Specific FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-800 bg-teal-50 px-3 py-1 rounded-full">
              SERVICE QUESTIONS
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-teal-950 mt-2">
              FAQs About {service.title}
            </h2>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4"
                  >
                    <span className="text-xs sm:text-sm font-bold text-teal-950">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform ${
                        isOpen ? 'rotate-180 text-teal-800' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 border-t border-slate-200/50 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
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
            <Link
              to="/services"
              className="text-xs font-bold text-teal-800 hover:text-gold-600 flex items-center gap-1"
            >
              <span>All 8 Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <ServiceCard
                key={rel.id}
                service={rel}
                onQuickBook={onOpenBooking}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        onOpenBooking={() => onOpenBooking(service.slug)}
        title={`Book ${service.title} in Hyderabad Today`}
        subtitle="Contact our Kavuri Hills team for fast quote estimates and verified professional cleaning staff."
      />
    </div>
  );
};
