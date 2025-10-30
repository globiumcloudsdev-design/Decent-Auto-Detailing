"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import GallerySection from '../components/GallerySection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import DiscountModal from '../components/DiscountModal';

// Import your discount data
import discountData from '../Data/discountData.json';

const Index = () => {
  const [showModal, setShowModal] = useState(false);
  const [heroHeight, setHeroHeight] = useState(0);

  useEffect(() => {
    // Function to add animation on scroll
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementHeight = element.getBoundingClientRect().height;

        if (elementTop < window.innerHeight - elementHeight / 2) {
          element.classList.add('visible');
        }
      });

      // Show modal when user scrolls past hero section
      if (heroHeight > 0 && !showModal) {
        const scrolledPastHero = window.scrollY > heroHeight * 0.8;
        if (scrolledPastHero) {
          setShowModal(true);
        }
      }
    };

    // Get hero section height
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      setHeroHeight(heroSection.offsetHeight);
    }

    // Initial check on load
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroHeight, showModal]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div id="hero-section">
        <HeroSection />
      </div>
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <ContactSection />
      <Footer />

      <DiscountModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        data={discountData}
      />
    </div>
  );
};

export default Index;
