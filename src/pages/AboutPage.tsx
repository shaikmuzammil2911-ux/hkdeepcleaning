import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CTASection } from '../components/CTASection';
import { ShieldCheck, Target, Eye, Award, CheckCircle2, MapPin, Sparkles, Phone, Mail, Clock } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  const coreValues = [
    {
      title: "Quality & Professionalism",
      description: "We bring high standards, standardized cleaning protocols, and dedicated equipment to every cleaning assignment."
    },
    {
      title: "Customer Satisfaction",
      description: "Our job isn't done until you inspect and approve our work. We prioritize your happiness and comfort."
    },
    {
      title: "Reliability & Trust",
      description: "Punctual, background-verified technicians who respect your personal belongings and property."
    },
    {
      title: "Hygiene & Safety",
      description: "Using eco-friendly, non-hazardous cleaning products that ensure a safe environment for kids, elders, and pets."
    },
    {
      title: "On-Time Service",
      description: "We value your schedule and arrive with all necessary machinery and supplies at the agreed time slot."
    },
    {
      title: "Attention to Detail",
      description: "Focusing on hidden corners, grout lines, switchboards, and vents that regular daily cleaning misses."
    }
  ];

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'About Us' }]} />

      {/* Page Header */}
      <section className="bg-gradient-to-b from-teal-50/60 to-white py-14 sm:py-18 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-100/80 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-teal-900 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>ABOUT OUR COMPANY</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-teal-950 tracking-tight mb-4">
            About Hari Krishna Deep Cleaning Services
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Professional Cleaning Services in Hyderabad &bull; Kavuri Hills, Madhapur, Telangana
          </p>
        </div>
      </section>

      {/* Main Story & Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-50 bg-slate-100">
                <img
                  src="/images/about-cleaner.jpg"
                  alt="Hari Krishna Deep Cleaning Specialist at work"
                  className="w-full h-[400px] object-cover object-center"
                />
              </div>
            </div>

            {/* Narrative */}
            <div className="lg:col-span-7">
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-teal-950 mb-4">
                Dedicated to Making Every Space Cleaner, Healthier &amp; Happier
              </h2>
              
              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                <p>
                  <strong>Hari Krishna Deep Cleaning Services</strong> is a professional cleaning service provider serving Hyderabad. We provide reliable cleaning solutions for homes, villas, offices, commercial spaces and newly constructed properties.
                </p>
                <p>
                  With a focus on hygiene, safety and customer satisfaction, we ensure every space is cleaned with care and professionalism. Whether preparing for a festive occasion, relocating to a new house, or maintaining commercial hygiene standards, our dedicated teams arrive fully prepared with industrial tools and eco-friendly products.
                </p>
              </div>

              {/* Verified Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Serving All Major Hyderabad Localities</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Eco-Friendly Non-Toxic Agents</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Trained &amp; Verified Cleaning Staff</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Supervisor Quality Inspection</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-slate-50/70 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission */}
            <div className="bg-white rounded-3xl p-8 border border-teal-100 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-800 text-gold-400 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-teal-800">
                  OUR PURPOSE
                </span>
                <h3 className="text-xl font-display font-bold text-teal-950 mt-1 mb-3">
                  Our Mission
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  &ldquo;To provide hygienic, affordable, and professional cleaning services for homes, offices, villas, commercial spaces, and newly constructed properties.&rdquo;
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-3xl p-8 border border-gold-200 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gold-500 text-white flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6" />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-gold-700">
                  OUR ASPIRATION
                </span>
                <h3 className="text-xl font-display font-bold text-teal-950 mt-1 mb-3">
                  Our Vision
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  &ldquo;To become a trusted and leading cleaning service provider in Hyderabad by delivering professional, reliable, and high-quality cleaning solutions.&rdquo;
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-800 bg-teal-50 px-3 py-1 rounded-full">
              GUIDING PRINCIPLES
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-teal-950 mt-2 mb-2">
              Our Core Values
            </h2>
            <p className="text-sm text-slate-500">
              The fundamental commitments that guide our daily operations across Hyderabad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all hover:bg-white"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-800 text-gold-400 flex items-center justify-center font-bold mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-teal-950 mb-2">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office & Operating Details */}
      <section className="py-12 bg-teal-950 text-white border-t border-teal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center gap-4 bg-teal-900/60 p-4 rounded-2xl border border-teal-800">
              <MapPin className="w-8 h-8 text-gold-400 flex-shrink-0" />
              <div>
                <div className="text-xs text-gold-300 font-bold uppercase">Location</div>
                <div className="text-xs text-slate-200 mt-0.5">{companyInfo.address}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-teal-900/60 p-4 rounded-2xl border border-teal-800">
              <Phone className="w-8 h-8 text-gold-400 flex-shrink-0" />
              <div>
                <div className="text-xs text-gold-300 font-bold uppercase">Phone &amp; WhatsApp</div>
                <div className="text-xs text-slate-200 mt-0.5">{companyInfo.phone}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-teal-900/60 p-4 rounded-2xl border border-teal-800">
              <Clock className="w-8 h-8 text-emerald-400 flex-shrink-0" />
              <div>
                <div className="text-xs text-emerald-300 font-bold uppercase">Operating Hours</div>
                <div className="text-xs text-slate-200 mt-0.5">{companyInfo.workingHours}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection onOpenBooking={onOpenBooking} />
    </div>
  );
};
