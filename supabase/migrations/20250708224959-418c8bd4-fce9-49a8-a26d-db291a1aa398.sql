-- Fix the dangerous "System can manage transactions" RLS policy
-- Replace with proper service role check

-- Drop the existing dangerous policy
DROP POLICY IF EXISTS "System can manage transactions" ON public.mpesa_transactions;

-- Create a more secure policy that only allows service role or authenticated admin operations
CREATE POLICY "Service role can manage transactions" 
ON public.mpesa_transactions 
FOR ALL 
USING (
  -- Allow service role (for M-Pesa callbacks)
  auth.role() = 'service_role' OR 
  -- Allow authenticated admins for viewing/management
  (auth.role() = 'authenticated' AND get_user_role(auth.uid()) = ANY (ARRAY['superadmin'::user_role, 'content_manager'::user_role]))
);

-- Also create a more restrictive policy for INSERT operations from edge functions
CREATE POLICY "Edge functions can insert transactions" 
ON public.mpesa_transactions 
FOR INSERT 
WITH CHECK (
  -- Only allow inserts from service role (edge functions)
  auth.role() = 'service_role'
);