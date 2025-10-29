import Gallery from "@/pages/Gallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Detailing Gallery - Before & After Photos | Decent Auto Detailing Karachi",
  description: "View our professional car detailing gallery showcasing before and after transformations. See ceramic coating, window tinting, interior detailing, and exterior wash results in Karachi.",
  keywords: "car detailing gallery Karachi, auto detailing before after photos, ceramic coating gallery Pakistan, window tinting photos, interior detailing gallery, Decent Auto Detailing portfolio",
  alternates: {
    canonical: "https://decentautocaredetailing.vercel.app/gallery",
  },
  openGraph: {
    title: "Car Detailing Gallery - Before & After Photos | Decent Auto Detailing Karachi",
    description: "View our professional car detailing gallery showcasing before and after transformations. See ceramic coating, window tinting, interior detailing, and exterior wash results in Karachi.",
    url: "https://decentautocaredetailing.vercel.app/gallery",
    siteName: "Decent Auto Detailing",
    images: [
      {
        url: "/pictures/service-1.jpg",
        width: 1200,
        height: 630,
        alt: "Car Detailing Gallery - Professional Transformations by Decent Auto Detailing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Detailing Gallery - Before & After Photos | Decent Auto Detailing Karachi",
    description: "View our professional car detailing gallery showcasing before and after transformations. See ceramic coating, window tinting, interior detailing, and exterior wash results in Karachi.",
    images: ["/pictures/service-1.jpg"],
  },
};

export default function GalleryPage() {
  return <Gallery />;
}
