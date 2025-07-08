-- Create job postings table
CREATE TABLE public.job_postings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  requirements TEXT,
  location TEXT,
  job_type TEXT DEFAULT 'full-time', -- full-time, part-time, contract, volunteer
  salary_range TEXT,
  deadline DATE,
  status TEXT DEFAULT 'active', -- active, closed, draft
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create job applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.job_postings(id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT,
  resume_url TEXT,
  cover_letter TEXT,
  status TEXT DEFAULT 'pending', -- pending, reviewed, shortlisted, interviewed, hired, rejected
  interview_date TIMESTAMP WITH TIME ZONE,
  interview_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create M-Pesa transactions table
CREATE TABLE public.mpesa_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  merchant_request_id TEXT,
  checkout_request_id TEXT UNIQUE,
  result_code INTEGER,
  result_desc TEXT,
  amount NUMERIC NOT NULL,
  mpesa_receipt_number TEXT,
  transaction_date TIMESTAMP WITH TIME ZONE,
  phone_number TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, completed, failed, cancelled
  donation_id UUID REFERENCES public.donations(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mpesa_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for job_postings
CREATE POLICY "Anyone can view active job postings" 
ON public.job_postings 
FOR SELECT 
USING (status = 'active');

CREATE POLICY "Content managers can manage job postings" 
ON public.job_postings 
FOR ALL 
USING (get_user_role(auth.uid()) = ANY (ARRAY['superadmin'::user_role, 'content_manager'::user_role]));

-- RLS Policies for job_applications
CREATE POLICY "Anyone can create job applications" 
ON public.job_applications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Content managers can view all applications" 
ON public.job_applications 
FOR SELECT 
USING (get_user_role(auth.uid()) = ANY (ARRAY['superadmin'::user_role, 'content_manager'::user_role]));

CREATE POLICY "Content managers can update applications" 
ON public.job_applications 
FOR UPDATE 
USING (get_user_role(auth.uid()) = ANY (ARRAY['superadmin'::user_role, 'content_manager'::user_role]));

-- RLS Policies for mpesa_transactions
CREATE POLICY "Admins can view all transactions" 
ON public.mpesa_transactions 
FOR SELECT 
USING (get_user_role(auth.uid()) = ANY (ARRAY['superadmin'::user_role, 'content_manager'::user_role]));

CREATE POLICY "System can manage transactions" 
ON public.mpesa_transactions 
FOR ALL 
USING (true);

-- Create triggers for updated_at
CREATE TRIGGER update_job_postings_updated_at
  BEFORE UPDATE ON public.job_postings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mpesa_transactions_updated_at
  BEFORE UPDATE ON public.mpesa_transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();