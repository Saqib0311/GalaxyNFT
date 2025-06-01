
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Image as ImageIcon, Plus, X, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const CreateCollection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    symbol: '',
    royalties: '',
    blockchain: 'Ethereum'
  });
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string>('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [socialLinks, setSocialLinks] = useState([{ platform: '', url: '' }]);
  const [isCreating, setIsCreating] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'logo') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 10MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'banner') {
          setBannerFile(file);
          setBannerPreview(reader.result as string);
        } else {
          setLogoFile(file);
          setLogoPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);

      toast({
        title: "Image uploaded",
        description: `${file.name} has been selected`,
      });
    }
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: '', url: '' }]);
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    const updated = socialLinks.map((link, i) => 
      i === index ? { ...link, [field]: value } : link
    );
    setSocialLinks(updated);
  };

  const handleCreate = async () => {
    if (!formData.name || !formData.description) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsCreating(true);
    
    try {
      const collectionData = {
        ...formData,
        bannerFile: bannerFile?.name,
        logoFile: logoFile?.name,
        socialLinks: socialLinks.filter(link => link.platform && link.url)
      };
      
      console.log('Creating collection with data:', collectionData);
      
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Collection Created Successfully!",
        description: `"${formData.name}" collection has been created`,
      });
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        category: '',
        symbol: '',
        royalties: '',
        blockchain: 'Ethereum'
      });
      setBannerFile(null);
      setBannerPreview('');
      setLogoFile(null);
      setLogoPreview('');
      setSocialLinks([{ platform: '', url: '' }]);
      
    } catch (error) {
      console.error('Error creating collection:', error);
      toast({
        title: "Error creating collection",
        description: "There was an error creating your collection. Please try again.",
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
            Create <span className="gradient-text">Collection</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Create your own NFT collection and organize your digital assets
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Banner Upload */}
          <div className="glass-card p-6">
            <h3 className="text-white font-semibold mb-4">Banner Image</h3>
            <div className="relative h-48 bg-white/5 rounded-lg overflow-hidden">
              {bannerPreview ? (
                <div className="relative h-full">
                  <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" />
                  <Button 
                    onClick={() => {
                      setBannerFile(null);
                      setBannerPreview('');
                    }}
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 border-white/20 text-white hover:bg-white/10"
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 text-white/50 mx-auto mb-4" />
                    <p className="text-white/60 mb-4">Recommended: 1400 x 400px</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'banner')}
                      className="hidden"
                      id="banner-upload"
                    />
                    <label htmlFor="banner-upload">
                      <Button 
                        type="button"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 cursor-pointer"
                        size="sm"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Banner
                      </Button>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Logo and Basic Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Logo Upload */}
            <div className="glass-card p-6">
              <h3 className="text-white font-semibold mb-4">Logo</h3>
              <div className="relative w-32 h-32 bg-white/5 rounded-full overflow-hidden mx-auto">
                {logoPreview ? (
                  <div className="relative h-full">
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                    <Button 
                      onClick={() => {
                        setLogoFile(null);
                        setLogoPreview('');
                      }}
                      variant="outline"
                      size="sm"
                      className="absolute -top-2 -right-2 border-white/20 text-white hover:bg-white/10 w-8 h-8 rounded-full p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="w-8 h-8 text-white/50 mx-auto mb-2" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'logo')}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label htmlFor="logo-upload">
                        <Button 
                          type="button"
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 cursor-pointer text-xs p-2"
                          size="sm"
                        >
                          Upload
                        </Button>
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-white/60 text-xs text-center mt-2">350 x 350px recommended</p>
            </div>

            {/* Basic Information */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Collection Name <span className="text-red-400">*</span>
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter collection name"
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
                  placeholder="Describe your collection"
                  rows={4}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                      <SelectItem value="collectibles" className="text-white hover:bg-white/10">Collectibles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Symbol</label>
                  <Input
                    value={formData.symbol}
                    onChange={(e) => handleInputChange('symbol', e.target.value)}
                    placeholder="e.g., MYNFT"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="glass-card p-6 space-y-6">
            <h3 className="text-white font-semibold">Additional Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">Blockchain</label>
                <Select value={formData.blockchain} onValueChange={(value) => handleInputChange('blockchain', value)}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-galaxy-deep border-white/20">
                    <SelectItem value="Ethereum" className="text-white hover:bg-white/10">Ethereum</SelectItem>
                    <SelectItem value="Polygon" className="text-white hover:bg-white/10">Polygon</SelectItem>
                    <SelectItem value="BSC" className="text-white hover:bg-white/10">Binance Smart Chain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Creator Royalties (%)</label>
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
            </div>

            {/* Social Links */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-white font-semibold">Social Links</label>
                <Button 
                  onClick={addSocialLink}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Link
                </Button>
              </div>
              <div className="space-y-3">
                {socialLinks.map((link, index) => (
                  <div key={index} className="grid grid-cols-3 gap-3">
                    <Select value={link.platform} onValueChange={(value) => updateSocialLink(index, 'platform', value)}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Platform" />
                      </SelectTrigger>
                      <SelectContent className="bg-galaxy-deep border-white/20">
                        <SelectItem value="twitter" className="text-white hover:bg-white/10">Twitter</SelectItem>
                        <SelectItem value="discord" className="text-white hover:bg-white/10">Discord</SelectItem>
                        <SelectItem value="instagram" className="text-white hover:bg-white/10">Instagram</SelectItem>
                        <SelectItem value="website" className="text-white hover:bg-white/10">Website</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      value={link.url}
                      onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                      placeholder="URL"
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                    />
                    <Button 
                      onClick={() => removeSocialLink(index)}
                      variant="outline"
                      size="sm"
                      className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Create Button */}
          <div className="text-center">
            <Button 
              onClick={handleCreate}
              disabled={isCreating}
              size="lg"
              className="bg-cosmic-gradient hover:opacity-90 text-white font-semibold px-12 disabled:opacity-50"
            >
              <Wand2 className="w-5 h-5 mr-2" />
              {isCreating ? 'Creating Collection...' : 'Create Collection'}
            </Button>
            <p className="text-white/60 text-sm mt-4">
              Creating a collection requires a one-time gas fee
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateCollection;
