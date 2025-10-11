"use client";

import Link from "next/link";
// import heroVideo from "../../public/videos/car-detail-video.mp4";

const HeroSection = () => {
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
        // src='../../public/videos/car-detail-video.mp4'
        type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6 space-y-6 text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Get a <span className="text-sky-400">Showroom Shine</span>,<br />
          Anytime, Anywhere!
        </h1>
        <p className="text-lg md:text-xl text-gray-200">
          Professional mobile detailing service at your doorstep.  
          We bring premium products and skilled expertise to give  
          your car the shine it deserves.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/booking"
            className="bg-sky-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-sky-600 hover:-translate-y-1 transform transition"
          >
            Book Now
          </Link>
          <Link
            href="/services/mobile-detailing"
            className="bg-white text-gray-900 border-2 border-sky-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-sky-500 hover:text-white hover:-translate-y-1 transform transition"
          >
            Our Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
