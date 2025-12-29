import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Car, Home, Info, Camera, Calendar } from "lucide-react";
import { CompanyCarsModal } from "./company-cars-modal";
import { GalleryModal } from "./gallery-modal";
import { AboutModal } from "./about-modal";
import { ContactModal } from "./contact-modal";
import { BookSafariModal } from "./book-safari-modal";
import logoImage from "/lovable-uploads/6d80ea7d-d6c7-4084-8c6f-e18f2ed42a2b.png";
export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCarsModal, setShowCarsModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showBookSafariModal, setShowBookSafariModal] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleSafarisClick = () => {
    const packagesSection = document.getElementById('packages-section');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };
  return <>
      {/* Top Contact Bar */}
      <div className="hidden md:block bg-accent text-accent-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+254 710622549</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>cheesecakesafari@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Masai Mara, Kenya</span>
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
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-warm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src={logoImage} 
                alt="Cheesecake Safaris" 
                className="h-16 w-auto" 
                style={{ 
                  filter: 'brightness(0) invert(1)',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>

            {/* Desktop Menu - Hidden for clean mobile experience */}
            <div className="hidden lg:flex items-center space-x-8">
              <button onClick={handleHomeClick} className="text-foreground hover:text-primary transition-colors font-medium">
                Home
              </button>
              <button onClick={handleSafarisClick} className="text-foreground hover:text-primary transition-colors font-medium">
                Safaris
              </button>
              <button onClick={() => setShowAboutModal(true)} className="text-foreground hover:text-primary transition-colors font-medium">
                About Us
              </button>
              <button onClick={() => setShowGalleryModal(true)} className="text-foreground hover:text-primary transition-colors font-medium">
                Gallery
              </button>
              <button onClick={() => setShowContactModal(true)} className="text-foreground hover:text-primary transition-colors font-medium">
                Contact
              </button>
            </div>

            {/* Company Cars & CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Button 
                variant="outline"
                onClick={() => setShowCarsModal(true)}
                className="flex items-center gap-2"
              >
                <Car className="w-4 h-4" />
                COMPANY CARS
              </Button>
              <Button 
                onClick={() => setShowBookSafariModal(true)}
                className="bg-hero-gradient hover:shadow-safari transition-all duration-300 text-primary-foreground"
              >
                Book Safari
              </Button>
            </div>

            {/* Mobile: Company Cars + Hamburger Menu */}
            <div className="flex items-center gap-3">
              <Button 
                size="sm"
                variant="outline"
                onClick={() => setShowCarsModal(true)}
                className="p-3 rounded-full"
              >
                <Car className="w-4 h-4" />
              </Button>
              
              {/* Hamburger Menu - Right side with rounded icons */}
              <div className="relative">
                <button 
                  onClick={toggleMenu} 
                  className="p-3 rounded-xl bg-primary/10 hover:bg-primary/20 transition-all duration-300 border border-primary/20"
                >
                  {isMenuOpen ? (
                    <X className="w-5 h-5 text-primary" />
                  ) : (
                    <Menu className="w-5 h-5 text-primary" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-background border border-border rounded-2xl shadow-lg py-2 w-48 z-50">
                    <div className="flex flex-col">
                      <button
                        onClick={handleHomeClick}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Home className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">Home</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setShowAboutModal(true);
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Info className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">About Us</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setShowGalleryModal(true);
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Camera className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">Gallery</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setShowContactModal(true);
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Phone className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">Contact</span>
                      </button>
                      
                      <button
                        onClick={handleSafarisClick}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">Safaris</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setShowBookSafariModal(true);
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left border-t border-border mt-2"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">Book a Safari</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <CompanyCarsModal
        isOpen={showCarsModal}
        onClose={() => setShowCarsModal(false)}
      />
      
      <GalleryModal
        isOpen={showGalleryModal}
        onClose={() => setShowGalleryModal(false)}
      />
      
      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
      
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
      
      <BookSafariModal
        isOpen={showBookSafariModal}
        onClose={() => setShowBookSafariModal(false)}
      />
    </>;
}