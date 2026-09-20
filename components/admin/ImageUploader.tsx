'use client';

import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Loader2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  value?: string;
  onChange: (url: string, storageId?: string) => void;
  recommendedSize?: string;
  aspectRatio?: 'landscape' | 'square' | 'wide' | 'auto';
  category?: 'services' | 'gallery' | 'posts' | 'testimonials' | 'site';
  maxSizeMB?: number;
  disabled?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  recommendedSize = '1600 × 900 px • Landscape',
  aspectRatio = 'landscape',
  category = 'services',
  maxSizeMB = 10,
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square max-w-[200px]'
      : aspectRatio === 'wide'
      ? 'aspect-[21/9] max-w-full'
      : 'aspect-[16/9] max-w-md';

  const validateAndUpload = async (file: File) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    // 1. Validate File Format
    const validFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/avif'];
    if (!validFormats.includes(file.type.toLowerCase())) {
      setErrorMessage('Please upload a valid JPG, PNG, or WEBP image.');
      return;
    }

    // 2. Validate Size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setErrorMessage(`Image size must be less than ${maxSizeMB} MB.`);
      return;
    }

    // 3. Upload to Backend Server API
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Upload failed. Please try again.');
      }

      onChange(data.url, data.storage_id);
      setSuccessMessage('✓ Image uploaded successfully');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      console.error('Image upload error:', err);
      setErrorMessage(err.message || 'Image upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled || isUploading) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && !isUploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndUpload(file);
    }
  };

  return (
    <div className="space-y-2.5">
      {/* Label & Requirement text */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
        <label className="block text-xs font-bold text-slate-200">
          {label}
        </label>
        <span className="text-[11px] text-slate-400">
          Recommended: {recommendedSize} • Max {maxSizeMB} MB
        </span>
      </div>

      {/* Main Upload Box */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-2xl p-4 transition-all duration-200 ${
          isDragging
            ? 'border-gold-400 bg-gold-950/20'
            : value
            ? 'border-slate-800 bg-slate-950/60'
            : 'border-slate-800 hover:border-slate-700 bg-slate-950/40'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/jpg"
          disabled={disabled || isUploading}
          onChange={handleFileSelect}
          className="hidden"
        />

        {value ? (
          /* Image Preview Mode */
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className={`relative ${aspectClass} w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex-shrink-0 shadow-md group`}>
              <img
                src={value}
                alt="Image Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/hero-cleaner.jpg';
                }}
              />
              {isUploading && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex flex-col items-center justify-center gap-2 text-white">
                  <Loader2 className="w-6 h-6 animate-spin text-gold-400" />
                  <span className="text-xs font-medium">Uploading image...</span>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-2.5 w-full">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={disabled || isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold inline-flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isUploading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-gold-400" />
                  ) : (
                    <Upload className="w-3.5 h-3.5 text-gold-400" />
                  )}
                  <span>{isUploading ? 'Uploading...' : 'Change Image'}</span>
                </button>

                <button
                  type="button"
                  disabled={disabled || isUploading}
                  onClick={() => onChange('')}
                  className="px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors border border-red-900/40"
                  title="Remove Image"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400">
                JPG, PNG, or WEBP. Drag and drop another file here to replace.
              </p>
            </div>
          </div>
        ) : (
          /* Empty / Upload Prompt Mode */
          <div
            onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
            className="cursor-pointer py-6 px-4 flex flex-col items-center justify-center text-center space-y-2 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-gold-400 group-hover:border-gold-500/50 transition-colors">
              {isUploading ? (
                <Loader2 className="w-6 h-6 animate-spin text-gold-400" />
              ) : (
                <Upload className="w-6 h-6" />
              )}
            </div>

            <div>
              <p className="text-xs font-bold text-slate-200">
                {isUploading ? 'Uploading image...' : 'Click to select or drag and drop image here'}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Supported formats: JPG, PNG, WEBP (Max {maxSizeMB} MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium pt-0.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Error Notification with Retry */}
      {errorMessage && (
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-2.5 py-1 rounded-lg bg-red-900 hover:bg-red-800 text-white text-[11px] font-bold flex items-center gap-1 flex-shrink-0"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Retry</span>
          </button>
        </div>
      )}
    </div>
  );
};
