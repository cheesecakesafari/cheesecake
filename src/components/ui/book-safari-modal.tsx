import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Button } from './button';
import { Input } from './input';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BookSafariModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookSafariModal = ({ isOpen, onClose }: BookSafariModalProps) => {
  const [formData, setFormData] = useState({
    client_name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.client_name || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const message = `General booking inquiry\n\nName: ${formData.client_name}\nEmail: ${formData.email}`;
      const mailto = `mailto:cheesecakesafari@gmail.com?subject=${encodeURIComponent('Booking Inquiry')}&body=${encodeURIComponent(message)}`;
      window.location.href = mailto;
      window.open(`https://wa.me/254710622549?text=${encodeURIComponent(message)}`, '_blank');

      const payload = { ...formData, message: 'General safari booking inquiry' };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `booking_${(formData.client_name || 'booking').replace(/\s+/g,'_')}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      toast({
        title: "Success!",
        description: "Mail client opened and WhatsApp window opened. A booking file has been downloaded."
      });

      setFormData({ client_name: '', email: '' });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to prepare booking request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Book a Safari
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name *
            </label>
            <Input
              id="name"
              type="text"
              value={formData.client_name}
              onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address *
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              We'll contact you within 24 hours to discuss your safari preferences
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};