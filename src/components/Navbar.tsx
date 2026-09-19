import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Calendar, Phone, Sparkles, Home, Building2, HardHat, Bath, Utensils, Castle, Truck } from 'lucide-react';
import { Logo } from './Logo';
import { servicesData } from '../data/servicesData';
import { companyInfo } from '../data/companyInfo';

interface NavbarProps {
  onOpenBooking: (serviceSlug?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services', hasDropdown: true },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Service Areas', path: '/service-areas' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'home-deep-cleaning': return <Home className="w-4 h-4" />;
      case 'villa-deep-cleaning': return <Castle className="w-4 h-4" />;
      case 'construction-cleaning': return <HardHat className="w-4 h-4" />;
      case 'office-commercial-cleaning': return <Building2 className="w-4 h-4" />;
      case 'kitchen-deep-cleaning': return <Utensils className="w-4 h-4" />;
      case 'bathroom-deep-cleaning': return <Bath className="w-4 h-4" />;
      case 'floor-cleaning': return <Sparkles className="w-4 h-4" />;
      case 'move-in-move-out-cleaning': return <Truck className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-white/90 backdrop-blur-sm py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo size="md" />

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div
                  key={link.name}
                  className="relative group py-2"
                  onMouseEnter={() => setIsServicesDropdownOpen(true)}
                  onMouseLeave={() => setIsServicesDropdownOpen(false)}
                >
                  <Link
                    to={link.path}
                    className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors duration-200 ${
                      isActive('/services')
                        ? 'text-teal-800 font-bold border-b-2 border-gold-500 pb-0.5'
                        : 'text-slate-700 hover:text-teal-700'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-gold-500" />
                  </Link>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute left-0 top-full pt-2 w-80 transition-all duration-200 origin-top-left ${
                      isServicesDropdownOpen
                        ? 'opacity-100 scale-100 pointer-events-auto visible'
                        : 'opacity-0 scale-95 pointer-events-none invisible'
                    }`}
                  >
                    <div className="bg-white rounded-xl shadow-2xl border border-slate-100 p-2 overflow-hidden ring-1 ring-black/5">
                      <div className="px-3 py-2 border-b border-slate-100 bg-teal-50/50 rounded-lg mb-1 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-teal-900">
                          8+ Cleaning Services
                        </span>
                        <Link
                          to="/services"
                          className="text-[11px] font-semibold text-gold-600 hover:underline"
                        >
                          View All →
                        </Link>
                      </div>

                      <div className="space-y-0.5 max-h-[380px] overflow-y-auto">
                        {servicesData.map((service) => (
                          <Link
                            key={service.id}
                            to={`/services/${service.slug}`}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-teal-50 text-slate-700 hover:text-teal-900 transition-colors group/item"
                          >
                            <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center group-hover/item:bg-gold-500 group-hover/item:text-white transition-colors">
                              {getServiceIcon(service.slug)}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold group-hover/item:text-teal-800">
                                {service.title}
                              </span>
                              <span className="text-[10px] text-slate-400 truncate max-w-[200px]">
                                {service.tag}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold transition-colors duration-200 relative ${
                  isActive(link.path)
                    ? 'text-teal-800 font-bold'
                    : 'text-slate-700 hover:text-teal-700'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-gold-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action: Book Now & Call CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${companyInfo.phoneClean}`}
            className="flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-2 rounded-full border border-teal-200 transition-all duration-200"
          >
            <Phone className="w-3.5 h-3.5 text-teal-700" />
            <span>Call: +91 95738 97750</span>
          </a>

          <button
            onClick={() => onOpenBooking()}
            id="nav-book-now-btn"
            className="btn-gold flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Now</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            onClick={() => onOpenBooking()}
            className="btn-gold px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm sm:hidden"
          >
            <Calendar className="w-3 h-3" />
            <span>Book</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            id="mobile-menu-toggle-btn"
            aria-label="Toggle mobile menu"
            className="p-2 rounded-lg text-teal-900 hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-700"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[70px] z-50 bg-slate-900/60 backdrop-blur-sm xl:hidden">
          <div className="bg-white w-full max-h-[85vh] overflow-y-auto shadow-2xl border-b border-slate-200 px-6 py-6 animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-slate-100 pb-2">
                  <Link
                    to={link.path}
                    className={`block text-base font-semibold py-1 ${
                      isActive(link.path)
                        ? 'text-teal-800 font-bold pl-2 border-l-4 border-gold-500'
                        : 'text-slate-800 hover:text-teal-700'
                    }`}
                  >
                    {link.name}
                  </Link>

                  {link.hasDropdown && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2 pl-3 py-1 bg-slate-50 rounded-lg">
                      {servicesData.map((svc) => (
                        <Link
                          key={svc.id}
                          to={`/services/${svc.slug}`}
                          className="text-xs text-slate-600 hover:text-teal-800 py-1 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                          <span>{svc.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="btn-gold w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md text-sm uppercase tracking-wider"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Cleaning Service</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${companyInfo.phoneClean}`}
                    className="btn-teal py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href={companyInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-gold-300" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <div className="text-center text-xs text-slate-500 pt-2">
                  📍 {companyInfo.shortAddress}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
