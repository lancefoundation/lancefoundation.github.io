-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('superadmin', 'content_manager', 'volunteer', 'developer');

-- Create enum for application status
CREATE TYPE public.application_status AS ENUM ('pending', 'reviewed', 'accepted', 'rejected');

-- Create enum for user account status
CREATE TYPE public.account_status AS ENUM ('pending', 'approved', 'rejected', 'suspended');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  role user_role DEFAULT 'volunteer',
  status account_status DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create volunteer roles table
CREATE TABLE public.volunteer_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  requirements TEXT,
  location TEXT,
  open_positions INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create volunteer applications table
CREATE TABLE public.volunteer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role_id UUID REFERENCES public.volunteer_roles(id) ON DELETE CASCADE NOT NULL,
  status application_status DEFAULT 'pending',
  cover_letter TEXT,
  experience TEXT,
  availability TEXT,
  admin_notes TEXT,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id)
);

-- Create projects table for tracking donation goals
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  goal_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  current_amount DECIMAL(12,2) DEFAULT 0,
  location TEXT,
  status TEXT DEFAULT 'active',
  start_date DATE,
  end_date DATE,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create donations table
CREATE TABLE public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'KES',
  payment_method TEXT NOT NULL, -- 'mpesa', 'stripe', 'paypal'
  transaction_id TEXT,
  donor_name TEXT,
  donor_email TEXT,
  donor_phone TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending',
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create system stats table for dashboard analytics
CREATE TABLE public.system_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_name TEXT NOT NULL UNIQUE,
  stat_value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_stats ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS user_role
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT role FROM public.profiles WHERE id = user_id;
$$;

-- Create security definer function to check if user is approved
CREATE OR REPLACE FUNCTION public.is_user_approved(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT status = 'approved' FROM public.profiles WHERE id = user_id;
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "SuperAdmin can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.get_user_role(auth.uid()) = 'superadmin');

CREATE POLICY "Users can update their own basic info"
  ON public.profiles FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid() AND role = OLD.role AND status = OLD.status);

CREATE POLICY "SuperAdmin can update any profile"
  ON public.profiles FOR UPDATE
  USING (public.get_user_role(auth.uid()) = 'superadmin');

CREATE POLICY "Anyone can insert their profile"
  ON public.profiles FOR INSERT
  WITH CHECK (id = auth.uid());

-- RLS Policies for volunteer_roles
CREATE POLICY "Anyone can view active volunteer roles"
  ON public.volunteer_roles FOR SELECT
  USING (is_active = true);

CREATE POLICY "Content managers can manage volunteer roles"
  ON public.volunteer_roles FOR ALL
  USING (public.get_user_role(auth.uid()) IN ('superadmin', 'content_manager'));

-- RLS Policies for volunteer_applications
CREATE POLICY "Users can view their own applications"
  ON public.volunteer_applications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all applications"
  ON public.volunteer_applications FOR SELECT
  USING (public.get_user_role(auth.uid()) IN ('superadmin', 'content_manager'));

CREATE POLICY "Approved users can create applications"
  ON public.volunteer_applications FOR INSERT
  WITH CHECK (user_id = auth.uid() AND public.is_user_approved(auth.uid()));

CREATE POLICY "Admins can update applications"
  ON public.volunteer_applications FOR UPDATE
  USING (public.get_user_role(auth.uid()) IN ('superadmin', 'content_manager'));

-- RLS Policies for projects
CREATE POLICY "Anyone can view active projects"
  ON public.projects FOR SELECT
  USING (status = 'active');

CREATE POLICY "Content managers can manage projects"
  ON public.projects FOR ALL
  USING (public.get_user_role(auth.uid()) IN ('superadmin', 'content_manager'));

-- RLS Policies for donations
CREATE POLICY "Donors can view their own donations"
  ON public.donations FOR SELECT
  USING (donor_id = auth.uid());

CREATE POLICY "Admins can view all donations"
  ON public.donations FOR SELECT
  USING (public.get_user_role(auth.uid()) IN ('superadmin', 'content_manager'));

CREATE POLICY "Anyone can create donations"
  ON public.donations FOR INSERT
  WITH CHECK (true);

-- RLS Policies for system_stats
CREATE POLICY "Admins can view system stats"
  ON public.system_stats FOR SELECT
  USING (public.get_user_role(auth.uid()) IN ('superadmin', 'content_manager'));

CREATE POLICY "Admins can update system stats"
  ON public.system_stats FOR ALL
  USING (public.get_user_role(auth.uid()) IN ('superadmin', 'content_manager'));

-- Create function to automatically create profile on user signup
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
      WHEN NEW.raw_user_meta_data->>'role' IS NOT NULL 
      THEN (NEW.raw_user_meta_data->>'role')::user_role
      ELSE 'volunteer'
    END,
    'pending'
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating timestamps
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_volunteer_roles_updated_at
  BEFORE UPDATE ON public.volunteer_roles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial data
INSERT INTO public.volunteer_roles (title, description, requirements, location, open_positions) VALUES
('Event Coordinator', 'Help organize and coordinate charity events and fundraising activities', 'Strong organizational skills, event planning experience preferred', 'Nairobi', 3),
('Fundraising Assistant', 'Assist with fundraising campaigns and donor outreach', 'Communication skills, experience with social media preferred', 'Remote/Nairobi', 5),
('Administrative Support', 'Provide administrative support for daily operations', 'Computer literacy, attention to detail', 'Nairobi', 2),
('Community Outreach', 'Engage with communities and identify needs for assistance', 'Good communication skills, community engagement experience', 'Various locations', 4);

INSERT INTO public.projects (title, description, goal_amount, location) VALUES
('XYZ Children''s Home Support', 'Providing educational materials and basic necessities for children at XYZ Home', 500000.00, 'Nairobi'),
('Clean Water Initiative', 'Installing water pumps and purification systems in rural communities', 750000.00, 'Turkana County'),
('Education Scholarship Fund', 'Providing scholarships for underprivileged students', 1000000.00, 'Nationwide'),
('Emergency Relief Fund', 'Emergency assistance for families affected by natural disasters', 300000.00, 'Various locations');

-- Insert initial system stats
INSERT INTO public.system_stats (stat_name, stat_value) VALUES
('total_users', '{"count": 0}'),
('total_volunteers', '{"count": 0}'),
('total_donations', '{"amount": 0, "count": 0}'),
('active_projects', '{"count": 4}');