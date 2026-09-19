export interface AreaItem {
  id: string;
  name: string;
  pincode: string;
  region: string;
  description: string;
  popularServices: string[];
}

export const serviceAreasData: AreaItem[] = [
  {
    id: "a1",
    name: "Kavuri Hills",
    pincode: "500081",
    region: "Madhapur Zone (Headquarters)",
    description: "Our primary local base providing fast on-demand home, office, and villa deep cleaning in Kavuri Hills.",
    popularServices: ["Home Deep Cleaning", "Villa Cleaning", "Bathroom Sanitization"]
  },
  {
    id: "a2",
    name: "Madhapur",
    pincode: "500081",
    region: "IT Corridor",
    description: "Serving high-rise apartments, tech parks, startups, and residential societies in Madhapur.",
    popularServices: ["Office Cleaning", "Home Deep Cleaning", "Move-In / Move-Out"]
  },
  {
    id: "a3",
    name: "Gafoornagar",
    pincode: "500081",
    region: "Kavuri Hills Area",
    description: "Local neighborhood coverage with fast deployment of our professional cleaning teams.",
    popularServices: ["Kitchen Deep Cleaning", "Floor Cleaning", "Home Cleaning"]
  },
  {
    id: "a4",
    name: "Jubilee Hills",
    pincode: "500033",
    region: "Central West Hyderabad",
    description: "Specialized luxury villa, duplex, boutique store, and studio deep cleaning services in Jubilee Hills.",
    popularServices: ["Villa Deep Cleaning", "Italian Marble Buffing", "Glass Facade Wash"]
  },
  {
    id: "a5",
    name: "Banjara Hills",
    pincode: "500034",
    region: "Central West Hyderabad",
    description: "Premium residential bungalows, corporate headquarters, and commercial establishments.",
    popularServices: ["Villa Cleaning", "Commercial Cleaning", "Full Deep Sanitization"]
  },
  {
    id: "a6",
    name: "Hitech City",
    pincode: "500081",
    region: "Cyberabad Tech Hub",
    description: "High-tech corporate workplaces, gated apartment communities, and executive suites.",
    popularServices: ["Commercial Office Cleaning", "Apartment Deep Cleaning", "Carpet & Chair Vacuuming"]
  },
  {
    id: "a7",
    name: "Gachibowli",
    pincode: "500032",
    region: "Financial District",
    description: "Comprehensive cleaning for large gated high-rises, IT hubs, and financial district offices.",
    popularServices: ["Home Deep Cleaning", "Office Sanitization", "Post-Construction"]
  },
  {
    id: "a8",
    name: "Kondapur",
    pincode: "500084",
    region: "North-West Corridor",
    description: "Rapidly expanding residential complexes, newly occupied flats, and local businesses.",
    popularServices: ["Construction Cleaning", "Move-In Cleaning", "Kitchen Degreasing"]
  },
  {
    id: "a9",
    name: "Manikonda",
    pincode: "500089",
    region: "Residential Hub",
    description: "Gated villas and multi-story apartment communities receiving professional cleaning.",
    popularServices: ["Home Deep Cleaning", "Bathroom Descaling", "Move-Out Cleaning"]
  },
  {
    id: "a10",
    name: "And nearby Hyderabad areas",
    pincode: "500001+",
    region: "Greater Hyderabad",
    description: "We cater to inquiries and service requests across major neighborhoods in Greater Hyderabad.",
    popularServices: ["All 8+ Professional Cleaning Services"]
  }
];
