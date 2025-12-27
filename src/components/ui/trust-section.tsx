import { Shield, Star, Clock, Users } from "lucide-react";

const trustFeatures = [
  {
    icon: Shield,
    title: "Free Cancellation",
    description: "Stay flexible on your trip"
  },
  {
    icon: Star,
    title: "1,500+ Experiences",
    description: "Make memories around East Africa"
  },
  {
    icon: Clock,
    title: "Quick Reservation",
    description: "Book your safari spot instantly"
  },
  {
    icon: Users,
    title: "Trusted Reviews",
    description: "4.9 stars from 500+ happy travelers"
  }
];

export function TrustSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-4">
          Why Book with Cheesecake Safaris?
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Discover your journey, one destination at a time with Africa's most trusted safari operator.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {trustFeatures.map((feature, index) => (
            <div 
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-12 h-12 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors mobile-trust-icon">
                <feature.icon className="w-6 h-6 md:w-10 md:h-10 text-primary" />
              </div>
              <h3 className="text-sm md:text-xl font-semibold text-foreground mb-1 md:mb-2">
                {feature.title}
              </h3>
              <p className="text-xs md:text-base text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}