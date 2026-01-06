import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { GalleryModal } from '@/components/ui/gallery-modal';

interface GalleryItem {
  _id: string;
  clientName: string;
  description: string;
  location: string;
  images: string[];
}

interface GallerySectionProps {
  isGalleryModalOpen: boolean;
  setIsGalleryModalOpen: (open: boolean) => void;
}

export function GallerySection({ isGalleryModalOpen, setIsGalleryModalOpen }: GallerySectionProps) {
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
        const res = await fetch(`${apiBase}/gallery`);
        if (!res.ok) throw new Error('Failed to load gallery');
        const data = await res.json();
        setItems(data || []);
      } catch (err) {
        console.error('Gallery fetch error:', err);
      }
    };

    fetchGallery();
  }, [isGalleryModalOpen]);

  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

  return (
    <section className="py-8 px-4 bg-transparent">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-base font-semibold tracking-tight text-gray-800 mb-2">
          JOIN US TO SHARE A PICTURE OF YOUR SAFARI
          <button
            type="button"
            onClick={() => setIsGalleryModalOpen(true)}
            className="ml-2 text-sm text-blue-600 hover:underline"
          >
            [Add Picture]
          </button>
        </h2>

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Your shared moments contribute to a better community. You keep full rights to your pictures.
        </p>

        <GalleryModal
          open={isGalleryModalOpen}
          onOpenChange={setIsGalleryModalOpen}
          onGallerySubmitted={() => {
            // refresh gallery after submission
            const ev = new Event('refreshGallery');
            window.dispatchEvent(ev);
          }}
        />

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {items.slice(0, 6).map((g) => (
            <div key={g._id} className="overflow-hidden rounded">
              {g.images && g.images[0] ? (
                  <img
                    src={`${apiBase}/${g.images[0].replace(/\\\\/g, '/').replace(/^\/+/, '')}`}
                  alt={g.description}
                  className="w-full h-28 object-cover rounded"
                />
              ) : (
                <div className="w-full h-28 bg-muted-foreground flex items-center justify-center text-xs">No image</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-3">
          <Button variant="link" className="text-sm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>See More Gallery</Button>
        </div>
      </div>
    </section>
  );
}
