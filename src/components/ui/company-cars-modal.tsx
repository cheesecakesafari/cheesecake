import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Car, Users, Palette, Hash, CheckCircle, Calendar as CalendarIcon, Send, Eye, ArrowLeft } from "lucide-react";
interface CompanyCar {
  id: string;
  name: string;
  number_plate: string;
  color: string;
  number_of_passengers: number;
  images: string[];
  description: string;
  features: string[];
  is_available: boolean;
}
interface CompanyCarsModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export function CompanyCarsModal({
  isOpen,
  onClose
}: CompanyCarsModalProps) {
  const [cars, setCars] = useState<CompanyCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [showBookingWidget, setShowBookingWidget] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CompanyCar | null>(null);
  const [bookingForm, setBookingForm] = useState({
    companyName: '',
    fromDate: undefined as Date | undefined,
    toDate: undefined as Date | undefined
  });
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchCars();
    } else {
      // Clear cars data when modal closes to force refresh next time
      setCars([]);
    }
  }, [isOpen]);
  const fetchCars = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('company_cars').select('*').eq('is_available', true).order('name');
      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (car: CompanyCar) => {
    setSelectedCar(car);
    setShowBookingWidget(true);
  };

  const handleSendToWhatsApp = () => {
    const message = `Hello! I would like to book the following vehicle:

Vehicle: ${selectedCar?.name}
Plate Number: ${selectedCar?.number_plate}
Company Name: ${bookingForm.companyName}
From Date: ${bookingForm.fromDate ? format(bookingForm.fromDate, 'PPP') : 'Not specified'}
To Date: ${bookingForm.toDate ? format(bookingForm.toDate, 'PPP') : 'Not specified'}

Please confirm availability and pricing. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/254710622549?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset form and close widget
    setBookingForm({ companyName: '', fromDate: undefined, toDate: undefined });
    setShowBookingWidget(false);
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "dialog-content rounded-2xl",
        showFullScreen 
          ? "fixed inset-0 w-full h-full max-w-none max-h-none m-0 p-0 overflow-y-auto transform-none md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:max-h-[85vh] md:w-auto md:h-auto md:p-6 md:inset-auto" 
          : "max-w-2xl max-h-[85vh] overflow-y-auto"
      )}>
        <DialogDescription className="sr-only">
          View our company vehicles available for safari adventures. Browse through our fleet of professional safari vehicles with detailed information about capacity, features, and availability.
        </DialogDescription>
        <DialogHeader className={cn(showFullScreen ? "p-4 md:p-0" : "")}>
          <DialogTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Car className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            Our Company Vehicles
          </DialogTitle>
          <p className="text-xs md:text-sm text-muted-foreground">
            Professional safari vehicles for your comfort and safety
          </p>
        </DialogHeader>

        <div className={cn("space-y-6", showFullScreen ? "p-4 md:p-0" : "")}>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2 text-muted-foreground">Loading vehicles...</p>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-8">
              <Car className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No vehicles available at the moment.</p>
            </div>
          ) : (
            <>
              {/* Mobile: Horizontal Scroll or Full Screen Grid */}
              <div className="block md:hidden">
                {showFullScreen ? (
                  <>
                    {/* Back button for full screen */}
                    <div className="mb-4">
                      <Button
                        onClick={() => setShowFullScreen(false)}
                        variant="ghost"
                        className="flex items-center gap-2 p-0 h-auto"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </Button>
                    </div>
                    
                    {/* Full Screen Grid Layout */}
                    <div className="grid grid-cols-1 gap-4">
                      {cars.map((car) => (
                        <Card key={car.id} className="overflow-hidden">
                          <div className="grid grid-cols-1 gap-0">
                            {/* Image Section */}
                            <div className="relative h-48">
                              <img 
                                src={car.images && car.images.length > 0 ? car.images[0] : '/lovable-uploads/8344df75-0e16-4136-bffa-07cb22a38b49.png'} 
                                alt={car.name} 
                                className="w-full h-full object-scale-down" 
                              />
                              <div className="absolute top-3 left-3">
                                <Badge className="bg-primary text-primary-foreground">
                                  Available
                                </Badge>
                              </div>
                            </div>

                            {/* Details Section */}
                            <CardContent className="p-4">
                              <div className="space-y-4">
                                <div>
                                  <h3 className="text-lg font-bold mb-2">{car.name}</h3>
                                  <p className="text-muted-foreground text-sm">
                                    {car.description}
                                  </p>
                                </div>

                                {/* Vehicle Details */}
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="flex items-center gap-2">
                                    <Hash className="w-4 h-4 text-primary" />
                                    <div>
                                      <p className="text-xs text-muted-foreground">Plate</p>
                                      <p className="font-medium text-sm">{car.number_plate}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-primary" />
                                    <div>
                                      <p className="text-xs text-muted-foreground">Capacity</p>
                                      <p className="font-medium text-sm">{car.number_of_passengers}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Palette className="w-4 h-4 text-primary" />
                                    <div>
                                      <p className="text-xs text-muted-foreground">Color</p>
                                      <p className="font-medium text-sm capitalize">{car.color}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Features */}
                                {car.features && car.features.length > 0 && (
                                  <div>
                                    <h4 className="font-semibold mb-2 text-sm">Features</h4>
                                    <div className="grid grid-cols-1 gap-1">
                                      {car.features.slice(0, 3).map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                          <CheckCircle className="w-3 h-3 text-primary shrink-0" />
                                          <span className="text-xs text-muted-foreground">{feature}</span>
                                        </div>
                                      ))}
                                      {car.features.length > 3 && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                          +{car.features.length - 3} more features
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {/* Book Now Button */}
                                <div className="pt-2">
                                  <Button
                                    className="w-full bg-black hover:bg-gray-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                                    onClick={() => handleBookNow(car)}
                                  >
                                    <CalendarIcon className="w-4 h-4" />
                                    Book Now
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Regular Horizontal Scroll */}
                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                      {cars.slice(0, 2).map((car) => (
                        <Card key={car.id} className="overflow-hidden flex-shrink-0 w-80 snap-start">
                          <div className="grid grid-rows-2 gap-0 h-96">
                            {/* Image Section */}
                            <div className="relative h-40">
                              <img 
                                src={car.images && car.images.length > 0 ? car.images[0] : '/lovable-uploads/8344df75-0e16-4136-bffa-07cb22a38b49.png'} 
                                alt={car.name} 
                                className="w-full h-full object-scale-down" 
                              />
                              <div className="absolute top-3 left-3">
                                <Badge className="bg-primary text-primary-foreground">
                                  Available
                                </Badge>
                              </div>
                            </div>

                            {/* Details Section */}
                            <CardContent className="p-3 card-content">
                              <div className="space-y-3">
                                <div>
                                  <h3 className="text-base font-bold mb-1">{car.name}</h3>
                                  <p className="text-muted-foreground text-xs line-clamp-2">
                                    {car.description}
                                  </p>
                                </div>

                                {/* Vehicle Details - Compact */}
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div className="flex items-center gap-1">
                                    <Hash className="w-3 h-3 text-primary" />
                                    <span className="font-medium">{car.number_plate}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Users className="w-3 h-3 text-primary" />
                                    <span className="font-medium">{car.number_of_passengers}</span>
                                  </div>
                                </div>

                                {/* Book Now Button */}
                                <div className="pt-2">
                                  <Button
                                    className="w-full bg-black hover:bg-gray-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs py-2"
                                    onClick={() => handleBookNow(car)}
                                  >
                                    <CalendarIcon className="w-3 h-3" />
                                    Book Now
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      ))}
                    </div>
                    
                    {/* View All Button for Mobile */}
                    {cars.length > 2 && (
                      <div className="text-center pt-4">
                        <Button
                          onClick={() => setShowFullScreen(true)}
                          variant="outline"
                          className="rounded-xl"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View All ({cars.length} vehicles)
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Desktop: Vertical Scroll */}
              <div className="hidden md:block">
                <div className="grid gap-6">
                  {(showAll ? cars : cars.slice(0, 2)).map((car) => (
                    <Card key={car.id} className="overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative h-32 md:h-48 lg:h-full">
                      <img src={car.images && car.images.length > 0 ? car.images[0] : '/lovable-uploads/8344df75-0e16-4136-bffa-07cb22a38b49.png'} alt={car.name} className="w-full h-full object-scale-down" />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-primary text-primary-foreground">
                          Available
                        </Badge>
                      </div>
                    </div>

                    {/* Details Section */}
                    <CardContent className="p-3 md:p-6 card-content">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{car.name}</h3>
                          <p className="text-muted-foreground text-xs md:text-sm">
                            {car.description}
                          </p>
                        </div>

                        {/* Vehicle Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                          <div className="flex items-center gap-2">
                            <Hash className="w-4 h-4 text-primary" />
                            <div>
                              <p className="text-xs text-muted-foreground">Plate Number</p>
                              <p className="font-medium text-sm">{car.number_plate}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Palette className="w-4 h-4 text-primary" />
                            <div>
                              <p className="text-xs text-muted-foreground">Color</p>
                              <p className="font-medium text-sm capitalize">{car.color}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 col-span-2">
                            <Users className="w-4 h-4 text-primary" />
                            <div>
                              <p className="text-xs text-muted-foreground">Passenger Capacity</p>
                              <p className="font-medium text-sm">{car.number_of_passengers} Passengers</p>
                            </div>
                          </div>
                        </div>

                        {/* Features */}
                        {car.features && car.features.length > 0 && <div>
                            <h4 className="font-semibold mb-2 text-sm">Features & Equipment</h4>
                            <div className="grid grid-cols-1 gap-1">
                              {car.features.slice(0, 4).map((feature, index) => <div key={index} className="flex items-center gap-2">
                                  <CheckCircle className="w-3 h-3 text-primary shrink-0" />
                                  <span className="text-xs text-muted-foreground">{feature}</span>
                                </div>)}
                              {car.features.length > 4 && <p className="text-xs text-muted-foreground mt-1">
                                  +{car.features.length - 4} more features
                                </p>}
                            </div>
                          </div>}

                        {/* Additional Images */}
                        {car.images && car.images.length > 1 && <div>
                            <h4 className="font-semibold mb-2 text-sm">More Photos</h4>
                            <div className="flex gap-2 overflow-x-auto">
                              {car.images.slice(1, 4).map((image, index) => <img key={index} src={image} alt={`${car.name} ${index + 2}`} className="w-16 h-12 object-cover rounded flex-shrink-0" />)}
                            </div>
                          </div>}

                        {/* Book Now Button */}
                        <div className="pt-4 border-t border-border/50">
                          <Button
                            className="w-full bg-black hover:bg-gray-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                            onClick={() => handleBookNow(car)}
                          >
                            <CalendarIcon className="w-4 h-4" />
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                    </Card>
                  ))}
                </div>
                
                {/* View All Button for Desktop */}
                {!showAll && cars.length > 2 && (
                  <div className="text-center pt-6">
                    <Button
                      onClick={() => setShowAll(true)}
                      variant="outline"
                      className="rounded-xl"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View All ({cars.length} vehicles)
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>

      {/* Booking Widget */}
      <Dialog open={showBookingWidget} onOpenChange={setShowBookingWidget}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogDescription className="sr-only">
            Book the selected vehicle by providing your company details and travel information.
          </DialogDescription>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <CalendarIcon className="w-5 h-5 text-primary" />
              Book Vehicle
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Booking: {selectedCar?.name}
            </p>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="companyName" className="text-sm font-medium">
                Company Name
              </Label>
              <Input
                id="companyName"
                value={bookingForm.companyName}
                onChange={(e) => setBookingForm(prev => ({ ...prev, companyName: e.target.value }))}
                placeholder="Enter your company name"
                className="rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="fromDate" className="text-sm font-medium">
                From Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal rounded-xl",
                      !bookingForm.fromDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {bookingForm.fromDate ? format(bookingForm.fromDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={bookingForm.fromDate}
                    onSelect={(date) => setBookingForm(prev => ({ ...prev, fromDate: date }))}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="toDate" className="text-sm font-medium">
                To Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal rounded-xl",
                      !bookingForm.toDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {bookingForm.toDate ? format(bookingForm.toDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={bookingForm.toDate}
                    onSelect={(date) => setBookingForm(prev => ({ ...prev, toDate: date }))}
                    disabled={(date) => date < new Date() || (bookingForm.fromDate && date < bookingForm.fromDate)}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button
              onClick={handleSendToWhatsApp}
              disabled={!bookingForm.companyName || !bookingForm.fromDate || !bookingForm.toDate}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send to WhatsApp
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>;
}