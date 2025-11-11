"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import GallerySection from "../components/GallerySection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import DiscountModal from "../components/DiscountModal";

const Index = () => {
  const [discountData, setDiscountData] = useState<{
    title: string;
    description: string;
    discountText: string;
    discountCode: string;
    buttonText: string;
  } | null>(null);
  const [showDiscountModal, setShowDiscountModal] = useState(false);


  // ✅ Fetch promo code from API
  useEffect(() => {
    const fetchPromoCode = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/promo-codes/agent/${process.env.NEXT_PUBLIC_AGENT_ID}`
        );
        const response = await res.json();
        console.log("Fetched data:", response);

        if (response && response.success && response.data && response.data.length > 0) {
          // Find the first active promo code
          const activePromo = response.data.find((promo: { isActive: boolean }) => promo.isActive);
          if (activePromo) {
            setDiscountData({
              title: "🎉 Special Offer!",
              description: `Use promo code ${activePromo.promoCode} to get ${activePromo.discountPercentage}% OFF your first detailing service!`,
              discountText: `${activePromo.discountPercentage}% OFF`,
              discountCode: activePromo.promoCode,
              buttonText: "Claim My Discount",
            });
          } else {
            console.log("No active promo codes found");
          }
        } else {
          console.log("No valid data from API");
        }
      } catch (error) {
        console.error("Error fetching promo code:", error);
      }
    };

    fetchPromoCode();
  }, []);

  // ✅ Show modal when discountData is set (removed to show on scroll only)



  useEffect(() => {
    const handleScroll = () => {
      // Fade-in animations
      document.querySelectorAll(".fade-in").forEach((el) => {
        const { top, height } = el.getBoundingClientRect();
        if (top < window.innerHeight - height / 2) el.classList.add("visible");
      });

      // Show modal on scroll
      const hero = document.getElementById("hero-section");
      const discountClaimed = localStorage.getItem('discountClaimed') === 'true';
      const remindUntil = localStorage.getItem('remindLaterUntil');
      const shouldRemind = remindUntil ? Date.now() > parseInt(remindUntil) : true;

      if (hero && hero.getBoundingClientRect().bottom < 0 && discountData && !showDiscountModal && !discountClaimed && shouldRemind) {
        setShowDiscountModal(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [discountData, showDiscountModal]);

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
        isOpen={showDiscountModal}
        onClose={() => setShowDiscountModal(false)}
      />
    </div>
  );
};

export default Index;
