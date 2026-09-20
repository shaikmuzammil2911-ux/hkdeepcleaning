'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, X, ChevronLeft, ChevronRight, MapPin, ZoomIn } from 'lucide-react';
import { galleryData, GalleryItem } from '../data/galleryData';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface BeforeAfterGalleryProps {
  limit?: number;
  showFilters?: boolean;
}

export const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({
  limit = 4,
  showFilters = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Kitchen', 'Bathroom', 'Floor', 'Home'];

  const filteredItems = galleryData.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const handleNext = () => {
    if (!lightboxItem) return;
    const currentIndex = galleryData.findIndex((g) => g.id === lightboxItem.id);
    const nextIndex = (currentIndex + 1) % galleryData.length;
    setLightboxItem(galleryData[nextIndex]);
  };

  const handlePrev = () => {
    if (!lightboxItem) return;
    const currentIndex = galleryData.findIndex((g) => g.id === lightboxItem.id);
    const prevIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    setLightboxItem(galleryData[prevIndex]);
  };

  return (
    <section id="gallery-section" className="py-16 sm:py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-teal-100/70 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-teal-900 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>OUR WORK</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-teal-950 tracking-tight">
              Before &amp; After Gallery
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              See the real transformation. Our professional cleaning makes a visible difference.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/gallery"
              className="text-xs font-bold text-teal-800 hover:text-gold-600 inline-flex items-center gap-1.5 transition-colors"
            >
              <span>View More Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Optional Filter Tabs */}
        {showFilters && (
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-teal-800 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* 4 Column Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group"
            >
              {/* Interactive Before/After Split Item */}
              <div className="relative h-56 w-full">
                <BeforeAfterSlider
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  className="w-full h-full"
                />
                
                {/* Lightbox Expand Icon */}
                <button
                  onClick={() => setLightboxItem(item)}
                  aria-label="Expand image in lightbox"
                  className="absolute bottom-3 right-3 bg-teal-950/80 hover:bg-gold-500 text-white hover:text-teal-950 p-2 rounded-xl backdrop-blur-sm transition-colors shadow-md z-30"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Item Details */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-100">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gold-500" />
                      {item.location}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-teal-950 line-clamp-1 mt-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>

                <button
                  onClick={() => setLightboxItem(item)}
                  className="mt-3 text-[11px] font-bold text-teal-800 hover:text-gold-600 inline-flex items-center gap-1 text-left"
                >
                  <span>Interactive Comparison</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxItem(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setLightboxItem(null);
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
          }}
          tabIndex={0}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800 text-white">
              <div>
                <span className="text-xs font-extrabold text-gold-400 uppercase tracking-wider">
                  {lightboxItem.category} &bull; {lightboxItem.location}
                </span>
                <h3 className="text-base font-bold text-slate-100">
                  {lightboxItem.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLightboxItem(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Slider in Lightbox */}
            <div className="relative flex-1 min-h-[350px] sm:min-h-[480px]">
              <BeforeAfterSlider
                beforeImage={lightboxItem.beforeImage}
                afterImage={lightboxItem.afterImage}
                title={lightboxItem.title}
                className="w-full h-full min-h-[350px] sm:min-h-[480px]"
              />

              {/* Prev / Next Arrows */}
              <button
                onClick={handlePrev}
                aria-label="Previous gallery image"
                className="absolute top-1/2 -translate-y-1/2 left-4 w-10 h-10 rounded-full bg-slate-950/80 hover:bg-gold-500 text-white hover:text-teal-950 flex items-center justify-center backdrop-blur-sm transition-colors shadow-lg z-30"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next gallery image"
                className="absolute top-1/2 -translate-y-1/2 right-4 w-10 h-10 rounded-full bg-slate-950/80 hover:bg-gold-500 text-white hover:text-teal-950 flex items-center justify-center backdrop-blur-sm transition-colors shadow-lg z-30"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Footer Caption */}
            <div className="p-4 bg-slate-950 text-slate-300 text-xs flex items-center justify-between border-t border-slate-800">
              <p>{lightboxItem.description}</p>
              <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                Use ESC to close &bull; Left/Right arrows to navigate
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
