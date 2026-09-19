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

  return (
    <Link to="/" className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Gold & Teal Circular Crest */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <svg
          className={`transition-transform duration-300 group-hover:scale-105 ${
            size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-14 h-14' : 'w-11 h-11'
          }`}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5E8C7" />
              <stop offset="40%" stopColor="#D4AF37" />
              <stop offset="70%" stopColor="#C89B3C" />
              <stop offset="100%" stopColor="#996E1D" />
            </linearGradient>
            <linearGradient id="tealLetter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#147271" />
              <stop offset="100%" stopColor="#073332" />
            </linearGradient>
            <linearGradient id="goldLetter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E9CA74" />
              <stop offset="100%" stopColor="#B08027" />
            </linearGradient>
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>
          </defs>

          {/* Outer Gold Ring */}
          <circle cx="60" cy="60" r="54" fill="#FFFFFF" stroke="url(#goldRing)" strokeWidth="4" />
          <circle cx="60" cy="60" r="47" fill={isDark ? '#0A2625' : '#FAFCFB'} stroke="#E8D9AB" strokeWidth="1" strokeDasharray="3 2" />

          {/* Sparkles */}
          <path d="M 32 38 Q 35 38 35 35 Q 35 38 38 38 Q 35 38 35 41 Q 35 38 32 38 Z" fill="#D4AF37" />
          <path d="M 88 35 Q 91 35 91 32 Q 91 35 94 35 Q 91 35 91 38 Q 91 35 88 35 Z" fill="#D4AF37" />

          {/* Stylized HK Monogram */}
          <g transform="translate(32, 28) scale(0.95)">
            {/* H */}
            <path d="M 8 10 L 15 10 L 15 48 L 8 48 Z" fill={isDark ? '#FFFFFF' : 'url(#tealLetter)'} />
            <path d="M 25 10 L 32 10 L 32 48 L 25 48 Z" fill={isDark ? '#FFFFFF' : 'url(#tealLetter)'} />
            <path d="M 15 26 L 25 26 L 25 32 L 15 32 Z" fill="url(#goldLetter)" />
            {/* K */}
            <path d="M 36 10 L 43 10 L 43 48 L 36 48 Z" fill="url(#goldLetter)" />
            <path d="M 43 28 L 57 10 L 65 10 L 47 32 L 66 48 L 57 48 L 43 36 Z" fill="url(#goldLetter)" />
          </g>

          {/* Leaves */}
          <path d="M 40 92 C 48 99, 60 101, 60 101 C 60 101, 72 99, 80 92 C 72 94, 60 96, 60 96 C 60 96, 48 94, 40 92 Z" fill="url(#leafGrad)" />
        </svg>
      </div>

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
