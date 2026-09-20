import React from 'react';
import PublicLayoutWrapper from '@/components/PublicLayoutWrapper';
import { Breadcrumbs } from '@/src/components/Breadcrumbs';
import { getPostBySlug, getPublishedPosts } from '@/lib/db';
import { companyInfo } from '@/src/data/companyInfo';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Phone, MessageSquare, ArrowRight, Share2, Sparkles } from 'lucide-react';
import { CTASection } from '@/src/components/CTASection';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { title: 'Post Not Found | Hari Krishna Deep Cleaning' };
  }

  return {
    title: post.seo_title || `${post.title} | Hari Krishna Deep Cleaning`,
    description: post.seo_description || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : [],
    },
  };
}

export default async function SinglePostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getPublishedPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Article structured data JSON-LD schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image_url ? [post.cover_image_url] : [],
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: {
      '@type': 'Organization',
      name: 'Hari Krishna Deep Cleaning Services',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Hari Krishna Deep Cleaning Services',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hkdeepcleaning.vercel.app/images/hk-logo.png',
      },
    },
  };

  return (
    <PublicLayoutWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Breadcrumbs
        items={[
          { name: 'Articles', path: '/posts' },
          { name: post.title }
        ]}
      />

      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-teal-100 text-teal-900 text-xs font-extrabold uppercase px-3 py-1 rounded-full">
                {post.category || 'Cleaning Guide'}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gold-500" />
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : new Date(post.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
              </span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl text-teal-950 tracking-tight leading-tight mb-6">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed border-l-4 border-gold-500 pl-4 py-1 bg-slate-50 rounded-r-xl mb-6">
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Cover Image */}
          {post.cover_image_url && (
            <div className="mb-10 rounded-3xl overflow-hidden shadow-xl border border-slate-100 max-h-[460px]">
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-sm sm:text-base">
            <div
              dangerouslySetInnerHTML={{
                __html: post.content.replace(/\n/g, '<br />'),
              }}
            />
          </div>

          {/* Action Box inside article */}
          <div className="mt-12 bg-teal-950 text-white p-6 sm:p-8 rounded-3xl border border-teal-900 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-gold-400 text-xs font-bold uppercase tracking-wider">Need Professional Cleaning?</span>
              <h3 className="text-xl font-bold text-white mt-1">Book Hari Krishna Cleaning Crew</h3>
              <p className="text-xs text-slate-300 mt-1">Free consultation and instant quote for homes &amp; offices in Hyderabad.</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`tel:${companyInfo.phoneClean}`}
                className="btn-gold px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
              <a
                href={companyInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-teal-950 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((rel) => (
                <div key={rel.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 p-5 shadow-sm">
                  <h3 className="text-base font-bold text-teal-950 mb-2">
                    <Link href={`/posts/${rel.slug}`}>{rel.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-4">{rel.excerpt}</p>
                  <Link
                    href={`/posts/${rel.slug}`}
                    className="text-xs font-bold text-teal-800 hover:text-gold-600 inline-flex items-center gap-1"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection onOpenBooking={() => {}} />
    </PublicLayoutWrapper>
  );
}
