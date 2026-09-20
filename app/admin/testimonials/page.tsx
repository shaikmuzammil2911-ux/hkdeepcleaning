'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { TestimonialItem } from '@/lib/types';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Star,
  RefreshCw,
  Loader2,
  X,
  Save,
  AlertTriangle,
  Sparkles,
  MessageSquareQuote,
} from 'lucide-react';

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<TestimonialItem> | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data) {
      setItems(data as TestimonialItem[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAddModal = () => {
    setEditingItem({
      customer_name: '',
      customer_role: 'Homeowner, Madhapur',
      content: '',
      rating: 5,
      is_active: true,
      sort_order: items.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: TestimonialItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.customer_name || !editingItem?.content) {
      alert('Please provide customer name and review content.');
      return;
    }

    setSaving(true);
    const supabase = createClient();

    const payload = {
      customer_name: editingItem.customer_name,
      customer_role: editingItem.customer_role || 'Verified Customer',
      content: editingItem.content,
      rating: Number(editingItem.rating) || 5,
      is_active: editingItem.is_active ?? true,
      is_featured: editingItem.is_featured ?? true,
      sort_order: Number(editingItem.sort_order) || 0,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (editingItem.id) {
      const res = await supabase.from('testimonials').update(payload).eq('id', editingItem.id);
      error = res.error;
    } else {
      const res = await supabase.from('testimonials').insert([payload]);
      error = res.error;
    }

    if (error) {
      alert('Error saving testimonial: ' + error.message);
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
        body: JSON.stringify({ path: '/testimonials' }),
      });
    } catch {}

    setSaving(false);
    handleCloseModal();
    showToast(`Testimonial by "${payload.customer_name}" saved! Live website updated.`);
    fetchTestimonials();
  };

  const handleDelete = async (id: string, name: string) => {
    const supabase = createClient();
    const { error } = await supabase.from('testimonials').delete().eq('id', id);

    if (error) {
      alert('Failed to delete testimonial: ' + error.message);
      return;
    }

    // Revalidate live site
    try {
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/testimonials' }),
      });
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/' }),
      });
    } catch {}

    setDeleteConfirmId(null);
    showToast(`Testimonial deleted.`);
    fetchTestimonials();
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
            <span>Customer Reviews CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">Testimonials &amp; Reviews</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage customer feedback, ratings, and quotes displayed on the live website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchTestimonials}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Refresh Testimonials"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleOpenAddModal}
            className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      {/* Testimonials List */}
      {loading ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center text-xs text-slate-400 flex flex-col items-center justify-center gap-3 shadow-xl">
          <Loader2 className="w-6 h-6 animate-spin text-gold-500" />
          <span>Loading customer reviews...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center text-xs text-slate-400 flex flex-col items-center justify-center gap-3 shadow-xl">
          <MessageSquareQuote className="w-8 h-8 text-slate-600" />
          <span>No testimonials found. Click &quot;Add Testimonial&quot; to create one.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl hover:border-slate-700 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gold-400">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">#{item.sort_order}</span>
                </div>

                <p className="text-xs text-slate-300 italic leading-relaxed line-clamp-4">
                  &ldquo;{item.content}&rdquo;
                </p>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-gold-400 transition-colors">
                      {item.customer_name}
                    </h4>
                    <span className="text-[10px] text-slate-500">
                      {item.customer_role || 'Verified Customer'}
                    </span>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                    item.is_active ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {item.is_active ? 'Active' : 'Hidden'}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditModal(item)}
                  className="flex-1 py-2 bg-teal-900/60 hover:bg-teal-800 text-teal-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-teal-800/60 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => setDeleteConfirmId(item.id)}
                  className="p-2 bg-red-950/60 hover:bg-red-900 text-red-300 rounded-xl text-xs font-semibold flex items-center justify-center border border-red-900/60 transition-colors"
                  title="Delete Testimonial"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl my-8">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold font-display text-white">
                  {editingItem.id ? 'Edit Customer Review' : 'Add New Customer Review'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Saved reviews will instantly appear in the live reviews section.
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.customer_name || ''}
                  onChange={(e) =>
                    setEditingItem((prev) => prev ? { ...prev, customer_name: e.target.value } : null)
                  }
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Location &amp; Service Subtitle
                </label>
                <input
                  type="text"
                  value={editingItem.customer_role || ''}
                  onChange={(e) =>
                    setEditingItem((prev) => prev ? { ...prev, customer_role: e.target.value } : null)
                  }
                  placeholder="e.g. Kavuri Hills • Villa Deep Cleaning"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Review Text / Feedback *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.content || ''}
                  onChange={(e) =>
                    setEditingItem((prev) => prev ? { ...prev, content: e.target.value } : null)
                  }
                  placeholder="Write customer review..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Star Rating (1 - 5)
                  </label>
                  <select
                    value={editingItem.rating || 5}
                    onChange={(e) =>
                      setEditingItem((prev) => prev ? { ...prev, rating: parseInt(e.target.value) } : null)
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-gold-500 focus:outline-none"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Sort Order
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
              </div>

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
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-950 text-red-400 border border-red-800 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-bold text-white">Delete Customer Review?</h3>
              <p className="text-xs text-slate-400 mt-1">
                Are you sure you want to delete this testimonial?
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const t = items.find((x) => x.id === deleteConfirmId);
                  if (t) handleDelete(t.id, t.customer_name);
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg"
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
