import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CTASection } from '../components/CTASection';
import { serviceAreasData } from '../data/serviceAreasData';
import { companyInfo } from '../data/companyInfo';
import { MapPin, Navigation, Sparkles, CheckCircle2, Phone } from 'lucide-react';

interface ServiceAreasPageProps {
  onOpenBooking: (serviceSlug?: string) => void;
}

export const ServiceAreasPage: React.FC<ServiceAreasPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ name: 'Service Areas in Hyderabad' }]} />

      {/* Page Header */}
      <section className="bg-gradient-to-b from-teal-50/60 to-white py-14 sm:py-18 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-100/80 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-teal-900 mb-3">
            <MapPin className="w-3.5 h-3.5 text-gold-600" />
            <span>HYDERABAD COVERAGE</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-teal-950 tracking-tight mb-4">
            Cleaning Services Across Hyderabad
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            From our Kavuri Hills hub, we deliver high-grade deep cleaning solutions to prime residential, gated communities, and commercial districts throughout Hyderabad.
          </p>
        </div>
      </section>

      {/* Interactive Map & Office Highlight */}
      <section className="py-12 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5">
              <span className="text-xs font-bold text-gold-600 uppercase tracking-wider">
                Primary Operating Hub
              </span>
              <h2 className="text-2xl font-bold text-teal-950 mt-1 mb-3">
                Kavuri Hills, Madhapur Base
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                <strong>Address:</strong> {companyInfo.address}
              </p>
              <div className="space-y-2 text-xs text-slate-600 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Rapid response dispatch for Kavuri Hills &amp; Madhapur</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Serving all major high-rise societies and tech parks</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={companyInfo.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
                <a
                  href={`tel:${companyInfo.phoneClean}`}
                  className="btn-teal px-5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Us</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
              <iframe
                title="Hari Krishna Deep Cleaning Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.323635787163!2d78.3908!3d17.4399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x11e403d6d06144e!2sKavuri%20Hills%2C%20Madhapur%2C%20Hyderabad%2C%20Telangana%20500081!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Localities Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-800 bg-teal-50 px-3 py-1 rounded-full">
              AREAS SERVICED
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-teal-950 mt-2">
              Explore Our Hyderabad Service Zones
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Click any locality to request on-demand cleaning services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceAreasData.map((area) => (
              <div
                key={area.id}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-teal-800 text-gold-400 flex items-center justify-center font-bold">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-white px-2.5 py-1 rounded-full border border-slate-200 text-slate-600">
                      PIN {area.pincode}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-teal-950 mb-1">
                    {area.name}
                  </h3>
                  <div className="text-xs font-semibold text-gold-600 mb-2">
                    {area.region}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {area.description}
                  </p>

                  <div className="space-y-1">
                    <div className="text-[10px] font-extrabold uppercase text-slate-400">
                      Popular Services in this area:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {area.popularServices.map((svc, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-white border border-teal-100 text-teal-800 px-2 py-0.5 rounded-md font-medium"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <button
                    onClick={() => onOpenBooking()}
                    className="text-xs font-bold text-teal-800 hover:text-gold-600 transition-colors"
                  >
                    Book in {area.name} &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection onOpenBooking={onOpenBooking} />
    </div>
  );
};
