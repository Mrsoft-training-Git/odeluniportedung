DROP POLICY IF EXISTS "Anyone can view site settings" ON public.site_settings;
CREATE POLICY "Anyone can view public LMS settings" ON public.site_settings
  FOR SELECT USING (setting_key IN ('lms_diploma_short_courses','lms_undergraduate_postgraduate'));

DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit valid contact form" ON public.contact_submissions
  FOR INSERT WITH CHECK (
    is_read = false
    AND char_length(btrim(name)) BETWEEN 1 AND 100
    AND char_length(email) BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(btrim(subject)) BETWEEN 1 AND 200
    AND char_length(btrim(message)) BETWEEN 1 AND 5000
  );

DROP POLICY IF EXISTS "Public can view media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete media" ON storage.objects;

CREATE POLICY "Admins can view media" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can upload media" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin') AND owner_id = (select auth.uid()::text));
CREATE POLICY "Admins can update own media" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin') AND owner_id = (select auth.uid()::text))
  WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin') AND owner_id = (select auth.uid()::text));
CREATE POLICY "Admins can delete own media" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin') AND owner_id = (select auth.uid()::text));