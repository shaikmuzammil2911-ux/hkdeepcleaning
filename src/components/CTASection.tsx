import React from 'react';
import { Phone, Calendar, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

interface CTASectionProps {
  onOpenBooking: () => void;
  title?: string;
  subtitle?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  onOpenBooking,
  title = "Ready for a Cleaner, Healthier & Happier Space?",
  subtitle = "Experience Hyderabad's trusted deep cleaning specialists. Contact us now for quick quotes and instant service booking.",
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-teal-950 via-teal-900 to-teal-950 text-white py-16 sm:py-20 border-t border-teal-800/60">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full text-xs font-bold text-gold-300 uppercase tracking-widest mb-4 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>HARI KRISHNA DEEP CLEANING SERVICES</span>
        </div>

        <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight max-w-3xl mx-auto mb-4 leading-tight">
          {title}
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          {subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md sm:max-w-none mx-auto mb-8">
          <a
            href={`tel:${companyInfo.phoneClean}`}
            className="btn-gold w-full sm:w-auto px-8 py-4 rounded-2xl text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl"
          >
            <Phone className="w-4 h-4 animate-bounce" />
            <span>Call: +91 95738 97750</span>
          </a>

          <a
            href={companyInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white w-full sm:w-auto px-8 py-4 rounded-2xl text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all"
          >
            <Sparkles className="w-4 h-4 text-gold-300" />
            <span>WhatsApp Us Now</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="bg-white hover:bg-slate-100 text-teal-950 w-full sm:w-auto px-8 py-4 rounded-2xl text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all"
          >
            <Calendar className="w-4 h-4 text-teal-800" />
            <span>Book Online</span>
          </button>
        </div>

        {/* Trust Badges under CTA */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 pt-4 border-t border-teal-800/60 max-w-2xl mx-auto">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Trained &amp; Verified Crew</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Eco-Friendly Safe Cleaners</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-gold-400" />
            <span>100% Satisfaction Focused</span>
          </div>
        </div>

      </div>
    </section>
  );
};
