
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Verified, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';

const Collections = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const collections = [
    {
      id: 1,
      name: "Cosmic Apes",
      creator: "ArtistX",
      floorPrice: "2.5",
      volume: "1,234",
      change: "+15.2%",
      verified: true,
      items: 10000,
      owners: 6789,
      description: "A collection of 10,000 unique cosmic apes exploring the galaxy",
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=200&h=200&fit=crop"
      ]
    },
    {
      id: 2,
      name: "Galaxy Warriors",
      creator: "PixelMaster",
      floorPrice: "1.8",
      volume: "987",
      change: "+8.7%",
      verified: true,
      items: 5000,
      owners: 3456,
      description: "Legendary warriors from across the galaxy, each with unique powers",
      images: [
        "https://images.unsplash.com/photo-1574192324001-ee41e18ed679?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&h=200&fit=crop"
      ]
    },
    {
      id: 3,
      name: "Digital Dreams",
      creator: "VisionaryArt",
      floorPrice: "0.9",
      volume: "2,156",
      change: "+22.4%",
      verified: false,
      items: 3333,
      owners: 2111,
      description: "Abstract digital art representing the dreams of tomorrow",
      images: [
        "https://images.unsplash.com/photo-1617791160588-241658c0f566?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1620121684840-175e3da5d460?w=200&h=200&fit=crop"
      ]
    }
  ];

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collection.creator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewCollection = (collection: any) => {
    navigate(`/collection/${collection.id}`, { state: { collection } });
  };

  const handleCreateCollection = () => {
    navigate('/create-collection');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            NFT <span className="gradient-text">Collections</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Explore curated collections of digital artworks and collectibles
          </p>
        </div>

        {/* Search and Create */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <Input
              placeholder="Search collections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <Button 
            onClick={handleCreateCollection}
            className="bg-cosmic-gradient hover:opacity-90 text-white font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Collection
          </Button>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCollections.map((collection) => (
            <div key={collection.id} className="glass-card p-6 nft-card-hover group cursor-pointer"
                 onClick={() => handleViewCollection(collection)}>
              {/* Collection Images */}
              <div className="flex space-x-2 mb-6">
                <img 
                  src={collection.images[0]} 
                  alt="" 
                  className="w-20 h-20 rounded-lg object-cover group-hover:scale-105 transition-transform"
                />
                <div className="flex flex-col space-y-2">
                  <img 
                    src={collection.images[1]} 
                    alt="" 
                    className="w-16 h-9 rounded object-cover group-hover:scale-105 transition-transform"
                  />
                  <img 
                    src={collection.images[2]} 
                    alt="" 
                    className="w-16 h-9 rounded object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              </div>

              {/* Collection Info */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-xl font-bold text-white">{collection.name}</h3>
                    {collection.verified && (
                      <Verified className="w-5 h-5 text-galaxy-cyan" />
                    )}
                  </div>
                  <p className="text-white/60">by {collection.creator}</p>
                  <p className="text-white/50 text-sm mt-2">{collection.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-white">{collection.items}</div>
                    <div className="text-xs text-white/60">Items</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{collection.owners}</div>
                    <div className="text-xs text-white/60">Owners</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-white">{collection.floorPrice} ETH</div>
                    <div className="text-xs text-white/60">Floor</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{collection.volume}</div>
                    <div className="text-xs text-white/60">Volume</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-green-400" />
                      <span className="text-lg font-bold text-green-400">{collection.change}</span>
                    </div>
                    <div className="text-xs text-white/60">24h</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCollections.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">No collections found matching your search</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Collections;
