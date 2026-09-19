import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BeforeAfterGallery } from '../components/BeforeAfterGallery';
import { CTASection } from '../components/CTASection';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface GalleryPageProps {
  onOpenBooking: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ name: 'Before & After Gallery' }]} />

      {/* Page Header */}
      <section className="bg-gradient-to-b from-teal-50/60 to-white py-14 sm:py-18 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-100/80 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-teal-900 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>REAL PROJECT TRANSFORMATIONS</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-teal-950 tracking-tight mb-4">
            Before &amp; After Cleaning Gallery
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Interact with our split slider to see how our specialized equipment restores kitchens, bathrooms, marble floors, and entire homes across Hyderabad.
          </p>
        </div>
      </section>

      {/* Interactive Gallery with Filters */}
      <BeforeAfterGallery limit={0} showFilters={true} />

      {/* Transformation Standards */}
      <section className="py-12 bg-teal-950 text-white border-y border-teal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-gold-400 font-bold text-xs uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>The Hari Krishna Standard</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Want Results Like These For Your Space?</h3>
          <p className="text-xs text-slate-300 max-w-xl mx-auto mb-6">
            Our teams in Kavuri Hills and Madhapur bring the same machinery, chemicals, and dedication to every client site.
          </p>
          <button
            onClick={onOpenBooking}
            className="btn-gold px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider"
          >
            Book Your Cleaning Transformation
          </button>
        </div>
      </section>

      <CTASection onOpenBooking={onOpenBooking} />
    </div>
  );
};
