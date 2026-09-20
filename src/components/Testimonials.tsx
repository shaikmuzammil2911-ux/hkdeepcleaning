'use client';

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, MapPin, CheckCircle } from 'lucide-react';
import { testimonialsData } from '../data/testimonialsData';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <section id="testimonials-section" className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-teal-100/70 px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-teal-900 mb-2">
            <span>TESTIMONIALS</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-teal-950 tracking-tight mb-2">
            What Our Customers Say
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Real people. Real experiences. Our customers trust us for a reason.
          </p>
        </div>

        {/* Desktop 3-Card Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {testimonialsData.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-gold-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-500" />
                  ))}
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 italic relative">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                <img
                  src={item.avatarUrl}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-gold-400 shadow-sm"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-teal-950 truncate">
                      {item.name}
                    </h4>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-gold-600" />
                    <span>{item.location}</span>
                  </div>
                  <div className="text-[10px] font-semibold text-teal-700 mt-0.5">
                    {item.service}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-teal-800 hover:text-white text-slate-700 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5">
            {testimonialsData.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === i ? 'w-6 bg-gold-500' : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-teal-800 hover:text-white text-slate-700 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
