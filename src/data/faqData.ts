export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const faqData: FaqItem[] = [
  {
    id: "faq-1",
    question: "What areas do you provide cleaning services in?",
    answer: "We provide cleaning services across Hyderabad, with a strong focus in Kavuri Hills, Madhapur, Gafoornagar, Jubilee Hills, Banjara Hills, Hitech City, Gachibowli, Kondapur, Manikonda, and nearby Hyderabad areas."
  },
  {
    id: "faq-2",
    question: "What cleaning services do you offer?",
    answer: "We offer 8+ specialized professional cleaning services: Home Deep Cleaning, Villa Deep Cleaning, Construction Cleaning, Office & Commercial Cleaning, Kitchen Deep Cleaning, Bathroom Deep Cleaning, Floor Cleaning & Polishing, and Move-In / Move-Out Cleaning."
  },
  {
    id: "faq-3",
    question: "Do you provide home deep cleaning?",
    answer: "Yes, our Home Deep Cleaning covers complete top-to-bottom sanitization of floors, walls, ceiling fans, kitchens, bathrooms, bedrooms, windows, balconies, and hard-to-reach areas."
  },
  {
    id: "faq-4",
    question: "Do you provide villa cleaning?",
    answer: "Yes, we specialize in multi-story villas and duplex homes, providing dedicated multi-member cleaning teams equipped with high-reach equipment, marble floor buffers, and glass cleaning tools."
  },
  {
    id: "faq-5",
    question: "Do you provide post-construction cleaning?",
    answer: "Yes, we provide heavy-duty post-construction and post-renovation cleaning to thoroughly remove fine silica dust, paint marks, cement stains, plaster splatters, and adhesive residues before you move in."
  },
  {
    id: "faq-6",
    question: "Can I book a service through WhatsApp?",
    answer: "Yes! You can instantly connect with us on WhatsApp at +91 95738 97750. You can share your property details, photos, or preferred time slot for quick confirmation."
  },
  {
    id: "faq-7",
    question: "How can I contact Hari Krishna Deep Cleaning Services?",
    answer: "You can reach us by phone at +91 95738 97750, by WhatsApp at +91 95738 97750, by email at harikrishnadeepcleaningservice@gmail.com, or visit us at 1-16, 2, Kavuri Hills Rd, Sri Rama Colony, Kavuri Hills, Gafoornagar, Hyderabad – 500081."
  },
  {
    id: "faq-8",
    question: "Do you provide office and commercial cleaning?",
    answer: "Yes, we provide corporate cleaning services for IT offices, tech workplaces, co-working spaces, retail shops, and commercial premises across Hyderabad, including flexible weekend and after-hours shifts."
  },
  {
    id: "faq-9",
    question: "Are your cleaning chemicals safe for kids and pets?",
    answer: "Yes, we prioritize eco-friendly, non-hazardous, and non-corrosive cleaning agents that clean effectively while maintaining safe indoor air quality for your family and pets."
  },
  {
    id: "faq-10",
    question: "What is your booking lead time?",
    answer: "We recommend booking 24 to 48 hours in advance to guarantee your preferred time slot, although same-day emergency slots may be available depending on schedule."
  }
];
