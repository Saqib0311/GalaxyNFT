
import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowLeft, Verified, TrendingUp, Users, Image as ImageIcon } from 'lucide-react';
import Header from '@/components/Header';
import NFTCard from '@/components/NFTCard';

const CollectionDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const collection = location.state?.collection;
  const [searchTerm, setSearchTerm] = useState('');

  // Mock NFTs for this collection
  const collectionNFTs = [
    {
      id: '1',
      name: `${collection?.name} #1234`,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      creator: collection?.creator || 'Creator',
      price: '2.5',
      currency: 'ETH',
      likes: 142,
      views: 1205,
      isAuction: false
    },
    {
      id: '2',
      name: `${collection?.name} #5678`,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop',
      creator: collection?.creator || 'Creator',
      price: '1.8',
      currency: 'ETH',
      likes: 89,
      views: 756,
      isAuction: true,
      timeLeft: '2h 15m'
    },
    {
      id: '3',
      name: `${collection?.name} #9012`,
      image: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=400&fit=crop',
      creator: collection?.creator || 'Creator',
      price: '3.2',
      currency: 'ETH',
      likes: 267,
      views: 1888,
      isAuction: false
    }
  ];

  const filteredNFTs = collectionNFTs.filter(nft =>
    nft.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLike = (id: string) => {
    console.log('Liked NFT:', id);
  };

  const handleView = (nft: any) => {
    console.log('Viewing NFT:', nft);
  };

  if (!collection) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8 text-center">
          <p className="text-white">Collection not found</p>
          <Button onClick={() => navigate('/collections')} className="mt-4">
            Back to Collections
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          onClick={() => navigate('/collections')}
          variant="ghost"
          className="mb-6 text-white/80 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Collections
        </Button>

        {/* Collection Header */}
        <div className="glass-card p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Collection Images */}
            <div className="flex space-x-4">
              <img 
                src={collection.images[0]} 
                alt={collection.name}
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div className="flex flex-col space-y-2">
                <img 
                  src={collection.images[1]} 
                  alt=""
                  className="w-24 h-16 rounded object-cover"
                />
                <img 
                  src={collection.images[2]} 
                  alt=""
                  className="w-24 h-16 rounded object-cover"
                />
              </div>
            </div>

            {/* Collection Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{collection.name}</h1>
                  {collection.verified && (
                    <Verified className="w-6 h-6 text-galaxy-cyan" />
                  )}
                </div>
                <p className="text-white/60">by {collection.creator}</p>
                <p className="text-white/80 mt-4">{collection.description}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <ImageIcon className="w-4 h-4 text-galaxy-cyan" />
                    <span className="text-2xl font-bold text-white">{collection.items}</span>
                  </div>
                  <div className="text-white/60 text-sm">Items</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Users className="w-4 h-4 text-galaxy-purple" />
                    <span className="text-2xl font-bold text-white">{collection.owners}</span>
                  </div>
                  <div className="text-white/60 text-sm">Owners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{collection.floorPrice} ETH</div>
                  <div className="text-white/60 text-sm">Floor Price</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-2xl font-bold text-green-400">{collection.change}</span>
                  </div>
                  <div className="text-white/60 text-sm">24h Change</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search NFTs */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <Input
              placeholder="Search items in this collection..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
        </div>

        {/* NFTs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNFTs.map((nft) => (
            <NFTCard
              key={nft.id}
              nft={nft}
              onLike={handleLike}
              onView={handleView}
            />
          ))}
        </div>

        {filteredNFTs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">No items found in this collection</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CollectionDetail;
