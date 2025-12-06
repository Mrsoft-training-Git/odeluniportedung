-- Create management_team table
CREATE TABLE public.management_team (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  position TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.management_team ENABLE ROW LEVEL SECURITY;

-- Create policy for public viewing of published team members
CREATE POLICY "Anyone can view published team members"
ON public.management_team
FOR SELECT
USING (is_published = true);

-- Create policy for admin management
CREATE POLICY "Admins can manage team members"
ON public.management_team
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));