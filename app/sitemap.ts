import { MetadataRoute } from 'next';
import { getActiveServices, getPublishedPosts } from '@/lib/db';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://harikrishnadeepcleaningservices.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // 1. Static Core Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/service-areas`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/testimonials`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/posts`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // 2. Dynamic Service Pages
  let dynamicServices: MetadataRoute.Sitemap = [];
  try {
    const services = await getActiveServices();
    dynamicServices = services.map((svc) => ({
      url: `${BASE_URL}/services/${svc.slug}`,
      lastModified: svc.updated_at || currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }));
  } catch (e) {
    console.error('Error fetching services for sitemap:', e);
  }

  // 3. Dynamic Published Blog Posts
  let dynamicPosts: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPublishedPosts(100);
    dynamicPosts = posts.map((post) => ({
      url: `${BASE_URL}/posts/${post.slug}`,
      lastModified: post.updated_at || post.published_at || currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (e) {
    console.error('Error fetching posts for sitemap:', e);
  }

  return [...staticRoutes, ...dynamicServices, ...dynamicPosts];
}
