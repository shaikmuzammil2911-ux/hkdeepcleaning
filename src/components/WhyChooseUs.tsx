import React from 'react';
import { UserCheck, Leaf, Clock, BadgePercent, ShieldCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <UserCheck className="w-5 h-5 text-gold-400" />,
      title: "Trained & Verified Staff",
      desc: "Background-checked & skilled cleaning technicians"
    },
    {
      icon: <Leaf className="w-5 h-5 text-emerald-400" />,
      title: "Eco-Friendly Products",
      desc: "Non-hazardous, pet & child safe cleaning agents"
    },
    {
      icon: <Clock className="w-5 h-5 text-gold-400" />,
      title: "On-Time Service",
      desc: "Punctual arrival with complete machinery"
    },
    {
      icon: <BadgePercent className="w-5 h-5 text-emerald-400" />,
      title: "Affordable Pricing",
      desc: "Transparent rates with zero hidden charges"
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-gold-400" />,
      title: "100% Customer Satisfaction",
      desc: "Supervisor quality check & sign-off"
    }
  ];

  return (
    <section className="bg-teal-950 text-white py-8 border-y border-teal-800/40 relative overflow-hidden">
      {/* Subtle Background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C89B3C_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4 items-center justify-between">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 p-2 rounded-xl transition-all duration-300 hover:bg-white/5 ${
                idx === 4 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <div className="w-11 h-11 rounded-full bg-teal-900/90 border border-teal-700/60 flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-100 leading-snug">
                  {feature.title}
                </h4>
                <p className="text-[11px] text-teal-300/80 mt-0.5 hidden sm:block leading-tight">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
