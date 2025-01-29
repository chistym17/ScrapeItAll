import React from 'react';
import Hero from '@/components/Hero';
import ScrapeForm from '@/components/ScrapeForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ScrapeForm />
      <Footer />
    </main>
  );
}
