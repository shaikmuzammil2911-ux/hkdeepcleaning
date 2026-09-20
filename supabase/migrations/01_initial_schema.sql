-- ============================================================
-- HARI KRISHNA DEEP CLEANING SERVICES
-- SUPABASE DATABASE SCHEMA MIGRATION
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------
-- 1. ADMINS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------
-- 2. POSTS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  cover_image_public_id TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  category TEXT DEFAULT 'Cleaning Tips',
  tags TEXT[] DEFAULT '{}',
  author_id UUID REFERENCES public.admins(id) ON DELETE SET NULL,
  seo_title TEXT,
  seo_description TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON public.posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON public.posts(published_at DESC);

-- ------------------------------------------------------------
-- 3. SERVICES TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT,
  description TEXT,
  hero_image_url TEXT,
  hero_image_public_id TEXT,
  content TEXT,
  seo_title TEXT,
  seo_description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_sort ON public.services(sort_order ASC);

-- ------------------------------------------------------------
-- 4. GALLERY TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT DEFAULT 'All',
  before_image_url TEXT NOT NULL,
  before_image_public_id TEXT,
  after_image_url TEXT NOT NULL,
  after_image_public_id TEXT,
  description TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_gallery_sort ON public.gallery(sort_order ASC);

-- ------------------------------------------------------------
-- 5. TESTIMONIALS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_role TEXT,
  content TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  image_public_id TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------
-- 6. FAQS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_faqs_sort ON public.faqs(sort_order ASC);

-- ------------------------------------------------------------
-- 7. BOOKINGS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL,
  preferred_date TEXT,
  preferred_time TEXT,
  property_type TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON public.bookings(created_at DESC);

-- ------------------------------------------------------------
-- 8. SITE SETTINGS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name TEXT DEFAULT 'Hari Krishna Deep Cleaning Services',
  tagline TEXT DEFAULT 'Hyderabad''s Premier Deep Cleaning & Sanitization Experts',
  phone TEXT DEFAULT '+91 9988776655',
  whatsapp TEXT DEFAULT '+919988776655',
  email TEXT DEFAULT 'info@hkdeepcleaning.com',
  address TEXT DEFAULT 'Hyderabad, Telangana 500081',
  google_maps_url TEXT DEFAULT 'https://maps.google.com',
  about_text TEXT DEFAULT 'Hari Krishna Deep Cleaning Services is Hyderabad''s premier professional cleaning service provider specializing in residential, commercial, villa, kitchen, bathroom, and sofa deep cleaning.',
  mission TEXT DEFAULT 'To deliver spotless, hygienic, and health-safe environments for homes and businesses across Hyderabad.',
  vision TEXT DEFAULT 'To be the most trusted and customer-preferred deep cleaning company in South India.',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admins
    WHERE user_id = auth.uid() AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Public READ Policies
CREATE POLICY "Public read active posts" ON public.posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public read active services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active gallery" ON public.gallery FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active testimonials" ON public.testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Public read active faqs" ON public.faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public insert bookings" ON public.bookings FOR INSERT WITH CHECK (true);

-- Admin ALL Policies (Authenticated Admins)
CREATE POLICY "Admin full access posts" ON public.posts FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access services" ON public.services FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access gallery" ON public.gallery FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access testimonials" ON public.testimonials FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access faqs" ON public.faqs FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access bookings" ON public.bookings FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access site_settings" ON public.site_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admin read admins" ON public.admins FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
