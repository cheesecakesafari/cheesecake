-- Add 2018 LAND CRUISER 70series with plate KDU 203J
INSERT INTO public.company_cars (
  name, 
  number_plate, 
  color, 
  number_of_passengers, 
  description, 
  features, 
  images, 
  is_available
) VALUES 
(
  '2018 LAND CRUISER 70series', 
  'KDU 203J', 
  'Beige', 
  7, 
  'Rugged and reliable 4x4 vehicle perfect for safari adventures and off-road terrain',
  ARRAY['4WD Drive', 'Air Conditioning', 'High Clearance', 'Safari Roof', 'GPS Navigation', 'First Aid Kit', 'Emergency Kit', 'Roof Rack'],
  ARRAY['/lovable-uploads/8344df75-0e16-4136-bffa-07cb22a38b49.png'],
  true
);