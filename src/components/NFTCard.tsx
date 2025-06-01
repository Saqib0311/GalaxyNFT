
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Eye, Clock } from 'lucide-react';

interface NFTCardProps {
  nft: {
    id: string;
    name: string;
    image: string;
    creator: string;
    price: string;
    currency: string;
    likes: number;
    views: number;
    timeLeft?: string;
    isAuction?: boolean;
  };
  onLike?: (id: string) => void;
  onView?: (nft: any) => void;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, onLike, onView }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    onLike?.(nft.id);
  };

  const handleCardClick = () => {
    onView?.(nft);
  };

  return (
    <div 
      className="glass-card p-4 nft-card-hover cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* NFT Image */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img 
          src={nft.image} 
          alt={nft.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay with actions */}
        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center space-x-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
          >
            Quick View
          </Button>
        </div>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all"
        >
          <Heart 
            className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-current' : 'text-white'}`} 
          />
        </button>

        {/* Auction Timer */}
        {nft.isAuction && nft.timeLeft && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-galaxy-purple/80 backdrop-blur-sm">
            <div className="flex items-center space-x-1 text-xs text-white">
              <Clock className="w-3 h-3" />
              <span>{nft.timeLeft}</span>
            </div>
          </div>
        )}
      </div>

      {/* NFT Info */}
      <div className="space-y-3">
        <h3 className="font-semibold text-white text-lg line-clamp-1">{nft.name}</h3>
        
        <div className="flex items-center justify-between text-sm text-white/60">
          <span>by {nft.creator}</span>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{nft.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{nft.likes}</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-white/60 mb-1">
              {nft.isAuction ? 'Current bid' : 'Price'}
            </div>
            <div className="text-xl font-bold text-white">
              {nft.price} <span className="text-galaxy-cyan">{nft.currency}</span>
            </div>
          </div>
          
          <Button 
            size="sm"
            className="bg-galaxy-purple hover:bg-galaxy-purple/80 text-white"
          >
            {nft.isAuction ? 'Place Bid' : 'Buy Now'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
