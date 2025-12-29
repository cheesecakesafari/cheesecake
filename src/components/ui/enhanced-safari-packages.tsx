import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
// Using static JSON for trips in /data/trips.json
import { BookingModal } from "./booking-modal";
import { TripDetailsModal } from "./trip-details-modal";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Calendar, Users, Star, Clock, MapPin, Eye, ArrowRight, Grid3X3, ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

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

export function EnhancedSafariPackages() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAllPackagesModal, setShowAllPackagesModal] = useState(false);
  
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await fetch('/data/trips.json');
      if (!res.ok) throw new Error('Failed to load trips');
      const data: Trip[] = await res.json();
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

  if (trips.length === 0) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Safari Packages
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              No safari packages available at the moment. Please check back later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="safaris" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Featured Safari Packages
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover handpicked adventures that showcase the best of East African wildlife and landscapes.
            </p>
          </div>

          {/* Carousel for 3 packages */}
          <div className="relative max-w-7xl mx-auto mb-8">
            <Carousel
              plugins={[plugin.current]}
              className="w-full"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {trips.slice(0, 15).map((trip) => (
                  <CarouselItem key={trip.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                      <div className="relative">
                        <img
                          src={trip.image_url || `https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=500&h=300&fit=crop`}
                          alt={trip.title}
                          className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-primary text-primary-foreground">
                            {trip.badge}
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                          <div className="bg-black/80 text-white px-3 py-1 rounded-full text-sm font-bold">
                            ${trip.price?.toLocaleString() || 'N/A'}
                          </div>
                        </div>
                      </div>
                      
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg leading-tight">{trip.title}</CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {trip.short_description || trip.description}
                        </p>
                      </CardHeader>
                      
                      <CardContent className="pt-0 pb-3">
                        {/* Detailed info in bullet points */}
                        {trip.detailed_info && (
                          <div className="mb-4">
                            <h4 className="font-semibold text-sm mb-2">What's Included:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {(Array.isArray(trip.detailed_info) ? trip.detailed_info : 
                                typeof trip.detailed_info === 'object' ? Object.values(trip.detailed_info) : 
                                [trip.detailed_info]).slice(0, 3).map((info, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <ArrowRight className="w-3 h-3 mt-0.5 text-primary flex-shrink-0" />
                                  <span className="line-clamp-1">{String(info)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{trip.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{trip.group_size}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{trip.rating} ({trip.reviews})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{trip.destinations?.[0] || 'Various'}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-primary">
                              ${trip.price?.toLocaleString() || 'Contact us'}
                            </span>
                            {trip.original_price && trip.original_price > trip.price && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${trip.original_price.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="pt-0">
                        <Button
                          className="w-full bg-hero-gradient hover:opacity-90 transition-opacity"
                          onClick={() => handleBookNow(trip)}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          BOOK SAFARI
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>

          {/* View More Packages Button */}
          {trips.length > 3 && (
            <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAllPackagesModal(true)}
                className="gap-2 px-8 py-3 rounded-full border-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Grid3X3 className="w-5 h-5" />
                View More Packages ({trips.length})
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* All Packages Modal */}
      <Dialog open={showAllPackagesModal} onOpenChange={setShowAllPackagesModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl">All Safari Packages</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[70vh] px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
              {trips.map((trip) => (
                <Card key={trip.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={trip.image_url || `https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=400&h=250&fit=crop`}
                      alt={trip.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
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
                    <CardTitle className="text-base leading-tight">{trip.title}</CardTitle>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {trip.short_description || trip.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="pt-0 pb-2">
                    {/* Detailed info in bullet points */}
                    {trip.detailed_info && (
                      <div className="mb-3">
                        <h4 className="font-semibold text-xs mb-1">Includes:</h4>
                        <ul className="text-xs text-muted-foreground space-y-0.5">
                          {(Array.isArray(trip.detailed_info) ? trip.detailed_info : 
                            typeof trip.detailed_info === 'object' ? Object.values(trip.detailed_info) : 
                            [trip.detailed_info]).slice(0, 2).map((info, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <ArrowRight className="w-2.5 h-2.5 mt-0.5 text-primary flex-shrink-0" />
                              <span className="line-clamp-1">{String(info)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
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
                        <span>{trip.destinations?.[0] || 'Various'}</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-0 gap-2">
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
                  </CardFooter>
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