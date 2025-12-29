import React, { useState, useEffect } from 'react';
// Static mode: images read from `public/data/website_images.json`. Uploads/persistence disabled.
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Upload, Image as ImageIcon } from 'lucide-react';

interface WebsiteImage {
  id: string;
  name: string;
  image_url: string;
  alt_text: string | null;
  category: string | null;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
}

export function WebsiteImagesManagement() {
  const [images, setImages] = useState<WebsiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingImage, setEditingImage] = useState<WebsiteImage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    alt_text: '',
    category: '',
    is_active: true
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch('/data/website_images.json');
      if (!res.ok) throw new Error('Failed to load website images');
      const data: WebsiteImage[] = await res.json();
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast({
        title: "Error",
        description: "Failed to fetch website images",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    throw new Error('Uploads are disabled in static mode. Add images to public/lovable-uploads/ and update public/data/website_images.json');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingImage && !selectedFile) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    
    try {
      let imageUrl = editingImage?.image_url || '';

      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      const imageData = {
        name: formData.name,
        image_url: imageUrl,
        alt_text: formData.alt_text || null,
        category: formData.category || null,
        is_active: formData.is_active
      };

      // Persistence disabled in static mode. To add/edit images, update public/data/website_images.json and place files under public/lovable-uploads/.
      toast({
        title: "Not Available",
        description: "Image upload/edit is disabled in static mode. Edit data files to persist changes.",
      });
    } catch (error) {
      console.error('Error saving image:', error);
      toast({
        title: "Error",
        description: "Failed to save image",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (image: WebsiteImage) => {
    setEditingImage(image);
    setFormData({
      name: image.name,
      alt_text: image.alt_text || '',
      category: image.category || '',
      is_active: image.is_active ?? true
    });
    setSelectedFile(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const { error } = await supabase
        .from('website_images')
        .delete()
        .eq('id', imageId);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Image deleted successfully"
      });
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      alt_text: '',
      category: '',
      is_active: true
    });
    setSelectedFile(null);
  };

  const openAddDialog = () => {
    setEditingImage(null);
    resetForm();
    setIsDialogOpen(true);
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Website Images ({images.length})</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Upload Image</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingImage ? 'Edit Image' : 'Upload New Image'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Image Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Hero Background"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  placeholder="e.g., hero, gallery, icons"
                />
              </div>

              <div>
                <Label htmlFor="alt_text">Alt Text</Label>
                <Input
                  id="alt_text"
                  value={formData.alt_text}
                  onChange={(e) => setFormData({...formData, alt_text: e.target.value})}
                  placeholder="Description for accessibility"
                />
              </div>

              <div>
                <Label htmlFor="image">Image File</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  required={!editingImage}
                />
                {editingImage && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Leave empty to keep current image
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? 'Uploading...' : editingImage ? 'Update' : 'Upload'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={image.image_url}
                  alt={image.alt_text || image.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(image)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDelete(image.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold truncate">{image.name}</h4>
                    {image.category && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        {image.category}
                      </Badge>
                    )}
                    <Badge 
                      variant={image.is_active ? "default" : "secondary"}
                      className="mt-1 ml-1 text-xs"
                    >
                      {image.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
                {image.alt_text && (
                  <p className="text-xs text-muted-foreground mt-2 truncate">
                    {image.alt_text}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {images.length === 0 && (
          <div className="col-span-full">
            <Card>
              <CardContent className="p-8 text-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No images uploaded yet</h3>
                <p className="text-muted-foreground mb-4">Start by uploading your first website image</p>
                <Button onClick={openAddDialog}>Upload First Image</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}