'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { TestimonialItem } from '@/lib/types';
import { Plus, Trash2, CheckCircle, Star, RefreshCw, Loader2 } from 'lucide-react';

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Gachibowli • Home Deep Cleaning');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [saving, setSaving] = useState(false);

  const fetchTestimonials = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      setItems(data as TestimonialItem[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content) {
      showToast('Customer name and review content are required.');
      return;
    }

    setSaving(true);
    try {
      const supabase = createClient();
      const { error: dbError } = await supabase.from('testimonials').insert([
        {
          customer_name: name,
          customer_role: role,
          content,
          rating,
          is_published: true,
        },
      ]);

      if (dbError) throw dbError;

      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/testimonials' }),
      });

      showToast('Real testimonial published!');
      setIsAdding(false);
      setName('');
      setContent('');
      fetchTestimonials();
    } catch (err: any) {
      showToast('Error saving testimonial');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const supabase = createClient();
    await supabase.from('testimonials').delete().eq('id', id);

    await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: '/testimonials' }),
    });

    showToast('Testimonial deleted.');
    fetchTestimonials();
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
          <h1 className="text-2xl font-bold font-display text-white">Testimonials CMS</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage real customer reviews provided by Hari Krishna Deep Cleaning Services.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Cancel' : 'Add Real Testimonial'}</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleCreateTestimonial} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Add Customer Review</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-300 mb-1">Customer Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Rajesh Sharma"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Location &amp; Service</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Madhapur • Villa Deep Cleaning"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Rating (1-5)</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              >
                <option value={5}>5 Stars (★★★★★)</option>
                <option value={4}>4 Stars (★★★★☆)</option>
                <option value={3}>3 Stars (★★★☆☆)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">Review Content *</label>
            <textarea
              rows={3}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter exact real customer review..."
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn-gold w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Save Testimonial</span>}
          </button>
        </form>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">{item.customer_name}</span>
                <div className="flex text-gold-400">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
              <div className="text-[10px] text-teal-400 mb-2">{item.customer_role}</div>
              <p className="text-xs text-slate-300 italic">"{item.content}"</p>
            </div>

            <button
              onClick={() => handleDelete(item.id)}
              className="w-full py-2 bg-red-950/60 hover:bg-red-900 text-red-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-red-900/60"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Review</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
