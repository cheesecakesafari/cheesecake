import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
  description?: string;
  is_active: boolean;
}

export function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-muted-foreground">Loading partners...</p>
          </div>
        </div>
      </section>
    );
  }

  if (partners.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Our Partners
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We work with trusted organizations to bring you the best safari experiences in East Africa.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mobile-partners">
          {partners.map((partner) => (
            <Card 
              key={partner.id} 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => partner.website_url && window.open(partner.website_url, '_blank')}
            >
              <CardContent className="p-3 md:p-6 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <img
                    src={partner.logo_url || '/placeholder-logo.png'}
                    alt={partner.name}
                    className="w-8 h-8 md:w-12 md:h-12 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyOEMxOC44OTU0IDI4IDE4IDI3LjEwNDYgMTggMjZDMTggMjQuODk1NCAxOC44OTU0IDI0IDIwIDI0QzIxLjEwNDYgMjQgMjIgMjQuODk1NCAyMiAyNkMyMiAyNy4xMDQ2IDIxLjEwNDYgMjggMjAgMjhaIiBmaWxsPSIjOUI5QjlCIi8+CjxwYXRoIGQ9Ik0yMCAyMkMxNi42ODYyIDIyIDE0IDIwLjIwOTEgMTQgMThDMTQgMTUuNzkwOSAxNi42ODYyIDE0IDIwIDE0QzIzLjMxMzggMTQgMjYgMTUuNzkwOSAyNiAxOEMyNiAyMC4yMDkxIDIzLjMxMzggMjIgMjAgMjJaIiBmaWxsPSIjOUI5QjlCIi8+Cjwvc3ZnPgo=';
                    }}
                  />
                </div>
                <h3 className="text-xs md:text-sm font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors">
                  {partner.name}
                </h3>
                {partner.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2 hidden md:block">
                    {partner.description}
                  </p>
                )}
                {partner.website_url && (
                  <div className="mt-1 md:mt-2 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-2 h-2 md:w-3 md:h-3" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}