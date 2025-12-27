import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Camera, Calendar, Users, Award } from "lucide-react";
import logoImage from "@/assets/logo.png";
export function Footer() {
  return <footer className="bg-accent text-accent-foreground">
      {/* Newsletter Section */}
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-primary-foreground mb-4">
              Stay Connected to the Wild
            </h3>
            <p className="text-primary-foreground/90 mb-8 text-lg">
              Get exclusive safari deals, wildlife updates, and travel inspiration delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input type="email" placeholder="Your email address" className="flex-1 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/70" />
              <Button variant="secondary" className="shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img 
                src={logoImage} 
                alt="Cheesecake Safaris" 
                className="h-12 w-auto mb-4" 
                style={{ 
                  filter: 'brightness(0) invert(1)',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">Creating unforgettable African safari experiences since 2015. We're passionate about wildlife conservation and authentic travel adventures.</p>
            
            {/* Awards */}
            <div className="space-y-2 mb-6">
              
              <div className="flex items-center gap-2 text-sm">
                <Award className="w-4 h-4 text-primary" />
                <span>Kenya Safari Operators License</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" className="hover:text-primary hover:bg-primary/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:text-primary hover:bg-primary/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:text-primary hover:bg-primary/10">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:text-primary hover:bg-primary/10">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-foreground">Quick Links</h4>
            <div className="space-y-3">
              {['Safari Packages', 'Destinations', 'About Us', 'Photo Gallery', 'Travel Blog', 'Customer Reviews', 'Terms & Conditions', 'Privacy Policy'].map(link => <a key={link} href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  {link}
                </a>)}
            </div>
          </div>

          {/* Safari Destinations */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-foreground">POPULAR SAFARI DESTINATIONS</h4>
            <div className="space-y-3">
              {['Masai Mara National Reserve', 'Serengeti National Park', 'Amboseli National Park', 'Tsavo East & West', 'Lake Nakuru National Park', 'Samburu National Reserve', 'Ngorongoro Crater', 'Tarangire National Park'].map(destination => <a key={destination} href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  {destination}
                </a>)}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-foreground">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
                <div>
                  <p className="text-muted-foreground">
                    <br />
                    MASAI MARA<br />
                    Kenya, East Africa
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-muted-foreground">+254710622549</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-muted-foreground">info@cheesecakesafaris.com</p>
                  <p className="text-muted-foreground">bookings@cheesecakesafaris.com</p>
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">© 2024 4ON4. All rights reserved. | Licensed Safari Operator in Kenya</p>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              500+ Happy Travelers
            </span>
            <span className="flex items-center gap-1">
              <Camera className="w-4 h-4" />
              150+ Safaris
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Est. 2015
            </span>
          </div>
        </div>
      </div>
    </footer>;
}