
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, ArrowLeft, Image as ImageIcon, Plus } from 'lucide-react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';

const CreateCollection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    discord: '',
    twitter: ''
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string>('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateCollection = () => {
    if (!formData.name || !formData.description) {
      alert('Please fill in the required fields');
      return;
    }
    
    console.log('Creating collection:', { ...formData, logoFile, bannerFile });
    alert('Collection created successfully!');
    navigate('/collections');
  };

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

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Create <span className="gradient-text">Collection</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Create a new collection to organize and showcase your NFTs
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images Upload */}
            <div className="space-y-6">
              {/* Logo Upload */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Collection Logo <span className="text-red-400">*</span>
                </label>
                <div className="glass-card p-6 text-center">
                  {logoPreview ? (
                    <div className="space-y-4">
                      <img 
                        src={logoPreview} 
                        alt="Logo Preview" 
                        className="w-24 h-24 object-cover rounded-full mx-auto"
                      />
                      <Button 
                        onClick={() => {
                          setLogoFile(null);
                          setLogoPreview('');
                        }}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                        size="sm"
                      >
                        Change Logo
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-galaxy-purple/20 rounded-full mx-auto flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-galaxy-purple" />
                      </div>
                      <div>
                        <p className="text-white/80 mb-2 text-sm">Recommended: 400x400px</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                          id="logo-upload"
                        />
                        <label htmlFor="logo-upload">
                          <Button 
                            as="div"
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/10 cursor-pointer"
                            size="sm"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Logo
                          </Button>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Banner Upload */}
              <div>
                <label className="block text-white font-semibold mb-2">Collection Banner</label>
                <div className="glass-card p-6 text-center">
                  {bannerPreview ? (
                    <div className="space-y-4">
                      <img 
                        src={bannerPreview} 
                        alt="Banner Preview" 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button 
                        onClick={() => {
                          setBannerFile(null);
                          setBannerPreview('');
                        }}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                        size="sm"
                      >
                        Change Banner
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-full h-24 bg-galaxy-purple/20 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-galaxy-purple" />
                      </div>
                      <div>
                        <p className="text-white/80 mb-2 text-sm">Recommended: 1200x400px</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBannerUpload}
                          className="hidden"
                          id="banner-upload"
                        />
                        <label htmlFor="banner-upload">
                          <Button 
                            as="div"
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

              {/* Preview */}
              <div className="glass-card p-6">
                <h3 className="text-white font-semibold mb-4">Preview</h3>
                <div className="space-y-4">
                  <div className="w-full h-24 bg-white/5 rounded-lg overflow-hidden">
                    {bannerPreview && (
                      <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/5 rounded-full overflow-hidden">
                      {logoPreview && (
                        <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{formData.name || 'Collection Name'}</h4>
                      <p className="text-white/60 text-sm">{formData.description || 'Collection Description'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-6">
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

              <div>
                <label className="block text-white font-semibold mb-2">Website</label>
                <Input
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Discord</label>
                <Input
                  value={formData.discord}
                  onChange={(e) => handleInputChange('discord', e.target.value)}
                  placeholder="https://discord.gg/yourinvite"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Twitter</label>
                <Input
                  value={formData.twitter}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                  placeholder="@yourusername"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <Button 
                onClick={handleCreateCollection}
                size="lg"
                className="w-full bg-cosmic-gradient hover:opacity-90 text-white font-semibold"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Collection
              </Button>

              <p className="text-white/60 text-sm text-center">
                Creating a collection is free and helps organize your NFTs
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateCollection;
