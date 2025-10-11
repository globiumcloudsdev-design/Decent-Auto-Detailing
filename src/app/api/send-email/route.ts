// // app/api/send-booking-email/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

// //
// // ---------- TYPES ----------
// //

// // Package type
// interface Package {
//   id: string;
//   name: string;
// }

// // Variant type
// interface Variant {
//   id: string;
//   name: string;
//   packages: Package[];
// }

// // Service type
// interface Service {
//   id: string;
//   name: string;
//   packages?: Package[];
//   variants?: Variant[];
// }

// // Selected service (user ne jo choose kiya)
// interface SelectedService {
//   serviceType: string;
//   variant?: string;
//   package: string;
// }

// // Form data
// interface FormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   zip: string;
//   date: string;
//   timeSlot: string;
//   selectedServices: SelectedService[];
//   additionalServices: string[];
//   vehicleType: string;
//   vehicleYear: string;
//   vehicleMake: string;
//   vehicleModel: string;
//   vehicleColor: string;
//   vehicleLength?: string;
//   notes?: string;
// }

// // Booking data
// interface BookingData {
//   bookingId: string;
//   formData: FormData;
//   totalPrice: number;
//   discountedPrice: number;
//   discountApplied?: boolean;
//   discountPercent?: number;
//   promoCode?: string;
//   submittedAt: string;
// }

// //
// // ---------- NODEMAILER TRANSPORTER ----------
// //
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASSWORD,
//   },
// });

// //
// // ---------- HELPERS ----------
// //

// // Helper function to get service display names
// const getServiceDisplayNames = (bookingData: BookingData): string => {
//   return bookingData.formData.selectedServices.map((sel: SelectedService) => {
//     if (
//       sel.serviceType === 'ceramic-coating' ||
//       sel.serviceType === 'window-tinting' ||
//       sel.serviceType === 'paint-correction' ||
//       sel.serviceType === 'mobile-detailing'
//     ) {
//       // Main Services
//       const mainServices: Service[] = [
//         {
//           id: "ceramic-coating",
//           name: "Ceramic Coating",
//           packages: [
//             { id: "ceramic-1year", name: "1 Year Ceramic Coating" },
//             { id: "ceramic-5year", name: "5 Year Ceramic Coating" },
//             { id: "ceramic-10year", name: "10 Year Ceramic Coating" },
//             { id: "ceramic-with-correction", name: "Ceramic Coating with Paint Correction" }
//           ]
//         },
//         {
//           id: "window-tinting",
//           name: "Window Tinting",
//           packages: [
//             { id: "tint-side-windows", name: "Side Windows Tinting" },
//             { id: "tint-rear-windshield", name: "Rear Windshield Tinting" },
//             { id: "tint-front-windshield", name: "Front Windshield Tinting" },
//             { id: "tint-brow", name: "Windshield Brow Tinting" },
//             { id: "tint-roof", name: "Roof Tinting" }
//           ]
//         },
//         {
//           id: "paint-correction",
//           name: "Paint Correction",
//           packages: [
//             { id: "paint-correction-basic", name: "Basic Paint Correction" },
//             { id: "paint-correction-premium", name: "Premium Paint Correction" }
//           ]
//         },
//         {
//           id: "mobile-detailing",
//           name: "Mobile Detailing",
//           packages: [
//             { id: "mobile-service", name: "Mobile Detailing Service" }
//           ]
//         }
//       ];

//       const mainService = mainServices.find(ms => ms.id === sel.serviceType);
//       const pkg = mainService?.packages?.find(p => p.id === sel.package);
//       return `${mainService?.name} - ${pkg?.name}`;
//     } else {
//       // Regular Services
//       const serviceTypes: Service[] = [
//         {
//           id: "car",
//           name: "Car",
//           variants: [
//             {
//               id: "sedan",
//               name: "Sedan",
//               packages: [
//                 { id: "sedan-basic-full", name: "Basic Full Package" },
//                 { id: "sedan-premium-full", name: "Premium Full Package" },
//                 { id: "sedan-basic-interior", name: "Basic Interior Only" },
//                 { id: "sedan-premium-interior", name: "Premium Interior Only" },
//                 { id: "sedan-basic-exterior", name: "Basic Exterior Only" },
//                 { id: "sedan-premium-exterior", name: "Premium Exterior Only" }
//               ]
//             },
//             {
//               id: "suv",
//               name: "SUV",
//               packages: [
//                 { id: "suv-basic-full", name: "Basic Full Package" },
//                 { id: "suv-premium-full", name: "Premium Full Package" },
//                 { id: "suv-basic-interior", name: "Basic Interior Only" },
//                 { id: "suv-premium-interior", name: "Premium Interior Only" },
//                 { id: "suv-basic-exterior", name: "Basic Exterior Only" },
//                 { id: "suv-premium-exterior", name: "Premium Exterior Only" }
//               ]
//             },
//             {
//               id: "truck",
//               name: "Truck",
//               packages: [
//                 { id: "truck-basic-full", name: "Basic Full Package" },
//                 { id: "truck-premium-full", name: "Premium Full Package" },
//                 { id: "truck-basic-interior", name: "Basic Interior Only" },
//                 { id: "truck-premium-interior", name: "Premium Interior Only" },
//                 { id: "truck-basic-exterior", name: "Basic Exterior Only" },
//                 { id: "truck-premium-exterior", name: "Premium Exterior Only" }
//               ]
//             },
//             {
//               id: "van",
//               name: "Van",
//               packages: [
//                 { id: "van-basic-full", name: "Basic Full Package" },
//                 { id: "van-premium-full", name: "Premium Full Package" },
//                 { id: "van-basic-interior", name: "Basic Interior Only" },
//                 { id: "van-premium-interior", name: "Premium Interior Only" },
//                 { id: "van-basic-exterior", name: "Basic Exterior Only" },
//                 { id: "van-premium-exterior", name: "Premium Exterior Only" }
//               ]
//             }
//           ]
//         },
//         {
//           id: "boat",
//           name: "Boat",
//           packages: [
//             { id: "boat-full", name: "Full Boat Service" },
//             { id: "boat-interior", name: "Boat Interior Only" },
//             { id: "boat-exterior", name: "Boat Exterior Only" }
//           ]
//         },
//         {
//           id: "jet-ski",
//           name: "Jet Ski",
//           packages: [
//             { id: "jet-ski-full", name: "Jet Ski Full Detailing" }
//           ]
//         },
//         {
//           id: "rv",
//           name: "RV",
//           packages: [
//             { id: "rv-full", name: "Full RV Service" },
//             { id: "rv-interior", name: "RV Interior Only" },
//             { id: "rv-exterior", name: "RV Exterior Only" }
//           ]
//         },
//         {
//           id: "motorcycle",
//           name: "Motorcycle",
//           packages: [
//             { id: "bike-full", name: "Full Bike Detailing" }
//           ]
//         }
//       ];

