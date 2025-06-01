
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import ImageUpload from '@/components/ImageUpload';
import NFTPreview from '@/components/NFTPreview';
import NFTForm from '@/components/NFTForm';

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

  const handleImageClear = () => {
    setImageFile(null);
    setImagePreview('');
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
              <ImageUpload
                imageFile={imageFile}
                imagePreview={imagePreview}
                onImageUpload={handleImageUpload}
                onImageClear={handleImageClear}
              />
              <NFTPreview
                imagePreview={imagePreview}
                name={formData.name}
                description={formData.description}
              />
            </div>

            {/* Form */}
            <NFTForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleCreate}
              isCreating={isCreating}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Create;
