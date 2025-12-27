import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Button } from './button';
import { X } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            About Us
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            We are a Kenyan-based tour agency offering guided tours to exotic destinations 
            across the country. We plan personalized trips, assist with bookings, provide 
            all-weather 4x4 vehicles for tough terrains, and ensure smooth follow-ups for 
            a stress-free experience.
          </p>
          
          <div className="pt-4">
            <h3 className="font-semibold mb-2">Our Mission</h3>
            <p className="text-sm text-muted-foreground">
              To provide unforgettable safari experiences while showcasing the natural 
              beauty and wildlife of Kenya in a responsible and sustainable manner.
            </p>
          </div>
          
          <div className="pt-2">
            <h3 className="font-semibold mb-2">Why Choose Us?</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Expert local guides</li>
              <li>• Personalized itineraries</li>
              <li>• All-weather 4x4 vehicles</li>
              <li>• 24/7 customer support</li>
              <li>• Stress-free booking experience</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};