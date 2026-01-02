import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// Dialog overlay removed — render inline split panel instead
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, MapPin, Mail } from "lucide-react";
import PackageCreate from "@/components/ui/package-create";
import { cn } from "@/lib/utils";

interface Location {
  id: string;
  name: string;
  label: string;
  imageUrl: string;
}

const locations: Location[] = [
  {
    id: "mara",
    name: "Mara",
    label: "MARA PACKAGES",
    imageUrl: "/lovable-uploads/fe41aca9-8b2e-4411-a26b-12b03a306ed3.png"
  },
  {
    id: "amboseli",
    name: "Amboseli",
    label: "AMBOSELI PACKAGES",
    imageUrl: "/lovable-uploads/027d28b9-e81e-4be9-8866-82e8a63418af.png"
  },
  {
    id: "nairobi",
    name: "Nairobi",
    label: "NAIROBI PACKAGES",
    imageUrl: "/lovable-uploads/8f9ce083-ca06-4232-a0a8-c87e32bd8b00.png"
  },
  {
    id: "mombasa",
    name: "Mombasa",
    label: "MOMBASA PACKAGES",
    imageUrl: "/lovable-uploads/42dc64d7-f1e3-4ae8-989f-96d8efe4c370.png"
  },
  {
    id: "nakuru",
    name: "Nakuru",
    label: "NAKURU PACKAGES",
    imageUrl: "/lovable-uploads/20dad3c2-4a13-4536-8292-236db07aed93.png"
  },
  {
    id: "northern-circuit",
    name: "Northern Circuit",
    label: "NORTHERN CIRCUIT PACKAGES",
    imageUrl: "/lovable-uploads/9f7fd907-e4ed-4f03-ae9c-a2ed6e890bac.png"
  },
  {
    id: "southern-circuit",
    name: "Southern Circuit", 
    label: "SOUTHERN CIRCUIT PACKAGES",
    imageUrl: "/lovable-uploads/ce893bd7-72de-4871-916e-99d3fc89d79a.png"
  },
  {
    id: "kenyan-circuit",
    name: "Kenyan Circuit",
    label: "KENYAN CIRCUIT PACKAGES", 
    imageUrl: "/lovable-uploads/7dd67f39-6c7b-4c56-96c5-561989884c89.png"
  },
  {
    id: "kenya-tanzania-circuit",
    name: "Kenya/Tanzania Circuit",
    label: "KENYA/TANZANIA PACKAGES",
    imageUrl: "/lovable-uploads/46b3610c-6d97-48d5-aa82-248ee472032d.png"
  },
  {
    id: "tsavo",
    name: "Tsavo",
    label: "TSAVO PACKAGES",
    imageUrl: "/lovable-uploads/080e0fae-217e-429d-b8aa-3b0a2cd6b7a2.png"
  }
];

interface LocationsSectionProps {
  onViewAllClick?: () => void;
}

