import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, User, Calendar, Users } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripId?: string;
  tripTitle?: string;
}

export function BookingModal({ isOpen, onClose, tripId, tripTitle }: BookingModalProps) {
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    message: "",
    numberOfPeople: 1,
    bookingDate: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Build booking message and open mailto + whatsapp, also download a JSON file for records
      const message = `Booking request for trip: ${tripTitle || tripId || 'N/A'}\n\nName: ${formData.clientName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nDate: ${formData.bookingDate || 'N/A'}\nTravelers: ${formData.numberOfPeople}\nMessage: ${formData.message}`;

      // Open mail client
      const subject = `Booking request - ${tripTitle || 'Trip'}`;
      const mailto = `mailto:cheesecakesafari@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      // open mailto
      window.location.href = mailto;

      // Open WhatsApp in new tab
      const wa = `https://wa.me/254710622549?text=${encodeURIComponent(message)}`;
      window.open(wa, '_blank');

      // Download booking JSON
      const payload = { tripId, tripTitle, ...formData };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `booking_${(formData.clientName || 'booking').replace(/\s+/g,'_')}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      toast({
        title: "Booking Prepared",
        description: "Mail client opened and WhatsApp window opened. A booking file has been downloaded.",
      });

      setFormData({
        clientName: "",
        email: "",
        phone: "",
        message: "",
        numberOfPeople: 1,
        bookingDate: ""
      });
      onClose();
    } catch (error) {
      console.error('Error preparing booking:', error);
      toast({
        title: "Error",
        description: "Failed to prepare booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Book Your Safari
          </DialogTitle>
          {tripTitle && (
            <p className="text-sm text-muted-foreground">Trip: {tripTitle}</p>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clientName" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name *
            </Label>
            <Input
              id="clientName"
              value={formData.clientName}
              onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
              placeholder="Enter your full name"
              required
              className="text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="your.email@example.com"
              required
              className="text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+254 xxx xxx xxx"
              className="text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numberOfPeople" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Travelers
              </Label>
              <Input
                id="numberOfPeople"
                type="number"
                min="1"
                max="20"
                value={formData.numberOfPeople}
                onChange={(e) => setFormData(prev => ({ ...prev, numberOfPeople: parseInt(e.target.value) }))}
                className="text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bookingDate">Preferred Date</Label>
              <Input
                id="bookingDate"
                type="date"
                value={formData.bookingDate}
                onChange={(e) => setFormData(prev => ({ ...prev, bookingDate: e.target.value }))}
                className="text-sm"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Special Requests</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Any special requirements or questions..."
              rows={3}
              className="text-sm resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 text-sm"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-hero-gradient text-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            * Required fields. We'll contact you within 24 hours to confirm your booking.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}