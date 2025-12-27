import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Users, MapPin, Star, Play, Search } from "lucide-react";
import heroImage from "@/assets/safari-hero.jpg";
export function HeroSection() {
  const [guests, setGuests] = useState("2");
  const [destination, setDestination] = useState("");
  return <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="African Safari Landscape" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-overlay-gradient"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
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
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
                  From the untamed wilderness of East Africa, we unlock hidden gems and curate 
                  personalized adventures that leave you breathless.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="bg-hero-gradient hover:shadow-safari transition-all duration-300 text-primary-foreground">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Your Safari
                  </Button>
                  
                  
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center lg:justify-start gap-8 mt-12">
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
                    <div className="text-white/70 text-sm flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      Rating
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:justify-self-end w-full max-w-md animate-fade-in-up" style={{
            animationDelay: '0.2s'
          }}>
              <div className="bg-card/95 backdrop-blur-md rounded-2xl p-8 shadow-safari border border-white/20">
                <h3 className="text-2xl font-bold text-card-foreground mb-6 text-center">
                  Plan Your Safari
                </h3>

                <div className="space-y-4">
                  {/* Where */}
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Where (Destination)
                    </label>
                    <Select value={destination} onValueChange={setDestination}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Destinations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="masai-mara">Masai Mara</SelectItem>
                        <SelectItem value="amboseli">Amboseli</SelectItem>
                        <SelectItem value="tsavo-east">Tsavo East</SelectItem>
                        <SelectItem value="tsavo-west">Tsavo West</SelectItem>
                        <SelectItem value="samburu">Samburu</SelectItem>
                        <SelectItem value="lake-nakuru">Lake Nakuru</SelectItem>
                        <SelectItem value="diani">Diani Beach</SelectItem>
                        <SelectItem value="malindi">Malindi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      <Star className="w-4 h-4 inline mr-2" />
                      Type (Activity)
                    </label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="safari">Safari Adventures</SelectItem>
                        <SelectItem value="beach">Beach Holidays</SelectItem>
                        <SelectItem value="cultural">Cultural Tours</SelectItem>
                        <SelectItem value="honeymoon">Honeymoon Packages</SelectItem>
                        <SelectItem value="family">Family Getaways</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      <Users className="w-4 h-4 inline mr-2" />
                      Guests
                    </label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4 Guests</SelectItem>
                        <SelectItem value="5">5+ Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Search Button */}
                  <Button className="w-full bg-hero-gradient hover:shadow-safari transition-all duration-300 text-primary-foreground">
                    <Search className="w-4 h-4 mr-2" />
                    Find Your Adventure
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">Free cancellation up to 72 hours before your safari</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-safari-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>;
}