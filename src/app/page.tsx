import Index from "@/pages/Index";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decent Auto Detailing - Car Detailing Services in Karachi",
  description: "Transform your vehicle with expert auto detailing in Karachi. Mobile car wash, ceramic coating, window tinting, interior detailing. Book today!",
  keywords: "auto detailing Karachi, car detailing Pakistan, mobile car wash, ceramic coating, window tinting, interior detailing, car wash Karachi, Decent Auto Detailing",
  alternates: {
    canonical: "https://decentautocaredetailing.vercel.app",
  },
  openGraph: {
    title: "Decent Auto Detailing - Car Detailing Services in Karachi",
    description: "Transform your vehicle with expert auto detailing in Karachi. Mobile car wash, ceramic coating, window tinting, interior detailing. Book today!",
    url: "https://decentautocaredetailing.vercel.app",
    siteName: "Decent Auto Detailing",
    images: [
      {
        url: "/pictures/main-logo.png",
        width: 1200,
        height: 630,
        alt: "Decent Auto Detailing - Car Detailing Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Decent Auto Detailing - Car Detailing Services in Karachi",
    description: "Transform your vehicle with expert auto detailing in Karachi. Mobile car wash, ceramic coating, window tinting, interior detailing. Book today!",
    images: ["/pictures/main-logo.png"],
  },
};

export default function Home() {
  return <Index />;
}
