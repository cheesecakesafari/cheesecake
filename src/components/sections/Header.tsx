import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Car } from "lucide-react";
import { CompanyCarsModal } from "@/components/ui/company-cars-modal";
import { BookSafariModal } from "@/components/ui/book-safari-modal";
import { useState } from "react";
import logoImage from "/lovable-uploads/6d80ea7d-d6c7-4084-8c6f-e18f2ed42a2b.png";

export function Header() {
  const [showCarsModal, setShowCarsModal] = useState(false);
  const [showBookSafariModal, setShowBookSafariModal] = useState(false);

  return (
    <>
      {/* Top Contact Bar */}
      <div className="hidden md:block bg-accent/90 backdrop-blur-sm text-accent-foreground py-2 border-b border-primary/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-foreground">+254 710622549</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-foreground">cheesecakesafari@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-foreground">Masai Mara, Kenya</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Facebook className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-40 shadow-glass">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Enhanced to blend with white background */}
            <div className="flex items-center">
              <div className="relative p-2 bg-white/90 rounded-xl backdrop-blur-sm border border-white/20">
                <img 
                  src={logoImage} 
                  alt="Cheesecake Safaris" 
                  className="h-12 w-auto" 
                  style={{ 
                    filter: 'none',
                    mixBlendMode: 'normal'
                  }}
                />
              </div>
            </div>

            {/* Center: Our Cars Button */}
            <div className="flex items-center justify-center lg:justify-start absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-auto lg:transform-none">
              <Button 
                variant="outline"
                onClick={() => setShowCarsModal(true)}
                className="bg-green-500/90 hover:bg-green-600 border-green-400/50 text-white rounded-full px-6 py-3 shadow-2xl hover:shadow-3xl transition-all duration-300 min-w-[140px]"
              >
                <Car className="w-4 h-4 mr-2" />
                Our Cars
              </Button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Book Safari button removed per request - keep layout intact */}
            </div>

          </div>
        </div>
      </nav>

      <CompanyCarsModal
        isOpen={showCarsModal}
        onClose={() => setShowCarsModal(false)}
      />
      
      <BookSafariModal
        isOpen={showBookSafariModal}
        onClose={() => setShowBookSafariModal(false)}
      />
    </>
  );
}