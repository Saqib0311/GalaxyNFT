
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Image as ImageIcon, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const Create = () => {
  const { toast } = useToast();
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
  const [isCreating, setIsCreating] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 10MB",
          variant: "destructive",
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (PNG, JPG, GIF)",
          variant: "destructive",
        });
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      toast({
        title: "Image uploaded",
        description: `${file.name} has been selected`,
      });
    }
  };

  const uploadToIPFS = async (file: File): Promise<string> => {
    // Simulate IPFS upload - in a real app, you'd use a service like Pinata or IPFS
    const formData = new FormData();
    formData.append('file', file);
    
    // Mock IPFS hash generation
    const mockHash = `QmX${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return `https://ipfs.io/ipfs/${mockHash}`;
  };

  const handleCreate = async () => {
    if (!formData.name || !formData.description || !imageFile) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields and upload an image",
        variant: "destructive",
      });
      return;
    }
    
    setIsCreating(true);
    
    try {
      // Upload image to IPFS
      toast({
        title: "Uploading to IPFS...",
        description: "Your image is being uploaded to IPFS",
      });
      
      const imageUrl = await uploadToIPFS(imageFile);
      
      // Create metadata
      const metadata = {
        name: formData.name,
        description: formData.description,
        image: imageUrl,
        category: formData.category,
        attributes: [
          {
            trait_type: "Category",
            value: formData.category
          }
        ]
      };
      
      // In a real app, you would:
      // 1. Upload metadata to IPFS
      // 2. Call smart contract to mint NFT
      // 3. Wait for transaction confirmation
      
      console.log('Creating NFT with data:', {
        ...formData,
        imageFile: imageFile.name,
        imageUrl,
        metadata
      });
      
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "NFT Created Successfully!",
        description: `"${formData.name}" has been minted and added to your collection`,
      });
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        category: '',
        royalties: '',
        price: '',
        currency: 'ETH'
      });
      setImageFile(null);
      setImagePreview('');
      
    } catch (error) {
      console.error('Error creating NFT:', error);
      toast({
        title: "Error creating NFT",
        description: "There was an error creating your NFT. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
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
                      <div className="text-white/60 text-sm mb-2">
                        {imageFile?.name} ({(imageFile?.size || 0 / 1024 / 1024).toFixed(2)} MB)
                      </div>
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
                            type="button"
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default Create;
