-- Clear existing partners and insert new ones
DELETE FROM public.partners;

-- Insert the new partner organizations
INSERT INTO public.partners (name, logo_url, website_url, description, is_active) VALUES
('Kenya Wildlife Service', '/partner-logos/kws-logo.png', 'https://www.kws.go.ke/', 'Kenya Wildlife Service is the government agency responsible for wildlife conservation and management in Kenya', true),
('Maasai Culture Center', '/partner-logos/maasai-culture-center-logo.png', 'https://maasaiculturecenter.com/', 'Cultural center promoting and preserving Maasai heritage and traditions', true),
('Tanzania Parks Authority', '/partner-logos/tanzania-parks-logo.png', 'https://www.tanzaniaparks.go.tz/', 'Government agency managing national parks and wildlife conservation in Tanzania', true),
('Kato Bookings', '/partner-logos/kato-bookings-logo.png', 'https://www.katobookings.com/', 'Leading safari tour operator offering premium wildlife experiences across East Africa', true),
('Masai Mara Travel', '/partner-logos/masai-mara-travel-logo.png', 'https://www.masaimara.travel/', 'Specialized tour operator for Masai Mara National Reserve experiences', true),
('Mara Conservancies', '/partner-logos/mara-conservancies-logo.svg', 'https://maraconservancies.org/', 'Community conservancies protecting wildlife and supporting local communities around Masai Mara', true),
('Big Life Foundation', '/partner-logos/big-life-logo.png', 'https://biglife.org/', 'Wildlife conservation organization protecting ecosystems across Kenya and Tanzania', true);