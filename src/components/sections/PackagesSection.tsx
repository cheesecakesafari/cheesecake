import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
// Use static JSON at /data/trips.json (no Supabase)
import { BookingModal } from "@/components/ui/booking-modal";
import { TripDetailsModal } from "@/components/ui/trip-details-modal";
import { LocationsSection } from "@/components/sections/LocationsSection";
import { 
  Clock, 
  Users, 
  Star, 
  MapPin, 
  Calendar, 
  Eye, 
  ArrowRight, 
  Grid3X3,
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  Play,
  Pause
} from "lucide-react";

interface Trip {
  id: string;
  title: string;
  description: string;
  short_description: string;
  image_url: string;
  duration: string;
  group_size: string;
  price: number;
  original_price: number;
  rating: number;
  reviews: number;
  badge: string;
  features: string[];
  destinations: string[];
  is_featured: boolean;
  detailed_info: any;
}

// Updated location images mapped by location names
const locationImageMap = {
  "mara": "/lovable-uploads/fe41aca9-8b2e-4411-a26b-12b03a306ed3.png", // Mara - cheetah scene
  "amboseli": "/lovable-uploads/027d28b9-e81e-4be9-8866-82e8a63418af.png", // Amboseli - elephant with Mount Kilimanjaro
  "nairobi": "/lovable-uploads/8f9ce083-ca06-4232-a0a8-c87e32bd8b00.png", // Nairobi - giraffe with city skyline
  "mombasa": "/lovable-uploads/42dc64d7-f1e3-4ae8-989f-96d8efe4c370.png", // Mombasa - tropical beach resort
  "nakuru": "/lovable-uploads/20dad3c2-4a13-4536-8292-236db07aed93.png", // Nakuru - buffalo and flamingo
  "northern": "/lovable-uploads/9f7fd907-e4ed-4f03-ae9c-a2ed6e890bac.png", // Northern Circuit - elephant herd
  "southern": "/lovable-uploads/9c2b73ef-ff6d-4374-bbc5-a2455506d717.png", // Southern Circuit - elephant waterhole with lodge
  "kenyan": "/lovable-uploads/7dd67f39-6c7b-4c56-96c5-561989884c89.png", // Kenyan Circuit - nighttime city skyline
  "kenya": "/lovable-uploads/46b3610c-6d97-48d5-aa82-248ee472032d.png", // Kenya/Tanzania Circuit - wildebeest migration
  "tanzania": "/lovable-uploads/46b3610c-6d97-48d5-aa82-248ee472032d.png", // Kenya/Tanzania Circuit - wildebeest migration
  "serengeti": "/lovable-uploads/46b3610c-6d97-48d5-aa82-248ee472032d.png", // Kenya/Tanzania Circuit - wildebeest migration
  "tsavo": "/lovable-uploads/080e0fae-217e-429d-b8aa-3b0a2cd6b7a2.png",  // Tsavo - giraffe and safari vehicle
  "east africa explorer": "/lovable-uploads/8344df75-0e16-4136-bffa-07cb22a38b49.png" // Safari map for East Africa Explorer
};

// All location images for fallback
const allLocationImages = Object.values(locationImageMap);

// Function to match package with appropriate location image based on content
const getMatchingPackageImage = (trip: Trip) => {
  const searchText = `${trip.title} ${trip.description} ${trip.destinations?.join(' ') || ''}`.toLowerCase();
  
  // Special handling for Kilimanjaro climbing
  if (searchText.includes("kilimanjaro") || searchText.includes("climbing")) {
    return "/lovable-uploads/266ad136-0567-4adf-afec-7f21d74a3f20.png";
  }
  
  // Special handling for East Africa Explorer package
  if (searchText.includes("east africa explorer") || searchText.includes("kenya & tanzania combo")) {
    return "/lovable-uploads/8344df75-0e16-4136-bffa-07cb22a38b49.png";
  }
  
  // Check for exact location matches in order of specificity
  for (const [location, image] of Object.entries(locationImageMap)) {
    if (searchText.includes(location)) {
      return image;
    }
  }
  
  // Fallback: use a consistent image based on trip ID
  const hash = trip.id.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  const index = Math.abs(hash) % allLocationImages.length;
  return allLocationImages[index];
};

