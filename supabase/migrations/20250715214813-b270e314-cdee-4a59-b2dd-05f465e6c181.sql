-- Update the car KDU 203J with the new uploaded image
UPDATE public.company_cars 
SET images = ARRAY['/lovable-uploads/c136e9ed-1c86-4dae-ac88-4d20fba8af42.png']
WHERE number_plate = 'KDU 203J';