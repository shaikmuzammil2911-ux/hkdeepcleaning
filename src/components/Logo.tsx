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
      ? 'w-10 h-10 sm:w-12 sm:h-12'
      : size === 'lg'
      ? 'w-16 h-16 sm:w-20 sm:h-20'
      : 'w-14 h-14 sm:w-16 sm:h-16';

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group select-none whitespace-nowrap flex-shrink-0 ${className}`}>
      {/* Actual HK Circular Logo PNG */}
      <img
        src="/images/hk-logo.png"
        alt="Hari Krishna Cleaning Services Logo"
        className={`${imgSize} object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md flex-shrink-0`}
      />

      {/* Brand Typography */}
      <div className="flex flex-col justify-center text-left leading-tight whitespace-nowrap">
        <div className="flex items-baseline">
          <span
            className={`font-display font-black tracking-tight ${
              size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
            } ${isDark ? 'text-white' : 'text-teal-950'}`}
          >
            Hari
          </span>
          <span
            className={`font-display font-black tracking-tight ml-1 ${
              size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
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
