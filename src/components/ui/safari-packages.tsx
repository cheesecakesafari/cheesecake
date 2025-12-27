import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, Calendar, Camera, Tent } from "lucide-react";
import bigFiveImage from "@/assets/big-five.jpg";
import lodgeImage from "@/assets/safari-lodge.jpg";
import migrationImage from "@/assets/migration.jpg";

const packages = [
  {
    id: 1,
    title: "Mara Explorer – Big Five Safari",
    description: "Explore Maasai Mara, the heart of Kenya's wildlife. Witness the Big Five and the great wildebeest migration.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    duration: "4 Days / 3 Nights",
    groupSize: "Up to 8 guests",
    price: "$890",
    originalPrice: "$990",
    rating: 4.8,
    reviews: 156,
    badge: "Popular",
    features: ["Game drives", "Full-board camps", "Park fees", "Professional guide"],
    destinations: ["Mara"]
  },
  {
    id: 2,
    title: "Amboseli Panorama & Kilimanjaro Views",
    description: "A short scenic tour of Amboseli with unforgettable views of Mt. Kilimanjaro, and large elephant herds.",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    duration: "3 Days / 2 Nights",
    groupSize: "Up to 6 guests",
    price: "$750",
    originalPrice: "$850",
    rating: 4.7,
    reviews: 98,
    badge: "Scenic",
    features: ["Park entrance", "Game drives", "Meals", "Transfers"],
    destinations: ["Amboseli"]
  },
  {
    id: 3,
    title: "Nairobi Express Safari",
    description: "A quick urban wildlife escape including Nairobi National Park, Giraffe Centre, and Karen Blixen Museum.",
    image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
    duration: "2 Days / 1 Night",
    groupSize: "Up to 10 guests",
    price: "$290",
    originalPrice: "$350",
    rating: 4.5,
    reviews: 203,
    badge: "Express",
    features: ["Entrance fees", "Guide", "Transport", "City tour"],
    destinations: ["Nairobi"]
  },
  {
    id: 4,
    title: "Mombasa Rendezvous – Coastal Luxury Safari",
    description: "A coastal blend of safari and beach – Tsavo East & West, ending in white sand relaxation at Diani or Nyali.",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    duration: "5 Days / 4 Nights",
    groupSize: "Up to 8 guests",
    price: "$1,100",
    originalPrice: "$1,250",
    rating: 4.9,
    reviews: 127,
    badge: "Luxury",
    features: ["Accommodation", "Meals", "Safari van", "Beach resort"],
    destinations: ["Mombasa"]
  },
  {
    id: 5,
    title: "Nakuru & Lake Naivasha Flamingo Trail",
    description: "Discover pink flamingos in Lake Nakuru and hippo spotting in Lake Naivasha. Great for bird lovers and families.",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
    duration: "3 Days / 2 Nights",
    groupSize: "Up to 12 guests",
    price: "$620",
    originalPrice: "$720",
    rating: 4.6,
    reviews: 145,
    badge: "Family Friendly",
    features: ["Boat ride", "Park fees", "Full board", "Bird watching"],
    destinations: ["Nakuru"]
  },
  {
    id: 6,
    title: "Northern Circuit Discovery (Samburu – Shaba – Meru)",
    description: "Rugged adventure through Samburu, Buffalo Springs & Meru, home to unique wildlife like the Grevy's zebra.",
    image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2",
    duration: "6 Days / 5 Nights",
    groupSize: "Up to 8 guests",
    price: "$1,450",
    originalPrice: "$1,650",
    rating: 4.8,
    reviews: 89,
    badge: "Adventure",
    features: ["Park fees", "Camping/lodge", "Transport", "Wildlife tracking"],
    destinations: ["Northern Circuit"]
  },
  {
    id: 7,
    title: "Southern Circuit Retreat (Tsavo – Taita – Amboseli)",
    description: "A diverse southern route through dry savannahs, saltlicks and Kilimanjaro backdrops.",
    image: "https://images.unsplash.com/photo-1487252665478-49b61b47f302",
    duration: "5 Days / 4 Nights",
    groupSize: "Up to 10 guests",
    price: "$1,200",
    originalPrice: "$1,400",
    rating: 4.7,
    reviews: 112,
    badge: "Diverse",
    features: ["Lodges", "Game drives", "Meals", "Scenic views"],
    destinations: ["Southern Circuit"]
  },
  {
    id: 8,
    title: "Best of Kenya – Countrywide Safari Circuit",
    description: "From Maasai Mara to Samburu, Lake Nakuru to Amboseli. The complete safari loop in one unforgettable journey.",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    duration: "10 Days / 9 Nights",
    groupSize: "Up to 12 guests",
    price: "$2,400",
    originalPrice: "$2,800",
    rating: 4.9,
    reviews: 234,
    badge: "Best Value",
    features: ["National parks access", "All transfers", "4x4 land cruiser", "Full itinerary"],
    destinations: ["Kenyan Circuit"]
  },
  {
    id: 9,
    title: "East Africa Explorer – Kenya & Tanzania Combo",
    description: "Cross-border safari from Maasai Mara to Serengeti, Ngorongoro, Lake Manyara and Tarangire.",
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
    duration: "12 Days / 11 Nights",
    groupSize: "Up to 8 guests",
    price: "$3,600",
    originalPrice: "$4,200",
    rating: 5.0,
    reviews: 167,
    badge: "Premium",
    features: ["Visa assistance", "Game drives", "Accommodation", "Cross-border transport"],
    destinations: ["Kenya/Tanzania Circuit"]
  },
  {
    id: 10,
    title: "Tsavo Wilderness & Red Elephants Safari",
    description: "Discover Tsavo's red-dusted elephants, rugged terrain and the lush Mzima Springs in Tsavo West.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    duration: "4 Days / 3 Nights",
    groupSize: "Up to 10 guests",
    price: "$870",
    originalPrice: "$970",
    rating: 4.8,
    reviews: 134,
    badge: "Wildlife",
    features: ["Park fees", "Lodge", "Guide", "Meals"],
    destinations: ["Tsavo"]
  }
];

