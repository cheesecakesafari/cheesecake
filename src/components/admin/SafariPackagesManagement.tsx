import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, MapPin, Star } from 'lucide-react';

interface SafariPackage {
  id: string;
  title: string;
  description: string | null;
  short_description: string | null;
  price: number | null;
  original_price: number | null;
  duration: string | null;
  group_size: string | null;
  destinations: string[] | null;
  features: string[] | null;
  image_url: string | null;
  badge: string | null;
  rating: number | null;
  reviews: number | null;
  is_featured: boolean | null;
  detailed_info: any;
  created_at: string;
  updated_at: string;
}

export function SafariPackagesManagement() {
  const [packages, setPackages] = useState<SafariPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPackage, setEditingPackage] = useState<SafariPackage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    short_description: '',
    price: '',
    original_price: '',
    duration: '',
    group_size: '',
    destinations: '',
    features: '',
    image_url: '',
    badge: '',
    rating: '',
    reviews: '',
    is_featured: false
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPackages(data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast({
        title: "Error",
        description: "Failed to fetch safari packages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const packageData = {
        title: formData.title,
        description: formData.description || null,
        short_description: formData.short_description || null,
        price: formData.price ? parseFloat(formData.price) : null,
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        duration: formData.duration || null,
        group_size: formData.group_size || null,
        destinations: formData.destinations ? formData.destinations.split(',').map(d => d.trim()) : null,
        features: formData.features ? formData.features.split(',').map(f => f.trim()) : null,
        image_url: formData.image_url || null,
        badge: formData.badge || null,
        rating: formData.rating ? parseFloat(formData.rating) : null,
        reviews: formData.reviews ? parseInt(formData.reviews) : null,
        is_featured: formData.is_featured
      };

      if (editingPackage) {
        const { error } = await supabase
          .from('trips')
          .update(packageData)
          .eq('id', editingPackage.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Package updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('trips')
          .insert([packageData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Package added successfully"
        });
      }

      setIsDialogOpen(false);
      setEditingPackage(null);
      resetForm();
      fetchPackages();
    } catch (error) {
      console.error('Error saving package:', error);
      toast({
        title: "Error",
        description: "Failed to save package",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (pkg: SafariPackage) => {
    setEditingPackage(pkg);
    setFormData({
      title: pkg.title,
      description: pkg.description || '',
      short_description: pkg.short_description || '',
      price: pkg.price?.toString() || '',
      original_price: pkg.original_price?.toString() || '',
      duration: pkg.duration || '',
      group_size: pkg.group_size || '',
      destinations: pkg.destinations?.join(', ') || '',
      features: pkg.features?.join(', ') || '',
      image_url: pkg.image_url || '',
      badge: pkg.badge || '',
      rating: pkg.rating?.toString() || '',
      reviews: pkg.reviews?.toString() || '',
      is_featured: pkg.is_featured ?? false
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (packageId: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;

    try {
      const { error } = await supabase
        .from('trips')
        .delete()
        .eq('id', packageId);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Package deleted successfully"
      });
      fetchPackages();
    } catch (error) {
      console.error('Error deleting package:', error);
      toast({
        title: "Error",
        description: "Failed to delete package",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      short_description: '',
      price: '',
      original_price: '',
      duration: '',
      group_size: '',
      destinations: '',
      features: '',
      image_url: '',
      badge: '',
      rating: '',
      reviews: '',
      is_featured: false
    });
  };

  const openAddDialog = () => {
    setEditingPackage(null);
    resetForm();
    setIsDialogOpen(true);
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Safari Packages ({packages.length})</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add New Package</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPackage ? 'Edit Package' : 'Add New Package'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title">Package Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g., Maasai Mara Adventure"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="1500"
                  />
                </div>

                <div>
                  <Label htmlFor="original_price">Original Price ($)</Label>
                  <Input
                    id="original_price"
                    type="number"
                    step="0.01"
                    value={formData.original_price}
                    onChange={(e) => setFormData({...formData, original_price: e.target.value})}
                    placeholder="2000"
                  />
                </div>

                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="3 Days / 2 Nights"
                  />
                </div>

                <div>
                  <Label htmlFor="group_size">Group Size</Label>
                  <Input
                    id="group_size"
                    value={formData.group_size}
                    onChange={(e) => setFormData({...formData, group_size: e.target.value})}
                    placeholder="2-6 People"
                  />
                </div>

                <div>
                  <Label htmlFor="badge">Badge</Label>
                  <Input
                    id="badge"
                    value={formData.badge}
                    onChange={(e) => setFormData({...formData, badge: e.target.value})}
                    placeholder="POPULAR"
                  />
                </div>

                <div>
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: e.target.value})}
                    placeholder="4.8"
                  />
                </div>

                <div>
                  <Label htmlFor="reviews">Number of Reviews</Label>
                  <Input
                    id="reviews"
                    type="number"
                    value={formData.reviews}
                    onChange={(e) => setFormData({...formData, reviews: e.target.value})}
                    placeholder="120"
                  />
                </div>

                <div>
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="short_description">Short Description</Label>
                <Textarea
                  id="short_description"
                  value={formData.short_description}
                  onChange={(e) => setFormData({...formData, short_description: e.target.value})}
                  placeholder="Brief description..."
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="description">Full Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Detailed package description..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="destinations">Destinations (comma separated)</Label>
                <Input
                  id="destinations"
                  value={formData.destinations}
                  onChange={(e) => setFormData({...formData, destinations: e.target.value})}
                  placeholder="Maasai Mara, Nakuru, Amboseli"
                />
              </div>

              <div>
                <Label htmlFor="features">Features (comma separated)</Label>
                <Input
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({...formData, features: e.target.value})}
                  placeholder="Game Drives, Accommodation, Meals"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                />
                <Label htmlFor="is_featured">Featured Package</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPackage ? 'Update' : 'Add'} Package
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {packages.map((pkg) => (
          <Card key={pkg.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">{pkg.title}</h4>
                    {pkg.badge && (
                      <Badge variant="secondary">{pkg.badge}</Badge>
                    )}
                    {pkg.is_featured && (
                      <Badge>Featured</Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>
                      {pkg.price && <p><strong>Price:</strong> ${pkg.price}</p>}
                      {pkg.duration && <p><strong>Duration:</strong> {pkg.duration}</p>}
                      {pkg.group_size && <p><strong>Group Size:</strong> {pkg.group_size}</p>}
                      {pkg.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{pkg.rating}</span>
                          {pkg.reviews && <span>({pkg.reviews} reviews)</span>}
                        </div>
                      )}
                    </div>
                    <div>
                      {pkg.destinations && pkg.destinations.length > 0 && (
                        <div>
                          <strong>Destinations:</strong>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {pkg.destinations.map((dest, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {dest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {pkg.short_description && (
                    <p className="text-sm text-muted-foreground mt-2">{pkg.short_description}</p>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(pkg)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(pkg.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {packages.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No packages added yet</h3>
              <p className="text-muted-foreground mb-4">Start by adding your first safari package</p>
              <Button onClick={openAddDialog}>Add First Package</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}