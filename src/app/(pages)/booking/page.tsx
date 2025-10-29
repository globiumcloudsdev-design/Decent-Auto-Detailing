import Booking from "@/pages/Booking";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Car Detailing Service - Decent Auto Detailing Karachi",
  description: "Schedule your professional car detailing appointment in Karachi. Choose from mobile detailing, ceramic coating, window tinting, and interior cleaning services. Easy online booking!",
  keywords: "book car detailing Karachi, auto detailing booking Pakistan, mobile car wash booking, ceramic coating appointment, window tinting booking, Decent Auto Detailing booking",
  alternates: {
    canonical: "https://decentautocaredetailing.vercel.app/booking",
  },
  openGraph: {
    title: "Book Your Car Detailing Service - Decent Auto Detailing Karachi",
    description: "Schedule your professional car detailing appointment in Karachi. Choose from mobile detailing, ceramic coating, window tinting, and interior cleaning services. Easy online booking!",
    url: "https://decentautocaredetailing.vercel.app/booking",
    siteName: "Decent Auto Detailing",
    images: [
      {
        url: "/pictures/service-1.jpg",
        width: 1200,
        height: 630,
        alt: "Book Car Detailing Service - Decent Auto Detailing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Your Car Detailing Service - Decent Auto Detailing Karachi",
    description: "Schedule your professional car detailing appointment in Karachi. Choose from mobile detailing, ceramic coating, window tinting, and interior cleaning services. Easy online booking!",
    images: ["/pictures/service-1.jpg"],
  },
};

export default function BookingPage() {
  return <Booking />;
}

