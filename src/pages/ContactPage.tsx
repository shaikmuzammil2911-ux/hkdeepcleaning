import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BookingForm } from '../components/BookingForm';
import { companyInfo } from '../data/companyInfo';
import { MapPin, Phone, Mail, Clock, MessageSquare, Navigation, Sparkles, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ name: 'Contact & Booking' }]} />

      {/* Page Header */}
      <section className="bg-gradient-to-b from-teal-50/60 to-white py-14 sm:py-18 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-100/80 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-teal-900 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>GET IN TOUCH</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-teal-950 tracking-tight mb-4">
            Contact Hari Krishna Deep Cleaning Services
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Ready for a pristine home or office in Hyderabad? Call us, message on WhatsApp, or submit your booking details below.
          </p>
        </div>
      </section>

      {/* Main Content: Info & Form */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Contact Cards & Map (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Phone Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-800 text-gold-400 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold uppercase text-slate-400">Direct Phone</div>
                  <a
                    href={`tel:${companyInfo.phoneClean}`}
                    className="text-base font-bold text-teal-950 hover:text-gold-600 transition-colors"
                  >
                    {companyInfo.phone}
                  </a>
                  <div className="text-[11px] text-slate-500">Available 7:00 AM - 9:00 PM</div>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold uppercase text-slate-400">WhatsApp Chat</div>
                  <a
                    href={companyInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-teal-950 hover:text-emerald-600 transition-colors"
                  >
                    {companyInfo.whatsapp}
                  </a>
                  <div className="text-[11px] text-slate-500">Instant quotes &amp; photo evaluation</div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-800 text-gold-400 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold uppercase text-slate-400">Email Address</div>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="text-xs sm:text-sm font-bold text-teal-950 hover:text-gold-600 transition-colors break-all"
                  >
                    {companyInfo.email}
                  </a>
                  <div className="text-[11px] text-slate-500">Corporate &amp; residential inquiries</div>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-800 text-gold-400 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold uppercase text-slate-400">Headquarters Address</div>
                    <div className="text-xs font-semibold text-teal-950 mt-0.5 leading-snug">
                      {companyInfo.address}
                    </div>
                  </div>
                </div>

                <div className="h-44 w-full rounded-xl overflow-hidden border border-slate-200 mb-3">
                  <iframe
                    title="Hari Krishna Deep Cleaning Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.323635787163!2d78.3908!3d17.4399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x11e403d6d06144e!2sKavuri%20Hills%2C%20Madhapur%2C%20Hyderabad%2C%20Telangana%20500081!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>

                <a
                  href={companyInfo.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Driving Directions</span>
                </a>
              </div>

            </div>

            {/* Right Column: Full Booking & Query Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
                <div className="mb-6">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-teal-800 bg-teal-50 px-3 py-1 rounded-full">
                    RESERVATION &amp; QUOTE
                  </span>
                  <h2 className="text-2xl font-display font-extrabold text-teal-950 mt-2">
                    Book Your Cleaning Service Today
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Select your service, choose your preferred slot, and our team will get in touch with you.
                  </p>
                </div>

                <BookingForm />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
