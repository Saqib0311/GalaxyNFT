
import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Crown, Verified } from 'lucide-react';

const FeaturedCollections = () => {
  const collections = [
    {
      id: 1,
      name: "Cosmic Apes",
      creator: "ArtistX",
      floorPrice: "2.5",
      volume: "1,234",
      change: "+15.2%",
      verified: true,
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
      images: [
        "https://images.unsplash.com/photo-1617791160588-241658c0f566?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1620121684840-175e3da5d460?w=200&h=200&fit=crop"
      ]
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Crown className="w-6 h-6 text-galaxy-cyan" />
            <span className="text-galaxy-cyan font-semibold">FEATURED COLLECTIONS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trending Collections
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover the most popular and valuable NFT collections in the galaxy
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {collections.map((collection, index) => (
            <div key={collection.id} className="glass-card p-6 nft-card-hover group">
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

                <Button 
                  className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  variant="outline"
                >
                  View Collection
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-cosmic-gradient hover:opacity-90 text-white font-semibold px-8"
          >
            View All Collections
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
