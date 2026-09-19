import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageSquare } from 'lucide-react';
import { faqData, FaqItem } from '../data/faqData';
import { companyInfo } from '../data/companyInfo';

interface FAQSectionProps {
  limit?: number;
  showContactCTA?: boolean;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  limit,
  showContactCTA = true,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const displayedFaqs = limit ? faqData.slice(0, limit) : faqData;

  return (
    <section id="faq-section" className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-teal-100/70 px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-teal-900 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-gold-600" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-teal-950 tracking-tight mb-2">
            Got Questions? We Have Answers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Everything you need to know about our professional deep cleaning services across Hyderabad.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {displayedFaqs.map((faq: FaqItem) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="border border-slate-200/80 rounded-2xl overflow-hidden transition-colors bg-slate-50/50 hover:bg-slate-50"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-xs sm:text-sm font-bold text-teal-950">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-teal-800 text-white border-teal-800' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/40 bg-white animate-in slide-in-from-top-2 duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Support CTA */}
        {showContactCTA && (
          <div className="mt-10 bg-teal-50 rounded-2xl p-6 border border-teal-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="text-sm font-bold text-teal-950">
                Have more questions or custom requirements?
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Our support team in Kavuri Hills is available 7 days a week.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`tel:${companyInfo.phoneClean}`}
                className="btn-teal px-4 py-2.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us</span>
              </a>
              <a
                href={companyInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
