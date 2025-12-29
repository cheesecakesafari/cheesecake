import React, { useState, useEffect } from 'react';
// Static mode: bookings read from `public/data/bookings.json`. Persistence disabled.
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Users, Mail, Phone, Calendar, MessageSquare, MapPin } from 'lucide-react';
import { format } from 'date-fns';

interface Booking {
  id: string;
  client_name: string;
  email: string;
  phone: string | null;
  booking_date: string | null;
  number_of_people: number | null;
  message: string | null;
  status: string | null;
  trip_id: string | null;
  created_at: string;
  updated_at: string;
  trips?: {
    title: string;
    price: number | null;
  };
}

export function BookingsManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/data/bookings.json');
      if (!res.ok) throw new Error('Failed to load bookings');
      const data: Booking[] = await res.json();
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch bookings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      // Persistence disabled in static mode — update not possible. Inform the admin.
      toast({
        title: "Not Available",
        description: "Updating booking status is disabled in static mode. Edit the data file to persist changes.",
      });
    } catch (error) {
      console.error('Error updating booking:', error);
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'confirmed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Client Bookings ({bookings.length})</h3>
          <p className="text-sm text-muted-foreground">
            Manage and track all booking requests from clients
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold text-lg">{booking.client_name}</h4>
                  <Badge variant={getStatusColor(booking.status)}>
                    {booking.status || 'pending'}
                  </Badge>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                    disabled={booking.status === 'confirmed'}
                  >
                    Confirm
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                    disabled={booking.status === 'cancelled'}
                  >
                    Cancel
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{booking.email}</span>
                  </div>
                  
                  {booking.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.phone}</span>
                    </div>
                  )}

                  {booking.booking_date && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {format(new Date(booking.booking_date), 'PPP')}
                      </span>
                    </div>
                  )}

                  {booking.number_of_people && (
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.number_of_people} people</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {booking.trips && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">
                        <p className="font-medium">{booking.trips.title}</p>
                        {booking.trips.price && (
                          <p className="text-muted-foreground">${booking.trips.price}</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="text-sm text-muted-foreground">
                    <strong>Submitted:</strong> {format(new Date(booking.created_at), 'PPp')}
                  </div>
                </div>
              </div>

              {booking.message && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <div className="flex items-start space-x-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium mb-1">Client Message:</p>
                      <p className="text-sm text-muted-foreground">{booking.message}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        
        {bookings.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No bookings yet</h3>
              <p className="text-muted-foreground">
                Client booking requests will appear here when submitted
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}