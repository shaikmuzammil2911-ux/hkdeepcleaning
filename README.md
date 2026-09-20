# Hari Krishna Deep Cleaning Services — Production Architecture & Admin CMS

Next.js 14 App Router + Supabase (PostgreSQL + Auth + RLS) + Cloudinary Media Management.

---

## 🌟 Architecture Overview

- **Framework**: Next.js 14 (App Router) with Incremental Static Regeneration (ISR)
- **Database & Auth**: Supabase PostgreSQL with Row Level Security (RLS) policies
- **Media Storage**: Cloudinary (auto-optimization, transformations, CDN)
- **Styling**: Tailwind CSS with custom theme & Plus Jakarta Sans / Outfit typography
- **SEO**: Semantic HTML5, dynamic OpenGraph metadata, JSON-LD schema, sitemap.xml, robots.txt

---

## 🚀 Step-by-Step Production Deployment Guide

### 1. Supabase Database Setup

1. Open your Supabase Dashboard: [https://supabase.com/dashboard/project/zvvwgzxsxwevuadldlah](https://supabase.com/dashboard/project/zvvwgzxsxwevuadldlah)
2. Go to **SQL Editor** in the left sidebar.
3. Open and copy the contents of `supabase/migrations/01_initial_schema.sql` into the editor and click **Run**.
4. (Optional but recommended) Copy and run `supabase/seed.sql` to populate services, gallery items, testimonials, and FAQs.

---

### 2. Create Your Admin User

1. In Supabase Dashboard, go to **Authentication** → **Users** → click **Add user** → **Create user**.
2. Enter your admin email and password (e.g., `admin@hkdeepcleaning.com`).
3. Copy the generated **User UID** (UUID).
4. Go back to the **SQL Editor** and run:
```sql
INSERT INTO public.admins (user_id, email, name, role)
VALUES ('<PASTE-USER-UID-HERE>', 'admin@hkdeepcleaning.com', 'Admin', 'admin');
```

---

### 3. Cloudinary Configuration

1. Log into [Cloudinary Console](https://cloudinary.com/console) under cloud `nzauhpok`.
2. Go to **Settings** → **Access Keys** and copy:
   - Cloud Name: `nzauhpok`
   - API Key
   - API Secret
3. Add these to your `.env.local` for local development, and to **Vercel Project Settings → Environment Variables** for production.

---

### 4. Environment Variables Reference

| Variable | Description | Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL | `https://zvvwgzxsxwevuadldlah.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Public Anon Key | `eyJhbGciOi...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key | `eyJhbGciOi...` (from Supabase Settings → API) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name | `nzauhpok` |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary Unsigned Preset | `ml_default` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name (Server) | `nzauhpok` |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | `your_api_key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret | `your_api_secret` |
| `NEXT_PUBLIC_SITE_URL` | Live Site Base URL | `https://hkdeepcleaning.vercel.app` |

---

### 5. Admin CMS Routes

Once logged in at `/admin/login`, you have access to:

- `/admin` — Overview Dashboard & Quick Stats
- `/admin/posts` — Blog / Article CMS with Markdown editor & Cloudinary cover image upload
- `/admin/services` — Manage cleaning services
- `/admin/gallery` — Before & After photo transformations with Cloudinary
- `/admin/testimonials` — Customer reviews & featured ratings
- `/admin/faq` — Frequently Asked Questions
- `/admin/bookings` — Lead management, status tracker (Pending, Confirmed, Completed, Cancelled)
- `/admin/media` — Cloudinary media browser
- `/admin/settings` — Company contacts, working hours, and social media handles

---

## 🛠️ Local Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run production build validation
npm run build

# Start production server locally
npm start
```
