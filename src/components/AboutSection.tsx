"use client";

import React from 'react';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { CheckCircle, Car, Shield, Star } from 'lucide-react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
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

    const elements = sectionRef.current?.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    elements?.forEach(el => observer.observe(el));

    // Observe specific refs
    if (imageRef.current) observer.observe(imageRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (paragraphRef.current) observer.observe(paragraphRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (buttonRef.current) observer.observe(buttonRef.current);

    return () => {
      elements?.forEach(el => observer.unobserve(el));
      if (imageRef.current) observer.unobserve(imageRef.current);
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (paragraphRef.current) observer.unobserve(paragraphRef.current);
      if (featuresRef.current) observer.unobserve(featuresRef.current);
      if (buttonRef.current) observer.unobserve(buttonRef.current);
    };
  }, []);

  return (
    <section id="about-section" className="py-24 bg-gradient-to-br from-gray-50 to-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2" ref={imageRef}>
            <div className="relative slide-in-left">
              <div className="absolute -top-6 -left-6 w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-sky-400/20 to-blue-500/20 rounded-full z-0 float-dynamic"></div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 lg:w-48 lg:h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full z-0 float-dynamic" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-4 right-4 w-16 h-16 bg-sky-500/20 rounded-full z-0 bounce-gentle" style={{ animationDelay: '2s' }}></div>
              <Image
                src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Car detailing professional"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl relative z-10 rotate-in hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl z-20"></div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 ref={titleRef} className="text-4xl lg:text-5xl font-bold mb-8 slide-in-right">
              <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent bounce-in" style={{ animationDelay: '0.3s' }}>Professional</span> Auto Detailing Service
            </h2>

            <p ref={paragraphRef} className="text-gray-700 mb-8 text-lg leading-relaxed slide-in-right" style={{ animationDelay: '0.2s' }}>
              At Decent Auto Detailing, we bring professional mobile detailing services with top-quality products and skilled experts directly to you. Our mission is to provide convenience without compromising on quality.
            </p>

            <div ref={featuresRef} className="space-y-6 mb-10 slide-in-right" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-start gap-4 fade-in group" style={{ animationDelay: '0.6s' }}>
                <div className="bg-gradient-to-br from-sky-500 to-blue-500 rounded-full p-3 mt-1 rotate-in shadow-lg group-hover:shadow-xl transition-shadow duration-300" style={{ animationDelay: '0.8s' }}>
                  <Car className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2 text-gray-900">Mobile Service</h3>
                  <p className="text-gray-600 leading-relaxed">We bring our services to your home or workplace—saving you time and hassle with our convenient mobile detailing solutions.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 fade-in group" style={{ animationDelay: '0.8s' }}>
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-full p-3 mt-1 rotate-in shadow-lg group-hover:shadow-xl transition-shadow duration-300" style={{ animationDelay: '1s' }}>
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2 text-gray-900">Premium Products</h3>
                  <p className="text-gray-600 leading-relaxed">We use only professional-grade products for lasting results that protect and enhance your vehicles appearance.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 fade-in group" style={{ animationDelay: '1s' }}>
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-3 mt-1 rotate-in shadow-lg group-hover:shadow-xl transition-shadow duration-300" style={{ animationDelay: '1.2s' }}>
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2 text-gray-900">Comprehensive Services</h3>
                  <p className="text-gray-600 leading-relaxed">From basic washing to deep cleaning, window tinting, ceramic coating, and specialized treatments for all vehicle types.</p>
                </div>
              </div>
            </div>

            <a
              ref={buttonRef}
              href="#services"
              className="bg-gradient-to-r from-gray-900 to-black text-white px-10 py-4 rounded-full inline-block font-semibold text-lg hover:from-black hover:to-gray-900 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl fade-in pulse-glow"
              style={{ animationDelay: '1.4s' }}
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
