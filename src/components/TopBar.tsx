import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-teal-950 text-slate-200 border-b border-teal-800/40 text-xs py-2 px-4 relative z-40 hidden md:block">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Location & Hours */}
        <div className="flex items-center gap-4">
          <a
            href={companyInfo.mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-gold-300 transition-colors duration-200 group"
          >
            <MapPin className="w-3.5 h-3.5 text-gold-400 group-hover:scale-110 transition-transform" />
            <span className="font-normal text-slate-300">
              {companyInfo.address}
            </span>
          </a>
        </div>

        {/* Right: Phone, Email, Hours */}
        <div className="flex items-center gap-5">
          <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{companyInfo.workingHours}</span>
          </div>

          <span className="text-teal-700 hidden lg:inline">|</span>

          <a
            href={`tel:${companyInfo.phoneClean}`}
            className="flex items-center gap-1.5 font-semibold text-white hover:text-gold-300 transition-colors duration-200"
          >
            <Phone className="w-3.5 h-3.5 text-gold-400" />
            <span>{companyInfo.phone}</span>
          </a>

          <span className="text-teal-700">|</span>

          <a
            href={`mailto:${companyInfo.email}`}
            className="flex items-center gap-1.5 text-slate-300 hover:text-gold-300 transition-colors duration-200"
          >
            <Mail className="w-3.5 h-3.5 text-gold-400" />
            <span className="truncate max-w-[220px]">{companyInfo.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
