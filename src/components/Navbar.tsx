'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Menu,
  X,
  Calendar,
  Phone,
  Sparkles,
  Home,
  Building2,
  HardHat,
  Bath,
  Utensils,
  Castle,
  Truck,
} from 'lucide-react';
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
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services', hasDropdown: true },
    { name: 'Blog', path: '/posts' },
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
    if (!pathname) return false;
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/98 backdrop-blur-md shadow-sm border-b border-slate-200/80'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-100'
      }`}
    >
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-8 lg:px-10 h-[105px] min-h-[105px] flex items-center justify-between">
        
        {/* 1. BRAND AREA */}
        <div className="flex-shrink-0 flex items-center pr-4">
          <Logo size="md" />
        </div>

        {/* 2. MAIN NAVIGATION ROW */}
        <nav className="hidden xl:flex items-center gap-[28px] 2xl:gap-[32px] justify-center">
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
                    href={link.path}
                    className={`inline-flex items-center gap-1.5 text-[14px] font-semibold transition-colors duration-150 whitespace-nowrap ${
                      isActive('/services')
                        ? 'text-teal-800 font-bold border-b-2 border-gold-500 pb-0.5'
                        : 'text-slate-700 hover:text-teal-800'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-gold-500" />
                  </Link>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute left-0 top-full pt-2 w-80 transition-all duration-200 origin-top-left z-50 ${
                      isServicesDropdownOpen
                        ? 'opacity-100 scale-100 pointer-events-auto visible'
                        : 'opacity-0 scale-95 pointer-events-none invisible'
                    }`}
                  >
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 overflow-hidden ring-1 ring-black/5">
                      <div className="px-3.5 py-2.5 border-b border-slate-100 bg-teal-50/60 rounded-xl mb-1 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-teal-950">
                          8+ Cleaning Services
                        </span>
                        <Link
                          href="/services"
                          className="text-[11px] font-bold text-gold-600 hover:underline"
                        >
                          View All →
                        </Link>
                      </div>

                      <div className="space-y-0.5 max-h-[380px] overflow-y-auto">
                        {servicesData.map((service) => (
                          <Link
                            key={service.id}
                            href={`/services/${service.slug}`}
                            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-teal-50/80 text-slate-700 hover:text-teal-900 transition-colors group/item"
                          >
                            <div className="w-7 h-7 rounded-lg bg-teal-100/80 text-teal-800 flex items-center justify-center group-hover/item:bg-gold-500 group-hover/item:text-white transition-colors flex-shrink-0">
                              {getServiceIcon(service.slug)}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-semibold group-hover/item:text-teal-800 truncate">
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
                href={link.path}
                className={`text-[14px] font-semibold transition-colors duration-150 whitespace-nowrap ${
                  isActive(link.path)
                    ? 'text-teal-800 font-bold border-b-2 border-gold-500 pb-0.5'
                    : 'text-slate-700 hover:text-teal-800'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* 3. RIGHT ACTION AREA */}
        <div className="hidden lg:flex items-center gap-4 flex-shrink-0 pl-4">
          <a
            href={`tel:${companyInfo.phoneClean}`}
            className="min-w-[175px] h-11 px-4 rounded-full bg-teal-50/90 hover:bg-teal-100 text-teal-950 border border-teal-200/80 flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-teal-700 flex-shrink-0" />
            <span className="whitespace-nowrap">Call: {companyInfo.phone}</span>
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="w-[150px] h-11 rounded-2xl btn-gold text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>BOOK NOW</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 xl:hidden">
          <a
            href={`tel:${companyInfo.phoneClean}`}
            className="p-2 rounded-xl bg-teal-50 text-teal-800 border border-teal-200/80 flex items-center justify-center"
            title="Call Us"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={`mob-${link.name}`}
                href={link.path}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'bg-teal-50 text-teal-900 font-bold border-l-4 border-gold-500'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${companyInfo.phoneClean}`}
              className="w-full py-3 rounded-xl bg-teal-50 text-teal-900 border border-teal-200 flex items-center justify-center gap-2 text-xs font-bold"
            >
              <Phone className="w-4 h-4 text-teal-700" />
              <span>Call: {companyInfo.phone}</span>
            </a>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl btn-gold text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK NOW</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
