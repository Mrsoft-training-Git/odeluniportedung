-- Update the handle_new_user function to assign 'admin' role by default
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert directly into profiles table
  INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      split_part(NEW.email, '@', 1)
    ),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;

  -- Insert 'admin' role by default for all new users
  INSERT INTO public.user_roles (user_id, role, created_at)
  VALUES (NEW.id, 'admin', NOW())
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$;