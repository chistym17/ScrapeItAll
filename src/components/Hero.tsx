import React from 'react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-sky-50 to-indigo-50">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-zinc-800 mb-6">
          ScrapeMaster Pro
        </h1>
        <h2 className="text-xl md:text-2xl text-zinc-600 mb-8">
          Powerful Web Scraping Made Simple
        </h2>
        <p className="text-zinc-500 max-w-2xl mx-auto mb-10">
          Extract, transform, and analyze web data with ease. 
          Built for developers, researchers, and data enthusiasts.
        </p>
        <button className="bg-zinc-800 text-white hover:bg-zinc-700 font-medium py-3 px-8 rounded-md transition-colors duration-200">
          Get Started
        </button>
      </div>
    </section>
  );
} 