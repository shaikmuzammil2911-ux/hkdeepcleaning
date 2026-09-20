'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  title,
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-2xl bg-slate-900 shadow-md ${className}`}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After Image */}
      <img
        src={afterImage}
        alt="After Deep Cleaning Result"
        className="w-full h-full object-cover object-center pointer-events-none"
        loading="lazy"
      />

      {/* Before Image */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img
          src={beforeImage}
          alt="Before Cleaning Condition"
          className="w-full h-full object-cover object-center pointer-events-none"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md border border-white/20">
          {beforeLabel}
        </span>
      </div>

      <span className="absolute top-3 right-3 bg-teal-900/90 backdrop-blur-xs text-gold-300 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md border border-gold-400/40">
        {afterLabel}
      </span>

      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gold-500 border-2 border-white shadow-lg flex items-center justify-center text-teal-950 transition-transform hover:scale-110 active:scale-95">
          <div className="flex items-center gap-0.5 text-[9px] font-black">
            <span>&#9664;</span>
            <span>&#9654;</span>
          </div>
        </div>
      </div>

      {title && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-100 truncate">{title}</span>
            <span className="text-[10px] text-gold-300 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Drag slider
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
