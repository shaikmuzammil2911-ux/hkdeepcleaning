export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  image: string;
  tag: string;
  features: string[];
  whatWeClean: {
    title: string;
    items: string[];
  }[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  whyChooseThis: string[];
  suitableFor: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "1",
    slug: "home-deep-cleaning",
    title: "Home Deep Cleaning",
    shortDescription: "Complete deep cleaning for homes, including floors, walls, kitchens, bathrooms, bedrooms, living areas, and hard-to-reach places. We focus on removing dust, dirt, stains, and accumulated grime.",
    fullDescription: "Our Home Deep Cleaning service in Hyderabad is an intensive, top-to-bottom sanitization and cleaning treatment designed for apartments, individual houses, and gated community residences. We tackle hidden grime behind furniture, scrub grout lines, degrease appliances, sanitize sanitaries, and bring back a fresh, sparkling ambiance to your entire living space.",
    iconName: "Home",
    image: "/images/hero-cleaner.jpg",
    tag: "Most Popular",
    features: [
      "Floor scrubbing & deep stain removal",
      "Cobweb removal & wall dusting",
      "Balcony, window grill & glass cleaning",
      "Door frames, switchboards & fan cleaning",
      "Bedroom, wardrobe exterior & mattress vacuuming",
      "Living area upholstery dusting & sanitization"
    ],
    whatWeClean: [
      {
        title: "Living Room & Bedrooms",
        items: [
          "Ceiling fans, chandeliers, and decorative lights cleaning",
          "Window panes, mesh, tracks, and grills wiping",
          "Dry vacuuming of sofas, mattresses, rugs, and curtains",
          "Doors, door frames, switchboards, and skirting wiping",
          "Wardrobes and cabinets external cleaning & dusting",
          "Thorough floor scrubbing, mopping, and buffing"
        ]
      },
      {
        title: "Kitchen & Utility Area",
        items: [
          "Gas stove, countertop, and sink descaling",
          "Exhaust fan and chimney exterior degreasing",
          "Tile backsplash scrubbing and stain removal",
          "Cabinets exterior wipe down and handle sanitization",
          "Floor scrubbing and grease removal"
        ]
      },
      {
        title: "Bathrooms & Balconies",
        items: [
          "Tiles, shower cubicle, and grout line scrubbing",
          "Taps, faucets, shower head, and chrome polishing",
          "Toilet bowl, seat, and washbasin sanitization",
          "Mirror and glass cleaning with streak-free solution",
          "Balcony floor washing and railing wiping"
        ]
      }
    ],
    process: [
      {
        step: 1,
        title: "Pre-Inspection & Area Preparation",
        description: "Our team assesses your home, identifies target areas, and prepares professional eco-friendly cleaning supplies."
      },
      {
        step: 2,
        title: "Dry Dusting & Industrial Vacuuming",
        description: "High-power vacuuming of ceilings, fans, corners, sofas, and mattresses to extract embedded dust mites and allergens."
      },
      {
        step: 3,
        title: "Deep Scrubbing & Stain Treatment",
        description: "Specialized non-abrasive cleaners applied to kitchen grease, bathroom hard water stains, and floor grime."
      },
      {
        step: 4,
        title: "Sanitization & Chrome Buffing",
        description: "Complete sanitization of high-touch zones, fixture polishing, and streak-free window cleaning."
      },
      {
        step: 5,
        title: "Final Walkthrough & Customer Sign-Off",
        description: "We inspect the entire home with you to ensure 100% satisfaction before packing up."
      }
    ],
    whyChooseThis: [
      "100% Verified and trained cleaning technicians",
      "Non-toxic, kid & pet-safe cleaning agents",
      "Commercial-grade vacuum cleaners & scrubbing tools",
      "Transparent pricing with no hidden charges"
    ],
    suitableFor: [
      "Festive & seasonal deep cleaning (Diwali, Eid, New Year)",
      "Pre-event / Post-party cleaning",
      "Quarterly or bi-annual house sanitization",
      "Homes needing an intensive refresh"
    ],
    faqs: [
      {
        question: "How long does a full home deep cleaning take in Hyderabad?",
        answer: "A standard 2BHK or 3BHK typically takes between 4 to 7 hours depending on the carpet area and current condition. Our team arrives with multiple trained cleaners to ensure fast, thorough completion."
      },
      {
        question: "Do I need to provide any cleaning tools or solutions?",
        answer: "No, Hari Krishna Deep Cleaning Services provides all industrial equipment, microfiber cloths, ladders, and eco-friendly cleaning agents. We only need access to water and electricity."
      },
      {
        question: "Is the cleaning safe for children and pets?",
        answer: "Yes, we prioritize non-corrosive, eco-friendly, and non-hazardous solutions that leave no harsh toxic residues."
      }
    ]
  },
  {
    id: "2",
    slug: "villa-deep-cleaning",
    title: "Villa Deep Cleaning",
    shortDescription: "Professional cleaning solutions for villas of all sizes. Our team cleans interiors, bathrooms, kitchens, floors, windows, and other areas to give your villa a fresh and hygienic look.",
    fullDescription: "Villas and duplex luxury residences in Hyderabad require specialized multi-person crews, high-reach equipment, and dedicated care for premium flooring like Italian marble and teak woodwork. Our Villa Deep Cleaning service delivers comprehensive rejuvenation for multi-story properties across Kavuri Hills, Jubilee Hills, Banjara Hills, Madhapur, and Gachibowli.",
    iconName: "Castle",
    image: "/images/villa-cleaning.jpg",
    tag: "Luxury Care",
    features: [
      "Multi-story deep vacuuming & sanitization",
      "High ceiling & double-height chandelier cleaning",
      "Italian marble & granite floor care",
      "Full terrace, staircase & balcony washing",
      "Multiple attached bathroom & modular kitchen detailing",
      "Glass facade, french window & sliding door cleaning"
    ],
    whatWeClean: [
      {
        title: "Duplex & Multi-Floor Living Spaces",
        items: [
          "Double-height ceiling corners, wall moldings, and arches",
          "Glass railings, wooden balustrades, and staircases",
          "Large format french doors, patio glass, and skylights",
          "Air conditioning vents, exhaust grilles, and switchboards",
          "Master bedrooms, guest suites, and family lounges"
        ]
      },
      {
        title: "Chef & Modular Kitchens + Utility",
        items: [
          "Island counters, heavy-duty chimneys, and burner hobs",
          "Deep degreasing of cabinetry, pantries, and spice racks",
          "Utility wash areas and drain descaling",
          "Appliance exteriors and under-counter spaces"
        ]
      },
      {
        title: "Outdoor & Extended Areas",
        items: [
          "Terraces, sit-outs, and private balconies",
          "Porch, parking area, and entryway pressure washing",
          "Garden furniture wiping and glass partition wash"
        ]
      }
    ],
    process: [
      {
        step: 1,
        title: "Villa Site Assessment",
        description: "We review square footage, specific high-reach requirements, marble finishes, and client focus areas."
      },
      {
        step: 2,
        title: "Systematic Multi-Level Deployment",
        description: "Our multi-member team is assigned across floors to conduct synchronized dry and wet cleaning."
      },
      {
        step: 3,
        title: "High-Reach & Glass Detailing",
        description: "Using extendable poles and safety gear to clean double-height windows, chandeliers, and high ledges."
      },
      {
        step: 4,
        title: "Precision Floor Buffing & Polishing",
        description: "Specialized marble and wooden floor scrubbing using PH-neutral restorative solutions."
      },
      {
        step: 5,
        title: "Supervisor Inspection",
        description: "Our supervisor conducts a room-by-room check with you to ensure unmatched finish."
      }
    ],
    whyChooseThis: [
      "Dedicated multi-technician squad led by an experienced supervisor",
      "Specialized care for high-end Italian marble, hardwood, and glass",
      "Extensive coverage including terraces, staircases, and balconies",
      "Flexible weekend and custom schedule booking"
    ],
    suitableFor: [
      "Independent luxury villas and duplex row houses",
      "Gated community villas in Hyderabad (e.g. Gachibowli, Madhapur, Manikonda)",
      "Pre-possession and annual festival overhaul"
    ],
    faqs: [
      {
        question: "How many cleaners are sent for a villa cleaning?",
        answer: "Depending on the villa size (3BHK, 4BHK, or 5BHK+ duplex), we dispatch a crew of 4 to 8 trained specialists."
      },
      {
        question: "Can you clean double-height ceiling windows and chandeliers?",
        answer: "Yes, our team is equipped with telescopic equipment, safety ladders, and specialized microfiber dusting wands."
      }
    ]
  },
  {
    id: "3",
    slug: "construction-cleaning",
    title: "Construction Cleaning",
    shortDescription: "Post-construction and post-renovation cleaning to remove construction dust, cement marks, paint stains, debris, and other residues before moving into your property.",
    fullDescription: "Renovation and new construction leave stubborn silica dust, paint splatters, adhesive residue, and cement film that regular sweeping cannot remove. Hari Krishna Deep Cleaning Services provides industrial-grade post-construction deep cleaning across Hyderabad to turn dusty sites into pristine, move-in ready properties.",
    iconName: "HardHat",
    image: "/images/construction-cleaning.jpg",
    tag: "Heavy Duty",
    features: [
      "Paint splatter & plaster residue scraping",
      "Silica & fine construction dust industrial HEPA extraction",
      "Cement film & grout haze removal from tiles",
      "Protective film peeling from windows, doors & cabinets",
      "Complete bathroom acid-free descaling & fixture restoration",
      "Move-in ready sanitary & floor buffing"
    ],
    whatWeClean: [
      {
        title: "Walls, Glass & Joinery",
        items: [
          "Removing masking tape, stickers, and protective wraps",
          "Scraping paint overspray from glass panes and aluminum frames",
          "Wiping interior cupboards and wardrobes free of sawdust",
          "Cleaning door tracks, threshold grooves, and hinges"
        ]
      },
      {
        title: "Flooring & Grouting",
        items: [
          "Mechanical rotary floor scrubbing to remove cement residue",
          "Grout haze cleanup without damaging tile glaze",
          "Skirting board and edge detailing"
        ]
      },
      {
        title: "Wet Areas & Sanity",
        items: [
          "Tile chemical cleaning for grout dust and water marks",
          "Polishing sanitaryware, faucets, and drain gratings",
          "Clearing dust from exhaust ports and light fittings"
        ]
      }
    ],
    process: [
      {
        step: 1,
        title: "Debris & Coarse Dust Removal",
        description: "Dry clearing of leftover construction packaging, tape, and surface debris."
      },
      {
        step: 2,
        title: "High-Power Vacuuming",
        description: "Industrial HEPA vacuuming from ceiling to floor to trap microscopic fine dust particles."
      },
      {
        step: 3,
        title: "Targeted Scraping & Chemical Softening",
        description: "Gentle non-scratch scraping of paint drips, silicone residue, and cement patches."
      },
      {
        step: 4,
        title: "Machine Floor Scrubbing",
        description: "Single-disc scrubber and wet extraction to wash and restore gleaming tile and marble surfaces."
      },
      {
        step: 5,
        title: "Detailed Sanitization",
        description: "Final micro-cleaning of every shelf, switch, glass, and corner."
      }
    ],
    whyChooseThis: [
      "Heavy-duty industrial extraction machinery and single-disc scrubbers",
      "Damage-free techniques for luxury vitrified tiles and delicate glass",
      "Swift turnaround to meet your handover and housewarming deadlines",
      "Available across newly built residential & commercial towers in Hyderabad"
    ],
    suitableFor: [
      "Newly constructed apartments and individual homes",
      "Freshly painted or renovated residences and offices",
      "Builders & interior designers seeking handover ready cleaning"
    ],
    faqs: [
      {
        question: "When should we schedule post-construction cleaning?",
        answer: "We recommend booking once all carpentry, painting, plumbing, and electrical works are 100% finished so dust is not re-introduced."
      },
      {
        question: "Will the scraping scratch my expensive tile or window glass?",
        answer: "No, our specialists use specialized safety scrapers and specific residue-softening solutions designed specifically for glass and polished vitrified tiles."
      }
    ]
  },
  {
    id: "4",
    slug: "office-commercial-cleaning",
    title: "Office & Commercial Cleaning",
    shortDescription: "Professional cleaning for offices, shops, commercial spaces, and workplaces. We help maintain a clean, organized, and hygienic environment for employees and customers.",
    fullDescription: "Create a stellar impression on clients and foster a healthy, productive workspace for your team. Hari Krishna Deep Cleaning Services provides specialized commercial and corporate deep cleaning for IT offices, co-working spaces, retail showrooms, clinics, and commercial complexes across Madhapur, Hitech City, Gachibowli, and Kavuri Hills.",
    iconName: "Building2",
    image: "/images/office-cleaning.jpg",
    tag: "Commercial",
    features: [
      "Workstation, monitor & keyboard sanitization",
      "Conference room & reception area deep cleaning",
      "Carpet dry shampooing & vacuuming",
      "Commercial pantry & cafeteria degreasing",
      "Restroom intensive disinfection & restocking prep",
      "Glass partition & facade streak-free cleaning"
    ],
    whatWeClean: [
      {
        title: "Workstation & Conference Zones",
        items: [
          "Desk surfaces, chairs, dividers, and pedestal cabinets",
          "Dry vacuuming of fabric acoustic panels and chairs",
          "Glass partitions, display screens, and whiteboard cleaning",
          "Cable trays, server room perimeter, and AC vents"
        ]
      },
      {
        title: "Cafeteria & Pantry",
        items: [
          "Microwave, refrigerator exterior, water dispenser sanitization",
          "Pantry slab degreasing, sink scrubbing, and waste bin disinfection",
          "Floor degreasing and slip-resistant mopping"
        ]
      },
      {
        title: "Commercial Restrooms & Common Areas",
        items: [
          "High-traffic urinal and WC descaling and sanitization",
          "Hand wash vanity and mirror streak-free polishing",
          "Elevator lobby, reception desk, and glass door cleaning"
        ]
      }
    ],
    process: [
      {
        step: 1,
        title: "Workplace Schedule Alignment",
        description: "We work around your office timings (after-hours or weekends) to prevent any workflow disruption."
      },
      {
        step: 2,
        title: "High-Contact Disinfection",
        description: "Sanitizing door handles, biometrics, elevator buttons, and conference tables with hospital-grade sanitizers."
      },
      {
        step: 3,
        title: "Carpet & Floor Restoration",
        description: "Heavy extraction of carpet dirt and mechanical scrubbing of hard tile/epoxy floors."
      },
      {
        step: 4,
        title: "Pantry & Restroom Deep Sanitization",
        description: "Intensive descaling, deodorization, and germicidal washing."
      },
      {
        step: 5,
        title: "Facility Quality Verification",
        description: "Inspection conducted with your facility manager or admin team."
      }
    ],
    whyChooseThis: [
      "Flexible weekend and overnight after-hours service",
      "Commercial-grade equipment for large square footage",
      "GST-compliant invoicing and formal corporate support",
      "Serving tech hubs in Hitech City, Madhapur, and Gachibowli"
    ],
    suitableFor: [
      "IT / Corporate offices and startup workplaces",
      "Retail showrooms, banks, and boutique outlets",
      "Co-working spaces and educational institutes",
      "Pre-audit or post-renovation corporate overhauls"
    ],
    faqs: [
      {
        question: "Can deep cleaning be done over the weekend so office work isn't disturbed?",
        answer: "Yes, we regularly perform corporate deep cleaning on Saturdays, Sundays, and overnight shifts."
      },
      {
        question: "Do you offer recurring maintenance contracts?",
        answer: "We offer both one-time deep cleaning as well as scheduled monthly/quarterly deep sanitization packages."
      }
    ]
  },
  {
    id: "5",
    slug: "kitchen-deep-cleaning",
    title: "Kitchen Deep Cleaning",
    shortDescription: "Detailed cleaning of kitchen surfaces, cabinets, tiles, countertops, sinks, and other areas affected by grease, oil, stains, and dirt.",
    fullDescription: "Indian cooking with spices and oils creates tough, sticky grease deposits on chimneys, modular cabinets, and tile backsplashes over time. Our specialized Kitchen Deep Cleaning tackles stubborn grime, burnt oil build-ups, and hidden grease traps, leaving your cooking sanctuary hygienic, sparkling, and fresh.",
    iconName: "Utensils",
    image: "/images/kitchen-cleaning.jpg",
    tag: "High Demand",
    features: [
      "Chimney mesh & baffle filter degreasing",
      "Gas stove, burners & knob carbon removal",
      "Modular cabinet interior (optional) & exterior wipe down",
      "Tile backsplash oil & spice stain removal",
      "Granite / quartz countertop stain treatment",
      "Sink & drain pipe descaling & sanitization"
    ],
    whatWeClean: [
      {
        title: "Cooking Hub & Appliances",
        items: [
          "Gas stove burners, drip trays, and control knobs",
          "Chimney exterior hood, filters, and oil collectors",
          "Microwave and oven external surface wipe down",
          "Exhaust fan blades degreasing"
        ]
      },
      {
        title: "Surfaces & Storage",
        items: [
          "Overhead and under-counter cabinet exterior wipe down",
          "Wall tile scrubbing from top to bottom",
          "Countertop edge polishing and grout whitening",
          "Spice rack and pantry shelf external cleaning"
        ]
      },
      {
        title: "Washing & Waste Zones",
        items: [
          "Stainless steel / composite sink descaling and tap buffing",
          "Trash can sanitization and deodorization",
          "Kitchen floor scrubbing and oil film removal"
        ]
      }
    ],
    process: [
      {
        step: 1,
        title: "Degreaser Application",
        description: "Applying heavy-duty, food-safe degreasing formulation to soften baked-on oil and turmeric stains."
      },
      {
        step: 2,
        title: "Chimney Filter & Burner Soaking",
        description: "Soaking and scrubbing metal filters to unclog airflow and restore suction efficiency."
      },
      {
        step: 3,
        title: "Tile & Countertop Steam/Scrub",
        description: "Scrubbing grout lines, tile backsplashes, and granite surfaces with non-abrasive pads."
      },
      {
        step: 4,
        title: "Cabinet & Fixture Polishing",
        description: "Wiping cabinet laminate, polishing chrome faucets, and sanitizing sink basins."
      },
      {
        step: 5,
        title: "Floor Mopping & Deodorization",
        description: "Washing the floor with antimicrobial degreaser for a non-greasy, squeaky-clean finish."
      }
    ],
    whyChooseThis: [
      "Food-safe, non-toxic degreasing formulas",
      "Specialized chimney and burner restoration",
      "Safe on expensive modular laminates, acrylic, and quartz",
      "Eliminates bad odors, bacteria, and pests"
    ],
    suitableFor: [
      "Regular home kitchens with oil and masala buildup",
      "Pre-festival kitchen overhaul",
      "Rental move-in / move-out handover",
      "Cloud kitchens and small restaurant pantries"
    ],
    faqs: [
      {
        question: "Do you clean inside the kitchen cabinets?",
        answer: "We clean all cabinet exteriors thoroughly. If you would like inside cabinet cleaning, simply empty the utensils beforehand and our team will vacuum and sanitize inside shelves as well."
      },
      {
        question: "Will the cleaning chemicals damage acrylic or PU modular finishes?",
        answer: "No, we use pH-balanced specialized formulations tailored for delicate acrylic, laminate, and solid wood finishes."
      }
    ]
  },
  {
    id: "6",
    slug: "bathroom-deep-cleaning",
    title: "Bathroom Deep Cleaning",
    shortDescription: "Thorough bathroom cleaning to remove stains, soap deposits, dirt, and buildup from floors, tiles, walls, wash basins, and other surfaces.",
    fullDescription: "Hard water minerals in Hyderabad often cause unsightly white scale, yellow stains, and slippery soap scum on shower glass, faucets, and tile grout. Hari Krishna Deep Cleaning Services restores your bathrooms to showroom condition with professional descaling, mold elimination, and 99.9% germicidal sanitization.",
    iconName: "Bath",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85",
    tag: "Essential",
    features: [
      "Hard water scale removal from shower glass & tiles",
      "Chrome tap, shower head & mixer descaling & buffing",
      "Toilet bowl, rim & flush tank intensive sanitization",
      "Washbasin & vanity mirror streak-free cleaning",
      "Grout line bleaching & mildew stain scrubbing",
      "Exhaust fan, geyser exterior & drain clearing"
    ],
    whatWeClean: [
      {
        title: "Sanitary Fixtures",
        items: [
          "Commode internal rim, seat cover, and exterior sanitization",
          "Wash basin, drain pop-up, and overflow descaling",
          "Bathtub and jacuzzi thorough scrubbing"
        ]
      },
      {
        title: "Shower & Glass",
        items: [
          "Shower partition hard water watermark removal",
          "Shower head nozzle unclogging and chrome buffing",
          "Overhead geyser exterior and pipe wiping"
        ]
      },
      {
        title: "Walls, Floor & Ventilation",
        items: [
          "Wall tiles scrubbed from ceiling to base",
          "Floor tile deep scrubbing and grout restoration",
          "Exhaust fan and ventilation louver cleaning"
        ]
      }
    ],
    process: [
      {
        step: 1,
        title: "Scale Softening",
        description: "Applying targeted acid-free descaling agents on hard water deposits and soap scum."
      },
      {
        step: 2,
        title: "Tile & Grout Deep Scrubbing",
        description: "Intensive mechanical brushing to lift soap residues and fungal buildup."
      },
      {
        step: 3,
        title: "Glass Restoration",
        description: "Specialized glass polishing solution to dissolve stubborn calcium watermarks."
      },
      {
        step: 4,
        title: "Fixture Buffing",
        description: "Hand-polishing CP fittings, health faucets, and taps to a gleaming chrome shine."
      },
      {
        step: 5,
        title: "Anti-Bacterial Rinse & Dry",
        description: "Final antimicrobial rinse, wiping surfaces dry, and pleasant natural deodorization."
      }
    ],
    whyChooseThis: [
      "Effective removal of tough Hyderabad hard water scaling",
      "Safe on chrome, stainless steel, and marble vanity tops",
      "Eliminates 99.9% of bacteria, mold, and mildew",
      "High attention to hard-to-reach corners and drains"
    ],
    suitableFor: [
      "Bathrooms with accumulated limescale and dull fixtures",
      "Homes preparing for guests or new tenants",
      "Quarterly hygiene maintenance"
    ],
    faqs: [
      {
        question: "Can you remove yellow hard water stains from tiles and taps?",
        answer: "Yes! Our specialized descaling agents are formulated specifically to dissolve calcium and hard water minerals without damaging tile glaze or chrome plating."
      },
      {
        question: "How long does it take to clean one bathroom?",
        answer: "A standard master bathroom takes approximately 60 to 90 minutes for a complete deep cleaning."
      }
    ]
  },
  {
    id: "7",
    slug: "floor-cleaning",
    title: "Floor Cleaning & Polishing",
    shortDescription: "Professional floor cleaning for homes, villas, offices, and commercial properties. Our cleaning process helps remove dirt, dust, stains, and accumulated grime.",
    fullDescription: "Floors endure daily foot traffic, spills, dust, and grime that dull their natural luster. Our mechanized Floor Cleaning and scrubbing service uses single-disc rotary scrubbers, specialized floor pads, and pH-neutral restorative detergents to strip deep-seated grime and revive marble, granite, vitrified tile, and wooden flooring.",
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1200&q=85",
    tag: "Machine Scrub",
    features: [
      "Single-disc mechanical rotary machine scrubbing",
      "Deep grout line grime extraction",
      "Stubborn scuff, paint & adhesive mark removal",
      "Marble & vitrified tile luster restoration",
      "High-suction wet slurry extraction",
      "Skirting and corner hand-detailing"
    ],
    whatWeClean: [
      {
        title: "Floor Types Covered",
        items: [
          "Italian Marble, Indian Marble & Kota Stone",
          "Glazed & Matte Vitrified Tiles",
          "Granite, Terrazzo & Mosaic Floors",
          "Hardwood, Engineered Wood & Laminate",
          "Epoxy, Industrial & Parking Floors"
        ]
      },
      {
        title: "Detailed Areas",
        items: [
          "Living room, dining hall, and corridor expanses",
          "Under movable furniture and along wall skirtings",
          "Balconies, sit-outs, and entrance foyers"
        ]
      }
    ],
    process: [
      {
        step: 1,
        title: "Floor Type Identification",
        description: "Selecting the exact pad hardness and chemical compound appropriate for your specific flooring material."
      },
      {
        step: 2,
        title: "Dry Debris Vacuuming",
        description: "Clearing loose grit and sand to avoid any abrasive scratches during machine scrubbing."
      },
      {
        step: 3,
        title: "Rotary Machine Scrubbing",
        description: "Heavy single-disc machine rotates at optimal RPM with cleaning solution to dislodge embedded grime."
      },
      {
        step: 4,
        title: "Industrial Wet Extraction",
        description: "High-suction wet vacuum extracts the dirty slurry instantly, preventing re-absorption into porous stone."
      },
      {
        step: 5,
        title: "Microfiber Neutralizing & Buffing",
        description: "Clean water neutralization mop followed by dry buffing for a streak-free, brilliant finish."
      }
    ],
    whyChooseThis: [
      "Heavy commercial single-disc rotary scrubbers",
      "Zero surface damage to delicate natural stones",
      "Fast drying turnaround so rooms are usable immediately",
      "Suitable for large residential halls, villas, and commercial floors"
    ],
    suitableFor: [
      "Homes with discolored tile grout lines",
      "Marble and granite floors that have lost their shine",
      "Commercial office floors, banquet halls, and retail stores",
      "Post-renovation or pre-festival floor overhaul"
    ],
    faqs: [
      {
        question: "Does machine scrubbing damage tiles or marble?",
        answer: "No. We match the specific pad color (white, red, or green) and pH-neutral detergent to your floor type to ensure zero damage and maximum cleaning power."
      },
      {
        question: "How long after floor scrubbing can we walk on the floor?",
        answer: "Because we use industrial wet vacuums and dry buffing, floors are dry and safe to walk on within 15 to 30 minutes."
      }
    ]
  },
  {
    id: "8",
    slug: "move-in-move-out-cleaning",
    title: "Move-In / Move-Out Cleaning",
    shortDescription: "Complete property cleaning before moving into a new home or after moving out. Ideal for tenants, homeowners, landlords, and newly purchased properties.",
    fullDescription: "Relocating is stressful enough without having to worry about cleaning up. Whether you are a tenant looking to secure your full security deposit refund or a homeowner moving into a fresh dream residence, Hari Krishna Deep Cleaning Services provides seamless, comprehensive handover sanitization across Hyderabad.",
    iconName: "Truck",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    tag: "Hassle Free",
    features: [
      "Empty property end-to-end sanitization",
      "Inside-out wardrobe, cabinet & shelf cleaning",
      "Full kitchen & bathroom deep sanitization",
      "Window, balcony & grill washing",
      "Light fixture, fan & switchboard detailing",
      "Deposit-back guarantee standards for tenants"
    ],
    whatWeClean: [
      {
        title: "Storage & Joinery",
        items: [
          "Inside and outside of all bedroom wardrobes and drawers",
          "Pantry cabinets, modular kitchen drawers, and utility shelves",
          "Shoe racks, TV consoles, and vanity drawers"
        ]
      },
      {
        title: "All Rooms & Passages",
        items: [
          "Cobweb removal and high wall dusting",
          "Ceiling fans, exhaust fans, and decorative lights",
          "Window panes, mosquito mesh, and sliding tracks",
          "Main entrance door polishing and balcony floor washing"
        ]
      },
      {
        title: "Sanitary & Wet Zones",
        items: [
          "Complete bathroom tile descaling and commode disinfection",
          "Kitchen degreasing, sink scrubbing, and drain sanitization",
          "Washing machine area and dry balcony cleanup"
        ]
      }
    ],
    process: [
      {
        step: 1,
        title: "Empty Property Walkthrough",
        description: "Checking all rooms, open cabinets, and high-priority zones with you or your property manager."
      },
      {
        step: 2,
        title: "Top-to-Bottom Dusting & Vacuuming",
        description: "Clearing spiderwebs, dust behind doors, internal cabinet shelves, and window channels."
      },
      {
        step: 3,
        title: "Intensive Kitchen & Bath Scrub",
        description: "Descaling hard water from bathrooms and eliminating grease residues from the kitchen."
      },
      {
        step: 4,
        title: "Floor Scrubbing & Mopping",
        description: "Deep scrubbing all rooms, removing tape marks, and leaving gleaming dry floors."
      },
      {
        step: 5,
        title: "Key Handover Ready",
        description: "Property is left sparkling clean, sanitized, and ready for the new family or landlord inspection."
      }
    ],
    whyChooseThis: [
      "Specialized in tenant security deposit requirements",
      "Complete coverage including inside all empty wardrobes & kitchen cabinets",
      "Reliable same-day and scheduled booking availability",
      "Covers all Hyderabad residential hubs"
    ],
    suitableFor: [
      "Tenants vacating rented flats & villas",
      "Landlords preparing properties for new tenants",
      "Families moving into newly purchased or rented residences",
      "Real estate property managers & NRI homeowners"
    ],
    faqs: [
      {
        question: "Should the house be completely empty before this service?",
        answer: "Yes, Move-In / Move-Out cleaning is most efficient when furniture and personal belongings are cleared, allowing us to clean inside all cabinets, wardrobes, and corners."
      },
      {
        question: "Can you provide cleaning receipt for rental deposit submission?",
        answer: "Yes, we provide digital service invoices that you can share with your landlord or society management."
      }
    ]
  }
];
