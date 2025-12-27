-- Update the car KDU 203J with the new image
UPDATE public.company_cars 
SET images = ARRAY['/lovable-uploads/e0d22f43-b630-47c4-bf7a-831a62facfde.png']
WHERE number_plate = 'KDU 203J';