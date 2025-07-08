import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Eye, Calendar, Mail, Phone, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface JobPosting {
  id: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  job_type: string;
  salary_range: string;
  deadline: string;
  status: string;
  created_at: string;
}

interface JobApplication {
  id: string;
  job_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  resume_url: string;
  cover_letter: string;
  status: string;
  interview_date: string;
  interview_notes: string;
  created_at: string;
  job_postings: { title: string };
}

const CareersManagement = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    job_type: 'full-time',
    salary_range: '',
    deadline: '',
    status: 'active',
  });

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load job postings',
        variant: 'destructive',
      });
    }
  };

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          job_postings (title)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load applications',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (selectedJob) {
        const { error } = await supabase
          .from('job_postings')
          .update(jobForm)
          .eq('id', selectedJob.id);
        
        if (error) throw error;
        toast({ title: 'Success', description: 'Job posting updated successfully' });
      } else {
        const { error } = await supabase
          .from('job_postings')
          .insert([{ ...jobForm, created_by: user?.id }]);
        
        if (error) throw error;
        toast({ title: 'Success', description: 'Job posting created successfully' });
      }
      
      setShowJobDialog(false);
      setSelectedJob(null);
      setJobForm({
        title: '',
        description: '',
        requirements: '',
        location: '',
        job_type: 'full-time',
        salary_range: '',
        deadline: '',
        status: 'active',
      });
      fetchJobs();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: string, notes?: string) => {
    try {
      const updateData: any = { status };
      if (notes) updateData.interview_notes = notes;
      
      const { error } = await supabase
        .from('job_applications')
        .update(updateData)
        .eq('id', applicationId);
      
      if (error) throw error;
      
      toast({ title: 'Success', description: 'Application status updated' });
      fetchApplications();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'default';
      case 'reviewed': return 'secondary';
      case 'shortlisted': return 'outline';
      case 'interviewed': return 'outline';
      case 'hired': return 'default';
      case 'rejected': return 'destructive';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading careers management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Careers Management</h1>
          <p className="text-muted-foreground">Manage job postings and applications</p>
        </div>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="jobs">Job Postings</TabsTrigger>
            <TabsTrigger value="applications">Applications ({applications.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Job Postings</h2>
              <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
                <DialogTrigger asChild>
                  <Button onClick={() => setSelectedJob(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Job Posting
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{selectedJob ? 'Edit Job Posting' : 'Create Job Posting'}</DialogTitle>
                    <DialogDescription>
                      Fill in the details for the job posting
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleJobSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Job Title</Label>
                        <Input
                          id="title"
                          value={jobForm.title}
                          onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={jobForm.location}
                          onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="job_type">Job Type</Label>
                        <Select value={jobForm.job_type} onValueChange={(value) => setJobForm({ ...jobForm, job_type: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full Time</SelectItem>
                            <SelectItem value="part-time">Part Time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="volunteer">Volunteer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="salary_range">Salary Range</Label>
                        <Input
                          id="salary_range"
                          value={jobForm.salary_range}
                          onChange={(e) => setJobForm({ ...jobForm, salary_range: e.target.value })}
                          placeholder="e.g., $50,000 - $70,000"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={jobForm.description}
                        onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="requirements">Requirements</Label>
                      <Textarea
                        id="requirements"
                        value={jobForm.requirements}
                        onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="deadline">Application Deadline</Label>
                        <Input
                          id="deadline"
                          type="date"
                          value={jobForm.deadline}
                          onChange={(e) => setJobForm({ ...jobForm, deadline: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select value={jobForm.status} onValueChange={(value) => setJobForm({ ...jobForm, status: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setShowJobDialog(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {selectedJob ? 'Update' : 'Create'} Job Posting
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {jobs.map((job) => (
                <Card key={job.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription>{job.location} • {job.job_type}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                          {job.status}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedJob(job);
                            setJobForm(job);
                            setShowJobDialog(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{job.description}</p>
                    {job.deadline && (
                      <p className="text-sm text-muted-foreground">
                        Deadline: {new Date(job.deadline).toLocaleDateString()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <h2 className="text-xl font-semibold">Job Applications</h2>
            
            <div className="grid gap-4">
              {applications.map((app) => (
                <Card key={app.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{app.applicant_name}</CardTitle>
                        <CardDescription>Applied for: {app.job_postings?.title}</CardDescription>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Badge variant={getStatusColor(app.status)}>
                          {app.status}
                        </Badge>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Application Details</DialogTitle>
                              <DialogDescription>
                                Review and manage this application
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Applicant Name</Label>
                                  <p className="text-sm">{app.applicant_name}</p>
                                </div>
                                <div>
                                  <Label>Email</Label>
                                  <p className="text-sm">{app.applicant_email}</p>
                                </div>
                                <div>
                                  <Label>Phone</Label>
                                  <p className="text-sm">{app.applicant_phone || 'Not provided'}</p>
                                </div>
                                <div>
                                  <Label>Applied Date</Label>
                                  <p className="text-sm">{new Date(app.created_at).toLocaleDateString()}</p>
                                </div>
                              </div>
                              
                              {app.cover_letter && (
                                <div>
                                  <Label>Cover Letter</Label>
                                  <p className="text-sm border rounded p-3 bg-muted">{app.cover_letter}</p>
                                </div>
                              )}
                              
                              {app.interview_notes && (
                                <div>
                                  <Label>Interview Notes</Label>
                                  <p className="text-sm border rounded p-3 bg-muted">{app.interview_notes}</p>
                                </div>
                              )}
                              
                              <div>
                                <Label>Update Status</Label>
                                <div className="flex gap-2 mt-2">
                                  <Button size="sm" onClick={() => updateApplicationStatus(app.id, 'reviewed')}>
                                    Mark Reviewed
                                  </Button>
                                  <Button size="sm" onClick={() => updateApplicationStatus(app.id, 'shortlisted')}>
                                    Shortlist
                                  </Button>
                                  <Button size="sm" onClick={() => updateApplicationStatus(app.id, 'interviewed')}>
                                    Interviewed
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => updateApplicationStatus(app.id, 'hired')}>
                                    Hire
                                  </Button>
                                  <Button size="sm" variant="destructive" onClick={() => updateApplicationStatus(app.id, 'rejected')}>
                                    Reject
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {app.applicant_email}
                      </span>
                      {app.applicant_phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {app.applicant_phone}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(app.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CareersManagement;