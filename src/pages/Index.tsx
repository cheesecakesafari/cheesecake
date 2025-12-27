// Organized Section Imports
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { HamburgerMenu } from "@/components/sections/HamburgerMenu";
import { FloatingWidget } from "@/components/sections/FloatingWidget";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { CommentsSection } from "@/components/sections/CommentsSection";
import { PartnersSection } from "@/components/ui/partners-section";
import { EnhancedFooter } from "@/components/sections/EnhancedFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Header with Cars Icon */}
      <Header />
      
      {/* Hamburger Menu */}
      <HamburgerMenu />
      
      {/* Floating Widget - Bottom */}
      <FloatingWidget />
      
      {/* Floating WhatsApp */}
      <FloatingWhatsApp />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Packages Section */}
      <PackagesSection />
      
      {/* Comments Section */}
      <CommentsSection />
      
      {/* Our Partners Section */}
      <PartnersSection />
      
      {/* Enhanced Footer */}
      <EnhancedFooter />
    </div>
  );
};

export default Index;
