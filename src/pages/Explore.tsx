
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Grid, List, TrendingUp } from 'lucide-react';
import NFTCard from '@/components/NFTCard';
import Header from '@/components/Header';

const Explore = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [category, setCategory] = useState('all');

  // Mock NFT data
  const allNFTs = [
    {
      id: '1',
      name: 'Cosmic Explorer #1234',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      creator: 'SpaceArtist',
      price: '2.5',
      currency: 'ETH',
      likes: 142,
      views: 1205,
      isAuction: false,
      category: 'art'
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
      timeLeft: '2h 15m',
      category: 'gaming'
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
      isAuction: false,
      category: 'art'
    },
    {
      id: '4',
      name: 'Digital Beat',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      creator: 'MusicMaster',
      price: '0.9',
      currency: 'ETH',
      likes: 324,
      views: 2134,
      isAuction: false,
      category: 'music'
    }
  ];

  const filteredNFTs = allNFTs.filter(nft => {
    const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nft.creator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || nft.category === category;
    return matchesSearch && matchesCategory;
  });

  const sortedNFTs = [...filteredNFTs].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'price-high':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'popular':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const handleLike = (id: string) => {
    console.log('Liked NFT:', id);
  };

  const handleView = (nft: any) => {
    console.log('Viewing NFT:', nft);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Explore <span className="gradient-text">NFTs</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover amazing digital artworks and collectibles from creators around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <Input
              placeholder="Search NFTs, creators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Select value={sortBy} onValueChange={setSortBy}>
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

            <Select value={category} onValueChange={setCategory}>
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

        {/* Results */}
        <div className="mb-4">
          <p className="text-white/70">
            Found {sortedNFTs.length} NFT{sortedNFTs.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* NFT Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {sortedNFTs.map((nft) => (
            <NFTCard
              key={nft.id}
              nft={nft}
              onLike={handleLike}
              onView={handleView}
            />
          ))}
        </div>

        {sortedNFTs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">No NFTs found matching your criteria</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Explore;
