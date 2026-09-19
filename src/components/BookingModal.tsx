import React, { useEffect } from 'react';
import { X, Sparkles, ShieldCheck } from 'lucide-react';
import { BookingForm } from './BookingForm';
import { companyInfo } from '../data/companyInfo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceSlug?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  serviceSlug,
}) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden relative animate-in zoom-in-95 duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Banner */}
        <div className="bg-gradient-to-r from-teal-950 via-teal-900 to-teal-950 text-white p-5 sm:p-6 relative border-b border-teal-800">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-gold-400 bg-teal-900/80 px-2.5 py-1 rounded-full mb-2">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>QUICK BOOKING</span>
          </div>

          <h3 id="booking-modal-title" className="text-lg sm:text-xl font-display font-black text-white">
            Schedule a Cleaning Service
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Serving Kavuri Hills, Madhapur, Gachibowli &amp; across Hyderabad
          </p>

          <div className="flex items-center gap-3 mt-3 text-[11px] text-emerald-300 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              Verified Cleaners
            </span>
            <span>&bull;</span>
            <span>Eco-Friendly Products</span>
            <span>&bull;</span>
            <span>+91 95738 97750</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          <BookingForm
            initialService={serviceSlug}
            isModal={true}
            onSuccess={onClose}
          />
        </div>
      </div>
    </div>
  );
};
