import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookingModal } from "./booking-modal";
import { 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  CheckCircle, 
  Calendar,
  Camera,
  Utensils,
  Bed,
  Shield
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
}

interface TripDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip | null;
}

export function TripDetailsModal({ isOpen, onClose, trip }: TripDetailsModalProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (!trip) return null;

  const inclusionsIcons: { [key: string]: any } = {
    'meals': Utensils,
    'accommodation': Bed,
    'guide': Users,
    'transport': Camera,
    'equipment': Shield,
    'default': CheckCircle
  };

  const getInclusionIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase();
    if (lowerFeature.includes('meal') || lowerFeature.includes('food')) return inclusionsIcons.meals;
    if (lowerFeature.includes('accommodation') || lowerFeature.includes('lodge') || lowerFeature.includes('hotel')) return inclusionsIcons.accommodation;
    if (lowerFeature.includes('guide') || lowerFeature.includes('professional')) return inclusionsIcons.guide;
    if (lowerFeature.includes('transport') || lowerFeature.includes('drive') || lowerFeature.includes('vehicle')) return inclusionsIcons.transport;
    if (lowerFeature.includes('equipment') || lowerFeature.includes('gear')) return inclusionsIcons.equipment;
    return inclusionsIcons.default;
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <div className="relative">
            {/* Hero Image */}
            <div className="relative h-64 sm:h-80">
              <img
                src={trip.image_url || `https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=400&fit=crop`}
                alt={trip.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary text-primary-foreground">
                  {trip.badge}
                </Badge>
              </div>
              <div className="absolute bottom-4 left-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {trip.title}
                </h1>
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{trip.rating}</span>
                    <span className="text-sm">({trip.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{trip.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{trip.group_size}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">About This Safari</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {trip.description}
                </p>
              </div>

              <Separator className="my-6" />

              {/* Destinations */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Destinations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {trip.destinations.map((destination, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {destination}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Inclusions */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  What's Included
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {trip.features.map((feature, index) => {
                    const IconComponent = getInclusionIcon(feature);
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <IconComponent className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Pricing & Booking */}
              <div className="bg-muted/50 rounded-lg p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl font-bold text-primary">
                        ${trip.price.toLocaleString()}
                      </span>
                      {trip.original_price > trip.price && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${trip.original_price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Per person • {trip.duration} • All inclusive
                    </p>
                  </div>
                  
                  <Button
                    size="lg"
                    className="bg-hero-gradient hover:shadow-safari transition-all duration-300"
                    onClick={() => setShowBookingModal(true)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                </div>

                <div className="mt-4 text-xs text-muted-foreground">
                  <p>• Free cancellation up to 72 hours before departure</p>
                  <p>• Secure payment processing</p>
                  <p>• Instant confirmation via email</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        tripId={trip.id}
        tripTitle={trip.title}
      />
    </>
  );
}