import { createPublicClient } from './supabase/server';
import { servicesData } from '../src/data/servicesData';
import { faqData } from '../src/data/faqData';
import { galleryData } from '../src/data/galleryData';
import { testimonialsData } from '../src/data/testimonialsData';
import { companyInfo } from '../src/data/companyInfo';
import { ServiceItem, PostItem, GalleryItem, TestimonialItem, FAQItem, SiteSettings } from './types';

// ============================================================
// SERVICES DATA ACCESS
// ============================================================
export async function getActiveServices(): Promise<ServiceItem[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (!error && data && data.length > 0) {
      return data as ServiceItem[];
    }
  } catch (err) {
    console.warn('Supabase fetch failed for services, using fallback static data:', err);
  }

  return servicesData.map((s, idx) => ({
    id: s.id || `static-${idx}`,
    name: s.title,
    slug: s.slug,
    short_description: s.shortDescription,
    description: s.fullDescription,
    hero_image_url: s.image,
    content: JSON.stringify({
      process: s.process,
      whatWeClean: s.whatWeClean,
      faqs: s.faqs,
    }),
    seo_title: `${s.title} in Hyderabad | Hari Krishna Deep Cleaning`,
    seo_description: s.shortDescription,
    is_active: true,
    sort_order: idx + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();

    if (!error && data) {
      return data as ServiceItem;
    }
  } catch (err) {
    console.warn(`Supabase fetch failed for service ${slug}:`, err);
  }

  const staticService = servicesData.find((s) => s.slug === slug);
  if (!staticService) return null;

  return {
    id: staticService.id,
    name: staticService.title,
    slug: staticService.slug,
    short_description: staticService.shortDescription,
    description: staticService.fullDescription,
    hero_image_url: staticService.image,
    content: JSON.stringify({
      process: staticService.process,
      whatWeClean: staticService.whatWeClean,
      faqs: staticService.faqs,
    }),
    seo_title: `${staticService.title} in Hyderabad | Hari Krishna Deep Cleaning`,
    seo_description: staticService.shortDescription,
    is_active: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

// ============================================================
// POSTS DATA ACCESS
// ============================================================
export async function getPublishedPosts(limit?: number): Promise<PostItem[]> {
  try {
    const supabase = createPublicClient();
    let query = supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (!error && data) {
      return data as PostItem[];
    }
  } catch (err) {
    console.warn('Supabase fetch failed for posts:', err);
  }
  return [];
}

export async function getPostBySlug(slug: string): Promise<PostItem | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (!error && data) {
      return data as PostItem;
    }
  } catch (err) {
    console.warn(`Supabase fetch failed for post slug ${slug}:`, err);
  }
  return null;
}

// ============================================================
// GALLERY DATA ACCESS
// ============================================================
export async function getActiveGallery(): Promise<GalleryItem[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (!error && data && data.length > 0) {
      return data as GalleryItem[];
    }
  } catch (err) {
    console.warn('Supabase fetch failed for gallery, using fallback static data:', err);
  }

  return galleryData.map((g, idx) => ({
    id: g.id || `gal-${idx}`,
    title: g.title,
    category: g.category,
    before_image_url: g.beforeImage,
    after_image_url: g.afterImage,
    description: g.description,
    sort_order: idx + 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
}

// ============================================================
// TESTIMONIALS DATA ACCESS
// ============================================================
export async function getPublishedTestimonials(): Promise<TestimonialItem[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (!error && data && data.length > 0) {
      return data as TestimonialItem[];
    }
  } catch (err) {
    console.warn('Supabase fetch failed for testimonials, using fallback static data:', err);
  }

  return testimonialsData.map((t, idx) => ({
    id: t.id || `test-${idx}`,
    customer_name: t.name,
    customer_role: `${t.location} • ${t.service}`,
    content: t.review,
    rating: t.rating,
    image_url: t.avatarUrl,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
}

export const getActiveTestimonials = getPublishedTestimonials;

// ============================================================
// FAQS DATA ACCESS
// ============================================================
export async function getActiveFAQs(): Promise<FAQItem[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (!error && data && data.length > 0) {
      return data as FAQItem[];
    }
  } catch (err) {
    console.warn('Supabase fetch failed for FAQs, using fallback static data:', err);
  }

  return faqData.map((f, idx) => ({
    id: f.id || `faq-${idx}`,
    question: f.question,
    answer: f.answer,
    sort_order: idx + 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
}

// ============================================================
// SITE SETTINGS DATA ACCESS
// ============================================================
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase.from('site_settings').select('*').single();

    if (!error && data) {
      return data as SiteSettings;
    }
  } catch (err) {
    console.warn('Supabase fetch failed for site_settings, using static companyInfo:', err);
  }

  return {
    business_name: companyInfo.name,
    tagline: companyInfo.tagline,
    phone: companyInfo.phone,
    whatsapp: companyInfo.whatsapp,
    email: companyInfo.email,
    address: companyInfo.address,
    google_maps_url: companyInfo.mapsDirectionsUrl,
    about_text: 'Hari Krishna Deep Cleaning Services is Hyderabad\'s premier professional cleaning service provider specializing in residential, commercial, villa, kitchen, bathroom, and sofa deep cleaning.',
    mission: 'To deliver spotless, hygienic, and health-safe environments for homes and businesses across Hyderabad.',
    vision: 'To be the most trusted and customer-preferred deep cleaning company in South India.',
  };
}
