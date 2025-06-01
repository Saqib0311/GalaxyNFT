
import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  imageFile: File | null;
  imagePreview: string;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageClear: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  imageFile,
  imagePreview,
  onImageUpload,
  onImageClear
}) => {
  const handleButtonClick = () => {
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
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
              className="w-full h-64 object-cover rounded-lg border border-white/20"
            />
            <div className="text-white/80 text-sm mb-2 bg-black/20 rounded p-2">
              {imageFile?.name} ({((imageFile?.size || 0) / 1024 / 1024).toFixed(2)} MB)
            </div>
            <Button 
              onClick={onImageClear}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
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
                onChange={onImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Button 
                type="button"
                onClick={handleButtonClick}
                className="bg-cosmic-gradient hover:opacity-90"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
