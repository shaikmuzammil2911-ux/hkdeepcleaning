'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Loader2, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ImageUploader } from '@/components/admin/ImageUploader';

export default function CreatePostPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [manualSlug, setManualSlug] = useState(false);
  const [category, setCategory] = useState('Cleaning Tips');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('Hyderabad, Deep Cleaning, Home');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');

  // Image State
  const [imageUrl, setImageUrl] = useState('');
  const [imagePublicId, setImagePublicId] = useState('');

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto slug generator
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!manualSlug) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      setSlug(generatedSlug);
    }
  };

  const handleSubmit = async (targetStatus: 'draft' | 'published') => {
    setError(null);
    if (!title || !content) {
      setError('Title and Content are required fields.');
      return;
    }

    setSaving(true);
    try {
      const formattedTags = tags.split(',').map((t) => t.trim()).filter(Boolean);
      const finalSeoTitle = seoTitle || title;
      const finalSeoDesc = seoDescription || excerpt;

      const supabase = createClient();
      const { data, error: dbError } = await supabase.from('posts').insert([
        {
          title,
          slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
          excerpt,
          content,
          cover_image_url: imageUrl || null,
          cover_image_public_id: imagePublicId || null,
          status: targetStatus,
          category,
          tags: formattedTags,
          seo_title: finalSeoTitle,
          seo_description: finalSeoDesc,
          published_at: targetStatus === 'published' ? new Date().toISOString() : null,
        },
      ]).select().single();

      if (dbError) throw dbError;

      // Revalidate website cache
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/posts' }),
      });

      router.push('/admin/posts');
      router.refresh();
    } catch (err: any) {
      setError(err?.message || 'Failed to create post in database.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold font-display text-white">Create New Article</h1>
            <p className="text-xs text-slate-400">Add a new cleaning guide to your website CMS.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSubmit('draft')}
            disabled={saving}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700"
          >
            Save as Draft
          </button>
          <button
            onClick={() => handleSubmit('published')}
            disabled={saving}
            className="btn-gold px-5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-md"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Publish Article</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-950/80 border border-red-800 text-red-300 rounded-2xl text-xs">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Form Fields */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Post Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g., 5 Deep Cleaning Tips for Hyderabad Homes"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                URL Slug * (Auto-generated)
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setManualSlug(true);
                }}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-gold-400 font-mono focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Short Excerpt / Summary
              </label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A brief 2-line preview displayed on cards..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Article Content *
              </label>
              <textarea
                rows={12}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write full article body text, headings, and paragraphs here..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold-500 font-mono"
              />
            </div>
          </div>

          {/* SEO Metadata Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-gold-400">
              Search Engine Optimization (SEO)
            </h3>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">SEO Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder={title || 'Leave blank to use article title'}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">SEO Meta Description</label>
              <textarea
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder={excerpt || 'Leave blank to use excerpt'}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Post Cover Image */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <ImageUploader
              label="Article Cover Image"
              value={imageUrl}
              aspectRatio="landscape"
              recommendedSize="1600 × 900 px • JPG, PNG or WEBP"
              category="posts"
              onChange={(url, publicId) => {
                setImageUrl(url);
                setImagePublicId(publicId || '');
              }}
            />
          </div>

          {/* Category & Tags */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              >
                <option value="Cleaning Tips">Cleaning Tips</option>
                <option value="Home Maintenance">Home Maintenance</option>
                <option value="Deep Sanitization">Deep Sanitization</option>
                <option value="Commercial Cleaning">Commercial Cleaning</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tags (Comma Separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Hyderabad, Home, Deep Cleaning"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
