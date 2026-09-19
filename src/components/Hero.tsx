import React from 'react';
import { Phone, CheckCircle2, ShieldCheck, Leaf, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/40 via-white to-white pt-6 pb-16 lg:pt-12 lg:pb-24">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-gold-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Brand Content & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 self-start bg-teal-100/70 border border-teal-200/80 px-3.5 py-1.5 rounded-full mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-teal-900">
                PROFESSIONAL CLEANING SERVICES IN HYDERABAD
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-5xl xl:text-6xl text-teal-950 tracking-tight leading-[1.15] mb-5">
              Hari Krishna <br />
              <span className="text-gold-500 relative inline-block">
                Deep Cleaning Services
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-gold-300/60" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q50,0 100,10 Q50,20 0,10" fill="currentColor" />
                </svg>
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 max-w-2xl font-normal">
              Your Trusted Partner for a Cleaner, Healthier &amp; Happier Space —{' '}
              <span className="font-semibold text-slate-800">
                Homes | Offices | Villas | Commercial Spaces
              </span>
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 pt-1">
              <div className="flex items-center gap-2 bg-white/90 border border-slate-200/80 p-2.5 rounded-xl shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">
                  Professional Team
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/90 border border-slate-200/80 p-2.5 rounded-xl shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">
                  Eco-Friendly Products
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/90 border border-slate-200/80 p-2.5 rounded-xl shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-gold-100 text-gold-700 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">
                  100% Satisfaction
                </span>
              </div>
            </div>

            {/* Primary Action Buttons matching Reference */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Primary Call Button */}
              <a
                href={`tel:${companyInfo.phoneClean}`}
                id="hero-call-now-btn"
                className="btn-teal flex items-center justify-center gap-3 px-7 py-4 rounded-2xl text-base font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white animate-bounce" />
                </div>
                <div className="text-left leading-tight">
                  <div className="text-xs font-medium uppercase tracking-wider text-teal-200">
                    Call Now
                  </div>
                  <div className="text-base font-extrabold text-white">
                    {companyInfo.phone}
                  </div>
                </div>
              </a>

              {/* Secondary WhatsApp Button */}
              <a
                href={companyInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-btn"
                className="btn-gold flex items-center justify-center gap-3 px-7 py-4 rounded-2xl text-base font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="text-left leading-tight">
                  <div className="text-xs font-medium uppercase tracking-wider text-amber-100">
                    WhatsApp Us
                  </div>
                  <div className="text-base font-extrabold text-white">
                    {companyInfo.whatsapp}
                  </div>
                </div>
              </a>
            </div>

            {/* Micro guarantee text */}
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
              <span>Direct Booking &bull; Hyderabad Local Specialists &bull; Serving All Neighborhoods</span>
            </div>

          </div>

          {/* Right Column: Hero Visual, Badge & Quick Booking Card */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            {/* Main Visual Frame */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200/60 bg-slate-100 group">
              <img
                src="/images/hero-cleaner.jpg"
                alt="Professional Cleaning Service in Hyderabad - Hari Krishna Deep Cleaning"
                className="w-full h-[380px] sm:h-[460px] lg:h-[480px] object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Floating "Clean Spaces Better Lives" Script Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-gold-200/60 flex items-center gap-2 animate-float">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <div className="text-left">
                  <div className="font-serif italic font-bold text-teal-900 text-sm leading-tight">
                    Clean Spaces
                  </div>
                  <div className="font-sans text-[10px] font-extrabold text-gold-600 uppercase tracking-wider">
                    Better Lives
                  </div>
                </div>
              </div>

              {/* Bottom Overlay Info on Hero Image */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="bg-teal-950/80 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gold-400 font-bold uppercase tracking-wider">
                      Hyderabad Service Hub
                    </div>
                    <div className="text-xs text-slate-200 font-medium">
                      All Hyderabad Zones &bull; Gachibowli &bull; Hitech City
                    </div>
                  </div>
                  <button
                    onClick={onOpenBooking}
                    className="bg-gold-500 hover:bg-gold-400 text-teal-950 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <span>Book</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Floating Quick Quote Card */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 items-center gap-3.5 max-w-[260px] ring-1 ring-black/5 z-20">
              <div className="w-10 h-10 rounded-xl bg-gold-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">
                  Need Cleaning Today?
                </div>
                <div className="text-[11px] text-slate-500 mb-1">
                  Get a quick quote in 60s
                </div>
                <button
                  onClick={onOpenBooking}
                  className="text-xs font-bold text-teal-800 hover:text-gold-600 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Book a Service</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
