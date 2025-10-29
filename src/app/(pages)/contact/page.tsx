import Contact from "@/pages/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Decent Auto Detailing - Car Detailing Services in Karachi",
  description: "Get in touch with Decent Auto Detailing for professional car detailing services in Karachi. Contact us for mobile detailing, ceramic coating, and window tinting. We're here to help!",
  keywords: "contact auto detailing Karachi, car detailing contact Pakistan, Decent Auto Detailing contact, mobile car wash contact, ceramic coating contact Karachi",
  alternates: {
    canonical: "https://decentautocaredetailing.vercel.app/contact",
  },
  openGraph: {
    title: "Contact Decent Auto Detailing - Car Detailing Services in Karachi",
    description: "Get in touch with Decent Auto Detailing for professional car detailing services in Karachi. Contact us for mobile detailing, ceramic coating, and window tinting. We're here to help!",
    url: "https://decentautocaredetailing.vercel.app/contact",
    siteName: "Decent Auto Detailing",
    images: [
      {
        url: "/pictures/main-logo.png",
        width: 1200,
        height: 630,
        alt: "Contact Decent Auto Detailing - Professional Car Detailing Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Decent Auto Detailing - Car Detailing Services in Karachi",
    description: "Get in touch with Decent Auto Detailing for professional car detailing services in Karachi. Contact us for mobile detailing, ceramic coating, and window tinting. We're here to help!",
    images: ["/pictures/main-logo.png"],
  },
};

export default function ContactPage() {
  return <Contact />;
}
