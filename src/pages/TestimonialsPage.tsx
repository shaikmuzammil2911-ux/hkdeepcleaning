import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CTASection } from '../components/CTASection';
import { testimonialsData } from '../data/testimonialsData';
import { Star, CheckCircle, MapPin, Sparkles, MessageSquare } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

interface TestimonialsPageProps {
  onOpenBooking: () => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="bg-slate-50/50">
      <Breadcrumbs items={[{ name: 'Customer Testimonials' }]} />

      {/* Page Header */}
      <section className="bg-gradient-to-b from-teal-50/60 to-white py-14 sm:py-18 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-100/80 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-teal-900 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>CUSTOMER EXPERIENCES</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-teal-950 tracking-tight mb-4">
            What Our Customers in Hyderabad Say
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Read verified feedback from homeowners, villa residents, and office managers across Kavuri Hills, Madhapur, Jubilee Hills, and Greater Hyderabad.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialsData.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4 text-gold-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-500" />
                    ))}
                  </div>

                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 italic">
                    &ldquo;{item.review}&rdquo;
                  </p>
                </div>

                {/* Author Card */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                  <img
                    src={item.avatarUrl}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gold-400"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-bold text-teal-950">
                        {item.name}
                      </h3>
                      {item.verified && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
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

          {/* Share Feedback CTA */}
          <div className="mt-12 bg-teal-50 rounded-2xl p-8 border border-teal-100 text-center max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-teal-950 mb-2">
              Have You Experienced Our Cleaning?
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              We appreciate your feedback! Share your experience with Hari Krishna Deep Cleaning Services.
            </p>
            <a
              href={`https://wa.me/${companyInfo.whatsappClean}?text=${encodeURIComponent(
                'Hello Hari Krishna Deep Cleaning Services, I would like to share feedback about your recent service.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal-800 hover:bg-teal-900 text-white px-6 py-2.5 rounded-full text-xs font-bold inline-flex items-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-gold-400" />
              <span>Send Feedback via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      <CTASection onOpenBooking={onOpenBooking} />
    </div>
  );
};
