'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { PostItem } from '@/lib/types';

interface LatestPostsSectionProps {
  posts: PostItem[];
}

export const LatestPostsSection: React.FC<LatestPostsSectionProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return null; // Tasteful hide when no posts exist yet
  }

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-teal-100/70 px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-teal-900 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>CLEANING GUIDES &amp; TIPS</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-teal-950 tracking-tight">
              Latest Cleaning Tips &amp; Updates
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Expert advice on maintaining a hygienic, spotless home in Hyderabad.
            </p>
          </div>

          <div>
            <Link
              href="/posts"
              className="btn-teal px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-sm"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Posts Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group"
            >
              {/* Cover Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
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

              {/* Body */}
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

                  <h3 className="text-base font-display font-bold text-teal-950 group-hover:text-teal-700 transition-colors line-clamp-2 mb-2">
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  </h3>

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

      </div>
    </section>
  );
};
