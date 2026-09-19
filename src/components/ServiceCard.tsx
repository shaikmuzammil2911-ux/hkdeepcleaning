import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Building2, HardHat, Bath, Utensils, Castle, Sparkles, Truck } from 'lucide-react';
import { ServiceItem } from '../data/servicesData';

interface ServiceCardProps {
  service: ServiceItem;
  onQuickBook?: (slug: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Home': return <Home className="w-5 h-5 text-white" />;
      case 'Castle': return <Castle className="w-5 h-5 text-white" />;
      case 'HardHat': return <HardHat className="w-5 h-5 text-white" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-white" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-white" />;
      case 'Bath': return <Bath className="w-5 h-5 text-white" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-white" />;
      case 'Truck': return <Truck className="w-5 h-5 text-white" />;
      default: return <Sparkles className="w-5 h-5 text-white" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group relative">
      {/* Card Image */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={service.image}
          alt={`${service.title} in Hyderabad`}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Service Tag Badge */}
        <span className="absolute top-3 right-3 bg-teal-900/80 backdrop-blur-md text-gold-300 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-gold-400/30">
          {service.tag}
        </span>
      </div>

      {/* Floating Circular Icon Badge Overlapping Image */}
      <div className="relative px-5 pt-0 pb-6 flex-1 flex flex-col justify-between">
        <div className="-mt-6 mb-3 flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-teal-800 border-2 border-white shadow-md flex items-center justify-center group-hover:bg-gold-500 transition-colors duration-300">
            {renderIcon(service.iconName)}
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-lg font-display font-bold text-teal-950 group-hover:text-teal-700 transition-colors mb-2">
            <Link to={`/services/${service.slug}`}>
              {service.title}
            </Link>
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
            {service.shortDescription}
          </p>
        </div>

        {/* Card Footer: View Details & Arrow */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between mt-auto">
          <Link
            to={`/services/${service.slug}`}
            className="text-xs font-bold text-teal-800 group-hover:text-gold-600 transition-colors inline-flex items-center gap-1.5"
          >
            <span>View Service</span>
          </Link>

          <Link
            to={`/services/${service.slug}`}
            aria-label={`View details for ${service.title}`}
            className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-teal-700 group-hover:translate-x-1 transition-all duration-200"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
