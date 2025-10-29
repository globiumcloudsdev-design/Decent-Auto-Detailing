import Service from "@/pages/Service";
import type { Metadata } from "next";

interface ServicePageProps {
  params: {
    serviceId: string;
  };
}

const serviceData: Record<string, {
  title: string;
  description: string;
  keywords: string;
  image: string;
}> = {
  'mobile-detailing': {
    title: "Mobile Auto Detailing Services - Convenient Car Detailing in Karachi",
    description: "Professional mobile auto detailing services in Karachi. We bring expert car detailing to your location including exterior wash, interior cleaning, and ceramic coating. Book now!",
    keywords: "mobile auto detailing Karachi, car detailing at home Pakistan, mobile car wash Karachi, convenient detailing services, Decent Auto Detailing mobile",
    image: "/pictures/service-1.jpg"
  },
  'window-tint': {
    title: "Professional Window Tinting Services - Decent Auto Detailing Karachi",
    description: "Expert window tinting services in Karachi for UV protection, heat reduction, and privacy. Professional installation with high-quality films. Book your appointment today!",
    keywords: "window tinting Karachi, car window tint Pakistan, UV protection tinting, privacy window film, Decent Auto Detailing window tint",
    image: "/pictures/window-tint.jpg"
  },
  'ceramic-coating': {
    title: "Ceramic Coating Protection - Long-Lasting Car Paint Protection Karachi",
    description: "Advanced ceramic coating services in Karachi for superior paint protection. Hydrophobic coating that lasts years, protecting against scratches, UV rays, and contaminants.",
    keywords: "ceramic coating Karachi, car paint protection Pakistan, hydrophobic coating, nano ceramic coating, Decent Auto Detailing ceramic",
    image: "/pictures/DecentAutoDetailing/Ceramic Coating.jpg"
  }
};

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = serviceData[params.serviceId];

  if (!service) {
    return {
      title: "Service Not Found - Decent Auto Detailing",
      description: "The requested service could not be found. Browse our professional car detailing services in Karachi.",
    };
  }

  return {
    title: service.title,
    description: service.description,
    keywords: service.keywords,
    alternates: {
      canonical: `https://decentautocaredetailing.vercel.app/services/${params.serviceId}`,
    },
    openGraph: {
      title: service.title,
      description: service.description,
      url: `https://decentautocaredetailing.vercel.app/services/${params.serviceId}`,
      siteName: "Decent Auto Detailing",
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: `${service.title} - Decent Auto Detailing`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
      images: [service.image],
    },
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  return <Service serviceId={params.serviceId} />;
}
