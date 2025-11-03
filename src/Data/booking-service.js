/* ---------------------- MAIN SERVICE TYPES ---------------------- */
export const serviceTypes = [
  {
    id: "car",
    name: "Car",
    // top-level vehicleTypes that map to this service; variants give per-vehicle pricing
    vehicleTypes: ["car", "sedan", "suv", "truck", "van"],
    // variants allow separate packages & additionalServices for Sedan / SUV / Truck / Van
    variants: [
      {
        id: "sedan",
        name: "Sedan",
        vehicleTypes: ["sedan"],
        packages: [
          {
            id: "sedan-basic-full",
            name: "Basic Full Package",
            price: 200,
            description: "Basic interior and exterior package for sedans",
            pricingType: "fixed",
            includes: ["Basic Interior Package", "Basic Exterior Package"]
          },
          {
            id: "sedan-premium-full",
            name: "Premium Full Package",
            price: 270,
            description: "Premium interior and exterior package for sedans",
            pricingType: "fixed",
            includes: ["Premium Interior Package", "Premium Exterior Package"]
          },
          {
            id: "sedan-basic-interior",
            name: "Basic Interior Only",
            price: 160,
            description: "Basic interior package only (sedan)",
            pricingType: "fixed",
            includes: ["Basic Interior Package"]
          },
          {
            id: "sedan-premium-interior",
            name: "Premium Interior Only",
            price: 200,
            description: "Premium interior package only (sedan)",
            pricingType: "fixed",
            includes: ["Premium Interior Package"]
          },
          {
            id: "sedan-basic-exterior",
            name: "Basic Exterior Only",
            price: 150,
            description: "Basic exterior package only (sedan)",
            pricingType: "fixed",
            includes: ["Basic Exterior Package"]
          },
          {
            id: "sedan-premium-exterior",
            name: "Premium Exterior Only",
            price: 180,
            description: "Premium exterior package only (sedan)",
            pricingType: "fixed",
            includes: ["Premium Exterior Package"]
          }
        ],
        additionalServices: [
          { id: "sedan-pet-hair", name: "Pet Hair Removal", price: 20, description: "Remove embedded pet hair (sedan)" },
          { id: "sedan-odor-elimination", name: "Odor Elimination", price: 30, description: "Neutralize odors (sedan)" },
          { id: "sedan-headlight-restoration", name: "Headlight Restoration", price: 40, description: "Restore headlights (sedan)" }
        ]
      },
      {
        id: "suv",
        name: "SUV",
        vehicleTypes: ["suv"],
        packages: [
          {
            id: "suv-basic-full",
            name: "Basic Full Package",
            price: 240,
            description: "Basic interior and exterior package for SUVs",
            pricingType: "fixed",
            includes: ["Basic Interior Package", "Basic Exterior Package"]
          },
          {
            id: "suv-premium-full",
            name: "Premium Full Package",
            price: 330,
            description: "Premium interior and exterior package for SUVs",
            pricingType: "fixed",
            includes: ["Premium Interior Package", "Premium Exterior Package"]
          },
          {
            id: "suv-basic-interior",
            name: "Basic Interior Only",
            price: 200,
            description: "Basic interior package only (SUV)",
            pricingType: "fixed",
            includes: ["Basic Interior Package"]
          },
          {
            id: "suv-premium-interior",
            name: "Premium Interior Only",
            price: 250,
            description: "Premium interior package only (SUV)",
            pricingType: "fixed",
            includes: ["Premium Interior Package"]
          },
          {
            id: "suv-basic-exterior",
            name: "Basic Exterior Only",
            price: 180,
            description: "Basic exterior package only (SUV)",
            pricingType: "fixed",
            includes: ["Basic Exterior Package"]
          },
          {
            id: "suv-premium-exterior",
            name: "Premium Exterior Only",
            price: 210,
            description: "Premium exterior package only (SUV)",
            pricingType: "fixed",
            includes: ["Premium Exterior Package"]
          }
        ],
        additionalServices: [
          { id: "suv-pet-hair", name: "Pet Hair Removal", price: 30, description: "Remove embedded pet hair (SUV)" },
          { id: "suv-odor-elimination", name: "Odor Elimination", price: 40, description: "Neutralize odors (SUV)" },
          { id: "suv-headlight-restoration", name: "Headlight Restoration", price: 50, description: "Restore headlights (SUV)" }
        ]
      },
      {
        id: "truck",
        name: "Truck",
        vehicleTypes: ["truck"],
        packages: [
          {
            id: "truck-basic-full",
            name: "Basic Full Package",
            price: 260,
            description: "Basic interior and exterior package for trucks",
            pricingType: "fixed",
            includes: ["Basic Interior Package", "Basic Exterior Package"]
          },
          {
            id: "truck-premium-full",
            name: "Premium Full Package",
            price: 350,
            description: "Premium interior and exterior package for trucks",
            pricingType: "fixed",
            includes: ["Premium Interior Package", "Premium Exterior Package"]
          },
          {
            id: "truck-basic-interior",
            name: "Basic Interior Only",
            price: 210,
            description: "Basic interior package only (truck)",
            pricingType: "fixed",
            includes: ["Basic Interior Package"]
          },
          {
            id: "truck-premium-interior",
            name: "Premium Interior Only",
            price: 260,
            description: "Premium interior package only (truck)",
            pricingType: "fixed",
            includes: ["Premium Interior Package"]
          },
          {
            id: "truck-basic-exterior",
            name: "Basic Exterior Only",
            price: 200,
            description: "Basic exterior package only (truck)",
            pricingType: "fixed",
            includes: ["Basic Exterior Package"]
          },
          {
            id: "truck-premium-exterior",
            name: "Premium Exterior Only",
            price: 240,
            description: "Premium exterior package only (truck)",
            pricingType: "fixed",
            includes: ["Premium Exterior Package"]
          }
        ],
        additionalServices: [
          { id: "truck-pet-hair", name: "Pet Hair Removal", price: 35, description: "Remove embedded pet hair (truck)" },
          { id: "truck-odor-elimination", name: "Odor Elimination", price: 45, description: "Neutralize odors (truck)" },
          { id: "truck-headlight-restoration", name: "Headlight Restoration", price: 55, description: "Restore headlights (truck)" }
        ]
      },
      {
        id: "van",
        name: "Van",
        vehicleTypes: ["van"],
        packages: [
          {
            id: "van-basic-full",
            name: "Basic Full Package",
            price: 230,
            description: "Basic interior and exterior package for vans",
            pricingType: "fixed",
            includes: ["Basic Interior Package", "Basic Exterior Package"]
          },
          {
            id: "van-premium-full",
            name: "Premium Full Package",
            price: 320,
            description: "Premium interior and exterior package for vans",
            pricingType: "fixed",
            includes: ["Premium Interior Package", "Premium Exterior Package"]
          },
          {
            id: "van-basic-interior",
            name: "Basic Interior Only",
            price: 190,
            description: "Basic interior package only (van)",
            pricingType: "fixed",
            includes: ["Basic Interior Package"]
          },
          {
            id: "van-premium-interior",
            name: "Premium Interior Only",
            price: 230,
            description: "Premium interior package only (van)",
            pricingType: "fixed",
            includes: ["Premium Interior Package"]
          },
          {
            id: "van-basic-exterior",
            name: "Basic Exterior Only",
            price: 170,
            description: "Basic exterior package only (van)",
            pricingType: "fixed",
            includes: ["Basic Exterior Package"]
          },
          {
            id: "van-premium-exterior",
            name: "Premium Exterior Only",
            price: 205,
            description: "Premium exterior package only (van)",
            pricingType: "fixed",
            includes: ["Premium Exterior Package"]
          }
        ],
        additionalServices: [
          { id: "van-pet-hair", name: "Pet Hair Removal", price: 28, description: "Remove embedded pet hair (van)" },
          { id: "van-odor-elimination", name: "Odor Elimination", price: 38, description: "Neutralize odors (van)" },
          { id: "van-headlight-restoration", name: "Headlight Restoration", price: 48, description: "Restore headlights (van)" }
        ]
      }
    ]
  },
  {
    id: "boat",
    name: "Boat",
    vehicleTypes: ["boat"],
    packages: [
      {
        id: "boat-full",
        name: "Full Boat Service",
        price: 35,
        description: "Complete boat interior and exterior detailing",
        pricingType: "perFoot",
        includes: ["Boat Interior Services", "Boat Exterior Services"]
      },
      {
        id: "boat-interior",
        name: "Boat Interior Only",
        price: 19,
        description: "Boat interior detailing only",
        pricingType: "perFoot",
        includes: ["Boat Interior Services"]
      },
      {
        id: "boat-exterior",
        name: "Boat Exterior Only",
        price: 23,
        description: "Boat exterior detailing only",
        pricingType: "perFoot",
        includes: ["Boat Exterior Services"]
      }
    ],
    additionalServices: [
      { id: "boat-uv-protection", name: "UV Protection Coating", price: 150, description: "Premium UV protection for marine environment" },
      { id: "boat-mildew-treatment", name: "Mildew Treatment", price: 75, description: "Anti-mildew treatment for marine conditions" }
    ]
  },
  {
    id: "jet-ski",
    name: "Jet Ski",
    vehicleTypes: ["jet-ski"],
    packages: [
      {
        id: "jet-ski-full",
        name: "Jet Ski Full Detailing",
        price: 35,
        description: "Complete jet ski detailing package (priced per foot)",
        pricingType: "perFoot", // changed to perFoot as requested
        includes: ["Jet Ski Exterior Services", "Jet Ski Interior/Functional Areas"]
      }
    ],
    additionalServices: [
      { id: "jet-ski-rust-protection", name: "Rust Protection", price: 60, description: "Anti-rust treatment for saltwater protection" }
    ]
  },
  {
    id: "rv",
    name: "RV",
    vehicleTypes: ["rv"],
    packages: [
      {
        id: "rv-full",
        name: "Full RV Service",
        price: 40,
        description: "Complete RV interior and exterior detailing",
        pricingType: "perFoot",
        includes: ["RV Interior Services", "RV Exterior Services"]
      },
      {
        id: "rv-interior",
        name: "RV Interior Only",
        price: 25,
        description: "RV interior detailing only",
        pricingType: "perFoot",
        includes: ["RV Interior Services"]
      },
      {
        id: "rv-exterior",
        name: "RV Exterior Only",
        price: 25,
        description: "RV exterior detailing only",
        pricingType: "perFoot",
        includes: ["RV Exterior Services"]
      }
    ],
    additionalServices: [
      { id: "rv-roof-treatment", name: "Roof Sealant Treatment", price: 120, description: "Professional roof sealing and protection" },
      { id: "rv-tank-cleaning", name: "Water Tank Cleaning", price: 80, description: "Fresh water tank cleaning and sanitization" }
    ]
  },
  {
    id: "motorcycle",
    name: "Motorcycle",
    vehicleTypes: ["motorcycle"],
    packages: [
      {
        id: "bike-full",
        name: "Full Bike Detailing",
        price: 170,
        description: "Complete motorcycle detailing package",
        pricingType: "fixed",
        includes: ["Bike Exterior Services", "Bike Detailing & Protection"]
      }
    ],
    additionalServices: [
      { id: "bike-chain-service", name: "Chain Service", price: 30, description: "Complete chain cleaning and lubrication" },
      { id: "bike-chrome-polish", name: "Chrome Polish", price: 45, description: "Premium chrome polishing and protection" }
    ]
  }
];

