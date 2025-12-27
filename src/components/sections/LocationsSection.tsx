import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

interface Location {
  id: string;
  name: string;
  label: string;
  imageUrl: string;
}

const locations: Location[] = [
  {
    id: "mara",
    name: "Mara",
    label: "MARA PACKAGES",
    imageUrl: "/lovable-uploads/fe41aca9-8b2e-4411-a26b-12b03a306ed3.png"
  },
  {
    id: "amboseli",
    name: "Amboseli",
    label: "AMBOSELI PACKAGES",
    imageUrl: "/lovable-uploads/027d28b9-e81e-4be9-8866-82e8a63418af.png"
  },
  {
    id: "nairobi",
    name: "Nairobi",
    label: "NAIROBI PACKAGES",
    imageUrl: "/lovable-uploads/8f9ce083-ca06-4232-a0a8-c87e32bd8b00.png"
  },
  {
    id: "mombasa",
    name: "Mombasa",
    label: "MOMBASA PACKAGES",
    imageUrl: "/lovable-uploads/42dc64d7-f1e3-4ae8-989f-96d8efe4c370.png"
  },
  {
    id: "nakuru",
    name: "Nakuru",
    label: "NAKURU PACKAGES",
    imageUrl: "/lovable-uploads/20dad3c2-4a13-4536-8292-236db07aed93.png"
  },
  {
    id: "northern-circuit",
    name: "Northern Circuit",
    label: "NORTHERN CIRCUIT PACKAGES",
    imageUrl: "/lovable-uploads/9f7fd907-e4ed-4f03-ae9c-a2ed6e890bac.png"
  },
  {
    id: "southern-circuit",
    name: "Southern Circuit", 
    label: "SOUTHERN CIRCUIT PACKAGES",
    imageUrl: "/lovable-uploads/ce893bd7-72de-4871-916e-99d3fc89d79a.png"
  },
  {
    id: "kenyan-circuit",
    name: "Kenyan Circuit",
    label: "KENYAN CIRCUIT PACKAGES", 
    imageUrl: "/lovable-uploads/7dd67f39-6c7b-4c56-96c5-561989884c89.png"
  },
  {
    id: "kenya-tanzania-circuit",
    name: "Kenya/Tanzania Circuit",
    label: "KENYA/TANZANIA PACKAGES",
    imageUrl: "/lovable-uploads/46b3610c-6d97-48d5-aa82-248ee472032d.png"
  },
  {
    id: "tsavo",
    name: "Tsavo",
    label: "TSAVO PACKAGES",
    imageUrl: "/lovable-uploads/080e0fae-217e-429d-b8aa-3b0a2cd6b7a2.png"
  }
];

interface LocationsSectionProps {
  onLocationClick?: (locationId: string) => void;
  onViewAllClick?: () => void;
}

export function LocationsSection({ onLocationClick, onViewAllClick }: LocationsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerPage >= locations.length ? 0 : prev + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - itemsPerPage < 0 ? Math.max(0, locations.length - itemsPerPage) : prev - itemsPerPage
    );
  };

  const handleLocationClick = (locationId: string) => {
    onLocationClick?.(locationId);
  };

  const handleViewAllClick = () => {
    onViewAllClick?.();
  };

  const visibleLocations = locations.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section className="py-12 bg-gradient-to-br from-amber-50/30 to-yellow-100/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Where do you want to visit?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your dream destination and discover amazing safari packages
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full bg-background/80 backdrop-blur-sm"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <span className="text-sm text-muted-foreground">
            {Math.floor(currentIndex / itemsPerPage) + 1} of {Math.ceil(locations.length / itemsPerPage)}
          </span>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full bg-background/80 backdrop-blur-sm"
            disabled={currentIndex + itemsPerPage >= locations.length}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {visibleLocations.map((location) => (
            <Card 
              key={location.id} 
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-amber-50/50 to-yellow-100/50 border-2 border-amber-200/50 backdrop-blur-sm hover:bg-gradient-to-br hover:from-amber-100/70 hover:to-yellow-200/70 hover:border-amber-300/70"
              onClick={() => handleLocationClick(location.id)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={location.imageUrl}
                  alt={location.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-2 left-2">
                  <div className="bg-amber-500/90 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {location.name}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-center font-bold text-foreground text-sm tracking-wide">
                  {location.label}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            onClick={handleViewAllClick}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-lg hover:shadow-xl"
          >
            View All
          </Button>
        </div>
      </div>
    </section>
  );
}