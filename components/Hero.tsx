"use client";

import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative pt-32">
      {/* Video Section */}
      <div className="relative mb-8">
        <video 
          className="w-72 h-72 object-cover rounded-full" 
          autoPlay 
          muted 
          loop
          playsInline
        >
          <source src="/assets/hero_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Optional overlay for better visual integration */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="text-center max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-6xl md:text-6xl font-bold text-white mb-6">
          CryptoWiki
        </h1>
        
        {/* Description */}
        <p className="text-gray-400 text-lg md:text-lg mb-14 max-w-2xl mx-auto leading-relaxed">
          Your comprehensive Web3 research assistant. Get instant insights about cryptocurrencies, protocols, and blockchain projects.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-14">
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-xl border border-gray-600 transition-all duration-300 flex items-center space-x-3 min-w-[200px]">
            <Search className="w-5 h-5" />
            <span>Start Research</span>
          </button>
          <button className="text-white hover:text-gray-300 transition-colors flex items-center space-x-2">
            <span>Learn More</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Flow Logos */}
        <div className="flex items-center justify-center gap-12 opacity-60">
          <div className="flex items-center space-x-2">
            <Image src="/assets/Flow.png" alt="Flow" width={80} height={32} />
          </div>
          
          <div className="flex items-center space-x-2">
            <Image src="/assets/Flow.png" alt="Flow" width={80} height={32} />
          </div>
          
          <div className="flex items-center space-x-2">
            <Image src="/assets/Flow.png" alt="Flow" width={80} height={32} />
          </div>
          
          <div className="flex items-center space-x-2">
            <Image src="/assets/Flow.png" alt="Flow" width={80} height={32} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;