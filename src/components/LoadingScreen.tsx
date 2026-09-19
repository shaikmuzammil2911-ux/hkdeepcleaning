import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onFinish?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Animate progress bar from 0 → 100 over ~2.2s
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 18 + 8;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        // Start fade-out after progress completes
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            setIsVisible(false);
            if (onFinish) onFinish();
          }, 600);
        }, 300);
      } else {
        setProgress(Math.floor(current));
      }
    }, 120);

    return () => clearInterval(interval);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center transition-opacity duration-600 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2137 40%, #0a2a1a 100%)' }}
    >
      {/* Animated background sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: i % 3 === 0 ? '#D4AF37' : i % 3 === 1 ? '#147271' : '#22C55E',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.4 + Math.random() * 0.4,
              animation: `pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main splash card */}
      <div
        className="relative z-10 flex flex-col items-center gap-6"
        style={{ animation: 'splashIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}
      >
        {/* Logo card with glow ring */}
        <div className="relative">
          {/* Glow ring */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(20,114,113,0.5) 0%, transparent 70%)',
              filter: 'blur(20px)',
              transform: 'scale(1.3)',
            }}
          />
          {/* Glass emblem container */}
          <div
            className="relative bg-slate-900/50 backdrop-blur-md rounded-full p-6 shadow-2xl flex items-center justify-center border border-gold-500/40"
            style={{
              boxShadow: '0 0 60px rgba(20,114,113,0.4), 0 25px 50px rgba(0,0,0,0.5)',
            }}
          >
            <img
              src="/images/hk-logo.png"
              alt="Hari Krishna Cleaning Services"
              className="w-44 h-44 object-contain filter drop-shadow-xl"
              style={{ animation: 'logoFloat 3s ease-in-out infinite' }}
            />
          </div>
        </div>

        {/* Tagline badge */}
        <div
          className="flex items-center gap-2 px-6 py-2.5 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(212,175,55,0.4)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span style={{ fontSize: '16px' }}>✦</span>
          <span
            className="font-bold uppercase tracking-widest text-sm"
            style={{ color: '#D4AF37', letterSpacing: '0.12em' }}
          >
            PROFESSIONAL TOUCH &amp; QUALITY CLEANING
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-72 sm:w-96 flex flex-col gap-2">
          <div
            className="w-full h-2 rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-150 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #147271, #22C55E, #D4AF37)',
                boxShadow: '0 0 12px rgba(212,175,55,0.6)',
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span
              className="text-xs font-medium"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Loading Services...
            </span>
            <span
              className="text-sm font-bold"
              style={{ color: '#D4AF37' }}
            >
              {progress}%
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes splashIn {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
};
