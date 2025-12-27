-- Create trips table for safari packages
CREATE TABLE public.trips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  image_url TEXT,
  duration TEXT,
  group_size TEXT,
  price DECIMAL(10,2),
  original_price DECIMAL(10,2),
  rating DECIMAL(2,1),
  reviews INTEGER DEFAULT 0,
  badge TEXT,
  features TEXT[],
  destinations TEXT[],
  detailed_info JSONB,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table for client booking details
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID REFERENCES public.trips(id),
  client_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  booking_date DATE,
  number_of_people INTEGER DEFAULT 1,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create company_cars table for vehicle information
CREATE TABLE public.company_cars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  number_plate TEXT NOT NULL UNIQUE,
  color TEXT,
  number_of_passengers INTEGER,
  images TEXT[],
  description TEXT,
  features TEXT[],
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create partners table for company partners
CREATE TABLE public.partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (but make tables publicly accessible since auth is disabled)
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since auth is disabled)
CREATE POLICY "Allow public read access to trips" ON public.trips FOR SELECT USING (true);
CREATE POLICY "Allow public insert to bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read access to company_cars" ON public.company_cars FOR SELECT USING (true);
CREATE POLICY "Allow public read access to partners" ON public.partners FOR SELECT USING (true);

-- Create storage bucket for trip images
INSERT INTO storage.buckets (id, name, public) VALUES ('trip-images', 'trip-images', true);

-- Create storage policies for trip images
CREATE POLICY "Public can view trip images" ON storage.objects FOR SELECT USING (bucket_id = 'trip-images');
CREATE POLICY "Public can upload trip images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'trip-images');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_trips_updated_at BEFORE UPDATE ON public.trips FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_company_cars_updated_at BEFORE UPDATE ON public.company_cars FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample trip data
INSERT INTO public.trips (title, description, short_description, duration, group_size, price, original_price, rating, reviews, badge, features, destinations, is_featured) VALUES
('Serengeti Migration Safari', 'Witness the greatest wildlife spectacle on earth with millions of wildebeest and zebras crossing the Serengeti plains.', 'Experience the Great Migration in Tanzania', '7 days', '2-8 people', 2500.00, 3000.00, 4.9, 124, 'Most Popular', ARRAY['All meals included', 'Professional guide', 'Game drives', 'Luxury accommodation'], ARRAY['Serengeti National Park', 'Ngorongoro Crater'], true),
('Maasai Mara Adventure', 'Explore the iconic Maasai Mara with its abundant wildlife and traditional Maasai culture.', 'Discover Kenya''s premier wildlife destination', '5 days', '2-6 people', 1800.00, 2200.00, 4.8, 89, 'Best Value', ARRAY['Cultural visits', 'Big Five viewing', 'Hot air balloon option', 'Comfortable lodges'], ARRAY['Maasai Mara National Reserve'], true),
('Kilimanjaro Climbing', 'Conquer Africa''s highest peak with our experienced mountain guides and support team.', 'Reach the roof of Africa', '8 days', '2-12 people', 3200.00, 3800.00, 4.7, 156, 'Adventure', ARRAY['Professional guides', 'All equipment provided', 'Medical support', 'Certificate'], ARRAY['Mount Kilimanjaro'], true);

-- Insert sample company cars
INSERT INTO public.company_cars (name, number_plate, color, number_of_passengers, description, features, images) VALUES
('Toyota Land Cruiser', 'KCA-001A', 'White', 7, 'Reliable 4WD vehicle perfect for safari adventures', ARRAY['4WD capability', 'Pop-up roof', 'Comfortable seating', 'Cooler box'], ARRAY['/placeholder-car1.jpg']),
('Safari Van Deluxe', 'KCB-002B', 'Beige', 9, 'Spacious van with panoramic windows for optimal game viewing', ARRAY['Panoramic windows', 'Air conditioning', 'USB charging ports', 'First aid kit'], ARRAY['/placeholder-car2.jpg']),
('Land Rover Defender', 'KCC-003C', 'Green', 6, 'Classic safari vehicle with excellent off-road capabilities', ARRAY['Off-road tires', 'Winch system', 'Radio communication', 'Safari equipment'], ARRAY['/placeholder-car3.jpg']);

-- Insert sample partners
INSERT INTO public.partners (name, logo_url, description) VALUES
('Kenya Wildlife Service', '/partner-kws.png', 'Official wildlife conservation authority'),
('Tanzania National Parks', '/partner-tanapa.png', 'Managing Tanzania''s national parks'),
('Maasai Cultural Center', '/partner-maasai.png', 'Authentic cultural experiences'),
('Safari Operators Association', '/partner-soa.png', 'Professional safari standards');