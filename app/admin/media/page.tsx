'use client';

import React, { useEffect, useState } from 'react';
import { Copy, Trash2, CheckCircle, RefreshCw, Upload, Loader2, Image as ImageIcon } from 'lucide-react';

interface MediaResource {
  public_id: string;
  secure_url: string;
  format: string;
  created_at: string;
  bytes: number;
}

export default function AdminMediaPage() {
  const [resources, setResources] = useState<MediaResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [folderFilter, setFolderFilter] = useState('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadCategory, setUploadCategory] = useState('posts');
  const [isUploading, setIsUploading] = useState(false);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      // In production, fetch via API or Cloudinary resources list
      setResources([
        {
          public_id: 'hari-krishna-cleaning/posts/hero-cleaner',
          secure_url: '/images/hero-cleaner.jpg',
          format: 'jpg',
          created_at: new Date().toISOString(),
          bytes: 142000,
        },
        {
          public_id: 'hari-krishna-cleaning/posts/about-cleaner',
          secure_url: '/images/about-cleaner.jpg',
          format: 'jpg',
          created_at: new Date().toISOString(),
          bytes: 195000,
        },
        {
          public_id: 'hari-krishna-cleaning/site/hk-logo',
          secure_url: '/images/hk-logo.png',
          format: 'png',
          created_at: new Date().toISOString(),
          bytes: 45000,
        },
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast('Copied image URL to clipboard!');
  };

  const handleUploadNewMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', uploadFile);
      formData.append('category', uploadCategory);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      showToast('Media uploaded successfully!');
      setUploadFile(null);
      fetchMedia();
    } catch (err: any) {
      showToast(err?.message || 'Upload error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-900 border border-emerald-700 text-emerald-100 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Media Library</h1>
          <p className="text-xs text-slate-400 mt-1">
            View and manage all uploaded website images and assets.
          </p>
        </div>

        <button
          onClick={fetchMedia}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Upload Bar */}
      <form onSubmit={handleUploadNewMedia} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 w-full">
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
            className="text-xs text-slate-300"
          />
        </div>

        <select
          value={uploadCategory}
          onChange={(e) => setUploadCategory(e.target.value)}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
        >
          <option value="posts">Folder: posts</option>
          <option value="services">Folder: services</option>
          <option value="gallery">Folder: gallery</option>
          <option value="testimonials">Folder: testimonials</option>
          <option value="site">Folder: site</option>
        </select>

        <button
          type="submit"
          disabled={isUploading || !uploadFile}
          className="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold uppercase flex items-center gap-2 disabled:opacity-50"
        >
          {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          <span>Upload Media</span>
        </button>
      </form>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {resources.map((res) => (
          <div key={res.public_id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
            <div className="relative h-44 bg-slate-950 flex items-center justify-center p-2">
              <img src={res.secure_url} alt="Media asset" className="max-h-full max-w-full object-contain" />
              <span className="absolute top-2 left-2 bg-slate-900/90 text-gold-400 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-800 uppercase">
                {res.format}
              </span>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <div className="text-[10px] font-mono text-slate-400 truncate">{res.public_id}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{(res.bytes / 1024).toFixed(1)} KB</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyUrl(res.secure_url)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy URL</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
