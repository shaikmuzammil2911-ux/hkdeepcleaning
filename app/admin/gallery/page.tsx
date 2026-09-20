'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { GalleryItem } from '@/lib/types';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  RefreshCw,
  Loader2,
  Image as ImageIcon,
  X,
  Save,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { ImageUploader } from '@/components/admin/ImageUploader';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Add / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<GalleryItem> | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<GalleryItem | null>(null);

  const [saving, setSaving] = useState(false);

  const fetchGallery = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data) {
      setItems(data as GalleryItem[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAddModal = () => {
    setEditingItem({
      title: '',
      category: 'Kitchen',
      description: '',
      before_image_url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      after_image_url: '/images/kitchen-cleaning.jpg',
      is_active: true,
      sort_order: items.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: GalleryItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSaveGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.title || !editingItem?.before_image_url || !editingItem?.after_image_url) {
      alert('Please provide a title, before image, and after image.');
      return;
    }

    setSaving(true);
    const supabase = createClient();

    const payload = {
      title: editingItem.title,
      category: editingItem.category || 'Kitchen',
      description: editingItem.description || '',
      before_image_url: editingItem.before_image_url,
      before_image_public_id: editingItem.before_image_public_id || null,
      after_image_url: editingItem.after_image_url,
      after_image_public_id: editingItem.after_image_public_id || null,
      is_active: editingItem.is_active ?? true,
      sort_order: Number(editingItem.sort_order) || 0,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (editingItem.id) {
      const res = await supabase.from('gallery').update(payload).eq('id', editingItem.id);
      error = res.error;
    } else {
      const res = await supabase.from('gallery').insert([payload]);
      error = res.error;
    }

    if (error) {
      alert('Error saving gallery item: ' + error.message);
      setSaving(false);
      return;
    }

    // Trigger instant ISR revalidation
    try {
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/' }),
      });
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/gallery' }),
      });
    } catch {}

    setSaving(false);
    handleCloseModal();
    showToast(`Gallery item "${payload.title}" saved! Live website updated.`);
    fetchGallery();
  };

  const handleDelete = async (item: GalleryItem) => {
    const supabase = createClient();
    const { error } = await supabase.from('gallery').delete().eq('id', item.id);

    if (error) {
      alert('Failed to delete item: ' + error.message);
      return;
    }

    // Delete from Cloudinary asynchronously
    if (item.before_image_public_id) {
      fetch('/api/cloudinary/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id: item.before_image_public_id }),
      }).catch(() => {});
    }
    if (item.after_image_public_id) {
      fetch('/api/cloudinary/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id: item.after_image_public_id }),
      }).catch(() => {});
    }

    // Revalidate live site
    try {
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/gallery' }),
      });
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/' }),
      });
    } catch {}

    setDeleteConfirmItem(null);
    showToast(`Gallery item "${item.title}" deleted.`);
    fetchGallery();
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-950 border border-emerald-600 text-emerald-100 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs animate-bounce font-medium">
          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-teal-950 text-teal-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 border border-teal-800">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>Before &amp; After Transformations CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">Before &amp; After Gallery</h1>
          <p className="text-xs text-slate-400 mt-1">
            Edit before &amp; after comparison photos, categories, and descriptions displayed on the live website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchGallery}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Refresh Gallery"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleOpenAddModal}
            className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add Gallery Item</span>
          </button>
        </div>
      </div>

      {/* Gallery Cards Grid */}
      {loading ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center text-xs text-slate-400 flex flex-col items-center justify-center gap-3 shadow-xl">
          <Loader2 className="w-6 h-6 animate-spin text-gold-500" />
          <span>Loading transformations from database...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center text-xs text-slate-400 flex flex-col items-center justify-center gap-3 shadow-xl">
          <ImageIcon className="w-8 h-8 text-slate-600" />
          <span>No gallery items found. Click &quot;Add Gallery Item&quot; to create your first transformation.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-4 space-y-3 flex flex-col justify-between shadow-xl hover:border-slate-700 transition-all group"
            >
              <div className="space-y-3">
                {/* Images Comparison Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative h-28 bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                    <img
                      src={item.before_image_url}
                      alt="Before"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-1.5 left-1.5 bg-red-950/90 text-red-300 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded backdrop-blur-sm border border-red-800">
                      Before
                    </span>
                  </div>

                  <div className="relative h-28 bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                    <img
                      src={item.after_image_url}
                      alt="After"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-1.5 right-1.5 bg-emerald-950/90 text-emerald-300 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded backdrop-blur-sm border border-emerald-800">
                      After
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold text-gold-400 uppercase tracking-wider bg-gold-950/40 px-2 py-0.5 rounded border border-gold-800/40">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      #{item.sort_order}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-gold-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {item.description || 'No description provided.'}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Edit & Delete */}
              <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditModal(item)}
                  className="flex-1 py-2 bg-teal-900/60 hover:bg-teal-800 text-teal-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-teal-800/60 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Item</span>
                </button>

                <button
                  onClick={() => setDeleteConfirmItem(item)}
                  className="p-2 bg-red-950/60 hover:bg-red-900 text-red-300 rounded-xl text-xs font-semibold flex items-center justify-center border border-red-900/60 transition-colors"
                  title="Delete Gallery Item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD / EDIT GALLERY ITEM MODAL */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold font-display text-white">
                  {editingItem.id ? 'Edit Before / After Item' : 'Add New Before / After Item'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Edits will instantly update the Before &amp; After comparisons on your live website.
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGalleryItem} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Transformation Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.title || ''}
                    onChange={(e) =>
                      setEditingItem((prev) => prev ? { ...prev, title: e.target.value } : null)
                    }
                    placeholder="e.g. Kitchen Deep Cleaning & Degreasing"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={editingItem.category || 'Kitchen'}
                    onChange={(e) =>
                      setEditingItem((prev) => prev ? { ...prev, category: e.target.value } : null)
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-gold-500 focus:outline-none"
                  >
                    <option value="Kitchen">Kitchen</option>
                    <option value="Bathroom">Bathroom</option>
                    <option value="Floor">Floor</option>
                    <option value="Home">Home</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Description of Work Done
                </label>
                <textarea
                  rows={3}
                  value={editingItem.description || ''}
                  onChange={(e) =>
                    setEditingItem((prev) => prev ? { ...prev, description: e.target.value } : null)
                  }
                  placeholder="e.g. Removed heavy oil accumulation, descaled tile grout, and polished fixtures..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* Before & After Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-800">
                {/* Before Image */}
                <ImageUploader
                  label="Before Image (Before Cleaning)"
                  value={editingItem.before_image_url}
                  aspectRatio="landscape"
                  recommendedSize="1600 × 1200 px • JPG, PNG or WEBP"
                  category="gallery"
                  onChange={(url, publicId) => {
                    setEditingItem((prev) => prev ? {
                      ...prev,
                      before_image_url: url,
                      before_image_public_id: publicId || null,
                    } : null);
                  }}
                />

                {/* After Image */}
                <ImageUploader
                  label="After Image (After Cleaning)"
                  value={editingItem.after_image_url}
                  aspectRatio="landscape"
                  recommendedSize="1600 × 1200 px • JPG, PNG or WEBP"
                  category="gallery"
                  onChange={(url, publicId) => {
                    setEditingItem((prev) => prev ? {
                      ...prev,
                      after_image_url: url,
                      after_image_public_id: publicId || null,
                    } : null);
                  }}
                />
              </div>

              {/* Sort Order & Visibility */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Sort Order (Number)
                  </label>
                  <input
                    type="number"
                    value={editingItem.sort_order || 1}
                    onChange={(e) =>
                      setEditingItem((prev) => prev ? { ...prev, sort_order: parseInt(e.target.value) || 0 } : null)
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Visibility
                  </label>
                  <select
                    value={editingItem.is_active ? 'true' : 'false'}
                    onChange={(e) =>
                      setEditingItem((prev) => prev ? { ...prev, is_active: e.target.value === 'true' } : null)
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-gold-500 focus:outline-none"
                  >
                    <option value="true">Active (Visible in Gallery)</option>
                    <option value="false">Hidden (Draft)</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving &amp; Updating Live Site...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save &amp; Update Live Site</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-950 text-red-400 border border-red-800 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-bold text-white">Delete Gallery Item?</h3>
              <p className="text-xs text-slate-400 mt-1">
                Are you sure you want to delete &quot;{deleteConfirmItem.title}&quot;? This will immediately remove it from the live website and gallery slider.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmItem(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmItem)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
