'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { PostItem } from '@/lib/types';
import { ArrowLeft, Upload, Loader2, CheckCircle, Image as ImageIcon, Sparkles, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const postId = params.id;

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Cleaning Tips');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');

  // Existing Image State
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [existingPublicId, setExistingPublicId] = useState('');

  // New Image Replacement State
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newPreviewUrl, setNewPreviewUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPost() {
      setLoading(true);
      const supabase = createClient();
      const { data, error: err } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (!err && data) {
        const post = data as PostItem;
        setTitle(post.title || '');
        setSlug(post.slug || '');
        setCategory(post.category || 'Cleaning Tips');
        setExcerpt(post.excerpt || '');
        setContent(post.content || '');
        setTags(post.tags ? post.tags.join(', ') : '');
        setSeoTitle(post.seo_title || '');
        setSeoDescription(post.seo_description || '');
        setStatus(post.status || 'draft');
        setExistingImageUrl(post.cover_image_url || '');
        setExistingPublicId(post.cover_image_public_id || '');
      } else {
        setError('Post not found in database.');
      }
      setLoading(false);
    }
    loadPost();
  }, [postId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Image file size must be less than 10MB.');
        return;
      }
      setNewImageFile(file);
      setNewPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleSave = async (targetStatus: 'draft' | 'published') => {
    setError(null);
    if (!title || !content) {
      setError('Title and Content are required.');
      return;
    }

    setSaving(true);
    try {
      let finalUrl = existingImageUrl;
      let finalPublicId = existingPublicId;
      let oldPublicIdToDelete = '';

      // Safe image replacement (Section 11 logic)
      if (newImageFile) {
        setUploadingImage(true);
        const formData = new FormData();
        formData.append('file', newImageFile);
        formData.append('category', 'posts');

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok || !uploadData.success) {
          throw new Error(uploadData.error || 'Failed to upload replacement image to Cloudinary');
        }

        // If upload succeeds, mark old public_id for deletion
        oldPublicIdToDelete = existingPublicId;
        finalUrl = uploadData.secure_url;
        finalPublicId = uploadData.public_id;
        setUploadingImage(false);
      }

      const formattedTags = tags.split(',').map((t) => t.trim()).filter(Boolean);
      const supabase = createClient();

      // Update database first
      const { error: dbError } = await supabase
        .from('posts')
        .update({
          title,
          slug,
          excerpt,
          content,
          cover_image_url: finalUrl || null,
          cover_image_public_id: finalPublicId || null,
          status: targetStatus,
          category,
          tags: formattedTags,
          seo_title: seoTitle || title,
          seo_description: seoDescription || excerpt,
          published_at: targetStatus === 'published' ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', postId);

      if (dbError) throw dbError;

      // Now safely delete old Cloudinary image if replaced
      if (oldPublicIdToDelete) {
        fetch('/api/cloudinary/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_id: oldPublicIdToDelete }),
        }).catch((err) => console.warn('Old image cleanup error:', err));
      }

      // Revalidate website
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/posts' }),
      });

      router.push('/admin/posts');
      router.refresh();
    } catch (err: any) {
      setError(err?.message || 'Failed to save post edits.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-gold-500" />
        <span>Loading post details...</span>
      </div>
    );
  }

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
            <h1 className="text-xl font-bold font-display text-white">Edit Article</h1>
            <p className="text-xs text-slate-400">Update content, cover image, and status.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={saving}
            className="btn-gold px-5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-md"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Update &amp; Publish</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-950/80 border border-red-800 text-red-300 rounded-2xl text-xs">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Post Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">URL Slug *</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-gold-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Short Excerpt</label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Article Content *</label>
              <textarea
                rows={12}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
              />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-gold-400">SEO Metadata</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">SEO Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">SEO Meta Description</label>
              <textarea
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-teal-400 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span>Cover Image (Cloudinary)</span>
            </h3>

            {/* Current Image Display */}
            {existingImageUrl && !newPreviewUrl && (
              <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                <img src={existingImageUrl} alt="Current" className="w-full h-40 object-cover" />
                <div className="p-2 text-[10px] text-slate-400 bg-slate-900/90 truncate">
                  ID: {existingPublicId || 'None'}
                </div>
              </div>
            )}

            {/* Replacement Image Preview */}
            {newPreviewUrl && (
              <div className="relative rounded-xl overflow-hidden border border-gold-500 bg-slate-950">
                <img src={newPreviewUrl} alt="Replacement" className="w-full h-40 object-cover" />
                <div className="p-2 text-[10px] text-gold-400 bg-slate-900/90 flex items-center justify-between">
                  <span>Replacement Ready</span>
                  <button
                    onClick={() => {
                      setNewImageFile(null);
                      setNewPreviewUrl(null);
                    }}
                    className="text-red-400 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <label className="border-2 border-dashed border-slate-800 hover:border-teal-700 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-950/50">
              <RefreshCw className="w-6 h-6 text-slate-500 mb-1" />
              <span className="text-xs text-slate-300 font-semibold">
                {existingImageUrl ? 'Replace Image' : 'Upload Image'}
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

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
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tags</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
