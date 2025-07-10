-- Create content_pages table for CMS
CREATE TABLE public.content_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  meta_description TEXT,
  page_type TEXT DEFAULT 'page',
  is_published BOOLEAN DEFAULT false,
  featured_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create email_templates table
CREATE TABLE public.email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  template_type TEXT DEFAULT 'custom',
  variables TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add new columns to job_postings table for enhanced features
ALTER TABLE public.job_postings ADD COLUMN IF NOT EXISTS positions_available INTEGER DEFAULT 1;
ALTER TABLE public.job_postings ADD COLUMN IF NOT EXISTS department TEXT;
ALTER TABLE public.job_postings ADD COLUMN IF NOT EXISTS experience_level TEXT DEFAULT 'entry';
ALTER TABLE public.job_postings ADD COLUMN IF NOT EXISTS benefits TEXT[] DEFAULT '{}';
ALTER TABLE public.job_postings ADD COLUMN IF NOT EXISTS skills_required TEXT[] DEFAULT '{}';

-- Enable Row Level Security
ALTER TABLE public.content_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- Create policies for content_pages
CREATE POLICY "Anyone can view published pages" 
ON public.content_pages 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Content managers can manage pages" 
ON public.content_pages 
FOR ALL 
USING (get_user_role(auth.uid()) = ANY (ARRAY['superadmin'::user_role, 'content_manager'::user_role]));

-- Create policies for email_templates
CREATE POLICY "Content managers can manage email templates" 
ON public.email_templates 
FOR ALL 
USING (get_user_role(auth.uid()) = ANY (ARRAY['superadmin'::user_role, 'content_manager'::user_role]));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_content_pages_updated_at
BEFORE UPDATE ON public.content_pages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_email_templates_updated_at
BEFORE UPDATE ON public.email_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();