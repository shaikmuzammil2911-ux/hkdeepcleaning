import React from 'react';
import PublicLayoutWrapper from '@/components/PublicLayoutWrapper';
import { Breadcrumbs } from '@/src/components/Breadcrumbs';
import { getPublishedPosts } from '@/lib/db';
import Link from 'next/link';
import { Calendar, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cleaning Tips & Articles | Hari Krishna Deep Cleaning Services',
  description: 'Read the latest deep cleaning tips, guides, and home sanitization advice for Hyderabad residents.',
};

export const revalidate = 60; // ISR: revalidate every 60s or on-demand

export default async function PostsPage() {
  const posts = await getPublishedPosts();

  return (
    <PublicLayoutWrapper>
      <Breadcrumbs items={[{ name: 'Cleaning Tips & Articles' }]} />

      <section className="bg-gradient-to-b from-teal-50/60 to-white py-12 sm:py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-100/80 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-teal-900 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>EXPERT CLEANING GUIDES</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-teal-950 tracking-tight mb-4">
            Cleaning Tips &amp; Updates
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Discover professional advice on maintaining a hygienic, stain-free, and healthy living environment in Hyderabad.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-teal-950 mb-2">No Articles Published Yet</h3>
              <p className="text-xs text-slate-500 mb-6">
                Our team is working on new cleaning guides. Check back soon!
              </p>
              <Link href="/" className="btn-teal px-5 py-2.5 rounded-full text-xs font-bold uppercase">
                Return to Homepage
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                    {post.cover_image_url ? (
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-teal-800 to-teal-950 flex items-center justify-center text-gold-400">
                        <BookOpen className="w-10 h-10 opacity-60" />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-teal-900/90 text-gold-300 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-gold-400/30">
                      {post.category || 'Cleaning Tips'}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                        <Calendar className="w-3.5 h-3.5 text-gold-500" />
                        <span>
                          {post.published_at
                            ? new Date(post.published_at).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })
                            : new Date(post.created_at).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                        </span>
                      </div>

                      <h2 className="text-lg font-display font-bold text-teal-950 group-hover:text-teal-700 transition-colors line-clamp-2 mb-2">
                        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                      </h2>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="text-xs font-bold text-teal-800 hover:text-gold-600 transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayoutWrapper>
  );
}
