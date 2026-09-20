'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'footer';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'light',
  size = 'md',
}) => {
  const isDark = variant === 'dark' || variant === 'footer';

  const imgSize =
    size === 'sm'
      ? 'w-12 h-12 sm:w-14 sm:h-14'
      : size === 'lg'
      ? 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28'
      : 'w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20';

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Actual HK Circular Logo PNG */}
      <img
        src="/images/hk-logo.png"
        alt="Hari Krishna Cleaning Services Logo"
        className={`${imgSize} object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md`}
      />

      {/* Brand Typography */}
      <div className="flex flex-col justify-center text-left leading-tight">
        <div className="flex items-baseline">
          <span
            className={`font-display font-extrabold tracking-tight ${
              size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            } ${isDark ? 'text-white' : 'text-teal-900'}`}
          >
            Hari
          </span>
          <span
            className={`font-display font-extrabold tracking-tight ml-1 ${
              size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            } text-gold-500`}
          >
            Krishna
          </span>
        </div>

        <div className="flex items-center gap-1 mt-0.5">
          <span
            className={`font-sans font-bold uppercase tracking-wider ${
              size === 'sm' ? 'text-[10px]' : size === 'lg' ? 'text-xs sm:text-sm' : 'text-[11px] sm:text-xs'
            } ${isDark ? 'text-emerald-300' : 'text-teal-700'}`}
          >
            DEEP CLEANING SERVICES
          </span>
        </div>

        <div
          className={`font-sans font-medium italic mt-0.5 hidden sm:block ${
            size === 'sm' ? 'text-[10px]' : 'text-xs'
          } ${isDark ? 'text-slate-300' : 'text-slate-500'}`}
        >
          <span>A Cleaner Space</span>
          <span className="text-gold-500 mx-1">•</span>
          <span>A Happier You</span>
        </div>
      </div>
    </Link>
  );
};
