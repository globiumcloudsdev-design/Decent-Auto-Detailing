"use client";

import { useEffect } from "react";
import Link from "next/link";

const NotFound = () => {
  useEffect(() => {
    document.title = "404 - Page Not Found | Decent Auto Detailing";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-skyblue mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link 
          href="/"
          className="bg-skyblue text-white px-6 py-3 rounded-full hover:bg-blue-500 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
