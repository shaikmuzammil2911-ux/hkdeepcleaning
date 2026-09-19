import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Sparkles, Phone } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import { servicesData } from '../data/servicesData';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full text-center bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-teal-800 text-gold-400 flex items-center justify-center mx-auto mb-4 font-black text-2xl shadow-md">
          404
        </div>

        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-teal-950 mb-2">
          Page Not Found
        </h1>

        <p className="text-sm text-slate-600 mb-8 leading-relaxed">
          The page you are looking for might have been moved, renamed, or doesn't exist. Let's get you back to our sparkling clean spaces!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <Link
            to="/"
            className="btn-gold w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <a
            href={`tel:${companyInfo.phoneClean}`}
            className="btn-teal w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call Support</span>
          </a>
        </div>

        {/* Popular Service Links */}
        <div className="pt-6 border-t border-slate-100 text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center">
            Popular Cleaning Services
          </div>
          <div className="grid grid-cols-2 gap-2">
            {servicesData.slice(0, 4).map((svc) => (
              <Link
                key={svc.id}
                to={`/services/${svc.slug}`}
                className="text-xs text-teal-900 hover:text-gold-600 bg-slate-50 hover:bg-teal-50 p-2 rounded-lg border border-slate-100 flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3 h-3 text-gold-500 flex-shrink-0" />
                <span className="truncate">{svc.title}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
