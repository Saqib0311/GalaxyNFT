
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Image as ImageIcon, Wand2 } from 'lucide-react';
import Header from '@/components/Header';

const Create = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    royalties: '',
    price: '',
    currency: 'ETH'
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = () => {
    if (!formData.name || !formData.description || !imageFile) {
      alert('Please fill in all required fields');
      return;
    }
    
    console.log('Creating NFT:', { ...formData, imageFile });
    alert('NFT creation functionality will be implemented with smart contracts!');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Create <span className="gradient-text">NFT</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Turn your digital art into an NFT and sell it on our marketplace
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Upload */}
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Upload Image <span className="text-red-400">*</span>
                </label>
                <div className="glass-card p-8 text-center">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <Button 
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview('');
                        }}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-galaxy-purple/20 rounded-full mx-auto flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-galaxy-purple" />
                      </div>
                      <div>
                        <p className="text-white mb-2">PNG, JPG, GIF up to 10MB</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload">
                          <Button 
                            as="div"
                            className="bg-cosmic-gradient hover:opacity-90 cursor-pointer"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Choose File
                          </Button>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Preview */}
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
                    <h4 className="text-white font-medium">{formData.name || 'NFT Name'}</h4>
                    <p className="text-white/60 text-sm">{formData.description || 'NFT Description'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Name <span className="text-red-400">*</span>
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
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
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your NFT"
                  rows={4}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Category</label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
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
                  onChange={(e) => handleInputChange('royalties', e.target.value)}
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
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Currency</label>
                  <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
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
                onClick={handleCreate}
                size="lg"
                className="w-full bg-cosmic-gradient hover:opacity-90 text-white font-semibold"
              >
                <Wand2 className="w-5 h-5 mr-2" />
                Create NFT
              </Button>

              <p className="text-white/60 text-sm text-center">
                Creating an NFT requires a small gas fee and will mint your item on the blockchain
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Create;