//       const service = serviceTypes.find(s => s.id === sel.serviceType);
//       let packageName = "Unknown Package";

//       if (service?.variants && sel.variant) {
//         const variant = service.variants.find(v => v.id === sel.variant);
//         const pkg = variant?.packages.find(p => p.id === sel.package);
//         packageName = pkg?.name || packageName;
//       } else {
//         const pkg = service?.packages?.find(p => p.id === sel.package);
//         packageName = pkg?.name || packageName;
//       }

//       return `${service?.name} - ${packageName}`;
//     }
//   }).join(", ");
// };

// // Format date properly
// const formatDisplayDate = (dateString: string): string => {
//   if (!dateString) return "N/A";
//   try {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   } catch {
//     return "Invalid Date";
//   }
// };

// //
// // ---------- EMAIL TEMPLATES ----------
// //

// // Customer email template
// const createCustomerEmailHTML = (bookingData: BookingData): string => {
//   const serviceDisplay = getServiceDisplayNames(bookingData);
  
//   return `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <title>Booking Confirmation - Quality Auto Care</title>
//   <style>
//     body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
//     .header { background: linear-gradient(to right, #2563eb, #1e40af); padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
//     .content { border: 1px solid #ddd; border-top: none; padding: 20px; border-radius: 0 0 10px 10px; }
//     .section { background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 15px 0; }
//     .total-section { background-color: #d1fae5; padding: 15px; border-radius: 5px; margin: 15px 0; }
//     .discount { color: #059669; }
//     .service-item { margin: 8px 0; padding: 8px; background: white; border-radius: 4px; }
//   </style>
// </head>
// <body>
//   <div class="header">
//     <h1 style="color: white; margin: 0;">Quality Auto Care</h1>
//     <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Professional Auto Detailing Services</p>
//   </div>
  
//   <div class="content">
//     <h2 style="color: #2563eb;">Booking Confirmation 🎉</h2>
//     <p>Dear <strong>${bookingData.formData.firstName} ${bookingData.formData.lastName}</strong>,</p>
//     <p>Thank you for choosing Quality Auto Care! Your booking has been confirmed successfully.</p>
    
//     <div class="section">
//       <h3 style="margin-top: 0; color: #2563eb;">Appointment Details</h3>
//       <p><strong>Booking ID:</strong> ${bookingData.bookingId}</p>
//       <p><strong>Date:</strong> ${formatDisplayDate(bookingData.formData.date)}</p>
//       <p><strong>Time:</strong> ${bookingData.formData.timeSlot}</p>
//       <p><strong>Location:</strong> ${bookingData.formData.address}, ${bookingData.formData.city}, ${bookingData.formData.state} ${bookingData.formData.zip}</p>
//     </div>

//     <div class="section">
//       <h3 style="margin-top: 0; color: #2563eb;">Service Details</h3>
//       <div class="service-item">
//         <strong>Selected Service:</strong><br>
//         ${serviceDisplay}
//       </div>
//       ${bookingData.formData.additionalServices.length > 0 ? `
//         <div class="service-item">
//           <strong>Additional Services:</strong><br>
//           ${bookingData.formData.additionalServices.length} services selected
//         </div>
//       ` : ''}
//     </div>

//     <div class="section">
//       <h3 style="margin-top: 0; color: #2563eb;">Vehicle Information</h3>
//       <p><strong>Vehicle:</strong> ${bookingData.formData.vehicleYear} ${bookingData.formData.vehicleMake} ${bookingData.formData.vehicleModel}</p>
//       <p><strong>Color:</strong> ${bookingData.formData.vehicleColor}</p>
//       <p><strong>Type:</strong> ${bookingData.formData.vehicleType}</p>
//       ${bookingData.formData.vehicleLength ? 
//         `<p><strong>Length:</strong> ${bookingData.formData.vehicleLength} ft</p>` : ''}
//     </div>