/* ---------------------- VEHICLE TYPES ---------------------- */
export const vehicleTypes = [
  { id: "car", name: "Car" },
  { id: "sedan", name: "Sedan" },
  { id: "suv", name: "SUV" },
  { id: "truck", name: "Truck" },
  { id: "van", name: "Van" },
  { id: "boat", name: "Boat" },
  { id: "jet-ski", name: "Jet Ski" },
  { id: "rv", name: "RV" },
  { id: "motorcycle", name: "Motorcycle" }
];

/* ---------------------- TIME SLOTS ---------------------- */
export const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

/* ---------------------- PROMO CODES ---------------------- */
export const promoCodes = [
  { code: "WELCOME15", discount: 15 },
  { code: "WASH10", discount: 15 },
  { code: "DETAIL15", discount: 15 },
  { code: "BOAT20", discount: 15 },
  { code: "SUMMER25", discount: 15 }
];


/* ---------------------- UPDATED MAIN SERVICES ---------------------- */
export const mainServices = [
  {
    id: "ceramic-coating",
    name: "Ceramic Coating",
    description: "Long-lasting paint protection with multiple warranty options",
    packages: [
      {
        id: "ceramic-1year",
        name: "1 Year Ceramic Coating",
        price: 379,
        description: "1-year warranty ceramic coating protection",
        pricingType: "fixed",
        includes: ["Surface Preparation", "1-Year Ceramic Application", "Basic Maintenance Guide"]
      },
      {
        id: "ceramic-5year",
        name: "5 Year Ceramic Coating", 
        price: 579,
        description: "5-year warranty ceramic coating protection",
        pricingType: "fixed",
        includes: ["Surface Preparation", "5-Year Ceramic Application", "Premium Maintenance Guide"]
      },
      {
        id: "ceramic-10year",
        name: "10 Year Ceramic Coating",
        price: 779,
        description: "10-year warranty ceramic coating protection",
        pricingType: "fixed",
        includes: ["Surface Preparation", "10-Year Ceramic Application", "Full Maintenance Kit"]
      },
      {
        id: "ceramic-with-correction",
        name: "Ceramic Coating with Paint Correction",
        price: 179,
        description: "Paint correction added to ceramic coating service",
        pricingType: "fixed",
        includes: ["Multi-stage Paint Correction", "Ceramic Coating Application", "Surface Perfection"]
      }
    ]
  },
  {
    id: "window-tinting",
    name: "Window Tinting",
    description: "Professional window tinting services",
    packages: [
      {
        id: "tint-side-windows",
        name: "Side Windows Tinting",
        price: 89,
        description: "Tinting for all side windows",
        pricingType: "fixed",
        includes: ["Side Windows Tinting", "Quality Tint Material", "Professional Installation"]
      },
      {
        id: "tint-rear-windshield",
        name: "Rear Windshield Tinting",
        price: 119,
        description: "Tinting for rear windshield",
        pricingType: "fixed",
        includes: ["Rear Windshield Tinting", "Quality Tint Material", "Professional Installation"]
      },
      {
        id: "tint-front-windshield",
        name: "Front Windshield Tinting",
        price: 200,
        description: "Tinting for front windshield",
        pricingType: "fixed",
        includes: ["Front Windshield Tinting", "Quality Tint Material", "Professional Installation"]
      },
      {
        id: "tint-brow",
        name: "Windshield Brow Tinting",
        price: 79,
        description: "Tinting for windshield brow",
        pricingType: "fixed",
        includes: ["Windshield Brow Tinting", "Quality Tint Material", "Professional Installation"]
      },
      {
        id: "tint-roof",
        name: "Roof Tinting",
        price: 99,
        description: "Tinting for roof glass",
        pricingType: "fixed",
        includes: ["Roof Glass Tinting", "Quality Tint Material", "Professional Installation"]
      }
    ]
  },
  {
    id: "paint-correction",
    name: "Paint Correction",
    description: "Multi-stage paint correction to remove swirls and imperfections",
    packages: [
      {
        id: "paint-correction-basic",
        name: "Basic Paint Correction",
        price: 180,
        description: "Single-stage paint correction",
        pricingType: "fixed",
        includes: ["Single-stage Correction", "Swirl Removal", "Basic Polish"]
      },
      {
        id: "paint-correction-premium",
        name: "Premium Paint Correction", 
        price: 280,
        description: "Multi-stage paint correction",
        pricingType: "fixed",
        includes: ["Multi-stage Correction", "Deep Scratch Removal", "Premium Polish"]
      }
    ]
  },
  {
    id: "mobile-detailing",
    name: "Mobile Detailing",
    description: "On-site detailing service with all detailing packages",
    packages: [
      // Sedan Packages
      {
        id: "mobile-sedan-basic-full",
        name: "Sedan Basic Full Package (Mobile)",
        price: 240, // Added mobile fee
        description: "Basic interior and exterior package for sedans - Mobile Service",
        pricingType: "fixed",
        includes: ["Basic Interior Package", "Basic Exterior Package", "Mobile Service Fee"]
      },
      {
        id: "mobile-sedan-premium-full",
        name: "Sedan Premium Full Package (Mobile)",
        price: 310, // Added mobile fee
        description: "Premium interior and exterior package for sedans - Mobile Service",
        pricingType: "fixed",
        includes: ["Premium Interior Package", "Premium Exterior Package", "Mobile Service Fee"]
      },
      {
        id: "mobile-sedan-basic-interior",
        name: "Sedan Basic Interior Only (Mobile)",
        price: 200, // Added mobile fee
        description: "Basic interior package only (sedan) - Mobile Service",
        pricingType: "fixed",
        includes: ["Basic Interior Package", "Mobile Service Fee"]
      },
      {
        id: "mobile-sedan-premium-interior",
        name: "Sedan Premium Interior Only (Mobile)",
        price: 240, // Added mobile fee
        description: "Premium interior package only (sedan) - Mobile Service",
        pricingType: "fixed",
        includes: ["Premium Interior Package", "Mobile Service Fee"]
      },
      {
        id: "mobile-sedan-basic-exterior",
        name: "Sedan Basic Exterior Only (Mobile)",
        price: 190, // Added mobile fee
        description: "Basic exterior package only (sedan) - Mobile Service",
        pricingType: "fixed",
        includes: ["Basic Exterior Package", "Mobile Service Fee"]
      },
      {
        id: "mobile-sedan-premium-exterior",
        name: "Sedan Premium Exterior Only (Mobile)",
        price: 220, // Added mobile fee
        description: "Premium exterior package only (sedan) - Mobile Service",
        pricingType: "fixed",
        includes: ["Premium Exterior Package", "Mobile Service Fee"]
      },
      // SUV Packages
      {
        id: "mobile-suv-basic-full",
        name: "SUV Basic Full Package (Mobile)",
        price: 280, // Added mobile fee
        description: "Basic interior and exterior package for SUVs - Mobile Service",
        pricingType: "fixed",
        includes: ["Basic Interior Package", "Basic Exterior Package", "Mobile Service Fee"]
      },
      {
        id: "mobile-suv-premium-full",
        name: "SUV Premium Full Package (Mobile)",
        price: 370, // Added mobile fee
        description: "Premium interior and exterior package for SUVs - Mobile Service",
        pricingType: "fixed",
        includes: ["Premium Interior Package", "Premium Exterior Package", "Mobile Service Fee"]
      },
      {
        id: "mobile-suv-basic-interior",
        name: "SUV Basic Interior Only (Mobile)",
        price: 240, // Added mobile fee
        description: "Basic interior package only (SUV) - Mobile Service",
        pricingType: "fixed",
        includes: ["Basic Interior Package", "Mobile Service Fee"]
      },
      {
        id: "mobile-suv-premium-interior",
        name: "SUV Premium Interior Only (Mobile)",
        price: 290, // Added mobile fee
        description: "Premium interior package only (SUV) - Mobile Service",
        pricingType: "fixed",
        includes: ["Premium Interior Package", "Mobile Service Fee"]
      },
      {
        id: "mobile-suv-basic-exterior",
        name: "SUV Basic Exterior Only (Mobile)",
        price: 220, // Added mobile fee
        description: "Basic exterior package only (SUV) - Mobile Service",
        pricingType: "fixed",
        includes: ["Basic Exterior Package", "Mobile Service Fee"]
      },
      {
        id: "mobile-suv-premium-exterior",
        name: "SUV Premium Exterior Only (Mobile)",
        price: 250, // Added mobile fee
        description: "Premium exterior package only (SUV) - Mobile Service",
        pricingType: "fixed",
        includes: ["Premium Exterior Package", "Mobile Service Fee"]
      },
      // Truck Packages
      {
        id: "mobile-truck-basic-full",
        name: "Truck Basic Full Package (Mobile)",
        price: 300, // Added mobile fee
        description: "Basic interior and exterior package for trucks - Mobile Service",
        pricingType: "fixed",
        includes: ["Basic Interior Package", "Basic Exterior Package", "Mobile Service Fee"]
      },
      {
        id: "mobile-truck-premium-full",
        name: "Truck Premium Full Package (Mobile)",
        price: 390, // Added mobile fee
        description: "Premium interior and exterior package for trucks - Mobile Service",
        pricingType: "fixed",
        includes: ["Premium Interior Package", "Premium Exterior Package", "Mobile Service Fee"]
      },
      {
        id: "mobile-truck-basic-interior",
        name: "Truck Basic Interior Only (Mobile)",
        price: 250, // Added mobile fee
        description: "Basic interior package only (truck) - Mobile Service",
        pricingType: "fixed",
        includes: ["Basic Interior Package", "Mobile Service Fee"]
      },
      {
        id: "mobile-truck-premium-interior",
        name: "Truck Premium Interior Only (Mobile)",
        price: 300, // Added mobile fee
        description: "Premium interior package only (truck) - Mobile Service",
        pricingType: "fixed",
        includes: ["Premium Interior Package", "Mobile Service Fee"]
      },
      {
        id: "mobile-truck-basic-exterior",
        name: "Truck Basic Exterior Only (Mobile)",
        price: 240, // Added mobile fee
        description: "Basic exterior package only (truck) - Mobile Service",
        pricingType: "fixed",
        includes: ["Basic Exterior Package", "Mobile Service Fee"]
      },
      {
        id: "mobile-truck-premium-exterior",
        name: "Truck Premium Exterior Only (Mobile)",
        price: 280, // Added mobile fee
        description: "Premium exterior package only (truck) - Mobile Service",
        pricingType: "fixed",
        includes: ["Premium Exterior Package", "Mobile Service Fee"]
      },
      // Van Packages
      {
        id: "mobile-van-basic-full",
        name: "Van Basic Full Package (Mobile)",
        price: 270, // Added mobile fee
        description: "Basic interior and exterior package for vans - Mobile Service",
        pricingType: "fixed",
        includes: ["Basic Interior Package", "Basic Exterior Package", "Mobile Service Fee"]
      },
      {
        id: "mobile-van-premium-full",
        name: "Van Premium Full Package (Mobile)",
        price: 360, // Added mobile fee
        description: "Premium interior and exterior package for vans - Mobile Service",
        pricingType: "fixed",
        includes: ["Premium Interior Package", "Premium Exterior Package", "Mobile Service Fee"]
      },
      {
        id: "mobile-van-basic-interior",
        name: "Van Basic Interior Only (Mobile)",
        price: 230, // Added mobile fee
        description: "Basic interior package only (van) - Mobile Service",
        pricingType: "fixed",
        includes: ["Basic Interior Package", "Mobile Service Fee"]
      },
      {
        id: "mobile-van-premium-interior",
        name: "Van Premium Interior Only (Mobile)",
        price: 270, // Added mobile fee
        description: "Premium interior package only (van) - Mobile Service",
        pricingType: "fixed",
        includes: ["Premium Interior Package", "Mobile Service Fee"]
      },
      {
        id: "mobile-van-basic-exterior",
        name: "Van Basic Exterior Only (Mobile)",
        price: 210, // Added mobile fee
        description: "Basic exterior package only (van) - Mobile Service",
        pricingType: "fixed",
        includes: ["Basic Exterior Package", "Mobile Service Fee"]
      },
      {
        id: "mobile-van-premium-exterior",
        name: "Van Premium Exterior Only (Mobile)",
        price: 245, // Added mobile fee
        description: "Premium exterior package only (van) - Mobile Service",
        pricingType: "fixed",
        includes: ["Premium Exterior Package", "Mobile Service Fee"]
      }
    ]
  }
];