export function SafariPackages() {
  return (
    <section id="safaris" className="py-20 bg-sunset-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Explore Kenya Safaris
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Discover Your Journey,
            <span className="block text-primary">One Adventure at a Time</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expand your horizons and ignite your wanderlust! Explore breathtaking landscapes, 
            experience vibrant cultures, and create lasting memories across East Africa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card 
              key={pkg.id} 
              className="group hover:shadow-safari transition-all duration-300 hover:-translate-y-2 border-0 bg-card/95 backdrop-blur-sm overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Badge */}
                <Badge 
                  className={`absolute top-4 left-4 ${
                    pkg.badge === 'Popular' ? 'bg-primary' : 
                    pkg.badge === 'Luxury' ? 'bg-accent' : 
                    'bg-secondary'
                  } text-white border-0 px-3 py-1`}
                >
                  {pkg.badge}
                </Badge>

                {/* Duration & Price Overlay */}
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-sm font-medium mb-1 opacity-90">{pkg.duration}</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">From {pkg.price}</span>
                  </div>
                  <div className="text-sm opacity-80">
                    <span className="line-through">{pkg.originalPrice}</span> per person
                  </div>
                </div>

                {/* Free Cancellation Badge */}
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-foreground text-xs">
                    Free Cancellation
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-semibold text-foreground">{pkg.rating}</span>
                    <span className="text-sm text-muted-foreground">({pkg.reviews} reviews)</span>
                  </div>
                </div>
                
                <CardTitle className="text-xl group-hover:text-primary transition-colors mb-2">
                  {pkg.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground line-clamp-2">
                  {pkg.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Destinations */}
                <div className="flex flex-wrap gap-2">
                  {pkg.destinations.map((destination) => (
                    <Badge key={destination} variant="outline" className="text-xs border-primary/30">
                      {destination}
                    </Badge>
                  ))}
                </div>

                {/* Features Grid */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground text-sm">Highlights:</h4>
                  <div className="grid grid-cols-2 gap-y-1 text-xs text-muted-foreground">
                    {pkg.features.slice(0, 4).map((feature) => (
                      <div key={feature} className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <div className="w-full space-y-2">
                  <Button 
                    size="sm" 
                    className="w-full bg-hero-gradient hover:shadow-warm text-primary-foreground font-semibold"
                  >
                    Book Now - {pkg.price}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full hover:border-primary hover:text-primary text-xs"
                  >
                    View Full Details
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
            View All Safari Packages
          </Button>
        </div>
      </div>
    </section>
  );
}