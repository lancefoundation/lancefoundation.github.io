import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FileText, Send, User, Mail, Phone } from 'lucide-react';

interface JobApplicationFormProps {
  jobId: string;
  jobTitle: string;
  children: React.ReactNode;
}

interface ApplicationForm {
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  cover_letter: string;
}

const JobApplicationForm = ({ jobId, jobTitle, children }: JobApplicationFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState<ApplicationForm>({
    applicant_name: '',
    applicant_email: '',
    applicant_phone: '',
    cover_letter: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Submit application to database
      const { error: applicationError } = await supabase
        .from('job_applications')
        .insert([{
          job_id: jobId,
          ...form,
          status: 'pending'
        }]);

      if (applicationError) throw applicationError;

      // Send notification email to HR
      try {
        await supabase.functions.invoke('send-application-notification', {
          body: {
            jobTitle,
            applicantName: form.applicant_name,
            applicantEmail: form.applicant_email,
            applicantPhone: form.applicant_phone,
            coverLetter: form.cover_letter,
          }
        });
      } catch (emailError) {
        // Don't fail the application if email fails
        console.warn('Failed to send notification email:', emailError);
      }

      toast({
        title: 'Application Submitted',
        description: 'Your application has been submitted successfully. We will review it and get back to you soon.',
      });

      // Reset form and close dialog
      setForm({
        applicant_name: '',
        applicant_email: '',
        applicant_phone: '',
        cover_letter: '',
      });
      setOpen(false);

    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit application. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Apply for {jobTitle}
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to submit your application. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="applicant_name">Full Name *</Label>
                <Input
                  id="applicant_name"
                  value={form.applicant_name}
                  onChange={(e) => setForm({ ...form, applicant_name: e.target.value })}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="applicant_phone">Phone Number</Label>
                <Input
                  id="applicant_phone"
                  type="tel"
                  value={form.applicant_phone}
                  onChange={(e) => setForm({ ...form, applicant_phone: e.target.value })}
                  placeholder="+254 700 000 000"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="applicant_email">Email Address *</Label>
              <Input
                id="applicant_email"
                type="email"
                value={form.applicant_email}
                onChange={(e) => setForm({ ...form, applicant_email: e.target.value })}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          {/* Cover Letter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Cover Letter
            </h3>
            
            <div>
              <Label htmlFor="cover_letter">Why are you interested in this position? *</Label>
              <Textarea
                id="cover_letter"
                value={form.cover_letter}
                onChange={(e) => setForm({ ...form, cover_letter: e.target.value })}
                placeholder="Tell us about your experience, skills, and why you're interested in this role..."
                rows={6}
                required
              />
              <p className="text-sm text-muted-foreground mt-1">
                Minimum 50 characters ({form.cover_letter.length}/50)
              </p>
            </div>
          </div>

          {/* Instructions */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Next Steps:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• We will review your application within 3-5 business days</li>
                <li>• If you proceed to the next stage, we'll contact you via email</li>
                <li>• You may be asked to provide additional documents or attend an interview</li>
                <li>• For questions, contact us at careers@thelancefoundation.org</li>
              </ul>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading || form.cover_letter.length < 50}
              className="min-w-32"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Submit Application
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationForm;