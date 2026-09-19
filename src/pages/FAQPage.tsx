import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CTASection } from '../components/CTASection';
import { faqData } from '../data/faqData';
import { companyInfo } from '../data/companyInfo';
import { HelpCircle, ChevronDown, Search, Phone, MessageSquare, Sparkles } from 'lucide-react';

interface FAQPageProps {
  onOpenBooking: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onOpenBooking }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2', 'faq-3']);

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ name: 'Frequently Asked Questions' }]} />

      {/* Header */}
      <section className="bg-gradient-to-b from-teal-50/60 to-white py-14 sm:py-18 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-100/80 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-teal-900 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>KNOWLEDGE BASE</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-teal-950 tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-8">
            Find immediate answers about our deep cleaning services, equipment, team safety, and service coverage across Hyderabad.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search questions (e.g. villa, chemicals, timing, WhatsApp...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
            />
          </div>
        </div>
      </section>

      {/* Accordions */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl p-8 border border-slate-200">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">No matching questions found</h3>
              <p className="text-xs text-slate-500 mb-4">Try another keyword or reach out directly to our support team.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="btn-teal px-4 py-2 rounded-xl text-xs font-bold"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq) => {
                const isOpen = openIds.includes(faq.id);
                return (
                  <div
                    key={faq.id}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="text-xs sm:text-sm font-bold text-teal-950">
                        {faq.question}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 bg-teal-800 text-white' : 'text-slate-500'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Direct Support Options */}
          <div className="mt-12 bg-teal-950 text-white rounded-3xl p-8 border border-teal-900 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                Still have questions?
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Speak directly with our team
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                We're happy to answer your specific property requirements.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${companyInfo.phoneClean}`}
                className="btn-gold px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us</span>
              </a>
              <a
                href={companyInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection onOpenBooking={onOpenBooking} />
    </div>
  );
};
