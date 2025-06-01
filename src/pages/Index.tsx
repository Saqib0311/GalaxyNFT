
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturedCollections from '@/components/FeaturedCollections';
import NFTGrid from '@/components/NFTGrid';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCollections />
        <NFTGrid />
      </main>
    </div>
  );
};

export default Index;
