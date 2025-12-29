import React, { useState, useEffect } from 'react';
// Supabase removed for static mode. Data is read from /public/data/company_cars.json
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Car, Upload } from 'lucide-react';

interface CompanyCar {
  id: string;
  name: string;
  number_plate: string;
  description: string | null;
  color: string | null;
  number_of_passengers: number | null;
  features: string[] | null;
  images: string[] | null;
  is_available: boolean | null;
  created_at: string;
  updated_at: string;
}

export function CompanyCarsManagement() {
  const [cars, setCars] = useState<CompanyCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCar, setEditingCar] = useState<CompanyCar | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    number_plate: '',
    description: '',
    color: '',
    number_of_passengers: '',
    features: '',
    is_available: true
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await fetch('/data/company_cars.json');
      const data = await res.json();
      setCars(data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast({
        title: "Error",
        description: "Failed to fetch company cars",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const carData = {
        name: formData.name,
        number_plate: formData.number_plate,
        description: formData.description || null,
        color: formData.color || null,
        number_of_passengers: formData.number_of_passengers ? parseInt(formData.number_of_passengers) : null,
        features: formData.features ? formData.features.split(',').map(f => f.trim()) : null,
        is_available: formData.is_available
      };
      // Static mode: we cannot persist changes from the browser. Show guidance to edit JSON source.
      toast({
        title: "Note",
        description: "Running in static mode — changes are not persisted. Edit public/data/company_cars.json in the repo to persist changes.",
      });
      setIsDialogOpen(false);
      setEditingCar(null);
      resetForm();
      fetchCars();
    } catch (error) {
      console.error('Error saving car:', error);
      toast({
        title: "Error",
        description: "Failed to save car",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (car: CompanyCar) => {
    setEditingCar(car);
    setFormData({
      name: car.name,
      number_plate: car.number_plate,
      description: car.description || '',
      color: car.color || '',
      number_of_passengers: car.number_of_passengers?.toString() || '',
      features: car.features?.join(', ') || '',
      is_available: car.is_available ?? true
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (carId: string) => {
    if (!confirm('Are you sure you want to delete this car?')) return;
    // Static mode: deletion not supported in-browser
    toast({
      title: "Note",
      description: "Static mode: to delete a car edit public/data/company_cars.json and remove the entry.",
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      number_plate: '',
      description: '',
      color: '',
      number_of_passengers: '',
      features: '',
      is_available: true
    });
  };

  const openAddDialog = () => {
    setEditingCar(null);
    resetForm();
    setIsDialogOpen(true);
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Company Cars ({cars.length})</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add New Car</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingCar ? 'Edit Car' : 'Add New Car'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Car Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Toyota Land Cruiser"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="number_plate">Number Plate</Label>
                <Input
                  id="number_plate"
                  value={formData.number_plate}
                  onChange={(e) => setFormData({...formData, number_plate: e.target.value})}
                  placeholder="e.g., KDJ 123A"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Car description..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    placeholder="White"
                  />
                </div>
                
                <div>
                  <Label htmlFor="passengers">Passengers</Label>
                  <Input
                    id="passengers"
                    type="number"
                    value={formData.number_of_passengers}
                    onChange={(e) => setFormData({...formData, number_of_passengers: e.target.value})}
                    placeholder="7"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="features">Features (comma separated)</Label>
                <Input
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({...formData, features: e.target.value})}
                  placeholder="4WD, Air Conditioning, GPS"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCar ? 'Update' : 'Add'} Car
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {cars.map((car) => (
          <Card key={car.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Car className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">{car.name}</h4>
                    <Badge variant={car.is_available ? "default" : "secondary"}>
                      {car.is_available ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p><strong>Plate:</strong> {car.number_plate}</p>
                    {car.color && <p><strong>Color:</strong> {car.color}</p>}
                    {car.number_of_passengers && <p><strong>Passengers:</strong> {car.number_of_passengers}</p>}
                    {car.description && <p><strong>Description:</strong> {car.description}</p>}
                    {car.features && car.features.length > 0 && (
                      <div>
                        <strong>Features:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {car.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(car)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(car.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {cars.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No cars added yet</h3>
              <p className="text-muted-foreground mb-4">Start by adding your first company car</p>
              <Button onClick={openAddDialog}>Add First Car</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}