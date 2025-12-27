import { Button } from "@/components/ui/button";
import { Calendar, Star } from "lucide-react";
import { useState, useEffect } from "react";

export function HeroSection() {
  // Background images from locations
  const backgroundImages = [
    "/lovable-uploads/fe41aca9-8b2e-4411-a26b-12b03a306ed3.png", // Mara
    "/lovable-uploads/027d28b9-e81e-4be9-8866-82e8a63418af.png", // Amboseli
    "/lovable-uploads/42dc64d7-f1e3-4ae8-989f-96d8efe4c370.png", // Mombasa
    "/lovable-uploads/20dad3c2-4a13-4536-8292-236db07aed93.png", // Nakuru
    "/lovable-uploads/9f7fd907-e4ed-4f03-ae9c-a2ed6e890bac.png", // Northern Circuit
    "/lovable-uploads/ce893bd7-72de-4871-916e-99d3fc89d79a.png", // Southern Circuit
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-play slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev === backgroundImages.length - 1 ? 0 : prev + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleBookSafari = () => {
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image} 
              alt={`Safari destination ${index + 1}`} 
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-overlay-gradient"></div>
        
        {/* Slideshow Indicators */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-110' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary-foreground rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              ⭐ Unleash Your Adventurous Spirit
            </span>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Creating Unforgettable
              <span className="block bg-hero-gradient bg-clip-text text-transparent">
                Safari Memories
              </span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              From the untamed wilderness of East Africa, we unlock hidden gems and curate 
              personalized adventures that leave you breathless.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleBookSafari}
                className="bg-hero-gradient hover:shadow-gold transition-all duration-300 text-primary-foreground"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Safari
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-white/70 text-sm">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">150+</div>
                <div className="text-white/70 text-sm">Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4.9</div>
                <div className="text-white/70 text-sm flex items-center gap-1 justify-center">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}