//     <div class="total-section">
//       <h3 style="margin-top: 0; color: #059669;">Payment Summary</h3>
//       <p><strong>Total Amount:</strong> $${bookingData.discountedPrice.toFixed(2)}</p>
//       ${bookingData.discountApplied ? 
//         `<p class="discount"><strong>Discount Applied:</strong> ${bookingData.discountPercent}% off</p>
//          <p><strong>Original Price:</strong> <span style="text-decoration: line-through;">$${bookingData.totalPrice.toFixed(2)}</span></p>` : ''}
//       ${bookingData.promoCode ? 
//         `<p><strong>Promo Code:</strong> ${bookingData.promoCode}</p>` : ''}
//     </div>

//     <div style="margin-top: 25px; padding: 15px; background-color: #fffbeb; border-radius: 5px;">
//       <h4 style="margin-top: 0; color: #d97706;">Important Notes</h4>
//       <p>📍 <strong>Address:</strong> ${bookingData.formData.address}, ${bookingData.formData.city}, ${bookingData.formData.state} ${bookingData.formData.zip}</p>
//       <p>⏰ <strong>Please be ready</strong> 10 minutes before your scheduled time</p>
//       <p>🚗 <strong>Vehicle should be accessible</strong> at the appointment location</p>
//       ${bookingData.formData.notes ? 
//         `<p>📝 <strong>Your Notes:</strong> ${bookingData.formData.notes}</p>` : ''}
//     </div>
    
//     <p>If you need to reschedule or have any questions, please contact us at <strong>+1 (555) 123-4567</strong>.</p>
    
//     <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
//       <p>Best regards,<br><strong>Quality Auto Care Team</strong></p>
//     </div>
//   </div>
// </body>
// </html>
//   `;
// };

// // Company email template
// const createCompanyEmailHTML = (bookingData: BookingData): string => {
//   const serviceDisplay = getServiceDisplayNames(bookingData);
  
//   return `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <title>New Booking - Quality Auto Care</title>
//   <style>
//     body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; }
//     .header { background: linear-gradient(to right, #dc2626, #b91c1c); padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
//     .content { border: 1px solid #ddd; border-top: none; padding: 25px; border-radius: 0 0 10px 10px; }
//     .section { background-color: #fef2f2; padding: 15px; border-radius: 5px; margin: 15px 0; }
//     .service-section { background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 15px 0; }
//     .payment-section { background-color: #d1fae5; padding: 15px; border-radius: 5px; margin: 15px 0; }
//     .urgent { background-color: #fef3c7; padding: 10px; border-radius: 5px; margin: 10px 0; }
//     .service-detail { background: white; padding: 10px; margin: 5px 0; border-radius: 4px; border-left: 4px solid #2563eb; }
//   </style>
// </head>
// <body>
//   <div class="header">
//     <h1 style="color: white; margin: 0;">🚨 NEW BOOKING ALERT</h1>
//     <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Quality Auto Care - Booking System</p>
//   </div>
  
//   <div class="content">
//     <div class="urgent">
//       <h2 style="color: #d97706; margin: 0;">Action Required: New Booking Received</h2>
//       <p style="margin: 5px 0 0 0;"><strong>Booking ID:</strong> ${bookingData.bookingId}</p>
//     </div>

//     <div class="section">
//       <h3 style="margin-top: 0; color: #dc2626;">Customer Information</h3>
//       <p><strong>Name:</strong> ${bookingData.formData.firstName} ${bookingData.formData.lastName}</p>
//       <p><strong>Email:</strong> ${bookingData.formData.email}</p>
//       <p><strong>Phone:</strong> ${bookingData.formData.phone}</p>
//       <p><strong>Address:</strong> ${bookingData.formData.address}, ${bookingData.formData.city}, ${bookingData.formData.state} ${bookingData.formData.zip}</p>
//     </div>
    
//     <div class="service-section">
//       <h3 style="margin-top: 0; color: #2563eb;">Appointment Details</h3>
//       <p><strong>Date:</strong> ${formatDisplayDate(bookingData.formData.date)}</p>
//       <p><strong>Time:</strong> ${bookingData.formData.timeSlot}</p>
//     </div>

//     <div class="service-section">
//       <h3 style="margin-top: 0; color: #2563eb;">Service Details</h3>
      
//       <div class="service-detail">
//         <strong>Selected Service:</strong><br>
//         ${serviceDisplay}
//       </div>

//       ${bookingData.formData.additionalServices.length > 0 ? `
//         <div class="service-detail">
//           <strong>Additional Services (${bookingData.formData.additionalServices.length}):</strong><br>
//           Services IDs: ${bookingData.formData.additionalServices.join(', ')}
//         </div>
//       ` : ''}
//     </div>

//     <div class="service-section">
//       <h3 style="margin-top: 0; color: #2563eb;">Vehicle Information</h3>
//       <p><strong>Vehicle Type:</strong> ${bookingData.formData.vehicleType}</p>
//       <p><strong>Vehicle:</strong> ${bookingData.formData.vehicleYear} ${bookingData.formData.vehicleMake} ${bookingData.formData.vehicleModel}</p>
//       <p><strong>Color:</strong> ${bookingData.formData.vehicleColor}</p>
//       ${bookingData.formData.vehicleLength ? 
//         `<p><strong>Length:</strong> ${bookingData.formData.vehicleLength} ft</p>` : ''}
//     </div>

