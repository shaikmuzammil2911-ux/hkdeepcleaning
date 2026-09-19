import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';

interface LoadingScreenProps {
  onFinish?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setIsVisible(false);
        if (onFinish) onFinish();
      }, 400);
    }, 600);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center transition-opacity duration-400 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
        <Logo size="lg" />
        
        {/* Animated Progress indicator */}
        <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden mt-3 relative">
          <div className="h-full bg-gradient-to-r from-teal-800 via-gold-500 to-teal-800 animate-shimmer w-full" />
        </div>

        <p className="text-[11px] font-bold uppercase tracking-widest text-teal-900/60">
          Professional Cleaning &bull; Hyderabad
        </p>
      </div>
    </div>
  );
};
