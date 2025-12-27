-- Add two more company cars
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
  '2018 TOYOTA LAND CRUISER V8', 
  'KDD 892F', 
  'Silver', 
  7, 
  'Luxury safari vehicle with exceptional off-road capabilities and premium comfort features',
  ARRAY['4WD Drive', 'Air Conditioning', 'Premium Sound System', 'Leather Seats', 'Safari Roof', 'GPS Navigation', 'First Aid Kit', 'Emergency Kit'],
  ARRAY['/lovable-uploads/8344df75-0e16-4136-bffa-07cb22a38b49.png'],
  true
),
(
  '2019 TOYOTA HIACE SUPER GL', 
  'KDF 234H', 
  'White', 
  14, 
  'Spacious safari van perfect for group adventures with comfortable seating and ample storage',
  ARRAY['High Roof', 'Air Conditioning', 'Comfortable Seating', 'Large Storage', 'Safari Windows', 'Sound System', 'First Aid Kit', 'Emergency Kit'],
  ARRAY['/lovable-uploads/8344df75-0e16-4136-bffa-07cb22a38b49.png'],
  true
);