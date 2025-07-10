import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import JobPostingForm from '@/components/admin/JobPostingForm';
import EmailTemplateManager from '@/components/admin/EmailTemplateManager';
import { 
  Users, 
  Briefcase, 
  FileText, 
  Calendar, 
  Mail, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Clock,
  Filter,
  Download,
  Send,
  MessageSquare
} from 'lucide-react';

const CareersManagement = () => {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [jobPostings, setJobPostings] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [applicationFilter, setApplicationFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/auth');
      } else {
        fetchUserProfile();
      }
    }
  }, [user, loading, navigate]);

  const fetchUserProfile = async () => {
    try {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      
      setProfile(profileData);

      if (!profileData || !['superadmin', 'content_manager'].includes(profileData.role)) {
        toast({
          title: 'Access Denied',
          description: 'You do not have permission to access careers management.',
          variant: 'destructive',
        });
        navigate('/');
        return;
      }

      await Promise.all([fetchJobPostings(), fetchApplications()]);
      setPageLoading(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load careers management.',
        variant: 'destructive',
      });
      setPageLoading(false);
    }
  };

  const fetchJobPostings = async () => {
    try {
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobPostings(data || []);
    } catch (error) {
      console.error('Error fetching job postings:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          job_postings (title, department)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      const { error } = await supabase
        .from('job_postings')
        .delete()
        .eq('id', jobId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Job posting deleted successfully!',
      });

      await fetchJobPostings();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete job posting.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateApplicationStatus = async (applicationId: string, status: string, notes?: string) => {
    try {
      const updateData: any = {
        status,
        updated_at: new Date().toISOString()
      };

      if (notes) {
        updateData.interview_notes = notes;
      }

      const { error } = await supabase
        .from('job_applications')
        .update(updateData)
        .eq('id', applicationId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Application status updated successfully!',
      });

      await fetchApplications();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update application status.',
        variant: 'destructive',
      });
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesFilter = applicationFilter === 'all' || app.status === applicationFilter;
    const matchesSearch = searchTerm === '' || 
      app.applicant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job_postings?.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'reviewed': return 'bg-blue-500';
      case 'hired': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-blue-500';
      case 'part-time': return 'bg-green-500';
      case 'contract': return 'bg-purple-500';
      case 'volunteer': return 'bg-orange-500';
      case 'internship': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading careers management...</p>
        </div>
      </div>
    );
  }

  if (!profile || !['superadmin', 'content_manager'].includes(profile.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You do not have permission to access careers management.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')} className="w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Careers Management</h1>
              <p className="text-muted-foreground">Manage job postings, applications, and HR communications</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => navigate('/dashboard')} variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button onClick={() => navigate('/admin/cms')} variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                CMS
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="jobs">
              <Briefcase className="h-4 w-4 mr-2" />
              Job Postings
            </TabsTrigger>
            <TabsTrigger value="applications">
              <FileText className="h-4 w-4 mr-2" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="emails">
              <MessageSquare className="h-4 w-4 mr-2" />
              Email Templates
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <Calendar className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-6">
            {isCreatingJob || isEditingJob ? (
              <JobPostingForm
                existingJob={isEditingJob ? selectedJob : undefined}
                onSaved={() => {
                  setIsCreatingJob(false);
                  setIsEditingJob(false);
                  setSelectedJob(null);
                  fetchJobPostings();
                }}
                onCancel={() => {
                  setIsCreatingJob(false);
                  setIsEditingJob(false);
                  setSelectedJob(null);
                }}
              />
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">All Job Postings</h3>
                  <Button onClick={() => setIsCreatingJob(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Job Posting
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {jobPostings.map((job) => (
                    <Card key={job.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">{job.title}</CardTitle>
                            <CardDescription>{job.department || 'No Department'}</CardDescription>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedJob(job);
                                setIsEditingJob(true);
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteJob(job.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                              {job.status}
                            </Badge>
                            <Badge variant="outline" className={`text-white ${getJobTypeColor(job.job_type)}`}>
                              {job.job_type}
                            </Badge>
                            {job.experience_level && (
                              <Badge variant="outline">
                                {job.experience_level}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p><span className="font-medium">Location:</span> {job.location || 'Not specified'}</p>
                            <p><span className="font-medium">Positions:</span> {job.positions_available || 1}</p>
                            {job.salary_range && (
                              <p><span className="font-medium">Salary:</span> {job.salary_range}</p>
                            )}
                            {job.deadline && (
                              <p><span className="font-medium">Deadline:</span> {new Date(job.deadline).toLocaleDateString()}</p>
                            )}
                          </div>

                          <div className="text-xs text-muted-foreground">
                            Created: {new Date(job.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h3 className="text-lg font-semibold">Job Applications</h3>
              <div className="flex items-center gap-4">
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Select value={applicationFilter} onValueChange={setApplicationFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredApplications.map((application) => (
                <Card key={application.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{application.applicant_name}</CardTitle>
                        <CardDescription>{application.job_postings?.title}</CardDescription>
                      </div>
                      <Badge variant="outline" className={`text-white ${getStatusColor(application.status)}`}>
                        {application.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm space-y-1">
                        <p><span className="font-medium">Email:</span> {application.applicant_email}</p>
                        {application.applicant_phone && (
                          <p><span className="font-medium">Phone:</span> {application.applicant_phone}</p>
                        )}
                        <p><span className="font-medium">Applied:</span> {new Date(application.created_at).toLocaleDateString()}</p>
                      </div>

                      {application.cover_letter && (
                        <div>
                          <p className="text-sm font-medium mb-1">Cover Letter:</p>
                          <p className="text-xs text-muted-foreground bg-muted p-2 rounded max-h-20 overflow-y-auto">
                            {application.cover_letter}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-2">
                        <Select 
                          value={application.status} 
                          onValueChange={(status) => handleUpdateApplicationStatus(application.id, status)}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="reviewed">Reviewed</SelectItem>
                            <SelectItem value="hired">Hired</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button size="sm" variant="outline">
                          <Mail className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="emails">
            <EmailTemplateManager />
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Recruitment Analytics</CardTitle>
                <CardDescription>Track hiring performance and application trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CareersManagement;