//     <div class="payment-section">
//       <h3 style="margin-top: 0; color: #059669;">Pricing Details</h3>
//       <p><strong>Total Price:</strong> $${bookingData.totalPrice.toFixed(2)}</p>
//       <p><strong>Discounted Price:</strong> $${bookingData.discountedPrice.toFixed(2)}</p>
//       ${bookingData.discountApplied ? 
//         `<p><strong>Discount:</strong> ${bookingData.discountPercent}% off</p>
//          <p><strong>Amount Saved:</strong> $${(bookingData.totalPrice - bookingData.discountedPrice).toFixed(2)}</p>` : ''}
//       ${bookingData.promoCode ? 
//         `<p><strong>Promo Code Used:</strong> ${bookingData.promoCode}</p>` : ''}
//     </div>

//     ${bookingData.formData.notes ? `
//       <div class="section">
//         <h3 style="margin-top: 0; color: #dc2626;">Customer Notes</h3>
//         <p style="background: white; padding: 10px; border-radius: 4px; border-left: 4px solid #dc2626;">${bookingData.formData.notes}</p>
//       </div>
//     ` : ''}

//     <div style="margin-top: 25px; padding: 15px; background-color: #dbeafe; border-radius: 5px;">
//       <h4 style="margin-top: 0; color: #1e40af;">Next Steps</h4>
//       <p>✅ <strong>Contact customer</strong> to confirm appointment</p>
//       <p>✅ <strong>Prepare equipment</strong> based on services booked</p>
//       <p>✅ <strong>Check vehicle accessibility</strong> at location</p>
//       <p>✅ <strong>Arrive 15 minutes early</strong> for setup</p>
//     </div>

//     <div style="margin-top: 20px; text-align: center; padding: 15px; background-color: #f0fdf4; border-radius: 5px;">
//       <p style="margin: 0; color: #059669;"><strong>Submitted at:</strong> ${new Date(bookingData.submittedAt).toLocaleString()}</p>
//     </div>
//   </div>
// </body>
// </html>
//   `;
// };

// //
// // ---------- MAIN POST FUNCTION ----------
// //
// export async function POST(request: NextRequest) {
//   try {
//     if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
//       console.error('Email credentials are missing');
//       return NextResponse.json(
//         { success: false, message: 'Server configuration error' },
//         { status: 500 }
//       );
//     }

//     const bookingData: BookingData = await request.json();

//     if (!bookingData.formData || !bookingData.formData.email || !bookingData.formData.firstName) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const customerMailOptions = {
//       from: `Quality Auto Care <${process.env.GMAIL_USER}>`,
//       to: bookingData.formData.email,
//       subject: `Booking Confirmation #${bookingData.bookingId} - Quality Auto Care`,
//       html: createCustomerEmailHTML(bookingData),
//     };

//     const companyMailOptions = {
//       from: `Booking System <${process.env.GMAIL_USER}>`,
//       to: process.env.OWNER_EMAIL || 'hafizshoaibraza190@gmail.com',
//       subject: `NEW BOOKING: ${bookingData.formData.firstName} ${bookingData.formData.lastName} - ${bookingData.bookingId}`,
//       html: createCompanyEmailHTML(bookingData),
//     };

//     await transporter.sendMail(customerMailOptions);
//     await transporter.sendMail(companyMailOptions);

//     console.log('Emails sent successfully for booking:', bookingData.bookingId);

//     return NextResponse.json({
//       success: true,
//       message: 'Booking confirmed and emails sent successfully',
//       bookingId: bookingData.bookingId
//     });

//   } catch (error) {
//     console.error('Email sending error:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to process booking and send emails' },
//       { status: 500 }
//     );
//   }
// }

// app/api/send-booking-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

//
// ---------- TYPES ----------
//

// Package type
interface Package {
  id: string;
  name: string;
  price: number | string;
  pricingType?: string;
}

// Additional Service type
interface AdditionalService {
  id: string;
  name: string;
  price: number | string;
}

// Variant type
interface Variant {
  id: string;
  name: string;
  packages: Package[];
  additionalServices: AdditionalService[];
}

// Service type
interface Service {
  id: string;
  name: string;
  packages?: Package[];
  variants?: Variant[];
  additionalServices?: AdditionalService[];
}

// Main Service type
interface MainService {
  id: string;
  name: string;
  packages: Package[];
}

// Individual Vehicle Booking
interface VehicleBooking {
  id: string;
  serviceType: string;
  variant?: string;
  mainService: string;
  package: string;
  additionalServices: string[];
  vehicleType: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  vehicleLength?: string;
}

