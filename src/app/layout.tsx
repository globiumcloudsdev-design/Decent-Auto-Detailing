import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify"; // ✅ import toastify

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Decent Auto Detailing - Professional Car Detailing Services in Karachi",
  description: "Expert auto detailing services in Karachi, Pakistan. Mobile car wash, ceramic coating, window tinting, and interior detailing. Book your appointment today!",
  keywords: "auto detailing Karachi, car detailing Pakistan, mobile car wash, ceramic coating, window tinting, interior detailing, Decent Auto Detailing",
  authors: [{ name: "Decent Auto Detailing" }],
  creator: "Decent Auto Detailing",
  publisher: "Decent Auto Detailing",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://decentautocaredetailing.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Decent Auto Detailing - Professional Car Detailing Services in Karachi",
    description: "Expert auto detailing services in Karachi, Pakistan. Mobile car wash, ceramic coating, window tinting, and interior detailing. Book your appointment today!",
    url: "https://decentautocaredetailing.vercel.app",
    siteName: "Decent Auto Detailing",
    images: [
      {
        url: "/pictures/main-logo.png",
        width: 1200,
        height: 630,
        alt: "Decent Auto Detailing Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Decent Auto Detailing - Professional Car Detailing Services in Karachi",
    description: "Expert auto detailing services in Karachi, Pakistan. Mobile car wash, ceramic coating, window tinting, and interior detailing. Book your appointment today!",
    images: ["/pictures/main-logo.png"],
    creator: "@DecentAutoDetail",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* JSON-LD Schema Markup for LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Decent Auto Detailing",
              "description": "Professional auto detailing services in Karachi, Pakistan including mobile car wash, ceramic coating, window tinting, and interior detailing.",
              "url": "https://decentautocaredetailing.vercel.app",
              "telephone": "+92 ___ _______",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Karachi",
                "addressRegion": "Sindh",
                "addressCountry": "Pakistan"
              },
              "areaServed": "Karachi",
              "serviceType": "Auto Detailing Services",
              "sameAs": [
                "https://instagram.com/decentautodetailing", // Replace with actual Instagram link
                "https://wa.me/+92___ _______" // Replace with actual WhatsApp link
              ],
              "image": "https://decentautocaredetailing.vercel.app/pictures/main-logo.png",
              "priceRange": "$$",
              "openingHours": "Mo-Su 09:00-18:00"
            })
          }}
        />

        {/* ✅ Global Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" // light bhi use kar sakta hai
        />
      </body>
    </html>
  );
}
