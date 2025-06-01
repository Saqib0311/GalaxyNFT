
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Grid, List } from 'lucide-react';
import NFTCard from './NFTCard';

const NFTGrid = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedNFT, setSelectedNFT] = useState<any>(null);

  // Mock NFT data
  const nfts = [
    {
      id: '1',
      name: 'Cosmic Explorer #1234',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      creator: 'SpaceArtist',
      price: '2.5',
      currency: 'ETH',
      likes: 142,
      views: 1205,
      isAuction: false
    },
    {
      id: '2',
      name: 'Galactic Warrior',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop',
      creator: 'DigitalPioneer',
      price: '1.8',
      currency: 'ETH',
      likes: 89,
      views: 756,
      isAuction: true,
      timeLeft: '2h 15m'
    },
    {
      id: '3',
      name: 'Nebula Dreams',
      image: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=400&fit=crop',
      creator: 'VisionaryMind',
      price: '3.2',
      currency: 'ETH',
      likes: 267,
      views: 1888,
      isAuction: false
    },
    {
      id: '4',
      name: 'Stellar Portal',
      image: 'https://images.unsplash.com/photo-1574192324001-ee41e18ed679?w=400&h=400&fit=crop',
      creator: 'CosmicCreator',
      price: '0.9',
      currency: 'ETH',
      likes: 324,
      views: 2134,
      isAuction: true,
      timeLeft: '5h 42m'
    },
    {
      id: '5',
      name: 'Digital Odyssey',
      image: 'https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?w=400&h=400&fit=crop',
      creator: 'FutureMaker',
      price: '1.5',
      currency: 'ETH',
      likes: 156,
      views: 987,
      isAuction: false
    },
    {
      id: '6',
      name: 'Quantum Reality',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop',
      creator: 'TechnoArtist',
      price: '4.1',
      currency: 'ETH',
      likes: 412,
      views: 3456,
      isAuction: false
    }
  ];

  const handleLike = (id: string) => {
    console.log('Liked NFT:', id);
  };

  const handleView = (nft: any) => {
    setSelectedNFT(nft);
    console.log('Viewing NFT:', nft);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore <span className="gradient-text">NFTs</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover unique digital artworks and collectibles from talented creators
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <Input
              placeholder="Search NFTs..."
              className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <Select defaultValue="recent">
              <SelectTrigger className="w-40 bg-white/5 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-galaxy-deep border-white/20">
                <SelectItem value="recent" className="text-white hover:bg-white/10">Recently Added</SelectItem>
                <SelectItem value="price-low" className="text-white hover:bg-white/10">Price: Low to High</SelectItem>
                <SelectItem value="price-high" className="text-white hover:bg-white/10">Price: High to Low</SelectItem>
                <SelectItem value="popular" className="text-white hover:bg-white/10">Most Popular</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-32 bg-white/5 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-galaxy-deep border-white/20">
                <SelectItem value="all" className="text-white hover:bg-white/10">All</SelectItem>
                <SelectItem value="art" className="text-white hover:bg-white/10">Art</SelectItem>
                <SelectItem value="gaming" className="text-white hover:bg-white/10">Gaming</SelectItem>
                <SelectItem value="music" className="text-white hover:bg-white/10">Music</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10">
              <Filter className="w-4 h-4" />
            </Button>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-white/20 rounded-lg p-1 bg-white/5">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                className={`w-8 h-8 ${viewMode === 'grid' ? 'bg-galaxy-purple' : 'text-white/60 hover:text-white'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                className={`w-8 h-8 ${viewMode === 'list' ? 'bg-galaxy-purple' : 'text-white/60 hover:text-white'}`}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* NFT Grid */}
        <div className={`grid gap-6 mb-12 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {nfts.map((nft) => (
            <NFTCard
              key={nft.id}
              nft={nft}
              onLike={handleLike}
              onView={handleView}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-white/20 text-white hover:bg-white/10 px-8"
          >
            Load More NFTs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NFTGrid;