// Form data
interface FormData {
  vehicleBookings: VehicleBooking[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  date: string;
  timeSlot: string;
  notes?: string;
}

// Booking data
interface BookingData {
  bookingId: string;
  formData: FormData;
  totalPrice: number;
  discountedPrice: number;
  discountApplied?: boolean;
  discountPercent?: number;
  promoCode?: string;
  submittedAt: string;
  vehicleCount: number;
}

//
// ---------- NODEMAILER TRANSPORTER ----------
//
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

//
// ---------- SERVICE DATA ----------
//

const mainServices: MainService[] = [
  {
    id: "ceramic-coating",
    name: "Ceramic Coating",
    packages: [
      { id: "ceramic-1year", name: "1 Year Ceramic Coating", price: 500 },
      { id: "ceramic-5year", name: "5 Year Ceramic Coating", price: 800 },
      { id: "ceramic-10year", name: "10 Year Ceramic Coating", price: 1200 },
      { id: "ceramic-with-correction", name: "Ceramic Coating with Paint Correction", price: 1500 }
    ]
  },
  {
    id: "window-tinting",
    name: "Window Tinting",
    packages: [
      { id: "tint-side-windows", name: "Side Windows Tinting", price: 200 },
      { id: "tint-rear-windshield", name: "Rear Windshield Tinting", price: 150 },
      { id: "tint-front-windshield", name: "Front Windshield Tinting", price: 100 },
      { id: "tint-brow", name: "Windshield Brow Tinting", price: 50 },
      { id: "tint-roof", name: "Roof Tinting", price: 250 }
    ]
  },
  {
    id: "paint-correction",
    name: "Paint Correction",
    packages: [
      { id: "paint-correction-basic", name: "Basic Paint Correction", price: 300 },
      { id: "paint-correction-premium", name: "Premium Paint Correction", price: 600 }
    ]
  },
  {
    id: "mobile-detailing",
    name: "Mobile Detailing",
    packages: [
      { id: "mobile-service", name: "Mobile Detailing Service", price: 150 }
    ]
  }
];

const serviceTypes: Service[] = [
  {
    id: "car",
    name: "Car",
    variants: [
      {
        id: "sedan",
        name: "Sedan",
        packages: [
          { id: "sedan-basic-full", name: "Basic Full Package", price: 120 },
          { id: "sedan-premium-full", name: "Premium Full Package", price: 200 },
          { id: "sedan-basic-interior", name: "Basic Interior Only", price: 80 },
          { id: "sedan-premium-interior", name: "Premium Interior Only", price: 120 },
          { id: "sedan-basic-exterior", name: "Basic Exterior Only", price: 60 },
          { id: "sedan-premium-exterior", name: "Premium Exterior Only", price: 100 }
        ],
        additionalServices: [
          { id: "add-shampoo", name: "Extra Shampoo", price: 20 },
          { id: "add-wax", name: "Premium Wax", price: 30 },
          { id: "add-engine", name: "Engine Cleaning", price: 40 }
        ]
      },
      {
        id: "suv",
        name: "SUV",
        packages: [
          { id: "suv-basic-full", name: "Basic Full Package", price: 150 },
          { id: "suv-premium-full", name: "Premium Full Package", price: 250 },
          { id: "suv-basic-interior", name: "Basic Interior Only", price: 100 },
          { id: "suv-premium-interior", name: "Premium Interior Only", price: 150 },
          { id: "suv-basic-exterior", name: "Basic Exterior Only", price: 80 },
          { id: "suv-premium-exterior", name: "Premium Exterior Only", price: 120 }
        ],
        additionalServices: [
          { id: "add-shampoo", name: "Extra Shampoo", price: 25 },
          { id: "add-wax", name: "Premium Wax", price: 35 },
          { id: "add-engine", name: "Engine Cleaning", price: 45 }
        ]
      }
    ]
  },
  {
    id: "boat",
    name: "Boat",
    packages: [
      { id: "boat-full", name: "Full Boat Service", price: 500, pricingType: "perFoot" },
      { id: "boat-interior", name: "Boat Interior Only", price: 300, pricingType: "perFoot" },
      { id: "boat-exterior", name: "Boat Exterior Only", price: 250, pricingType: "perFoot" }
    ],
    additionalServices: [
      { id: "add-gelcoat", name: "Gelcoat Restoration", price: 150 },
      { id: "add-teak", name: "Teak Cleaning", price: 100 }
    ]
  }
];

//
// ---------- HELPERS ----------
//

// Helper function to get service details for a vehicle
const getVehicleServiceDetails = (vehicle: VehicleBooking) => {
  let serviceName = "Unknown Service";
  let packageName = "Unknown Package";
  let vehiclePrice = 0;
  const additionalServicesDetails: { name: string; price: number }[] = [];

  // Check if it's a main service
  const mainService = mainServices.find(ms => ms.id === vehicle.mainService);
  if (mainService) {
    serviceName = mainService.name;
    const pkg = mainService.packages.find(p => p.id === vehicle.package);
    if (pkg) {
      packageName = pkg.name;
      let packagePrice = typeof pkg.price === 'string' ? Number(pkg.price) || 0 : pkg.price;
      
      // Handle perFoot pricing
      if (pkg.pricingType === "perFoot" && vehicle.vehicleLength) {
        packagePrice *= parseFloat(vehicle.vehicleLength);
      }
      vehiclePrice += packagePrice;
    }
  } else {
    // Regular service
    const serviceType = serviceTypes.find(st => st.id === vehicle.serviceType);
    if (serviceType) {
      serviceName = serviceType.name;
      
      if (serviceType.variants && vehicle.variant) {
        const variant = serviceType.variants.find(v => v.id === vehicle.variant);
        if (variant) {
          serviceName += ` (${variant.name})`;
          const pkg = variant.packages.find(p => p.id === vehicle.package);
          if (pkg) {
            packageName = pkg.name;
            let packagePrice = typeof pkg.price === 'string' ? Number(pkg.price) || 0 : pkg.price;
            
            // Handle perFoot pricing
            if (pkg.pricingType === "perFoot" && vehicle.vehicleLength) {
              packagePrice *= parseFloat(vehicle.vehicleLength);
            }
            vehiclePrice += packagePrice;
          }

          // Additional services for variant
          vehicle.additionalServices.forEach(addId => {
            const addService = variant.additionalServices.find(a => a.id === addId);
            if (addService) {
              const price = typeof addService.price === 'string' ? Number(addService.price) || 0 : addService.price;
              additionalServicesDetails.push({
                name: addService.name,
                price: price
              });
              vehiclePrice += price;
            }
          });
        }
      } else {
        // Service without variants
        const pkg = serviceType.packages?.find(p => p.id === vehicle.package);
        if (pkg) {
          packageName = pkg.name;
          let packagePrice = typeof pkg.price === 'string' ? Number(pkg.price) || 0 : pkg.price;
          
          // Handle perFoot pricing
          if (pkg.pricingType === "perFoot" && vehicle.vehicleLength) {
            packagePrice *= parseFloat(vehicle.vehicleLength);
          }
          vehiclePrice += packagePrice;
        }

        // Additional services for regular service
        vehicle.additionalServices.forEach(addId => {
          const addService = serviceType.additionalServices?.find(a => a.id === addId);
          if (addService) {
            const price = typeof addService.price === 'string' ? Number(addService.price) || 0 : addService.price;
            additionalServicesDetails.push({
              name: addService.name,
              price: price
            });
            vehiclePrice += price;
          }
        });
      }
    }
  }

  return {
    serviceName,
    packageName,
    vehiclePrice,
    additionalServicesDetails
  };
};

// Format date properly
const formatDisplayDate = (dateString: string): string => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return "Invalid Date";
  }
};

