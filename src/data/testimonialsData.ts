export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  review: string;
  date: string;
  avatarUrl: string;
  verified: boolean;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "t1",
    name: "Priya Sharma",
    location: "Kavuri Hills, Hyderabad",
    service: "Home Deep Cleaning",
    rating: 5,
    review: "Excellent service! My home was absolutely clean. The team was professional, polite and on time. Highly recommend their deep cleaning.",
    date: "Recent Customer Feedback",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    verified: true
  },
  {
    id: "t2",
    name: "Rohit Mehta",
    location: "Madhapur, Hyderabad",
    service: "Office & Commercial Cleaning",
    rating: 5,
    review: "We used their office cleaning service and the results were amazing. Very reliable and professional team who took care of every desk and glass partition.",
    date: "Recent Customer Feedback",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    verified: true
  },
  {
    id: "t3",
    name: "Sneha Reddy",
    location: "Gachibowli, Hyderabad",
    service: "Villa Deep Cleaning",
    rating: 5,
    review: "The villa cleaning service was outstanding. Our home feels fresh and clean. Great attention to detail, especially on our marble floors and bathrooms!",
    date: "Recent Customer Feedback",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    verified: true
  },
  {
    id: "t4",
    name: "Venkatesh Rao",
    location: "Jubilee Hills, Hyderabad",
    service: "Construction Cleaning",
    rating: 5,
    review: "Booked them right after our house painting was finished. They removed every speck of paint splatter and cement residue from window tracks and floors.",
    date: "Recent Customer Feedback",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    verified: true
  },
  {
    id: "t5",
    name: "Ananya Deshmukh",
    location: "Banjara Hills, Hyderabad",
    service: "Kitchen Deep Cleaning",
    rating: 5,
    review: "Our kitchen chimney and tiles look brand new. They didn't leave any oily stains behind. Very polite staff and punctual service.",
    date: "Recent Customer Feedback",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    verified: true
  }
];
