-- Create analytics and media tables for Phase 2

-- Create website_analytics table for tracking site performance
CREATE TABLE public.website_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  page_path TEXT NOT NULL,
  visitors INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,
  bounce_rate DECIMAL(5,2) DEFAULT 0,
  avg_session_duration INTEGER DEFAULT 0,
  referrer_source TEXT,
  device_type TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create media_library table for file management
CREATE TABLE public.media_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  tags TEXT[] DEFAULT '{}',
  folder_path TEXT DEFAULT 'uploads',
  uploaded_by UUID REFERENCES auth.users(id),
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create volunteer_management table for coordination
CREATE TABLE public.volunteer_management (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volunteer_id UUID REFERENCES auth.users(id),
  coordinator_id UUID REFERENCES auth.users(id),
  project_id UUID REFERENCES public.projects(id),
  role_assigned TEXT,
  status TEXT DEFAULT 'assigned',
  hours_logged DECIMAL(5,2) DEFAULT 0,
  tasks_assigned TEXT[],
  tasks_completed TEXT[],
  performance_notes TEXT,
  last_activity_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create impact_reports table for tracking organizational impact
CREATE TABLE public.impact_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  report_type TEXT DEFAULT 'monthly',
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  metrics JSONB,
  content TEXT,
  charts_data JSONB,
  status TEXT DEFAULT 'draft',
  generated_by UUID REFERENCES auth.users(id),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create communication_logs table for volunteer messaging
CREATE TABLE public.communication_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES auth.users(id),
  recipient_ids UUID[],
  message_type TEXT DEFAULT 'email',
  subject TEXT,
  content TEXT NOT NULL,
  template_used UUID REFERENCES public.email_templates(id),
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'sent',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.website_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_management ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communication_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for analytics (admin only)
CREATE POLICY "Admins can manage analytics" 
ON public.website_analytics 
FOR ALL 
USING (get_user_role(auth.uid()) = ANY (ARRAY['superadmin'::user_role, 'content_manager'::user_role]));

-- Create policies for media library
CREATE POLICY "Users can view public media" 
ON public.media_library 
FOR SELECT 
USING (is_public = true);

CREATE POLICY "Admins can manage all media" 
ON public.media_library 
FOR ALL 
USING (get_user_role(auth.uid()) = ANY (ARRAY['superadmin'::user_role, 'content_manager'::user_role]));

CREATE POLICY "Users can manage their own uploads" 
ON public.media_library 
FOR ALL 
USING (uploaded_by = auth.uid());

-- Create policies for volunteer management
CREATE POLICY "Volunteers can view their own records" 
ON public.volunteer_management 
FOR SELECT 
USING (volunteer_id = auth.uid());

CREATE POLICY "Coordinators can manage volunteers" 
ON public.volunteer_management 
FOR ALL 
USING (
  coordinator_id = auth.uid() OR 
  get_user_role(auth.uid()) = ANY (ARRAY['superadmin'::user_role, 'content_manager'::user_role])
);

-- Create policies for impact reports
CREATE POLICY "Anyone can view published impact reports" 
ON public.impact_reports 
FOR SELECT 
USING (status = 'published');

CREATE POLICY "Admins can manage impact reports" 
ON public.impact_reports 
FOR ALL 
USING (get_user_role(auth.uid()) = ANY (ARRAY['superadmin'::user_role, 'content_manager'::user_role]));

-- Create policies for communication logs
CREATE POLICY "Users can view their sent/received messages" 
ON public.communication_logs 
FOR SELECT 
USING (
  sender_id = auth.uid() OR 
  auth.uid() = ANY(recipient_ids) OR
  get_user_role(auth.uid()) = ANY (ARRAY['superadmin'::user_role, 'content_manager'::user_role])
);

CREATE POLICY "Coordinators can send messages" 
ON public.communication_logs 
FOR INSERT 
WITH CHECK (
  sender_id = auth.uid() AND
  get_user_role(auth.uid()) = ANY (ARRAY['superadmin'::user_role, 'content_manager'::user_role])
);

-- Create indexes for better performance
CREATE INDEX idx_analytics_date_page ON public.website_analytics(date, page_path);
CREATE INDEX idx_media_uploaded_by ON public.media_library(uploaded_by);
CREATE INDEX idx_media_tags ON public.media_library USING GIN(tags);
CREATE INDEX idx_volunteer_volunteer_id ON public.volunteer_management(volunteer_id);
CREATE INDEX idx_volunteer_project_id ON public.volunteer_management(project_id);
CREATE INDEX idx_impact_reports_period ON public.impact_reports(period_start, period_end);
CREATE INDEX idx_communication_recipients ON public.communication_logs USING GIN(recipient_ids);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_website_analytics_updated_at
BEFORE UPDATE ON public.website_analytics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_media_library_updated_at
BEFORE UPDATE ON public.media_library
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_volunteer_management_updated_at
BEFORE UPDATE ON public.volunteer_management
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_impact_reports_updated_at
BEFORE UPDATE ON public.impact_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();