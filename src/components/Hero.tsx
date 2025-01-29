import React from 'react';

export default function Hero() {
  return (
    <section className="py-20 text-center bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          ScrapeMaster Pro
        </h1>
        <h2 className="text-xl md:text-2xl text-white/90 mb-8">
          Powerful Web Scraping Made Simple
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-8">
          Extract, transform, and analyze web data with ease. 
          Built for developers, researchers, and data enthusiasts.
        </p>
        <button className="bg-white text-purple-600 hover:bg-purple-100 font-bold py-3 px-8 rounded-lg transition-colors duration-200">
          Get Started
        </button>
      </div>
    </section>
  );
} 