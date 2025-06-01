
import React from 'react';

interface NFTPreviewProps {
  imagePreview: string;
  name: string;
  description: string;
}

const NFTPreview: React.FC<NFTPreviewProps> = ({
  imagePreview,
  name,
  description
}) => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-white font-semibold mb-4">Preview</h3>
      <div className="space-y-4">
        <div className="w-full h-48 bg-white/5 rounded-lg flex items-center justify-center">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <p className="text-white/50">Image preview will appear here</p>
          )}
        </div>
        <div>
          <h4 className="text-white font-medium">{name || 'NFT Name'}</h4>
          <p className="text-white/60 text-sm">{description || 'NFT Description'}</p>
        </div>
      </div>
    </div>
  );
};

export default NFTPreview;
