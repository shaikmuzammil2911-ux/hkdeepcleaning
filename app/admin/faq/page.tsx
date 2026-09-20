'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { FAQItem } from '@/lib/types';
import { Plus, Trash2, CheckCircle, RefreshCw, Loader2 } from 'lucide-react';

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isAdding, setIsAdding] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchFaqs = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data && data.length > 0) {
      setFaqs(data as FAQItem[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) {
      showToast('Question and answer are required.');
      return;
    }

    setSaving(true);
    try {
      const supabase = createClient();
      const { error: dbError } = await supabase.from('faqs').insert([
        {
          question,
          answer,
          sort_order: faqs.length + 1,
          is_active: true,
        },
      ]);

      if (dbError) throw dbError;

      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/faq' }),
      });

      showToast('FAQ item created!');
      setIsAdding(false);
      setQuestion('');
      setAnswer('');
      fetchFaqs();
    } catch (err: any) {
      showToast('Error saving FAQ.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const supabase = createClient();
    await supabase.from('faqs').delete().eq('id', id);

    await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: '/faq' }),
    });

    showToast('FAQ item deleted.');
    fetchFaqs();
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
          <h1 className="text-2xl font-bold font-display text-white">FAQ CMS</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage questions and answers displayed on the public FAQ accordion.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Cancel' : 'Add New FAQ'}</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleCreateFaq} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Create New FAQ</h3>
          <div>
            <label className="block text-xs text-slate-300 mb-1">Question *</label>
            <input
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. How many hours does full home deep cleaning take?"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">Answer *</label>
            <textarea
              rows={3}
              required
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Provide a clear, helpful answer..."
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn-gold w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Save FAQ Item</span>}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-white mb-1">Q: {faq.question}</div>
              <p className="text-xs text-slate-400">A: {faq.answer}</p>
            </div>
            <button
              onClick={() => handleDelete(faq.id)}
              className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 transition-colors border border-red-900/60"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
