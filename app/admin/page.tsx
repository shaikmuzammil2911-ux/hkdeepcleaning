import React from 'react';
import { createAdminClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  FileText,
  Sparkles,
  Image as ImageIcon,
  MessageSquareQuote,
  HelpCircle,
  CalendarCheck,
  Plus,
  ArrowRight,
  Clock,
} from 'lucide-react';

export const revalidate = 0; // Dynamic server fetching for admin overview

export default async function AdminDashboardPage() {
  const supabase = createAdminClient();

  // Fetch count stats
  const [
    { count: publishedPostsCount },
    { count: draftPostsCount },
    { count: servicesCount },
    { count: galleryCount },
    { count: testimonialsCount },
    { count: faqsCount },
    { count: newBookingsCount },
    { data: recentPosts },
    { data: recentBookings },
  ] = await Promise.all([
    supabase.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
    supabase.from('services').select('*', { count: 'exact', head: true }),
    supabase.from('gallery').select('*', { count: 'exact', head: true }),
    supabase.from('testimonials').select('*', { count: 'exact', head: true }),
    supabase.from('faqs').select('*', { count: 'exact', head: true }),
    supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('posts').select('*').order('created_at', { ascending: false }).limit(5),
    supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(5),
  ]);

  const cards = [
    { name: 'Published Posts', count: publishedPostsCount || 0, color: 'text-emerald-400', bg: 'bg-emerald-950/40', path: '/admin/posts' },
    { name: 'Draft Posts', count: draftPostsCount || 0, color: 'text-amber-400', bg: 'bg-amber-950/40', path: '/admin/posts' },
    { name: 'Active Services', count: servicesCount || 8, color: 'text-teal-400', bg: 'bg-teal-950/40', path: '/admin/services' },
    { name: 'Gallery Items', count: galleryCount || 4, color: 'text-purple-400', bg: 'bg-purple-950/40', path: '/admin/gallery' },
    { name: 'Testimonials', count: testimonialsCount || 6, color: 'text-gold-400', bg: 'bg-gold-950/40', path: '/admin/testimonials' },
    { name: 'FAQs', count: faqsCount || 8, color: 'text-blue-400', bg: 'bg-blue-950/40', path: '/admin/faq' },
    { name: 'New Bookings', count: newBookingsCount || 0, color: 'text-rose-400', bg: 'bg-rose-950/40', path: '/admin/bookings' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Dashboard Overview</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time status of Hari Krishna Deep Cleaning Services website content.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts/new"
            className="btn-gold px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Post</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
        {cards.map((card) => (
          <Link
            key={card.name}
            href={card.path}
            className={`${card.bg} border border-slate-800 p-4 rounded-2xl hover:border-slate-700 transition-all group`}
          >
            <div className={`text-2xl font-black ${card.color} font-display mb-1`}>{card.count}</div>
            <div className="text-[11px] font-semibold text-slate-300 group-hover:text-white transition-colors">
              {card.name}
            </div>
          </Link>
        ))}
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Posts */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gold-400" />
              <h2 className="text-sm font-bold text-white">Recent Articles</h2>
            </div>
            <Link href="/admin/posts" className="text-xs text-gold-400 hover:underline">
              View All →
            </Link>
          </div>

          {!recentPosts || recentPosts.length === 0 ? (
            <div className="text-xs text-slate-500 py-8 text-center">
              No articles created yet. Click "Create New Post" to publish one!
            </div>
          ) : (
            <div className="space-y-3">
              {recentPosts.map((post: any) => (
                <div key={post.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="overflow-hidden pr-3">
                    <div className="text-xs font-semibold text-slate-200 truncate">{post.title}</div>
                    <div className="text-[10px] text-slate-400">{post.category || 'Tips'} &bull; {new Date(post.created_at).toLocaleDateString()}</div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${post.status === 'published' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Bookings */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-teal-400" />
              <h2 className="text-sm font-bold text-white">Recent Customer Bookings</h2>
            </div>
            <Link href="/admin/bookings" className="text-xs text-teal-400 hover:underline">
              View All →
            </Link>
          </div>

          {!recentBookings || recentBookings.length === 0 ? (
            <div className="text-xs text-slate-500 py-8 text-center">
              No booking requests received yet.
            </div>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((b: any) => (
                <div key={b.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div>
                    <div className="text-xs font-bold text-slate-200">{b.name} ({b.phone})</div>
                    <div className="text-[10px] text-slate-400">{b.service} &bull; {new Date(b.created_at).toLocaleDateString()}</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-teal-950 text-teal-300 border border-teal-800">
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
