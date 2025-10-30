"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    title: string;
    description: string;
    discountText: string;
    discountCode: string;
    buttonText: string;
  } | null;
}

const DiscountModal = ({ isOpen, onClose, data }: DiscountModalProps) => {
  const router = useRouter();
  const [hasClaimed, setHasClaimed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkClaimed = async () => {
      try {
        const response = await fetch('/api/discount-claim');
        const data = await response.json();
        setHasClaimed(data.claimed);
      } catch (error) {
        console.error('Error checking discount claim:', error);
        // Fallback to localStorage if API fails
        const claimed = localStorage.getItem("discount_claimed") === "true";
        setHasClaimed(claimed);
      }
    };
    checkClaimed();
  }, []);

  useEffect(() => {
    if (hasClaimed) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent >= 30) {
        setIsModalOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasClaimed]);

  if (!isModalOpen || !data || hasClaimed) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative animate-scaleIn shadow-xl">
        <button
          onClick={() => {
            setIsModalOpen(false);
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-center">
          {/* Header */}
          <div className="mb-5">
            <div className="bg-sky-500 text-white px-6 py-3 rounded-lg">
              <h3 className="text-2xl font-bold">{data.title}</h3>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              {data.description}
            </p>
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className="text-4xl font-bold text-sky-400">
                {data.discountText}
              </span>
            </div>
          </div>
          
          {/* Discount Code */}
          <div className="bg-gray-100 p-4 rounded-lg mb-6 border border-dashed border-blue-300">
            <p className="text-sm text-gray-600 mb-1">Use promo code:</p>
            <p className="text-xl font-mono font-bold text-sky-400 bg-white py-2 rounded-md">
              {data.discountCode}
            </p>
          </div>
          
          {/* Button */}
          <div className="flex flex-col gap-3">
            <button
              onClick={async () => {
                try {
                  await fetch('/api/discount-claim', { method: 'POST' });
                  localStorage.setItem("discount_claimed", "true");
                  setHasClaimed(true);
                  setIsModalOpen(false);
                  onClose();
                  router.push('/booking');
                } catch (error) {
                  console.error('Error claiming discount:', error);
                  // Fallback to localStorage only
                  localStorage.setItem("discount_claimed", "true");
                  setHasClaimed(true);
                  setIsModalOpen(false);
                  onClose();
                  router.push('/booking');
                }
              }}
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              {data.buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;