export function LocationsSection({ onViewAllClick }: LocationsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 8;
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [packageItems, setPackageItems] = useState<Array<any>>([]);
  
  const [formName, setFormName] = useState('');
  const [formDays, setFormDays] = useState('3');
  const [formHotelType, setFormHotelType] = useState('5 star Accommodation');
  const [formExtra, setFormExtra] = useState('');
  // Dialog is always full-page split; no collapse toggle needed

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerPage >= locations.length ? 0 : prev + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - itemsPerPage < 0 ? Math.max(0, locations.length - itemsPerPage) : prev - itemsPerPage
    );
  };

  const handleLocationClick = (locationId: string) => {
    // open summary modal for the clicked location instead of redirecting
    const loc = locations.find((l) => l.id === locationId) || { id: locationId, name: locationId, label: locationId.toUpperCase(), imageUrl: '' };
    setActiveLocation(loc as Location);
    // prefill form defaults when opening
    setFormName('');
    setFormDays('3');
    setFormHotelType('5 star Accommodation');
    setFormExtra('');
    setShowSummary(true);
  };

  // handleQuickAdd removed — use the full summary modal to add locations to a package

  const handleSubmitSummary = () => {
    if (!activeLocation) return;
    const payload = {
      id: activeLocation.id,
      locationName: activeLocation.name,
      name: formName,
      days: formDays,
      hotelType: formHotelType,
      extra: formExtra,
      summary: locationSummaries[activeLocation.id]?.summary || ''
    };
    addToPackage(payload);
  };

  const emailPackageToCheesecake = () => {
    const to = 'cheesecakesafari@gmail.com';
    const subject = encodeURIComponent('PREPARE THIS PACKAGE DETAILS');
    let body = '';
    packageItems.forEach((p: any, i: number) => {
      body += `${i+1}. ${p.locationName || p.id} - ${p.days || ''} days - ${p.hotelType || ''}\n`;
      if (p.name) body += `   Client: ${p.name}\n`;
      if (p.extra) body += `   Notes: ${p.extra}\n`;
      body += '\n';
    });
    const mailto = `mailto:${to}?subject=${subject}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const downloadPackageJSON = () => {
    const blob = new Blob([JSON.stringify(packageItems, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cheesecake_package_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleViewAllClick = () => {
    onViewAllClick?.();
  };

  const visibleLocations = locations.slice(currentIndex, currentIndex + itemsPerPage);

  const locationSummaries: Record<string, { title?: string; what?: string; season?: string; climate?: string; activities?: string[]; summary?: string }> = {
    mara: {
      title: 'THE GREAT WILDEBEEST MIGRATION',
      what: 'Millions of wildebeest, zebras, and gazelles thunder across open plains and crocodile-filled rivers in one of nature’s greatest spectacles.',
      season: 'July – October',
      climate: 'Equatorial → Year-round summer (warm days, cool mornings)',
      activities: ['Big Five game drives','Hot air balloon safaris','Maasai cultural visits'],
      summary: 'Masai Mara is Kenya’s flagship safari destination, defined by endless savannahs and extraordinary wildlife density. It offers some of the best predator sightings in Africa and dramatic landscapes that change with the seasons.'
    },
    amboseli: {
      title: 'GIANT ELEPHANTS AGAINST MT. KILIMANJARO',
      what: 'Close-range elephant encounters with Africa’s highest mountain as a backdrop.',
      season: 'June – October & January – February',
      climate: 'Equatorial → Year-round summer',
      activities: ['Wildlife photography','Bird watching in swamps','Cultural village visits'],
      summary: 'Amboseli is iconic for its vast open plains and powerful elephant herds. Its wetlands attract wildlife even during dry seasons, making sightings reliable year-round.'
    },
    samburu: {
      title: 'RARE NORTHERN WILDLIFE EXPERIENCE',
      what: 'Unique species found only in northern Kenya, adapted to semi-arid conditions.',
      season: 'Year-round',
      climate: 'Equatorial → Hot, dry, year-round summer',
      activities: ['River-based wildlife viewing','Samburu cultural encounters','Guided nature walks'],
      summary: 'Samburu is rugged, raw, and culturally rich. The Ewaso Nyiro River sustains wildlife in an otherwise dry landscape.'
    },
    nakuru: {
      title: 'FLAMINGO & RHINO SANCTUARY',
      what: 'Mass flamingo gatherings paired with strong rhino conservation success.',
      season: 'January – March & July – October',
      climate: 'Equatorial → Year-round summer',
      activities: ['Rhino tracking','Scenic viewpoints','Bird photography'],
      summary: 'Lake Nakuru is compact yet incredibly rewarding. It combines vibrant birdlife with reliable sightings of black and white rhinos.'
    },
    naivasha: {
      title: 'WALK & CYCLE AMONG WILDLIFE',
      what: 'One of the few places where you can safely walk or cycle beside wild animals.',
      season: 'Year-round',
      climate: 'Equatorial → Year-round summer',
      activities: ['Boat safaris','Hell’s Gate exploration','Bird watching'],
      summary: 'Naivasha is relaxed and scenic, perfect for breaking up long safari drives.'
    },
    'nairobi': {
      title: 'WILDLIFE WITH A CITY SKYLINE',
      what: 'Wild rhinos and giraffes roaming with Nairobi’s skyline behind them.',
      season: 'Year-round',
      climate: 'Equatorial → Year-round summer',
      activities: ['City game drives','Giraffe Centre & museums','Dining & nightlife'],
      summary: 'Nairobi is the only capital city with a national park within its borders.'
    },
    'kenya-tanzania-circuit': {},
    'mombasa': {},
    'kenyan-circuit': {},
    'tsavo': {},
    'southern-circuit': {},
    'northern-circuit': {},
    'mount-kenya': {},
    'kenyan-coast': {},
  };

  const addToPackage = (data: any) => {
    setPackageItems((prev) => [...prev, data]);
    setShowSummary(false);
  };

  const prepareEmail = () => {
    const subject = encodeURIComponent('PREPARE THIS PACKAGE DETAILS');
    let body = '';
    body += 'Package Details%0A%0A';
    packageItems.forEach((p: any, i: number) => {
      body += `${i+1}. Destination: ${p.locationName || p.id}%0A`;
      if (p.name) body += `   Name: ${p.name}%0A`;
      body += `   Days: ${p.days || ''}%0A`;
      body += `   Hotel Type: ${p.hotelType || ''}%0A`;
      body += `   Notes: ${p.extra?.substring(0,200) || ''}%0A%0A`;
    });
    const url = `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&tf=1&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-12 bg-gradient-to-br from-amber-50/30 to-yellow-100/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Popular Places to visit</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Choose your dream destination and discover amazing safari packages</p>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full bg-background/80 backdrop-blur-sm"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <span className="text-sm text-muted-foreground">
            {Math.floor(currentIndex / itemsPerPage) + 1} of {Math.ceil(locations.length / itemsPerPage)}
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full bg-background/80 backdrop-blur-sm"
            disabled={currentIndex + itemsPerPage >= locations.length}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-6">
          {visibleLocations.map((location) => (
            <Card
              key={location.id}
              role="button"
              tabIndex={0}
              className="group cursor-pointer hover:shadow-md transition-all duration-200 overflow-hidden bg-gradient-to-br from-amber-50/50 to-yellow-100/50 border border-amber-200/40 backdrop-blur-sm hover:bg-gradient-to-br hover:from-amber-100/60 hover:to-yellow-200/60"
                onClick={(e) => { e.stopPropagation(); handleLocationClick(location.id); }}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleLocationClick(location.id); } }}
            >
              <div className="relative h-28 md:h-36 overflow-hidden">
                <img src={location.imageUrl} alt={location.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-2 left-2">
                  <div className="bg-amber-500/90 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {location.name}
                  </div>
                </div>
              </div>

              <CardContent className="p-2">
                <h3 className="text-center font-bold text-foreground text-xs md:text-sm tracking-wide">{location.label}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <PackageCreate items={packageItems} onEmail={emailPackageToCheesecake} onDownload={downloadPackageJSON} onClear={() => setPackageItems([])} />

        <div className="text-center">
          <Button onClick={handleViewAllClick} className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-lg hover:shadow-xl">View All</Button>
        </div>

        <Dialog open={showSummary} onOpenChange={(open) => setShowSummary(open)}>
          <DialogContent className="max-w-5xl">
            <DialogHeader>
              <DialogTitle>{activeLocation?.name} — Package Summary</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">Add notes and preferred options for this destination.</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <div>
                <div className="p-4 bg-card/50 rounded-md mb-4">
                  <h4 className="font-semibold text-base">{locationSummaries[activeLocation?.id || '']?.title || activeLocation?.label}</h4>
                  {locationSummaries[activeLocation?.id || '']?.what && (
                    <p className="text-sm text-muted-foreground mt-1">{locationSummaries[activeLocation?.id || '']?.what}</p>
                  )}
                  <div className="mt-2 text-sm text-muted-foreground">
                    <div><strong>Best season:</strong> {locationSummaries[activeLocation?.id || '']?.season || 'Year-round'}</div>
                    {locationSummaries[activeLocation?.id || '']?.activities && (
                      <div className="mt-1"><strong>Activities:</strong> {(locationSummaries[activeLocation?.id || '']?.activities || []).join(', ')}</div>
                    )}
                  </div>
                  {locationSummaries[activeLocation?.id || '']?.summary && (
                    <p className="mt-2 text-sm">{locationSummaries[activeLocation?.id || '']?.summary}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="space-y-4 mt-2 p-0" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                  <div>
                    <Label>Name (optional)</Label>
                    <Input value={formName} onChange={(e) => setFormName((e.target as HTMLInputElement).value)} placeholder="Your name" />
                  </div>

                  <div>
                    <Label>Number of Days</Label>
                    <Input value={formDays} onChange={(e) => setFormDays((e.target as HTMLInputElement).value)} type="number" />
                  </div>

                  <div>
                    <Label>Hotel Type</Label>
                    <Select value={formHotelType} onValueChange={(v) => setFormHotelType(v)}>
                      <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5 star Accommodation">5 star Accommodation</SelectItem>
                        <SelectItem value="Luxury Tent/Hotel">Luxury Tent/Hotel</SelectItem>
                        <SelectItem value="Budget Tent/Hotel">Budget Tent/Hotel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Extra Information (up to 500 words)</Label>
                    <Textarea value={formExtra} onChange={(e) => setFormExtra((e.target as HTMLTextAreaElement).value)} rows={5} maxLength={3000} />
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button onClick={handleSubmitSummary} className="px-6">Add to Package</Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}