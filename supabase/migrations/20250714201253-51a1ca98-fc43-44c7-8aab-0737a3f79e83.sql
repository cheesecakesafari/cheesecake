-- Update the car KDH 047T with the new image
UPDATE public.company_cars 
SET images = ARRAY['/lovable-uploads/34c69518-9190-4e99-a890-69c8b615aece.png']
WHERE number_plate = 'KDH 047T';