

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Users, MapPin, Star, Search } from "lucide-react";

export function FloatingWidget() {
  const [guests, setGuests] = useState("2");
  const [destination, setDestination] = useState("");

  const handleFindAdventure = () => {
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleComingSoon = () => {
    window.open('/coming-soon', '_blank');
  };

  return (
    <div className="w-full bg-gradient-to-r from-yellow-500/10 to-amber-600/10 backdrop-blur-sm border-b border-yellow-400/20 relative z-20">
      <div className="bg-gradient-to-r from-yellow-500/20 to-amber-600/20 backdrop-blur-sm rounded-2xl border border-yellow-400/30 mx-4 my-2 max-w-4xl mx-auto shadow-lg">
        <div className="px-6 py-4">
          <div className="text-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
              CHEESECAKE SAFARIS GIVES YOU AN OPPORTUNITY TO CUSTOMIZE YOUR OWN TRIP WITH 6 SIMPLE STEPS.
            </h2>
            <p className="text-lg font-semibold text-white/90">
              SHARE IT WITH US TO FACILITATE IT
            </p>
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={handleComingSoon}
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 transition-all duration-300 text-white font-semibold px-6 py-2 text-sm rounded-xl shadow-md hover:shadow-lg"
            >
              CLICK TO CREATE YOUR PERSONALIZED SAFARIS
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
