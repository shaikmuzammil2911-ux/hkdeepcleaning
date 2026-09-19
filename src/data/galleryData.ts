export interface GalleryItem {
  id: string;
  category: "Kitchen" | "Bathroom" | "Floor" | "Home";
  title: string;
  location: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

export const galleryData: GalleryItem[] = [
  {
    id: "g1",
    category: "Kitchen",
    title: "Kitchen Deep Cleaning & Chimney Degreasing",
    location: "Kavuri Hills, Madhapur",
    beforeImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    afterImage: "/images/kitchen-cleaning.jpg",
    description: "Removed heavy accumulated cooking oil, grease behind gas stove, and restored stainless steel chimney mesh."
  },
  {
    id: "g2",
    category: "Bathroom",
    title: "Hard Water Descaling & Chrome Restoration",
    location: "Jubilee Hills, Hyderabad",
    beforeImage: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    description: "Dissolved severe calcium watermark crust on glass partitions and scrubbed bathroom floor grout lines."
  },
  {
    id: "g3",
    category: "Floor",
    title: "Marble Machine Scrubbing & Grime Removal",
    location: "Gachibowli, Hyderabad",
    beforeImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80",
    description: "Single-disc rotary scrubbing removed years of embedded black dirt in grout lines, bringing back bright floor luster."
  },
  {
    id: "g4",
    category: "Home",
    title: "Full Living Room & Villa Deep Cleaning",
    location: "Banjara Hills, Hyderabad",
    beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    afterImage: "/images/hero-cleaner.jpg",
    description: "Complete living room makeover with ceiling fan detailing, sofa dry vacuuming, and streak-free balcony glass."
  },
  {
    id: "g5",
    category: "Kitchen",
    title: "Modular Cabinet & Granite Countertop Refresh",
    location: "Hitech City, Hyderabad",
    beforeImage: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    description: "Restored dull granite countertop and removed sticky grease film from overhead wooden cabinets."
  },
  {
    id: "g6",
    category: "Home",
    title: "Post-Construction Dust Extraction & Handover",
    location: "Kondapur, Hyderabad",
    beforeImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    afterImage: "/images/construction-cleaning.jpg",
    description: "Scraped paint drops from aluminum sliders and extracted fine silica cement dust across a 3BHK flat."
  }
];