export function PackagesSection() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAllPackagesModal, setShowAllPackagesModal] = useState(false);
  const [showAllLocationsModal, setShowAllLocationsModal] = useState(false);
  const [currentPackageIndex, setCurrentPackageIndex] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      // Check screen size for different behavior
      const isMobile = window.innerWidth < 768;
      const maxIndex = isMobile ? trips.length - 2 : trips.length - 5;
      
      if (trips.length <= (isMobile ? 2 : 5)) return;
      
      setCurrentPackageIndex((prev) => (prev + 1) % maxIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, trips.length]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await fetch('/data/trips.json');
      const data = await res.json();
      setTrips(data || []);
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (trip: Trip) => {
    setSelectedTrip(trip);
    setShowBookingModal(true);
  };

  const handleViewDetails = (trip: Trip) => {
    setSelectedTrip(trip);
    setShowDetailsModal(true);
  };

  const nextPackage = () => {
    const isMobile = window.innerWidth < 768;
    const maxIndex = isMobile ? trips.length - 2 : trips.length - 5;
    
    if (trips.length <= (isMobile ? 2 : 5)) return;
    setCurrentPackageIndex((prev) => (prev + 1) % maxIndex);
  };

  const prevPackage = () => {
    const isMobile = window.innerWidth < 768;
    const maxIndex = isMobile ? trips.length - 2 : trips.length - 5;
    
    if (trips.length <= (isMobile ? 2 : 5)) return;
    setCurrentPackageIndex((prev) => (prev - 1 + maxIndex) % maxIndex);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const handleLocationClick = (locationId: string) => {
    setSelectedLocation(locationId);
    // Filter packages and show modal with filtered results
    setShowAllPackagesModal(true);
  };

  const handleViewAllLocations = () => {
    setShowAllLocationsModal(true);
  };

  // Filter trips based on selected location
  const filteredTrips = selectedLocation 
    ? trips.filter(trip => 
        trip.destinations?.some(dest => 
          dest.toLowerCase().includes(selectedLocation.toLowerCase()) ||
          selectedLocation.toLowerCase().includes(dest.toLowerCase())
        )
      )
    : trips;

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-muted-foreground">Loading safari packages...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* SECTION 1: LOCATIONS - Where do you want to visit */}
      <LocationsSection 
        onLocationClick={handleLocationClick}
        onViewAllClick={handleViewAllLocations}
      />

      {/* SECTION 2: PACKAGES - Safsafi Packages */}
      <section id="packages" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Safsafi Packages
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover handpicked adventures that showcase the best of East African wildlife
            </p>
          </div>

          {/* Carousel with 5 Packages at a time */}
          <div className="mb-8">
            {trips.length === 0 ? (
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">No safari packages available</h3>
                <p className="text-muted-foreground">Please check back later for amazing safari adventures.</p>
              </div>
            ) : (
              <div className="relative">
                {/* Carousel Controls */}
                <div className="flex justify-center items-center gap-4 mb-6">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevPackage}
                    disabled={trips.length <= 2}
                    className="rounded-full"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground hidden md:block">
                      {Math.min(currentPackageIndex + 1, trips.length - 4)} - {Math.min(currentPackageIndex + 5, trips.length)} of {trips.length}
                    </span>
                    <span className="text-sm text-muted-foreground md:hidden">
                      {Math.min(currentPackageIndex + 1, trips.length - 1)} - {Math.min(currentPackageIndex + 2, trips.length)} of {trips.length}
                    </span>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleAutoPlay}
                      disabled={trips.length <= 2}
                      className="w-8 h-8"
                    >
                      {isAutoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    </Button>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextPackage}
                    disabled={trips.length <= 2}
                    className="rounded-full"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Horizontal Carousel - Responsive */}
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out gap-4"
                    style={{
                      transform: `translateX(-${currentPackageIndex * (window.innerWidth < 768 ? 50 : 20)}%)`,
                    }}
                  >
                    {trips.map((trip) => (
                      <div key={trip.id} className="flex-shrink-0 w-1/2 md:w-1/5 pr-2 md:pr-4">
                        <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-primary/5 border-2 border-primary/30 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/50 h-full">
                           <div className="relative h-24 md:h-32">
                              {/* Using matching location images based on package content */}
                              <img 
                                src={getMatchingPackageImage(trip)} 
                                alt={trip.title}
                                className="w-full h-full object-cover"
                              />
                            
                            <div className="absolute top-1 md:top-2 left-1 md:left-2">
                              <Badge className="bg-primary text-primary-foreground text-xs hidden md:block">
                                {trip.badge}
                              </Badge>
                            </div>
                            <div className="absolute top-1 md:top-2 right-1 md:right-2">
                              <div className="bg-black/80 text-white px-1 md:px-2 py-1 rounded text-xs md:text-sm font-bold">
                                ${trip.price?.toLocaleString() || 'Contact'}
                              </div>
                            </div>
                          </div>
                          
                          <CardHeader className="pb-2 p-2 md:p-6 md:pb-2">
                            <CardTitle className="text-xs md:text-sm leading-tight">{trip.title}</CardTitle>
                            <p className="text-xs text-muted-foreground line-clamp-2 hidden md:block">
                              {trip.short_description || trip.description}
                            </p>
                          </CardHeader>
                          
                          <CardContent className="pt-0 pb-2 md:pb-3 p-2 md:p-6 md:pt-0">
                            {/* Trip Info - Hidden on mobile */}
                            <div className="grid grid-cols-1 gap-1 text-xs text-muted-foreground mb-3 hidden md:grid">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{trip.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                <span>{trip.group_size}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{trip.rating} ({trip.reviews})</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span className="truncate">{trip.destinations?.[0] || 'Various'}</span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 text-xs px-1 md:px-2"
                                onClick={() => handleViewDetails(trip)}
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                Details
                              </Button>
                              <Button
                                size="sm"
                                className="flex-1 bg-emerald-gradient text-xs px-1 md:px-2"
                                onClick={() => handleBookNow(trip)}
                              >
                                <Calendar className="w-3 h-3 mr-1" />
                                Book
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>

                {/* View All Packages Button */}
                <div className="text-center mt-6">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setShowAllPackagesModal(true)}
                    className="gap-2 px-8 py-3 rounded-full border-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Grid3X3 className="w-5 h-5" />
                    View All Packages ({trips.length})
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* All Packages Modal */}
      <Dialog open={showAllPackagesModal} onOpenChange={(open) => {
        setShowAllPackagesModal(open);
        if (!open) setSelectedLocation(null);
      }}>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl">
              {selectedLocation 
                ? `${selectedLocation.charAt(0).toUpperCase() + selectedLocation.slice(1)} Safari Packages` 
                : "All Safari Packages"
              }
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[70vh] px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
              {(selectedLocation ? filteredTrips : trips).map((trip) => (
                <Card key={trip.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative h-32">
                    {/* Using matching location images based on package content */}
                    <img 
                      src={getMatchingPackageImage(trip)} 
                      alt={trip.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-primary text-primary-foreground text-xs">
                        {trip.badge}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <div className="bg-black/80 text-white px-2 py-1 rounded text-sm font-bold">
                        ${trip.price?.toLocaleString() || 'N/A'}
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm leading-tight">{trip.title}</CardTitle>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {trip.short_description || trip.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="pt-0 pb-2">
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{trip.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{trip.group_size}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs"
                        onClick={() => {
                          handleViewDetails(trip);
                          setShowAllPackagesModal(false);
                        }}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Details
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-hero-gradient text-xs"
                        onClick={() => {
                          handleBookNow(trip);
                          setShowAllPackagesModal(false);
                        }}
                      >
                        <Calendar className="w-3 h-3 mr-1" />
                        Book
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        tripId={selectedTrip?.id}
        tripTitle={selectedTrip?.title}
      />

      <TripDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        trip={selectedTrip}
      />
    </>
  );
}