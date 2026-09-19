import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="fixed bottom-20 md:bottom-6 right-5 z-40 flex items-center group">
      {/* Tooltip on desktop */}
      <div className="hidden lg:flex items-center gap-1.5 mr-3 px-3 py-1.5 bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold rounded-xl shadow-lg border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        <Sparkles className="w-3.5 h-3.5 text-gold-400" />
        <span>Chat on WhatsApp</span>
      </div>

      {/* Floating Button */}
      <a
        href={companyInfo.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Hari Krishna Deep Cleaning Services on WhatsApp"
        id="floating-whatsapp-btn"
        className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-[0_8px_25px_rgba(16,185,129,0.5)] transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {/* Radar Pulse Effect */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/40 animate-ping pointer-events-none" />
        <span className="absolute -inset-2 rounded-full bg-emerald-400/20 animate-pulse-slow pointer-events-none" />

        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 relative z-10 fill-current" />
      </a>
    </div>
  );
};
