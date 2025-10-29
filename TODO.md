# SEO Improvement Task List

## 1. Add Complete Meta Tags for SEO on Each Page
- [x] Home Page (/): Add metadata in src/app/page.tsx
- [x] Booking Page (/booking): Add metadata in src/app/(pages)/booking/page.tsx
- [x] Contact Page (/contact): Add metadata in src/app/(pages)/contact/page.tsx
- [x] Gallery Page (/gallery): Add metadata in src/app/(pages)/gallery/page.tsx
- [x] Services Pages (/services/[serviceId]): Add metadata in src/app/(pages)/services/[serviceId]/page.tsx (dynamic)

## 2. Add JSON-LD Schema Markup (LocalBusiness)
- [x] Add LocalBusiness JSON-LD to src/app/layout.tsx
  - Business name: Decent Auto Detailing
  - Service: Auto Detailing Services
  - Location: Karachi, Pakistan
  - Phone: +92 ___ _______ (placeholder)
  - Area served: Karachi
  - sameAs: Instagram + WhatsApp links (placeholders)

## 3. Add Alt Text for All Images (SEO Optimized)
- [ ] Provide optimized alt text suggestions for images in components (HeroSection, GallerySection, etc.) without editing code

## 4. Update robots.txt
- [x] Disallow unused routes like /api/ in public/robots.txt

## 5. Update Sitemap if Needed
- [ ] Check and update next-sitemap.config.js for any missing routes

## 6. Generate SEO for Each Page One by One
- [ ] After gathering page content summaries from user, generate optimized metadata for each page

## Implementation Notes
- Use Next.js Metadata API for all meta tags
- Add JSON-LD script in layout.tsx head
- Update robots.txt to disallow /api/ routes
- Provide alt text suggestions without editing component code
- Use placeholders for phone, Instagram, WhatsApp until user provides
