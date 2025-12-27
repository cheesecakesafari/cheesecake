import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, Home, Info, Camera, MessageSquare } from "lucide-react";
import { AboutModal } from "@/components/ui/about-modal";
import { ContactModal } from "@/components/ui/contact-modal";
import { GalleryModal } from "@/components/ui/gallery-modal";

export function HamburgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handlePackagesClick = () => {
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/254710622549', '_blank');
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={toggleMenu} 
          className="p-3 rounded-xl bg-primary/90 hover:bg-primary transition-all duration-300 border border-primary/20 backdrop-blur-sm"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-primary-foreground" />
          ) : (
            <Menu className="w-5 h-5 text-primary-foreground" />
          )}
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-2 bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-xl py-2 w-64 z-50">
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
                onClick={handlePackagesClick}
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
                  <MessageSquare className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">Contacts</span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    <a href="tel:+254710622549" className="hover:text-primary">+254710622549</a>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="w-3 h-3" />
                    <a href="mailto:info@cheesecakesafaris.com" className="hover:text-primary">info@cheesecakesafaris.com</a>
                  </div>
                </div>
              </button>
              
              <div className="border-t border-border mt-2 pt-2">
                <Button
                  onClick={handlePackagesClick}
                  className="mx-4 mb-2 w-[calc(100%-2rem)] bg-gold-gradient/80 hover:bg-gold-gradient backdrop-blur-sm text-primary-foreground transition-all duration-300"
                >
                  Explore our Packages
                </Button>
                
                <Button
                  onClick={handleWhatsAppClick}
                  className="mx-4 w-[calc(100%-2rem)] bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 transition-all duration-300"
                  variant="outline"
                >
                  WhatsApp Us
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
      
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
      
      <GalleryModal
        isOpen={showGalleryModal}
        onClose={() => setShowGalleryModal(false)}
      />
    </>
  );
}