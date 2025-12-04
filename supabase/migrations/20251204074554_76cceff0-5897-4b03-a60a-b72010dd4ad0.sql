-- Create storage bucket for media uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- Storage policies for media bucket
CREATE POLICY "Public can view media" ON storage.objects FOR SELECT USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can upload media" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update media" ON storage.objects FOR UPDATE 
USING (bucket_id = 'media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete media" ON storage.objects FOR DELETE 
USING (bucket_id = 'media' AND auth.role() = 'authenticated');

-- Enable RLS on courses table
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published courses" ON public.courses
FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage courses" ON public.courses
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Enable RLS on gallery_media table
ALTER TABLE public.gallery_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published gallery" ON public.gallery_media
FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage gallery" ON public.gallery_media
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Enable realtime for dashboard stats
ALTER PUBLICATION supabase_realtime ADD TABLE public.courses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.gallery_media;
ALTER PUBLICATION supabase_realtime ADD TABLE public.news_articles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_submissions;