"use client";

import React from 'react';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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

    const elements = sectionRef.current?.querySelectorAll('.fade-in');
    elements?.forEach(el => observer.observe(el));

    return () => {
      elements?.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="py-20 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 lg:w-32 lg:h-32 bg-skyblue/20 rounded-full z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 lg:w-40 lg:h-40 bg-skyblue/10 rounded-full z-0"></div>
              <Image 
                src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Car detailing professional" 
                width={800}
                height={600}
                className="rounded-xl shadow-xl relative z-10 fade-in"
              />
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 fade-in">
              <span className="text-skyblue">Professional</span> Auto Detailing Service
            </h2>

            <p className="text-gray-700 mb-6 fade-in">
              At Decent Auto Detailing, we bring professional mobile detailing services with top-quality products and skilled experts directly to you. Our mission is to provide convenience without compromising on quality.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 fade-in">
                <div className="bg-skyblue rounded-full p-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Mobile Service</h3>
                  <p className="text-gray-600">We bring our services to your home or workplace—saving you time and hassle.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 fade-in">
                <div className="bg-skyblue rounded-full p-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Premium Products</h3>
                  <p className="text-gray-600">We use only professional-grade products for lasting results that protect your vehicle.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 fade-in">
                <div className="bg-skyblue rounded-full p-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Comprehensive Services</h3>
                  <p className="text-gray-600">From basic washing to deep cleaning, window tinting, ceramic coating, and more.</p>
                </div>
              </div>
            </div>

            <a 
              href="#services" 
              className="bg-black text-white px-8 py-3 rounded-full inline-block font-medium hover:bg-gray-800 transition-all transform hover:-translate-y-1 fade-in"
            >
              Explore Our Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
