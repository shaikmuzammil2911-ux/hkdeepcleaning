'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { GalleryItem } from '@/lib/types';
import { Plus, Trash2, CheckCircle, RefreshCw, Loader2, Upload } from 'lucide-react';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Kitchen');
  const [description, setDescription] = useState('');

  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchGallery = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data && data.length > 0) {
      setItems(data as GalleryItem[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !beforeFile || !afterFile) {
      showToast('Title, Before image, and After image are required.');
      return;
    }

    setUploading(true);
    try {
      // 1. Upload Before image
      const beforeFormData = new FormData();
      beforeFormData.append('file', beforeFile);
      beforeFormData.append('category', 'gallery');

      const beforeRes = await fetch('/api/upload', { method: 'POST', body: beforeFormData });
      const beforeData = await beforeRes.json();

      // 2. Upload After image
      const afterFormData = new FormData();
      afterFormData.append('file', afterFile);
      afterFormData.append('category', 'gallery');

      const afterRes = await fetch('/api/upload', { method: 'POST', body: afterFormData });
      const afterData = await afterRes.json();

      if (!beforeData.success || !afterData.success) {
        throw new Error('Cloudinary upload failed for before/after images');
      }

      // 3. Insert into Supabase
      const supabase = createClient();
      const { error: dbError } = await supabase.from('gallery').insert([
        {
          title,
          category,
          description,
          before_image_url: beforeData.secure_url,
          before_image_public_id: beforeData.public_id,
          after_image_url: afterData.secure_url,
          after_image_public_id: afterData.public_id,
          is_active: true,
          sort_order: items.length + 1,
        },
      ]);

      if (dbError) throw dbError;

      // 4. Revalidate
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/gallery' }),
      });

      showToast('Gallery item added successfully!');
      setIsAdding(false);
      setTitle('');
      setBeforeFile(null);
      setAfterFile(null);
      fetchGallery();
    } catch (err: any) {
      showToast(`Creation error: ${err?.message || 'Failed'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    try {
      if (item.before_image_public_id) {
        fetch('/api/cloudinary/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_id: item.before_image_public_id }),
        });
      }
      if (item.after_image_public_id) {
        fetch('/api/cloudinary/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_id: item.after_image_public_id }),
        });
      }

      const supabase = createClient();
      await supabase.from('gallery').delete().eq('id', item.id);

      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/gallery' }),
      });

      showToast('Gallery item deleted.');
      fetchGallery();
    } catch (err: any) {
      showToast('Failed to delete item.');
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

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Before &amp; After Gallery CMS</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage real transformations displayed on the public gallery.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Cancel' : 'Add Gallery Item'}</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleCreateGalleryItem} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">New Gallery Transformation</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-300 mb-1">Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Kitchen Chimney Oil Stain Removal"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              >
                <option value="Kitchen">Kitchen</option>
                <option value="Bathroom">Bathroom</option>
                <option value="Floor">Floor</option>
                <option value="Home">Home</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-slate-800 p-4 rounded-xl bg-slate-950/60">
              <label className="block text-xs font-bold text-slate-300 mb-1">Upload Before Image *</label>
              <input
                type="file"
                required
                accept="image/*"
                onChange={(e) => setBeforeFile(e.target.files?.[0] || null)}
                className="text-xs text-slate-400"
              />
            </div>

            <div className="border border-slate-800 p-4 rounded-xl bg-slate-950/60">
              <label className="block text-xs font-bold text-slate-300 mb-1">Upload After Image *</label>
              <input
                type="file"
                required
                accept="image/*"
                onChange={(e) => setAfterFile(e.target.files?.[0] || null)}
                className="text-xs text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Complete degreasing and high pressure steam cleaning in Madhapur..."
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="btn-gold w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Uploading both images to Cloudinary...</span>
              </>
            ) : (
              <span>Save &amp; Publish Gallery Item</span>
            )}
          </button>
        </form>
      )}

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="relative h-28 bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
                <img src={item.before_image_url} alt="Before" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 left-1 bg-red-950 text-red-300 text-[9px] font-bold px-1.5 py-0.5 rounded">Before</span>
              </div>
              <div className="relative h-28 bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
                <img src={item.after_image_url} alt="After" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 bg-emerald-950 text-emerald-300 text-[9px] font-bold px-1.5 py-0.5 rounded">After</span>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-gold-400 uppercase">{item.category}</div>
              <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{item.description}</p>
            </div>

            <button
              onClick={() => handleDelete(item)}
              className="w-full py-2 bg-red-950/60 hover:bg-red-900 text-red-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-red-900/60"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Item</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
