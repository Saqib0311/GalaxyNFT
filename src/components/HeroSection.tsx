
import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Image } from 'lucide-react';

const HeroSection = () => {
  const stats = [
    { label: 'Total Sales', value: '234.5K ETH', icon: TrendingUp },
    { label: 'Active Users', value: '180K+', icon: Users },
    { label: 'NFTs Minted', value: '2.1M', icon: Image }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-galaxy-purple/20 via-galaxy-pink/20 to-galaxy-cyan/20 opacity-50"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-galaxy-purple/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-galaxy-cyan/20 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover, Create & Trade
            <span className="block gradient-text">
              Extraordinary NFTs
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            The premier destination for digital art and collectibles. 
            Join millions of creators and collectors in the NFT revolution.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-cosmic-gradient hover:opacity-90 text-white font-semibold px-8 py-4 text-lg rounded-xl"
            >
              Explore NFTs
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl backdrop-blur-sm"
            >
              Create Collection
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card p-6 text-center nft-card-hover">
                <stat.icon className="w-8 h-8 text-galaxy-cyan mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
