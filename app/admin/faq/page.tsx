'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { FAQItem } from '@/lib/types';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  RefreshCw,
  Loader2,
  X,
  Save,
  AlertTriangle,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Partial<FAQItem> | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchFaqs = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data) {
      setFaqs(data as FAQItem[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAddModal = () => {
    setEditingFaq({
      question: '',
      answer: '',
      category: 'General',
      is_active: true,
      sort_order: faqs.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (faq: FAQItem) => {
    setEditingFaq({ ...faq });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFaq(null);
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq?.question || !editingFaq?.answer) {
      alert('Please provide both question and answer.');
      return;
    }

    setSaving(true);
    const supabase = createClient();

    const payload = {
      question: editingFaq.question,
      answer: editingFaq.answer,
      category: editingFaq.category || 'General',
      is_active: editingFaq.is_active ?? true,
      sort_order: Number(editingFaq.sort_order) || 0,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (editingFaq.id) {
      const res = await supabase.from('faqs').update(payload).eq('id', editingFaq.id);
      error = res.error;
    } else {
      const res = await supabase.from('faqs').insert([payload]);
      error = res.error;
    }

    if (error) {
      alert('Error saving FAQ: ' + error.message);
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
        body: JSON.stringify({ path: '/faq' }),
      });
    } catch {}

    setSaving(false);
    handleCloseModal();
    showToast(`FAQ saved! Live website updated.`);
    fetchFaqs();
  };

  const handleDelete = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from('faqs').delete().eq('id', id);

    if (error) {
      alert('Failed to delete FAQ: ' + error.message);
      return;
    }

    // Revalidate live site
    try {
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/faq' }),
      });
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/' }),
      });
    } catch {}

    setDeleteConfirmId(null);
    showToast('FAQ deleted.');
    fetchFaqs();
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
            <span>Questions &amp; Answers CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">Frequently Asked Questions</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage FAQs and instant customer answers shown on the live website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchFaqs}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Refresh FAQs"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleOpenAddModal}
            className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add FAQ</span>
          </button>
        </div>
      </div>

      {/* FAQs List */}
      {loading ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center text-xs text-slate-400 flex flex-col items-center justify-center gap-3 shadow-xl">
          <Loader2 className="w-6 h-6 animate-spin text-gold-500" />
          <span>Loading FAQs from database...</span>
        </div>
      ) : faqs.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center text-xs text-slate-400 flex flex-col items-center justify-center gap-3 shadow-xl">
          <HelpCircle className="w-8 h-8 text-slate-600" />
          <span>No FAQs found. Click &quot;Add FAQ&quot; to create one.</span>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 shadow-xl hover:border-slate-700 transition-all group"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-gold-400">
                    Q{faq.sort_order}:
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-gold-400 transition-colors">
                    {faq.question}
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:self-center flex-shrink-0">
                <button
                  onClick={() => handleOpenEditModal(faq)}
                  className="px-3.5 py-2 bg-teal-900/60 hover:bg-teal-800 text-teal-200 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-teal-800/60 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => setDeleteConfirmId(faq.id)}
                  className="p-2 bg-red-950/60 hover:bg-red-900 text-red-300 rounded-xl text-xs font-semibold flex items-center justify-center border border-red-900/60 transition-colors"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {isModalOpen && editingFaq && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl my-8">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold font-display text-white">
                  {editingFaq.id ? 'Edit FAQ Item' : 'Add New FAQ Item'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Changes made here will instantly update the live website FAQs.
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={editingFaq.question || ''}
                  onChange={(e) =>
                    setEditingFaq((prev) => prev ? { ...prev, question: e.target.value } : null)
                  }
                  placeholder="e.g. Do you provide villa deep cleaning in Gachibowli?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingFaq.answer || ''}
                  onChange={(e) =>
                    setEditingFaq((prev) => prev ? { ...prev, answer: e.target.value } : null)
                  }
                  placeholder="Provide detailed, clear answer..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingFaq.category || 'General'}
                    onChange={(e) =>
                      setEditingFaq((prev) => prev ? { ...prev, category: e.target.value } : null)
                    }
                    placeholder="General / Services / Booking"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={editingFaq.sort_order || 1}
                    onChange={(e) =>
                      setEditingFaq((prev) => prev ? { ...prev, sort_order: parseInt(e.target.value) || 0 } : null)
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
                  <span>Save FAQ</span>
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
              <h3 className="text-sm font-bold text-white">Delete FAQ?</h3>
              <p className="text-xs text-slate-400 mt-1">
                Are you sure you want to delete this FAQ item from the live site?
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
                onClick={() => handleDelete(deleteConfirmId)}
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
