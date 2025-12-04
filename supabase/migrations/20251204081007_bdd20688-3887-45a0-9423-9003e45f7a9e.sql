-- Drop the category check constraint that's causing issues
ALTER TABLE public.courses DROP CONSTRAINT IF EXISTS courses_category_check;