import React from 'react';
import { MapPin, Phone, Mail, Navigation, CheckCircle2, Sparkles } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import { BookingForm } from './BookingForm';

interface ServiceAreasProps {
  onOpenBooking?: () => void;
}

export const ServiceAreas: React.FC<ServiceAreasProps> = () => {
  const localities = [
    "Jubilee Hills",
    "Banjara Hills",
    "Hitech City",
    "Gachibowli",
    "Kondapur",
    "Madhapur",
    "Manikonda",
    "Kukatpally",
    "Begumpet",
    "And all across Hyderabad",
  ];

  return (
    <section id="service-areas-section" className="py-16 sm:py-24 bg-teal-950 text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-800/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Service Areas & Map */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <div className="inline-flex items-center gap-2 self-start bg-teal-900/80 border border-teal-700/60 px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-gold-400 mb-3">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              <span>SERVICE AREAS</span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight mb-3">
              We Serve Across Hyderabad
            </h2>

            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              Our mobile cleaning teams are deployed across all prime residential and commercial hubs in Hyderabad with fast response times.
            </p>

            {/* Checkmark localities 2-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
              {localities.map((area, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{area}</span>
                </div>
              ))}
            </div>

            {/* Quick Contact Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <a
                href={`tel:${companyInfo.phoneClean}`}
                className="bg-white/10 hover:bg-white/15 border border-white/10 p-3 rounded-xl flex items-center gap-3 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-800 text-gold-400 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left leading-tight">
                  <div className="text-[10px] uppercase text-teal-300 font-bold">Call directly</div>
                  <div className="text-xs font-bold text-white">{companyInfo.phone}</div>
                </div>
              </a>

              <a
                href={companyInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/15 border border-white/10 p-3 rounded-xl flex items-center gap-3 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-gold-300" />
                </div>
                <div className="text-left leading-tight">
                  <div className="text-[10px] uppercase text-emerald-300 font-bold">WhatsApp Us</div>
                  <div className="text-xs font-bold text-white">{companyInfo.whatsapp}</div>
                </div>
              </a>
            </div>

          </div>

          {/* Right Column: Contact & Booking Form */}
          <div className="lg:col-span-6">
            <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-teal-800 bg-teal-50 px-3 py-1 rounded-full mb-2">
                  <span>GET IN TOUCH</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-teal-950">
                  Book Your Cleaning Service Today
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill out the form below and our team will get in touch with you promptly.
                </p>
              </div>

              <BookingForm />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