//
// ---------- EMAIL TEMPLATES ----------
//

// Customer email template
const createCustomerEmailHTML = (bookingData: BookingData): string => {
  const vehicleDetails = bookingData.formData.vehicleBookings.map((vehicle, index) => {
    const details = getVehicleServiceDetails(vehicle);
    return {
      index: index + 1,
      vehicle: `${vehicle.vehicleYear} ${vehicle.vehicleMake} ${vehicle.vehicleModel}`,
      color: vehicle.vehicleColor,
      service: details.serviceName,
      package: details.packageName,
      additionalServices: details.additionalServicesDetails,
      price: details.vehiclePrice,
      length: vehicle.vehicleLength
    };
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Booking Confirmation - Quality Auto Care</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(to right, #2563eb, #1e40af); padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { border: 1px solid #ddd; border-top: none; padding: 25px; border-radius: 0 0 10px 10px; }
    .section { background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .total-section { background-color: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .vehicle-section { background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin: 15px 0; }
    .discount { color: #059669; font-weight: bold; }
    .service-item { margin: 8px 0; padding: 8px; background: #f8fafc; border-radius: 4px; border-left: 4px solid #2563eb; }
    .additional-service { margin: 5px 0; padding: 5px 10px; background: #ecfdf5; border-radius: 4px; font-size: 14px; }
    .vehicle-header { background: #1e40af; color: white; padding: 10px 15px; border-radius: 6px 6px 0 0; margin: -15px -15px 15px -15px; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="color: white; margin: 0;">Quality Auto Care</h1>
    <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Professional Auto Detailing Services</p>
  </div>
  
  <div class="content">
    <h2 style="color: #2563eb;">Booking Confirmation 🎉</h2>
    <p>Dear <strong>${bookingData.formData.firstName} ${bookingData.formData.lastName}</strong>,</p>
    <p>Thank you for choosing Quality Auto Care! Your booking for <strong>${bookingData.vehicleCount} vehicle(s)</strong> has been confirmed successfully.</p>
    
    <div class="section">
      <h3 style="margin-top: 0; color: #2563eb;">Appointment Details</h3>
      <p><strong>Booking ID:</strong> ${bookingData.bookingId}</p>
      <p><strong>Date:</strong> ${formatDisplayDate(bookingData.formData.date)}</p>
      <p><strong>Time:</strong> ${bookingData.formData.timeSlot}</p>
      <p><strong>Location:</strong> ${bookingData.formData.address}, ${bookingData.formData.city}, ${bookingData.formData.state} ${bookingData.formData.zip}</p>
    </div>

    <div class="section">
      <h3 style="margin-top: 0; color: #2563eb;">Vehicle Services Summary</h3>
      ${vehicleDetails.map(vehicle => `
        <div class="vehicle-section">
          <div class="vehicle-header">
            <h4 style="margin: 0; color: white;">Vehicle ${vehicle.index}: ${vehicle.vehicle}</h4>
          </div>
          <p><strong>Color:</strong> ${vehicle.color}</p>
          ${vehicle.length ? `<p><strong>Length:</strong> ${vehicle.length} ft</p>` : ''}
          <div class="service-item">
            <strong>Service:</strong> ${vehicle.service}<br>
            <strong>Package:</strong> ${vehicle.package}<br>
            <strong>Vehicle Price:</strong> $${vehicle.price.toFixed(2)}
          </div>
          ${vehicle.additionalServices.length > 0 ? `
            <div style="margin-top: 10px;">
              <strong>Additional Services:</strong>
              ${vehicle.additionalServices.map(add => `
                <div class="additional-service">
                  ${add.name} - +$${add.price.toFixed(2)}
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      `).join('')}
    </div>

    <div class="total-section">
      <h3 style="margin-top: 0; color: #059669;">Payment Summary</h3>
      <p><strong>Subtotal (${bookingData.vehicleCount} vehicles):</strong> $${bookingData.totalPrice.toFixed(2)}</p>
      ${bookingData.discountApplied ? `
        <p class="discount"><strong>Discount Applied:</strong> ${bookingData.discountPercent}% off</p>
        <p><strong>Discount Amount:</strong> -$${(bookingData.totalPrice - bookingData.discountedPrice).toFixed(2)}</p>
      ` : ''}
      <p style="font-size: 1.2em; font-weight: bold; border-top: 2px solid #059669; padding-top: 10px;">
        <strong>Final Total:</strong> $${bookingData.discountedPrice.toFixed(2)}
      </p>
      ${bookingData.promoCode ? `
        <p><strong>Promo Code:</strong> ${bookingData.promoCode}</p>
      ` : ''}
    </div>

    <div style="margin-top: 25px; padding: 15px; background-color: #fffbeb; border-radius: 5px;">
      <h4 style="margin-top: 0; color: #d97706;">Important Notes</h4>
      <p>📍 <strong>Address:</strong> ${bookingData.formData.address}, ${bookingData.formData.city}, ${bookingData.formData.state} ${bookingData.formData.zip}</p>
      <p>⏰ <strong>Please be ready</strong> 10 minutes before your scheduled time</p>
      <p>🚗 <strong>All vehicles should be accessible</strong> at the appointment location</p>
      ${bookingData.formData.notes ? `
        <p>📝 <strong>Your Notes:</strong> ${bookingData.formData.notes}</p>
      ` : ''}
    </div>
    
    <p>If you need to reschedule or have any questions, please contact us at <strong>${bookingData.formData.phone}</strong>.</p>
    
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
      <p>Best regards,<br><strong>Quality Auto Care Team</strong></p>
    </div>
  </div>
</body>
</html>
  `;
};

// Company email template
const createCompanyEmailHTML = (bookingData: BookingData): string => {
  const vehicleDetails = bookingData.formData.vehicleBookings.map((vehicle, index) => {
    const details = getVehicleServiceDetails(vehicle);
    return {
      index: index + 1,
      vehicle: `${vehicle.vehicleYear} ${vehicle.vehicleMake} ${vehicle.vehicleModel}`,
      color: vehicle.vehicleColor,
      type: vehicle.vehicleType,
      service: details.serviceName,
      package: details.packageName,
      additionalServices: details.additionalServicesDetails,
      price: details.vehiclePrice,
      length: vehicle.vehicleLength
    };
  });

  const totalServices = vehicleDetails.reduce((total, vehicle) => 
    total + 1 + vehicle.additionalServices.length, 0
  );

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Booking - Quality Auto Care</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(to right, #dc2626, #b91c1c); padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { border: 1px solid #ddd; border-top: none; padding: 25px; border-radius: 0 0 10px 10px; }
    .section { background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .service-section { background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .payment-section { background-color: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .urgent { background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 6px solid #d97706; }
    .vehicle-detail { background: white; padding: 15px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #2563eb; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .service-breakdown { background: #f8fafc; padding: 10px; border-radius: 6px; margin: 10px 0; }
    .additional-service { background: #ecfdf5; padding: 8px 12px; margin: 5px 0; border-radius: 4px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="color: white; margin: 0;">🚨 NEW BOOKING ALERT</h1>
    <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Quality Auto Care - Booking System</p>
  </div>
  
  <div class="content">
    <div class="urgent">
      <h2 style="color: #d97706; margin: 0;">Action Required: New Multi-Vehicle Booking</h2>
      <p style="margin: 5px 0 0 0; font-size: 1.1em;">
        <strong>Booking ID:</strong> ${bookingData.bookingId} | 
        <strong>Vehicles:</strong> ${bookingData.vehicleCount} | 
        <strong>Total Services:</strong> ${totalServices}
      </p>
    </div>

    <div class="section">
      <h3 style="margin-top: 0; color: #dc2626;">Customer Information</h3>
      <p><strong>Name:</strong> ${bookingData.formData.firstName} ${bookingData.formData.lastName}</p>
      <p><strong>Email:</strong> ${bookingData.formData.email}</p>
      <p><strong>Phone:</strong> ${bookingData.formData.phone}</p>
      <p><strong>Address:</strong> ${bookingData.formData.address}, ${bookingData.formData.city}, ${bookingData.formData.state} ${bookingData.formData.zip}</p>
    </div>
    
    <div class="section">
      <h3 style="margin-top: 0; color: #2563eb;">Appointment Details</h3>
      <p><strong>Date:</strong> ${formatDisplayDate(bookingData.formData.date)}</p>
      <p><strong>Time:</strong> ${bookingData.formData.timeSlot}</p>
      <p><strong>Location Type:</strong> ${bookingData.formData.address.includes('mobile') ? 'MOBILE SERVICE' : 'FIXED LOCATION'}</p>
    </div>

    <div class="service-section">
      <h3 style="margin-top: 0; color: #2563eb;">Vehicle Services Details</h3>
      ${vehicleDetails.map(vehicle => `
        <div class="vehicle-detail">
          <h4 style="color: #1e40af; margin: 0 0 10px 0;">Vehicle ${vehicle.index}: ${vehicle.vehicle}</h4>
          <div class="service-breakdown">
            <p><strong>Type:</strong> ${vehicle.type} | <strong>Color:</strong> ${vehicle.color} ${vehicle.length ? `| <strong>Length:</strong> ${vehicle.length} ft` : ''}</p>
            <p><strong>Main Service:</strong> ${vehicle.service}</p>
            <p><strong>Package:</strong> ${vehicle.package}</p>
            <p><strong>Base Price:</strong> $${vehicle.price.toFixed(2)}</p>
            
            ${vehicle.additionalServices.length > 0 ? `
              <div style="margin-top: 10px;">
                <strong>Additional Services (${vehicle.additionalServices.length}):</strong>
                ${vehicle.additionalServices.map(add => `
                  <div class="additional-service">
                    ${add.name} - +$${add.price.toFixed(2)}
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      `).join('')}
    </div>

    <div class="payment-section">
      <h3 style="margin-top: 0; color: #059669;">Financial Summary</h3>
      <p><strong>Subtotal (${bookingData.vehicleCount} vehicles):</strong> $${bookingData.totalPrice.toFixed(2)}</p>
      ${bookingData.discountApplied ? `
        <p><strong>Discount:</strong> ${bookingData.discountPercent}% off</p>
        <p><strong>Discount Amount:</strong> -$${(bookingData.totalPrice - bookingData.discountedPrice).toFixed(2)}</p>
      ` : ''}
      <p style="font-size: 1.3em; font-weight: bold; border-top: 3px solid #059669; padding-top: 15px;">
        <strong>Final Amount:</strong> $${bookingData.discountedPrice.toFixed(2)}
      </p>
      ${bookingData.promoCode ? `
        <p><strong>Promo Code Used:</strong> ${bookingData.promoCode}</p>
      ` : ''}
    </div>

    ${bookingData.formData.notes ? `
      <div class="section">
        <h3 style="margin-top: 0; color: #dc2626;">Customer Notes</h3>
        <p style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #dc2626; font-style: italic;">
          "${bookingData.formData.notes}"
        </p>
      </div>
    ` : ''}

    <div style="margin-top: 25px; padding: 20px; background-color: #dbeafe; border-radius: 8px;">
      <h4 style="margin-top: 0; color: #1e40af;">Preparation Checklist</h4>
      <p>✅ <strong>Contact customer</strong> to confirm multi-vehicle appointment</p>
      <p>✅ <strong>Prepare equipment</strong> for ${bookingData.vehicleCount} vehicles</p>
      <p>✅ <strong>Check vehicle accessibility</strong> at location</p>
      <p>✅ <strong>Allocate sufficient time</strong> - estimate ${bookingData.vehicleCount * 2} hours</p>
      <p>✅ <strong>Bring extra supplies</strong> for ${totalServices} total services</p>
      <p>✅ <strong>Arrive 30 minutes early</strong> for multi-vehicle setup</p>
    </div>

    <div style="margin-top: 20px; text-align: center; padding: 15px; background-color: #f0fdf4; border-radius: 8px;">
      <p style="margin: 0; color: #059669; font-weight: bold;">
        <strong>Submitted:</strong> ${new Date(bookingData.submittedAt).toLocaleString()} | 
        <strong>Booking ID:</strong> ${bookingData.bookingId} | 
        <strong>Total Value:</strong> $${bookingData.discountedPrice.toFixed(2)}
      </p>
    </div>
  </div>
</body>
</html>
  `;
};

//
// ---------- MAIN POST FUNCTION ----------
//
export async function POST(request: NextRequest) {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Email credentials are missing');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const bookingData: BookingData = await request.json();

    if (!bookingData.formData || !bookingData.formData.email || !bookingData.formData.firstName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate vehicle bookings
    if (!bookingData.formData.vehicleBookings || bookingData.formData.vehicleBookings.length === 0) {
      return NextResponse.json(
        { error: "No vehicle bookings found" },
        { status: 400 }
      );
    }

    const customerMailOptions = {
      from: `Quality Auto Care <${process.env.GMAIL_USER}>`,
      to: bookingData.formData.email,
      subject: `Booking Confirmation #${bookingData.bookingId} - ${bookingData.vehicleCount} Vehicle(s) - Quality Auto Care`,
      html: createCustomerEmailHTML(bookingData),
    };

    const companyMailOptions = {
      from: `Booking System <${process.env.GMAIL_USER}>`,
      to: process.env.OWNER_EMAIL || process.env.GMAIL_USER,
      subject: `NEW MULTI-VEHICLE BOOKING: ${bookingData.formData.firstName} ${bookingData.formData.lastName} - ${bookingData.vehicleCount} Vehicles - ${bookingData.bookingId}`,
      html: createCompanyEmailHTML(bookingData),
    };

    await transporter.sendMail(customerMailOptions);
    await transporter.sendMail(companyMailOptions);

    console.log('Multi-vehicle emails sent successfully for booking:', bookingData.bookingId);

    return NextResponse.json({
      success: true,
      message: 'Multi-vehicle booking confirmed and emails sent successfully',
      bookingId: bookingData.bookingId,
      vehicleCount: bookingData.vehicleCount
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process booking and send emails' },
      { status: 500 }
    );
  }
}