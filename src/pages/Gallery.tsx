"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import serviceimage1 from '../../public/pictures/service-1.jpg'; // Adjust the path as necessary
import serviceimage2 from '../../public/pictures/service-2.jpg'; // Adjust the path as necessary  
import leatherImage from '../../public/pictures/DecentAutoDetailing/Leather Treatment.jpg'; // Adjust the path as necessary
import ceramicImage from '../../public/pictures/DecentAutoDetailing/Ceramic Coating.jpg'; // Adjust the path as necessary 
import interiorImage from '../../public/pictures/DecentAutoDetailing/Interior Cleaning.jpg'; // Adjust the path as necessary
import paintCorrectionImage from '../../public/pictures/DecentAutoDetailing/Paint Correction.png'
import showroomShineImage from '../../public/pictures/DecentAutoDetailing/Showroom Shine.jpg'
import windowTint from '../../public/pictures/DecentAutoDetailing/Window Treatment.png'
import exteriorWash from '../../public/pictures/DecentAutoDetailing/Full Exterior Detail.jpg'
import Image from 'next/image';

const galleryImages = [
  {
    id: 1,
    src: serviceimage2,
    // src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    // src: exteriorImage,
    category: 'exterior',
    title: 'Full Exterior Detail'
  },
  {
    id: 2,
    // src: 'https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    src: paintCorrectionImage,
    category: 'exterior',
    title: 'Paint Correction'
  },
  {
    id: 3,
    // src: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    src: interiorImage,
    category: 'interior',
    title: 'Interior Detailing'
  },
  {
    id: 4,
    // src: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    src: showroomShineImage,
    category: 'exterior',
    title: 'Showroom Shine'
  },
  {
    id: 5,
    // src: 'https://images.unsplash.com/photo-1499062918700-389fa905494e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    src: windowTint,
    category: 'window-tint',
    title: 'Window Tinting'
  },
  {
    id: 6,
    // src: windowTintImage,
    // src: 'https://images.unsplash.com/photo-1606577924006-27d39b132ae2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    src: ceramicImage,
    category: 'ceramic',
    title: 'Ceramic Coating'
  },
  {
    id: 7,
    // src: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    src: exteriorWash,
    category: 'exterior',
    title: 'Exterior Wash'
  },
  {
    id: 8,
    // src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    src: leatherImage,
    category: 'interior',
    title: 'Leather Treatment'
  },
  {
    id: 9,
    // src: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    src: serviceimage1,
    category: 'ceramic',
    title: 'Paint Protection'
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'exterior',
    title: 'Professional Detailing'
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1575844611398-2a68400b437c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'interior',
    title: 'Interior Cleaning'
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'window-tint',
    title: 'Window Treatment'
  }
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeImage, setActiveImage] = useState<number | null>(null);
  
  useEffect(() => {
    // Animation on scroll
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementHeight = element.getBoundingClientRect().height;
        
        if (elementTop < window.innerHeight - elementHeight / 2) {
          element.classList.add('visible');
        }
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openModal = (id: number) => {
    setActiveImage(id);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateModal = (direction: 'next' | 'prev') => {
    if (activeImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === activeImage);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    
    setActiveImage(filteredImages[newIndex].id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-16 flex-grow">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 fade-in">Our Work Gallery</h1>
            <p className="text-gray-600 max-w-3xl mx-auto fade-in">
              Browse through our gallery to see examples of our detailing transformations.
              From interior deep cleans to exterior shine and ceramic coating, we take pride in our work.
            </p>
          </div>
          
          <div className="flex justify-center mb-8 overflow-x-auto fade-in">
            <div className="flex space-x-2 p-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedCategory === 'all' 
                    ? 'bg-sky-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory('exterior')}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedCategory === 'exterior' 
                    ? 'bg-sky-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Exterior Detailing
              </button>
              <button
                onClick={() => setSelectedCategory('interior')}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedCategory === 'interior' 
                    ? 'bg-sky-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Interior Detailing
              </button>
              <button
                onClick={() => setSelectedCategory('ceramic')}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedCategory === 'ceramic' 
                    ? 'bg-sky-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Ceramic Coating
              </button>
              <button
                onClick={() => setSelectedCategory('window-tint')}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedCategory === 'window-tint' 
                    ? 'bg-sky-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Window Tinting
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div 
                key={image.id} 
                className="relative overflow-hidden rounded-xl shadow-md cursor-pointer group fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openModal(image.id)}
              >
                <Image 
                  src={image.src} 
                  alt={image.title} 
                  width={400}
                  height={256}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-darkblack bg-opacity-0 flex items-center justify-center transition-all duration-300 group-hover:bg-opacity-50">
                  <div className="opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 text-center">
                    <span className="text-white font-medium px-4 py-2 rounded-full border border-white">
                      View Image
                    </span>
                    <h3 className="text-white font-medium mt-2">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Image Modal */}
      {activeImage !== null && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl">
            <button 
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-skyblue"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative">
              {filteredImages.map((image) => (
                image.id === activeImage && (
                  <div key={image.id} className="relative">
                    <Image 
                      src={image.src} 
                      alt={image.title} 
                      width={800}
                      height={600}
                      className="w-full object-contain max-h-[80vh]"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-darkblack bg-opacity-70 p-4">
                      <h3 className="text-white font-medium text-lg">{image.title}</h3>
                    </div>
                  </div>
                )
              ))}
            </div>
            
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-12">
              <button 
                onClick={() => navigateModal('prev')}
                className="text-white hover:text-skyblue p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-12">
              <button 
                onClick={() => navigateModal('next')}
                className="text-white hover:text-skyblue p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Gallery;
