// // types.ts

// export interface Vehicle {
//   make: string;
//   model: string;
//   year: string;
//   color: string;
//   length?: string; // Add this line
// }

// export interface Utilities {
//   hasWater: boolean;
//   hasElectricity: boolean;
//   hasCoveredArea: boolean;
// }

// export interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   service: string;
//   servicePackage: string;
//   additionalServices: string[];
//   date: string | null;
//   time: string;
//   vehicleType: string;
//   vehicle: Vehicle;
//   // address: string;
//   address: {
//     street: string;
//     city: string;
//     state: string;
//     zipCode: string;
//   };
//   notes: string;
//   utilities: Utilities;
//   issues: string[];
// }

// export interface ServicePackage {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   pricingType: "fixed" | "perFoot";
//   includes: string[];
//   vehicleTypes?: string[];
// }

// export interface AdditionalService {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
// }

// export interface ServiceType {
//   id: string;
//   name: string;
//   vehicleTypes: string[];
//   packages: ServicePackage[];
//   additionalServices: AdditionalService[];
// }

// export interface VehicleType {
//   id: string;
//   name: string;
//   icon?: string;
// }

// // Promo Code Interface
// export interface PromoCode {
//   code: string;
//   discount: number;
// }

// export interface BookingData {
//   formData: FormData;
//   serviceTypes: ServiceType[];
//   vehicleTypes: VehicleType[];
//   timeSlots: string[];
//   promoCodes?: PromoCode[]; // Optional field for promo codes
// }


// export interface MainService {
//     id: string;
//     name: string;
//     description: string;
//     packages: ServicePackage[];
// }

// export interface ServiceVariant {
//     id: string;
//     name: string;
//     vehicleTypes: string[];
//     packages: ServicePackage[];
//     additionalServices: AdditionalService[];
// }

// types.ts

export interface Vehicle {
  make: string;
  model: string;
  year: string;
  color: string;
  length?: string;
}

export interface Utilities {
  hasWater: boolean;
  hasElectricity: boolean;
  hasCoveredArea: boolean;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  servicePackage: string;
  additionalServices: string[];
  date: string | null;
  time: string;
  vehicleType: string;
  vehicle: Vehicle;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  notes: string;
  utilities: Utilities;
  issues: string[];
}

export interface ServicePackage {
  id: string;
  name: string;
  price: number | string; // Updated to accept both number and string
  description: string;
  pricingType: "fixed" | "perFoot";
  includes: string[];
  vehicleTypes?: string[];
}

export interface AdditionalService {
  id: string;
  name: string;
  price: number | string; // Updated to accept both number and string
  description: string;
}

export interface ServiceType {
  id: string;
  name: string;
  vehicleTypes: string[];
  packages?: ServicePackage[];
  // additionalServices: AdditionalService[];
    additionalServices?: AdditionalService[]; // Optional bana dein
  variants?: ServiceVariant[]; // Added variants for car detailing
}

export interface VehicleType {
  id: string;
  name: string;
  icon?: string;
}

// Promo Code Interface
export interface PromoCode {
  code: string;
  discount: number;
}

export interface BookingData {
  formData: FormData;
  serviceTypes: ServiceType[];
  vehicleTypes: VehicleType[];
  timeSlots: string[];
  promoCodes?: PromoCode[];
}

export interface MainService {
  id: string;
  name: string;
  description: string;
  packages: ServicePackage[];
}

export interface ServiceVariant {
  id: string;
  name: string;
  vehicleTypes: string[];
  packages: ServicePackage[];
  additionalServices: AdditionalService[];
}

// New interfaces for the updated booking form
export interface BookingSubmission {
  bookingId: string;
  formData: FormData;
  totalPrice: number;
  discountedPrice: number;
  discountApplied: boolean;
  discountPercent: number;
  promoCode: string | null;
  submittedAt: string;
  selectedMainService: MainService | null;
  selectedServiceType: ServiceType | null;
  selectedVariant: ServiceVariant | null;
}

// Interface for email sending
export interface EmailData {
  customerEmail: string;
  customerName: string;
  service: string;
  servicePackage: string;
  totalPrice: number;
  vehicleType: string;
  vehicle: Vehicle;
  date: string | null;
  time: string;
  promoCode: string | null;
  discount: number;
}

// Interface for order summary props
export interface OrderSummaryProps {
  formData: FormData;
  totalPrice: number;
  discountedPrice: number;
  isPromoValid: boolean;
  discountPercent: number;
  selectedServiceType?: ServiceType;
  selectedVariant?: ServiceVariant;
  selectedMainService?: MainService;
  bookingId?: string;
}

// Interface for confirmation modal props
export interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  formData: FormData;
  total: number;
  bookingId: string;
}

// Interface for progress bar props
export interface ProgressBarProps {
  currentStep: number;
}

// Interface for city-state mapping
export interface CityStateMapping {
  [city: string]: string;
}




