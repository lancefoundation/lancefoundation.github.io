import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  Briefcase, 
  FileText, 
  Calendar, 
  TrendingUp, 
  LogOut, 
  Settings,
  UserCheck,
  Mail,
  Clock,
  DollarSign,
  Target,
  Heart,
  Award,
  BarChart3,
  PlusCircle,
  Eye
} from 'lucide-react';

interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  pendingApplications: number;
  totalProjects: number;
  activeProjects: number;
  totalDonations: number;
  totalDonationAmount: number;
  totalVolunteers: number;
  pendingVolunteers: number;
  recentApplications: any[];
  recentJobs: any[];
  recentDonations: any[];
  recentProjects: any[];
}

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/auth');
      } else {
        fetchDashboardData();
      }
    }
    // eslint-disable-next-line
  }, [user, loading, navigate]);

  const fetchDashboardData = async () => {
    try {
      // Fetch user profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      
      setProfile(profileData);

      // Check if user has admin access
      if (!profileData || !['superadmin', 'content_manager'].includes(profileData.role)) {
        toast({
          title: 'Access Denied',
          description: 'You do not have permission to access the dashboard.',
          variant: 'destructive',
        });
        navigate('/');
        return;
      }

      // Fetch job statistics
      const { data: allJobs } = await supabase
        .from('job_postings')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: activeJobs } = await supabase
        .from('job_postings')
        .select('*')
        .eq('status', 'active');

      const { data: allApplications } = await supabase
        .from('job_applications')
        .select(`
          *,
          job_postings (title)
        `)
        .order('created_at', { ascending: false });

      const { data: pendingApplications } = await supabase
        .from('job_applications')
        .select('*')
        .eq('status', 'pending');

      // Fetch project statistics
      const { data: allProjects } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: activeProjects } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'active');

      // Fetch donation statistics
      const { data: allDonations } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });

      const totalDonationAmount = allDonations?.reduce((sum, donation) => sum + Number(donation.amount), 0) || 0;

      // Fetch volunteer statistics
      const { data: allVolunteers } = await supabase
        .from('volunteer_applications')
        .select(`
          *,
          volunteer_roles (title)
        `)
        .order('applied_at', { ascending: false });

      const { data: pendingVolunteers } = await supabase
        .from('volunteer_applications')
        .select('*')
        .eq('status', 'pending');

      const recentApplications = allApplications?.slice(0, 5) || [];
      const recentJobs = allJobs?.slice(0, 5) || [];
      const recentDonations = allDonations?.slice(0, 5) || [];
      const recentProjects = allProjects?.slice(0, 5) || [];

      setStats({
        totalJobs: allJobs?.length || 0,
        activeJobs: activeJobs?.length || 0,
        totalApplications: allApplications?.length || 0,
        pendingApplications: pendingApplications?.length || 0,
        totalProjects: allProjects?.length || 0,
        activeProjects: activeProjects?.length || 0,
        totalDonations: allDonations?.length || 0,
        totalDonationAmount,
        totalVolunteers: allVolunteers?.length || 0,
        pendingVolunteers: pendingVolunteers?.length || 0,
        recentApplications,
        recentJobs,
        recentDonations,
        recentProjects,
      });

      setPageLoading(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data.',
        variant: 'destructive',
      });
      setPageLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign out.',
        variant: 'destructive',
      });
    }
  };

  if (loading || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
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
            <CardDescription>You do not have permission to access this dashboard.</CardDescription>
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
              <h1 className="text-2xl font-bold text-foreground">HR Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {profile?.full_name || user?.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/admin/careers')}
                className="hidden md:flex"
              >
                <Settings className="h-4 w-4 mr-2" />
                Manage Careers
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/admin/roles')}
                className="hidden md:flex"
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
              <Button
                onClick={() => window.open('/projects', '_blank')}
                variant="outline"
                className="hidden md:flex"
              >
                <Target className="h-4 w-4 mr-2" />
                View Projects
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalJobs || 0}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.activeJobs || 0} active positions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalApplications || 0}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.pendingApplications || 0} pending review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projects</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalProjects || 0}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.activeProjects || 0} active projects
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalDonations || 0}</div>
              <p className="text-xs text-muted-foreground">
                KES {(stats?.totalDonationAmount || 0).toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Volunteers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalVolunteers || 0}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.pendingVolunteers || 0} pending approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {(stats?.pendingApplications || 0) + (stats?.pendingVolunteers || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Awaiting review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Content</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {(stats?.activeJobs || 0) + (stats?.activeProjects || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Live jobs & projects
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Impact</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {((stats?.totalDonations || 0) + (stats?.totalVolunteers || 0) + (stats?.totalProjects || 0))}
              </div>
              <p className="text-xs text-muted-foreground">
                Combined engagement
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Recent Applications
              </CardTitle>
              <CardDescription>Latest job applications received</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentApplications.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No applications yet</p>
                ) : (
                  stats?.recentApplications.map((app: any) => (
                    <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{app.applicant_name}</p>
                        <p className="text-sm text-muted-foreground">{app.job_postings?.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(app.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={
                        app.status === 'pending' ? 'default' :
                        app.status === 'reviewed' ? 'secondary' :
                        app.status === 'hired' ? 'default' : 'destructive'
                      }>
                        {app.status}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
              {stats?.recentApplications.length > 0 && (
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate('/admin/careers')}
                >
                  View All Applications
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Recent Donations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Recent Donations
              </CardTitle>
              <CardDescription>Latest donations received</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentDonations.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No donations yet</p>
                ) : (
                  stats?.recentDonations.map((donation: any) => (
                    <div key={donation.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">
                          {donation.is_anonymous ? 'Anonymous' : donation.donor_name || donation.donor_email}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {donation.payment_method} • {new Date(donation.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">KES {Number(donation.amount).toLocaleString()}</p>
                        <Badge variant={donation.status === 'completed' ? 'default' : 'secondary'}>
                          {donation.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {stats?.recentDonations.length > 0 && (
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => window.open('/donate', '_blank')}
                >
                  View Donation Page
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Recent Projects
              </CardTitle>
              <CardDescription>Latest projects and initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentProjects.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No projects yet</p>
                ) : (
                  stats?.recentProjects.map((project: any) => (
                    <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-muted-foreground">{project.location}</p>
                        <p className="text-xs text-muted-foreground">
                          Created {new Date(project.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {Math.round(((project.current_amount || 0) / project.goal_amount) * 100)}% funded
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {stats?.recentProjects.length > 0 && (
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => window.open('/projects', '_blank')}
                >
                  View All Projects
                </Button>
              )}
            </CardContent>
          </Card>

          {/* System Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                System Overview
              </CardTitle>
              <CardDescription>Platform statistics and health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Content Engagement</p>
                    <p className="text-sm text-muted-foreground">Overall platform activity</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      {Math.round(((stats?.totalApplications || 0) + (stats?.totalDonations || 0) + (stats?.totalVolunteers || 0)) / 10) || 0}%
                    </p>
                    <p className="text-xs text-muted-foreground">Engagement Score</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Content Health</p>
                    <p className="text-sm text-muted-foreground">Active vs total content</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      {Math.round((((stats?.activeJobs || 0) + (stats?.activeProjects || 0)) / Math.max((stats?.totalJobs || 1) + (stats?.totalProjects || 1), 1)) * 100)}%
                    </p>
                    <p className="text-xs text-muted-foreground">Active Content</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Response Rate</p>
                    <p className="text-sm text-muted-foreground">Pending vs processed</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">
                      {((stats?.pendingApplications || 0) + (stats?.pendingVolunteers || 0))}
                    </p>
                    <p className="text-xs text-muted-foreground">Items Pending</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Content Management</CardTitle>
            <CardDescription>Manage all platform content and features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button onClick={() => navigate('/admin/careers')} className="h-20 flex flex-col">
                <Briefcase className="h-6 w-6 mb-2" />
                Manage Jobs
              </Button>
              <Button variant="outline" onClick={() => navigate('/admin/roles')} className="h-20 flex flex-col">
                <Users className="h-6 w-6 mb-2" />
                Manage Users
              </Button>
              <Button variant="outline" onClick={() => window.open('/projects', '_blank')} className="h-20 flex flex-col">
                <Target className="h-6 w-6 mb-2" />
                View Projects
              </Button>
              <Button variant="outline" onClick={() => window.open('/donate', '_blank')} className="h-20 flex flex-col">
                <DollarSign className="h-6 w-6 mb-2" />
                View Donations
              </Button>
              <Button variant="outline" onClick={() => window.open('/careers', '_blank')} className="h-20 flex flex-col">
                <Eye className="h-6 w-6 mb-2" />
                View Careers
              </Button>
              <Button variant="outline" onClick={() => window.open('/gallery', '_blank')} className="h-20 flex flex-col">
                <BarChart3 className="h-6 w-6 mb-2" />
                View Gallery
              </Button>
              <Button variant="outline" onClick={() => window.open('/contact', '_blank')} className="h-20 flex flex-col">
                <Mail className="h-6 w-6 mb-2" />
                View Contact
              </Button>
              <Button variant="outline" onClick={() => window.open('/about', '_blank')} className="h-20 flex flex-col">
                <Award className="h-6 w-6 mb-2" />
                View About
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
