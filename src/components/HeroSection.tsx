"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ChevronDown, Calendar, Wrench } from "lucide-react";
// import heroVideo from "../../public/videos/car-detail-video.mp4";

const HeroSection = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (contentRef.current) contentRef.current.classList.add('fade-in-up-delayed');
      if (h1Ref.current) h1Ref.current.classList.add('slide-up');
      if (pRef.current) pRef.current.classList.add('fade-in-up-delayed');
      if (buttonsRef.current) buttonsRef.current.classList.add('bounce-in');
      if (scrollRef.current) scrollRef.current.classList.add('bounce-gentle');
    }, 100); // Small delay to ensure DOM is ready

    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('about-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden mt-20">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="https://videos.pexels.com/video-files/6159294/6159294-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Enhanced Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 particle-bg"></div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-4xl px-6 space-y-8 text-white opacity-0">
        <h1
          ref={h1Ref}
          className="text-5xl md:text-7xl font-extrabold leading-tight opacity-0 bg-gradient-to-r from-white via-sky-200 to-sky-400 bg-clip-text text-transparent"
        >
          Get a <span className="text-sky-300 drop-shadow-lg">Showroom Shine</span>,<br />
          Anytime, Anywhere!
        </h1>
        <p
          ref={pRef}
          className="text-lg md:text-xl text-gray-100 opacity-0 max-w-2xl mx-auto leading-relaxed"
          style={{ animationDelay: '0.3s' }}
        >
          Professional mobile detailing service at your doorstep.
          We bring premium products and skilled expertise to give
          your car the shine it deserves.
        </p>
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center opacity-0">
          <Link
            href="/booking"
            className="group bg-gradient-to-r from-sky-500 to-sky-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl hover:from-sky-600 hover:to-sky-700 hover:-translate-y-2 transform transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Calendar size={20} />
            <span>Book Now</span>
          </Link>
          <Link
            href="/services/mobile-detailing"
            className="group bg-white text-gray-900 border-2 border-sky-400 px-10 py-4 rounded-full text-lg font-semibold hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:-translate-y-2 transform transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Wrench size={20} />
            <span>Our Services</span>
          </Link>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer text-white opacity-0"
        onClick={scrollToNext}
      >
        <ChevronDown size={32} className="animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
