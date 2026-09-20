'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { PostItem } from '@/lib/types';
import { Plus, Edit, Trash2, Eye, Globe, Lock, Loader2, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalPost, setDeleteModalPost] = useState<PostItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data as PostItem[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleStatus = async (post: PostItem) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    const publishedAt = newStatus === 'published' ? new Date().toISOString() : post.published_at;

    const supabase = createClient();
    const { error } = await supabase
      .from('posts')
      .update({
        status: newStatus,
        published_at: publishedAt,
        updated_at: new Date().toISOString(),
      })
      .eq('id', post.id);

    if (!error) {
      // Revalidate website
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/posts' }),
      });
      showToast(`Post set to ${newStatus}.`);
      fetchPosts();
    } else {
      showToast('Failed to update status.');
    }
  };

  const handleDeletePost = async () => {
    if (!deleteModalPost) return;
    setIsDeleting(true);

    try {
      // 1. Delete associated Cloudinary asset safely if public_id exists
      if (deleteModalPost.cover_image_public_id) {
        await fetch('/api/cloudinary/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_id: deleteModalPost.cover_image_public_id }),
        });
      }

      // 2. Delete post from Supabase
      const supabase = createClient();
      const { error } = await supabase.from('posts').delete().eq('id', deleteModalPost.id);

      if (error) throw error;

      // 3. Revalidate public website
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/posts' }),
      });

      showToast('Post deleted successfully.');
      setDeleteModalPost(null);
      fetchPosts();
    } catch (err: any) {
      showToast(`Delete failed: ${err?.message || 'Unknown error'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-900 border border-emerald-700 text-emerald-100 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Posts Management (CMS)</h1>
          <p className="text-xs text-slate-400 mt-1">
            Create, edit, publish, unpublish, and delete articles for the public site.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchPosts}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Refresh List"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <Link
            href="/admin/posts/new"
            className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create New Post</span>
          </Link>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-gold-500" />
            <span>Loading articles from Supabase...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No articles found. Click "+ Create New Post" to publish your first article!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-4">Cover</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Published Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      {post.cover_image_url ? (
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="w-12 h-12 object-cover rounded-xl border border-slate-700"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-[10px] text-slate-500">
                          No Img
                        </div>
                      )}
                    </td>
                    <td className="p-4 max-w-xs">
                      <div className="font-bold text-white truncate">{post.title}</div>
                      <div className="text-[10px] text-slate-500 truncate">/{post.slug}</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full text-[10px] font-semibold border border-slate-700">
                        {post.category || 'Cleaning Tips'}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(post)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase cursor-pointer transition-all ${
                          post.status === 'published'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 hover:bg-emerald-900'
                            : 'bg-amber-950 text-amber-400 border border-amber-800 hover:bg-amber-900'
                        }`}
                        title="Click to toggle status"
                      >
                        {post.status === 'published' ? (
                          <>
                            <Globe className="w-3 h-3" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-slate-400">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString()
                        : new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {post.status === 'published' && (
                          <Link
                            href={`/posts/${post.slug}`}
                            target="_blank"
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                            title="View Public Post"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="p-2 rounded-lg bg-teal-900/60 hover:bg-teal-800 text-teal-200 transition-colors border border-teal-700/60"
                          title="Edit Post"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setDeleteModalPost(post)}
                          className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 transition-colors border border-red-900/60"
                          title="Delete Post"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalPost && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <div className="w-10 h-10 rounded-2xl bg-red-950 border border-red-800 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Delete this post?</h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Are you sure you want to delete <strong className="text-white">&quot;{deleteModalPost.title}&quot;</strong>?
              This action cannot be undone. Associated image assets will be cleaned up safely.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteModalPost(null)}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={handleDeletePost}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Post</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
