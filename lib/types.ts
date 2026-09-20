export interface AdminUser {
  id: string;
  user_id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  cover_image_public_id?: string;
  status: 'draft' | 'published';
  category: string;
  tags?: string[];
  author_id?: string;
  seo_title?: string;
  seo_description?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  hero_image_url: string;
  hero_image_public_id?: string;
  content?: string;
  seo_title?: string;
  seo_description?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  before_image_url: string;
  before_image_public_id?: string;
  after_image_url: string;
  after_image_public_id?: string;
  description?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TestimonialItem {
  id: string;
  customer_name: string;
  customer_role?: string;
  content: string;
  rating: number;
  image_url?: string;
  image_public_id?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BookingItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  preferred_date?: string;
  preferred_time?: string;
  property_type?: string;
  message?: string;
  status: 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  updated_at?: string;
}

export interface SiteSettings {
  id?: string;
  business_name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  google_maps_url: string;
  about_text: string;
  mission: string;
  vision: string;
  updated_at?: string;
}
