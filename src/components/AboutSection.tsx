import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Target, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Image with Experience Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-50 bg-slate-100">
              <img
                src="/images/about-cleaner.jpg"
                alt="Hari Krishna Deep Cleaning Services Team in Hyderabad"
                className="w-full h-[360px] sm:h-[440px] object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/70 via-transparent to-transparent" />

              {/* Bottom Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-800 text-gold-400 flex items-center justify-center flex-shrink-0 font-bold">
                    HK
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-teal-950">
                      Hyderabad's Dedicated Deep Cleaning Crew
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Standardized SOPs &bull; Eco-Friendly &bull; Hyderabad
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Gold Frame accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-gold-400/40 rounded-3xl -z-10 hidden sm:block" />
          </div>

          {/* Right Column: Content & 3 Info Badges */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 self-start bg-teal-100/70 px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-teal-900 mb-3">
              <span>ABOUT US</span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-teal-950 tracking-tight mb-4">
              Hari Krishna Deep Cleaning Services
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3">
              Hari Krishna Deep Cleaning Services is a professional cleaning service provider serving Hyderabad. We provide reliable cleaning solutions for homes, villas, offices, commercial spaces and newly constructed properties.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              With a focus on hygiene, safety and customer satisfaction, we ensure every space is cleaned with care and professionalism.
            </p>

            {/* 3 Info Cards matching image.png reference */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
              {/* Card 1: Experience / Positioning */}
              <div className="bg-teal-50/60 border border-teal-100 p-3.5 rounded-2xl flex flex-col justify-between">
                <div className="w-8 h-8 rounded-lg bg-teal-800 text-gold-400 flex items-center justify-center mb-2">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase text-slate-400">
                    Years in Business
                  </div>
                  <div className="text-xs font-bold text-teal-950 mt-0.5 leading-snug">
                    Professional Cleaning Services in Hyderabad
                  </div>
                </div>
              </div>

              {/* Card 2: Location */}
              <div className="bg-teal-50/60 border border-teal-100 p-3.5 rounded-2xl flex flex-col justify-between">
                <div className="w-8 h-8 rounded-lg bg-teal-800 text-gold-400 flex items-center justify-center mb-2">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase text-slate-400">
                    Location
                  </div>
                  <div className="text-xs font-bold text-teal-950 mt-0.5 leading-snug">
                    Hyderabad, Telangana
                  </div>
                </div>
              </div>

              {/* Card 3: Mission */}
              <div className="bg-teal-50/60 border border-teal-100 p-3.5 rounded-2xl flex flex-col justify-between">
                <div className="w-8 h-8 rounded-lg bg-teal-800 text-gold-400 flex items-center justify-center mb-2">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase text-slate-400">
                    Our Mission
                  </div>
                  <div className="text-xs font-bold text-teal-950 mt-0.5 leading-snug">
                    To provide hygienic, affordable and professional cleaning services.
                  </div>
                </div>
              </div>
            </div>

            {/* Core Values Bullet Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
              {[
                "Quality & Professionalism",
                "Customer Satisfaction",
                "Reliability & Trust",
                "Hygiene & Safety",
                "On-Time Service",
                "Attention to Detail"
              ].map((val, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{val}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div>
              <Link
                to="/about"
                className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
