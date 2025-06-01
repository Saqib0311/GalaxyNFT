
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wand2 } from 'lucide-react';

interface FormData {
  name: string;
  description: string;
  category: string;
  royalties: string;
  price: string;
  currency: string;
}

interface NFTFormProps {
  formData: FormData;
  onInputChange: (field: string, value: string) => void;
  onSubmit: () => void;
  isCreating: boolean;
}

const NFTForm: React.FC<NFTFormProps> = ({
  formData,
  onInputChange,
  onSubmit,
  isCreating
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-white font-semibold mb-2">
          Name <span className="text-red-400">*</span>
        </label>
        <Input
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          placeholder="Enter NFT name"
          className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
        />
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          Description <span className="text-red-400">*</span>
        </label>
        <Textarea
          value={formData.description}
          onChange={(e) => onInputChange('description', e.target.value)}
          placeholder="Describe your NFT"
          rows={4}
          className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
        />
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">Category</label>
        <Select value={formData.category} onValueChange={(value) => onInputChange('category', value)}>
          <SelectTrigger className="bg-white/5 border-white/20 text-white">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-galaxy-deep border-white/20">
            <SelectItem value="art" className="text-white hover:bg-white/10">Art</SelectItem>
            <SelectItem value="gaming" className="text-white hover:bg-white/10">Gaming</SelectItem>
            <SelectItem value="music" className="text-white hover:bg-white/10">Music</SelectItem>
            <SelectItem value="photography" className="text-white hover:bg-white/10">Photography</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">Royalties (%)</label>
        <Input
          type="number"
          value={formData.royalties}
          onChange={(e) => onInputChange('royalties', e.target.value)}
          placeholder="0-10"
          min="0"
          max="10"
          className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white font-semibold mb-2">Price</label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => onInputChange('price', e.target.value)}
            placeholder="0.00"
            step="0.01"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">Currency</label>
          <Select value={formData.currency} onValueChange={(value) => onInputChange('currency', value)}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-galaxy-deep border-white/20">
              <SelectItem value="ETH" className="text-white hover:bg-white/10">ETH</SelectItem>
              <SelectItem value="MATIC" className="text-white hover:bg-white/10">MATIC</SelectItem>
              <SelectItem value="BNB" className="text-white hover:bg-white/10">BNB</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        onClick={onSubmit}
        disabled={isCreating}
        size="lg"
        className="w-full bg-cosmic-gradient hover:opacity-90 text-white font-semibold disabled:opacity-50"
      >
        <Wand2 className="w-5 h-5 mr-2" />
        {isCreating ? 'Creating NFT...' : 'Create NFT'}
      </Button>

      <p className="text-white/60 text-sm text-center">
        Creating an NFT requires a small gas fee and will mint your item on the blockchain
      </p>
    </div>
  );
};

export default NFTForm;
