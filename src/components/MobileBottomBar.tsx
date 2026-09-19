import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

interface MobileBottomBarProps {
  onOpenBooking: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-4 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden">
      <div className="grid grid-cols-3 gap-2 items-center max-w-md mx-auto">
        {/* Call Button */}
        <a
          href={`tel:${companyInfo.phoneClean}`}
          id="mobile-bottom-call-btn"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-teal-50 text-teal-800 hover:bg-teal-100 active:scale-95 transition-all text-center"
        >
          <Phone className="w-4 h-4 mb-0.5 text-teal-700" />
          <span className="text-[10px] font-bold">Call Now</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={companyInfo.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="mobile-bottom-whatsapp-btn"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 active:scale-95 transition-all text-center"
        >
          <MessageSquare className="w-4 h-4 mb-0.5 text-emerald-600" />
          <span className="text-[10px] font-bold">WhatsApp</span>
        </a>

        {/* Book Now Button */}
        <button
          onClick={onOpenBooking}
          id="mobile-bottom-book-btn"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl btn-gold text-white active:scale-95 transition-all text-center shadow-sm"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-extrabold uppercase">Book Now</span>
        </button>
      </div>
    </div>
  );
};
