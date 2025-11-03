"use client";

import React from 'react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import windowTintImage from '../../public/pictures/DecentAutoDetailing/Window Treatment.png'; // Adjust the path as necessary
import ceramicCoatingImage from '../../public/pictures/DecentAutoDetailing/Ceramic Coating.jpg'; // Adjust the path as necessary
import mobileDetailingImage from '../../public/pictures/DecentAutoDetailing/Showroom Shine.jpg'; // Adjust the path as necessary

const services = [
  {
    id: 'mobile-detailing',
    title: 'Mobile Detailing',
    description: 'Our comprehensive mobile detailing service brings the car wash to you. From exterior washing to interior cleaning, we ensure your vehicle looks its best.',
    // image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    image: mobileDetailingImage,
    link: '/services/mobile-detailing'
  },
  {
    id: 'window-tint',
    title: 'Window Tint',
    description: 'Enhance privacy, reduce heat, and protect your interior with our professional window tinting services using high-quality films.',
    image: windowTintImage,
    link: '/services/window-tint'
  },
  {
    id: 'ceramic-coating',
    title: 'Ceramic Coating',
    description: 'Protect your vehicle\'s paint with our long-lasting ceramic coating that provides exceptional gloss, durability, and hydrophobic properties.',
    // image: 'https://images.unsplash.com/photo-1606577924006-27d39b132ae2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    image: ceramicCoatingImage,
    link: '/services/ceramic-coating'
  }
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-in, .bounce-in');
    elements?.forEach(el => observer.observe(el));

    // Observe specific refs
    if (titleRef.current) observer.observe(titleRef.current);
    if (descriptionRef.current) observer.observe(descriptionRef.current);
    if (buttonRef.current) observer.observe(buttonRef.current);

    return () => {
      elements?.forEach(el => observer.unobserve(el));
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (descriptionRef.current) observer.unobserve(descriptionRef.current);
      if (buttonRef.current) observer.unobserve(buttonRef.current);
    };
  }, []);

  return (
    <section id="services" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-3xl lg:text-4xl font-bold mb-4 slide-up">Our <span className="text-skyblue bounce-in" style={{ animationDelay: '0.3s' }}>Professional</span> Services</h2>
          <p ref={descriptionRef} className="text-gray-600 max-w-2xl mx-auto slide-up" style={{ animationDelay: '0.2s' }}>
            We offer a variety of detailing services to keep your vehicle looking its best,
            from basic washing to premium treatments that protect your investment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl bounce-in tilt-3d"
              style={{ animationDelay: `${index * 0.2 + 0.4}s` }}
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  href={service.link}
                  className="text-skyblue font-medium flex items-center hover:text-blue-700 transition-colors"
                >
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            ref={buttonRef}
            href="/booking"
            className="bg-sky-500 text-white px-8 py-3 rounded-full inline-block font-medium hover:bg-sky-600 transition-all transform hover:-translate-y-1 shadow-md hover:shadow-lg fade-in pulse-glow"
            style={{ animationDelay: '1s' }}
          >
            Book A Service Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
