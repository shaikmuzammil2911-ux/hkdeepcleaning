-- ============================================================
-- HARI KRISHNA DEEP CLEANING SERVICES
-- INITIAL SEED DATA FOR SUPABASE
-- Run this in Supabase SQL Editor after 01_initial_schema.sql
-- ============================================================

-- ------------------------------------------------------------
-- 1. SITE SETTINGS
-- ------------------------------------------------------------
INSERT INTO public.site_settings (key, value)
VALUES 
  ('company_name', '{"value": "Hari Krishna Deep Cleaning Services"}'::jsonb),
  ('phone', '{"value": "+91 95738 97750", "clean": "+919573897750"}'::jsonb),
  ('whatsapp', '{"value": "+91 95738 97750", "clean": "919573897750"}'::jsonb),
  ('email', '{"value": "harikrishnadeepcleaningservice@gmail.com"}'::jsonb),
  ('address', '{"value": "Hyderabad, Telangana"}'::jsonb),
  ('working_hours', '{"value": "Monday - Sunday: 7:00 AM - 9:00 PM"}'::jsonb),
  ('tagline', '{"value": "A Cleaner Space • A Happier You"}'::jsonb),
  ('social_links', '{"facebook": "https://facebook.com", "instagram": "https://instagram.com", "youtube": "https://youtube.com"}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- ------------------------------------------------------------
-- 2. SERVICES
-- ------------------------------------------------------------
INSERT INTO public.services (name, slug, short_description, description, hero_image_url, is_active, sort_order)
VALUES
(
  'Home Deep Cleaning',
  'home-deep-cleaning',
  'Complete top-to-bottom sanitization and intensive cleaning for apartments, independent houses, and flats.',
  'Our Home Deep Cleaning service offers comprehensive sanitization covering living rooms, bedrooms, kitchens, bathrooms, balconies, ceiling fans, switchboards, window glass, and floor scrubbing with advanced machinery.',
  '/images/hero-cleaner.jpg',
  true,
  1
),
(
  'Villa Deep Cleaning',
  'villa-deep-cleaning',
  'Specialized multi-story villa, duplex, and luxury bungalow intensive deep cleaning with heavy-duty equipment.',
  'Customized for large residential properties and luxury villas, our team utilizes industrial vacuum extractors, high-reach glass cleaning poles, and motorized floor polishers for pristine results across all floors.',
  '/images/villa-cleaning.jpg',
  true,
  2
),
(
  'Construction Cleaning',
  'construction-cleaning',
  'Heavy-duty post-renovation and post-construction paint, cement, adhesive, and silica dust removal.',
  'We eliminate stubborn cement splatters, paint drops on window frames and tiles, construction debris, adhesive residues, and fine drywall dust to make newly built or renovated properties 100% ready for handover.',
  '/images/construction-cleaning.jpg',
  true,
  3
),
(
  'Office & Commercial Cleaning',
  'office-commercial-cleaning',
  'Professional corporate sanitization, workstation detailing, cafeteria, and commercial space cleaning.',
  'Tailored for IT offices, co-working facilities, retail spaces, and corporate buildings in Madhapur, Hitech City, and Gachibowli. Includes desk sanitization, carpet dry vacuuming, pantry degreasing, and glass partitions.',
  '/images/commercial-cleaning.jpg',
  true,
  4
),
(
  'Kitchen Deep Cleaning',
  'kitchen-deep-cleaning',
  'Intensive grease, oil, and grime removal for modular kitchens, chimneys, exhaust fans, and tile grout.',
  'Our kitchen deep cleaning targets heavy cooking oil accumulation, grease behind cooktops, kitchen chimneys and filter mesh, inside-out modular cabinet sanitization, countertop polishing, and wall tile restoration.',
  '/images/kitchen-cleaning.jpg',
  true,
  5
),
(
  'Bathroom Deep Cleaning',
  'bathroom-deep-cleaning',
  'Hard-water stain removal, descaling, sanitaryware polishing, and antifungal wall tile scrubbing.',
  'We use professional descaling compounds and rotary tile scrubbers to remove yellow hard water stains, soap scum, calcium crusts from glass shower cubicles, faucets, toilet bowls, and floor drains.',
  '/images/bathroom-cleaning.jpg',
  true,
  6
),
(
  'Floor Cleaning & Polishing',
  'floor-cleaning',
  'Single-disc rotary scrubbing, tile grout brightening, and marble/granite buffing.',
  'Restore your floors with our single-disc machine scrubbing, premium tile cleaners, and polishing pads. Removes embedded grime from grout lines and restores bright, reflective finishes.',
  '/images/floor-cleaning.jpg',
  true,
  7
),
(
  'Move-In / Move-Out Cleaning',
  'move-in-move-out-cleaning',
  'Complete handover cleaning for tenants, owners, and real estate property managers.',
  'Ensure a flawless move with our end-to-end vacant home deep cleaning. Every closet, cabinet, bathroom, kitchen appliance area, balcony, and floor is cleaned to perfection for deposit refunds or welcoming new occupants.',
  '/images/sofa-cleaning.jpg',
  true,
  8
)
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  hero_image_url = EXCLUDED.hero_image_url,
  is_active = EXCLUDED.is_active,
  sort_order = EXCLUDED.sort_order;

-- ------------------------------------------------------------
-- 3. GALLERY (Before / After)
-- ------------------------------------------------------------
INSERT INTO public.gallery (title, category, before_image_url, after_image_url, description, sort_order, is_active)
VALUES
(
  'Kitchen Deep Cleaning & Chimney Degreasing',
  'Kitchen',
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
  '/images/kitchen-cleaning.jpg',
  'Removed heavy accumulated cooking oil, grease behind gas stove, and restored stainless steel chimney mesh.',
  1,
  true
),
(
  'Hard Water Descaling & Chrome Restoration',
  'Bathroom',
  'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  'Dissolved severe calcium watermark crust on glass partitions and scrubbed bathroom floor grout lines.',
  2,
  true
),
(
  'Marble Machine Scrubbing & Grime Removal',
  'Floor',
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80',
  'Single-disc rotary scrubbing removed years of embedded black dirt in grout lines, bringing back bright floor luster.',
  3,
  true
),
(
  'Full Living Room & Villa Deep Cleaning',
  'Home',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
  '/images/hero-cleaner.jpg',
  'Complete living room makeover with ceiling fan detailing, sofa dry vacuuming, and streak-free balcony glass.',
  4,
  true
),
(
  'Modular Cabinet & Granite Countertop Refresh',
  'Kitchen',
  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
  'Restored dull granite countertop and removed sticky grease film from overhead wooden cabinets.',
  5,
  true
),
(
  'Post-Construction Dust Extraction & Handover',
  'Home',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
  '/images/construction-cleaning.jpg',
  'Scraped paint drops from aluminum sliders and extracted fine silica cement dust across a 3BHK flat.',
  6,
  true
);

-- ------------------------------------------------------------
-- 4. TESTIMONIALS
-- ------------------------------------------------------------
INSERT INTO public.testimonials (customer_name, customer_role, content, rating, is_featured, is_active, sort_order)
VALUES
(
  'Priya Sharma',
  'Homeowner, Kavuri Hills',
  'Excellent service! My home was absolutely clean. The team was professional, polite and on time. Highly recommend their deep cleaning.',
  5,
  true,
  true,
  1
),
(
  'Rohit Mehta',
  'Office Manager, Madhapur',
  'We used their office cleaning service and the results were amazing. Very reliable and professional team who took care of every desk and glass partition.',
  5,
  true,
  true,
  2
),
(
  'Sneha Reddy',
  'Villa Owner, Gachibowli',
  'The villa cleaning service was outstanding. Our home feels fresh and clean. Great attention to detail, especially on our marble floors and bathrooms!',
  5,
  true,
  true,
  3
),
(
  'Venkatesh Rao',
  'Resident, Jubilee Hills',
  'Booked them right after our house painting was finished. They removed every speck of paint splatter and cement residue from window tracks and floors.',
  5,
  true,
  true,
  4
),
(
  'Ananya Deshmukh',
  'Resident, Banjara Hills',
  'Our kitchen chimney and tiles look brand new. They didn''t leave any oily stains behind. Very polite staff and punctual service.',
  5,
  true,
  true,
  5
);

-- ------------------------------------------------------------
-- 5. FAQS
-- ------------------------------------------------------------
INSERT INTO public.faqs (question, answer, category, is_active, sort_order)
VALUES
(
  'What areas do you provide cleaning services in?',
  'We provide cleaning services across Hyderabad, with a strong focus in Kavuri Hills, Madhapur, Gafoornagar, Jubilee Hills, Banjara Hills, Hitech City, Gachibowli, Kondapur, Manikonda, and nearby Hyderabad areas.',
  'General',
  true,
  1
),
(
  'What cleaning services do you offer?',
  'We offer 8+ specialized professional cleaning services: Home Deep Cleaning, Villa Deep Cleaning, Construction Cleaning, Office & Commercial Cleaning, Kitchen Deep Cleaning, Bathroom Deep Cleaning, Floor Cleaning & Polishing, and Move-In / Move-Out Cleaning.',
  'Services',
  true,
  2
),
(
  'Do you provide home deep cleaning?',
  'Yes, our Home Deep Cleaning covers complete top-to-bottom sanitization of floors, walls, ceiling fans, kitchens, bathrooms, bedrooms, windows, balconies, and hard-to-reach areas.',
  'Services',
  true,
  3
),
(
  'Do you provide villa cleaning?',
  'Yes, we specialize in multi-story villas and duplex homes, providing dedicated multi-member cleaning teams equipped with high-reach equipment, marble floor buffers, and glass cleaning tools.',
  'Services',
  true,
  4
),
(
  'Do you provide post-construction cleaning?',
  'Yes, we provide heavy-duty post-construction and post-renovation cleaning to thoroughly remove fine silica dust, paint marks, cement stains, plaster splatters, and adhesive residues before you move in.',
  'Services',
  true,
  5
),
(
  'Can I book a service through WhatsApp?',
  'Yes! You can instantly connect with us on WhatsApp at +91 95738 97750. You can share your property details, photos, or preferred time slot for quick confirmation.',
  'Booking',
  true,
  6
),
(
  'How can I contact Hari Krishna Deep Cleaning Services?',
  'You can reach us by phone at +91 95738 97750, by WhatsApp at +91 95738 97750, by email at harikrishnadeepcleaningservice@gmail.com, or visit us at 1-16, 2, Kavuri Hills Rd, Sri Rama Colony, Kavuri Hills, Gafoornagar, Hyderabad – 500081.',
  'General',
  true,
  7
),
(
  'Do you provide office and commercial cleaning?',
  'Yes, we provide corporate cleaning services for IT offices, tech workplaces, co-working spaces, retail shops, and commercial premises across Hyderabad, including flexible weekend and after-hours shifts.',
  'Services',
  true,
  8
),
(
  'Are your cleaning chemicals safe for kids and pets?',
  'Yes, we prioritize eco-friendly, non-hazardous, and non-corrosive cleaning agents that clean effectively while maintaining safe indoor air quality for your family and pets.',
  'Safety',
  true,
  9
),
(
  'What is your booking lead time?',
  'We recommend booking 24 to 48 hours in advance to guarantee your preferred time slot, although same-day emergency slots may be available depending on schedule.',
  'Booking',
  true,
  10
);

-- ------------------------------------------------------------
-- 6. BLOG POSTS (Initial Seed)
-- ------------------------------------------------------------
INSERT INTO public.posts (title, slug, excerpt, content, cover_image_url, status, category, tags, published_at)
VALUES
(
  'Essential Guide to Deep Cleaning Your Home Before Festive Season in Hyderabad',
  'essential-guide-deep-cleaning-festive-season-hyderabad',
  'Get your Hyderabad home sparkling clean before Diwali, Sankranti, or Eid with our comprehensive deep cleaning checklist and expert tips.',
  '<h2>Why Deep Cleaning Matters Before Festivals</h2><p>Hyderabad homes often accumulate dust from ongoing urban development, weather changes, and daily cooking. A seasonal deep cleaning refreshes your living environment and prepares your home to welcome guests.</p><h3>1. Start with the Kitchen</h3><p>Kitchen chimneys and exhaust fans bear the brunt of everyday Indian cooking. Degreasing filters and scrubbing wall tiles behind stoves is critical.</p><h3>2. High-Reach Dusting</h3><p>Ceiling fans, chandeliers, and false ceilings accumulate fine dirt. Use microfibre extendable dusters or hire professionals with proper safety gear.</p><h3>3. Machine Floor Scrubbing</h3><p>Mopping alone cannot lift dirt trapped in tile grout lines. Single-disc rotary scrubbers lift deep-seated grime and revive the natural sheen of marble and vitrified tiles.</p>',
  '/images/hero-cleaner.jpg',
  'published',
  'Home Cleaning Tips',
  ARRAY['Deep Cleaning', 'Hyderabad', 'Home Care', 'Festive Cleaning'],
  now()
),
(
  'How to Choose Between Regular Cleaning and Professional Deep Cleaning',
  'regular-cleaning-vs-professional-deep-cleaning',
  'Learn the key differences between routine housekeeping and professional deep cleaning services for your home or villa in Hyderabad.',
  '<h2>Understanding the Difference</h2><p>While daily sweeping and mopping keeps visible dust away, deep cleaning is an intensive, periodic overhaul that targets hidden grime, bacteria, and hard-water deposits.</p><h3>When Do You Need Deep Cleaning?</h3><ul><li>Moving into a new flat or villa</li><li>After home renovation or painting work</li><li>Every 3 to 6 months for bathroom descaling and kitchen degreasing</li><li>Pre-festival or special family events</li></ul>',
  '/images/villa-cleaning.jpg',
  'published',
  'Guides',
  ARRAY['Cleaning Tips', 'Professional Cleaning', 'Hyderabad'],
  now()
)
ON CONFLICT (slug) DO UPDATE SET 
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  cover_image_url = EXCLUDED.cover_image_url,
  status = EXCLUDED.status,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  published_at = EXCLUDED.published_at;
