import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Button } from './button';
import { Upload, X } from 'lucide-react';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GalleryModal = ({ isOpen, onClose }: GalleryModalProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchImages();
    }
  }, [isOpen]);

  const fetchImages = async () => {
    try {
      // Load images from static JSON in public/data/gallery.json
      const res = await fetch('/data/gallery.json');
      if (!res.ok) throw new Error('Failed to load gallery');
      const imageUrls: string[] = await res.json();
      setImages(imageUrls || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Uploads are disabled in static mode — prompt user to add images to public/lovable-uploads/ and list them in public/data/gallery.json
    console.warn('Upload disabled in static mode. Add images to public/lovable-uploads/ and list them in public/data/gallery.json');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Gallery
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Upload Section */}
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="image-upload"
              disabled={uploading}
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {uploading ? 'Uploading...' : 'Click to upload image (max 10 images)'}
              </p>
            </label>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((imageUrl, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>

          {images.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No images in gallery yet. Upload some to get started!
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};