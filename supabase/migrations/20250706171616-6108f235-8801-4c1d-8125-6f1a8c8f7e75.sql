-- Update the handle_new_user function to automatically assign superadmin role to denis.gathua@thelancefoundation.org
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    CASE 
      WHEN NEW.email = 'denis.gathua@thelancefoundation.org' THEN 'superadmin'
      WHEN NEW.raw_user_meta_data->>'role' IS NOT NULL 
      THEN (NEW.raw_user_meta_data->>'role')::user_role
      ELSE 'volunteer'
    END,
    CASE 
      WHEN NEW.email = 'denis.gathua@thelancefoundation.org' THEN 'approved'
      ELSE 'pending'
    END
  );
  RETURN NEW;
END;
$$;

-- Update existing profile if it exists (this will only work if the user has already signed up)
UPDATE public.profiles 
SET role = 'superadmin', status = 'approved'
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'denis.gathua@thelancefoundation.org'
);