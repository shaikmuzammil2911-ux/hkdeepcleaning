import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageSquare, Heart, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';
import { companyInfo } from '../data/companyInfo';
import { servicesData } from '../data/servicesData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-950 text-slate-300 pt-16 pb-28 md:pb-12 border-t border-teal-900 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-teal-800/60">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="bg-white/10 p-2.5 rounded-2xl inline-block mb-4 border border-white/10">
                <Logo variant="dark" size="md" />
              </div>
              
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Professional Deep Cleaning Services based in Hyderabad, Telangana. Dedicated to creating cleaner, healthier, and happier living and working environments for homes, villas, offices, and commercial properties.
              </p>

              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-6">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>100% Eco-Friendly &bull; Verified Staff &bull; Hyderabad</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href={companyInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-xl bg-teal-900/80 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors border border-teal-700/50"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`tel:${companyInfo.phoneClean}`}
                aria-label="Phone Call"
                className="w-9 h-9 rounded-xl bg-teal-900/80 hover:bg-gold-500 hover:text-teal-950 text-white flex items-center justify-center transition-colors border border-teal-700/50"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-xl bg-teal-900/80 hover:bg-gold-500 hover:text-teal-950 text-white flex items-center justify-center transition-colors border border-teal-700/50"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-gold-400 mb-4 pb-1 border-b border-teal-800/80">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Before & After Gallery', path: '/gallery' },
                { name: 'Customer Testimonials', path: '/testimonials' },
                { name: 'Service Areas', path: '/service-areas' },
                { name: 'FAQ', path: '/faq' },
                { name: 'Contact & Booking', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-300 hover:text-gold-300 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-gold-500 text-[10px]">&rsaquo;</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Cleaning Services (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-gold-400 mb-4 pb-1 border-b border-teal-800/80">
              Our Cleaning Services
            </h3>
            <ul className="space-y-2.5 text-xs">
              {servicesData.map((svc) => (
                <li key={svc.id}>
                  <Link
                    to={`/services/${svc.slug}`}
                    className="text-slate-300 hover:text-gold-300 transition-colors flex items-center gap-1.5 truncate"
                  >
                    <span className="text-emerald-400 text-[10px]">&rsaquo;</span>
                    <span>{svc.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Office (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-gold-400 mb-4 pb-1 border-b border-teal-800/80">
              Contact &amp; Location
            </h3>
            <div className="space-y-3.5 text-xs">
              <a
                href={companyInfo.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-slate-300 hover:text-gold-300 transition-colors group"
              >
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="leading-snug">{companyInfo.address}</span>
              </a>

              <a
                href={`tel:${companyInfo.phoneClean}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-gold-300 transition-colors font-semibold"
              >
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>{companyInfo.phone}</span>
              </a>

              <a
                href={companyInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-emerald-300 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>WhatsApp: {companyInfo.whatsapp}</span>
              </a>

              <a
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-gold-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span className="break-all">{companyInfo.email}</span>
              </a>

              <div className="flex items-center gap-2.5 text-slate-400 pt-1 border-t border-teal-800/40">
                <Clock className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>{companyInfo.workingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; 2026 <strong className="text-slate-200">Hari Krishna Deep Cleaning Services</strong>. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400">
              Professional Cleaning Services in Hyderabad
            </span>
            <span className="text-teal-700">|</span>
            <span className="text-gold-400 font-medium">
              Hyderabad, Telangana
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
