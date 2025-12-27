-- Create admin profiles table
CREATE TABLE public.admin_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on admin_profiles
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access
CREATE POLICY "Admins can manage their own profile" 
ON public.admin_profiles 
FOR ALL 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- Create website_images table for managing site images
CREATE TABLE public.website_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  category TEXT, -- hero, gallery, icons, etc.
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on website_images
ALTER TABLE public.website_images ENABLE ROW LEVEL SECURITY;

-- Create policies for website_images
CREATE POLICY "Public can view active website images" 
ON public.website_images 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage website images" 
ON public.website_images 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

-- Update company_cars table permissions for admin management
CREATE POLICY "Admins can manage company cars" 
ON public.company_cars 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

-- Update trips table permissions for admin management
CREATE POLICY "Admins can manage trips" 
ON public.trips 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

-- Update bookings table permissions for admin view
CREATE POLICY "Admins can view all bookings" 
ON public.bookings 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_admin_profiles_updated_at
BEFORE UPDATE ON public.admin_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_website_images_updated_at
BEFORE UPDATE ON public.website_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();