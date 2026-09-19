import React from 'react';
import { Link } from 'react-router-dom';

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
    size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-16 h-16' : 'w-12 h-12';

  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Actual HK Logo PNG */}
      <img
        src="/images/hk-logo.png"
        alt="Hari Krishna Cleaning Services Logo"
        className={`${imgSize} object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm`}
      />

      {/* Brand Typography */}
      <div className="flex flex-col justify-center text-left leading-none">
        <div className="flex items-baseline">
          <span
            className={`font-display font-extrabold tracking-tight ${
              size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'
            } ${isDark ? 'text-white' : 'text-teal-800'}`}
          >
            Hari
          </span>
          <span
            className={`font-display font-extrabold tracking-tight ml-0.5 ${
              size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'
            } text-gold-500`}
          >
            Krishna
          </span>
        </div>

        <div className="flex items-center gap-1 mt-0.5">
          <span
            className={`font-sans font-bold uppercase tracking-wider ${
              size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-[11px]' : 'text-[9.5px]'
            } ${isDark ? 'text-emerald-300' : 'text-teal-700'}`}
          >
            DEEP CLEANING SERVICES
          </span>
        </div>

        <div
          className={`font-sans font-medium italic mt-0.5 hidden sm:block ${
            size === 'sm' ? 'text-[9px]' : 'text-[10px]'
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
