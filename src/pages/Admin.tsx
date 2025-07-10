import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { 
  Settings, 
  Users, 
  FileText, 
  Calendar,
  BarChart3,
  Mail,
  Target,
  Briefcase,
  DollarSign,
  FileImage,
  UserCog,
  Shield
} from 'lucide-react';

// Import admin components
import WebsiteAnalytics from '@/components/admin/WebsiteAnalytics';
import MediaLibrary from '@/components/admin/MediaLibrary';
import VolunteerCoordination from '@/components/admin/VolunteerCoordination';
import EmailTemplateManager from '@/components/admin/EmailTemplateManager';
import JobPostingForm from '@/components/admin/JobPostingForm';
import CMSManager from '@/components/admin/CMSManager';
import ImpactReportBuilder from '@/components/admin/ImpactReportBuilder';
import CalendarManager from '@/components/admin/CalendarManager';
import DonationTracker from '@/components/admin/DonationTracker';
import RolePermissionManager from '@/components/admin/RolePermissionManager';

interface UserPermissions {
  cms: boolean;
  careers: boolean;
  analytics: boolean;
  media: boolean;
  volunteers: boolean;
  reports: boolean;
  users: boolean;
  settings: boolean;
  donations: boolean;
  calendar: boolean;
}

const Admin = () => {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [userPermissions, setUserPermissions] = useState<UserPermissions>({
    cms: false,
    careers: false,
    analytics: false,
    media: false,
    volunteers: false,
    reports: false,
    users: false,
    settings: false,
    donations: false,
    calendar: false
  });
  const [activeTab, setActiveTab] = useState('dashboard');
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

      if (!profileData || !['superadmin', 'content_manager', 'developer'].includes(profileData.role)) {
        toast({
          title: 'Access Denied',
          description: 'You do not have permission to access the admin panel.',
          variant: 'destructive',
        });
        navigate('/');
        return;
      }

      // Set permissions based on role
      setUserPermissions(getPermissionsByRole(profileData.role));
      setPageLoading(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load admin panel.',
        variant: 'destructive',
      });
      setPageLoading(false);
    }
  };

  const getPermissionsByRole = (role: string): UserPermissions => {
    switch (role) {
      case 'superadmin':
        return {
          cms: true,
          careers: true,
          analytics: true,
          media: true,
          volunteers: true,
          reports: true,
          users: true,
          settings: true,
          donations: true,
          calendar: true
        };
      case 'content_manager':
        return {
          cms: true,
          careers: true,
          analytics: true,
          media: true,
          volunteers: false,
          reports: true,
          users: false,
          settings: false,
          donations: false,
          calendar: true
        };
      case 'developer':
        return {
          cms: false,
          careers: false,
          analytics: true,
          media: false,
          volunteers: false,
          reports: false,
          users: false,
          settings: true,
          donations: false,
          calendar: false
        };
      default:
        return {
          cms: false,
          careers: false,
          analytics: false,
          media: false,
          volunteers: false,
          reports: false,
          users: false,
          settings: false,
          donations: false,
          calendar: false
        };
    }
  };

  if (loading || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!profile || !['superadmin', 'content_manager', 'developer'].includes(profile.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You do not have permission to access the admin panel.</CardDescription>
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

  const getAvailableTabs = () => {
    const tabs = [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3, show: true },
      { id: 'cms', label: 'Content Management', icon: FileText, show: userPermissions.cms },
      { id: 'careers', label: 'HR & Careers', icon: Briefcase, show: userPermissions.careers },
      { id: 'analytics', label: 'Analytics', icon: BarChart3, show: userPermissions.analytics },
      { id: 'media', label: 'Media Library', icon: FileImage, show: userPermissions.media },
      { id: 'volunteers', label: 'Volunteers', icon: Users, show: userPermissions.volunteers },
      { id: 'reports', label: 'Impact Reports', icon: Target, show: userPermissions.reports },
      { id: 'donations', label: 'Donations', icon: DollarSign, show: userPermissions.donations },
      { id: 'calendar', label: 'Calendar', icon: Calendar, show: userPermissions.calendar },
      { id: 'users', label: 'User Management', icon: UserCog, show: userPermissions.users },
      { id: 'settings', label: 'Settings', icon: Settings, show: userPermissions.settings }
    ];

    return tabs.filter(tab => tab.show);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-muted-foreground">
                Welcome back, {profile.full_name || 'Admin'} • Role: {profile.role}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => navigate('/dashboard')} variant="outline">
                <Shield className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button onClick={() => navigate('/')} variant="outline">
                Back to Website
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${getAvailableTabs().length}, minmax(0, 1fr))` }}>
            {getAvailableTabs().map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">3 new this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Job Applications</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">15 pending review</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Access</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {getAvailableTabs().slice(1).map((tab) => (
                    <Button
                      key={tab.id}
                      variant="outline"
                      className="h-20 flex flex-col"
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <tab.icon className="h-6 w-6 mb-2" />
                      {tab.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {userPermissions.cms && (
            <TabsContent value="cms">
              <CMSManager />
            </TabsContent>
          )}

          {userPermissions.careers && (
            <TabsContent value="careers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>HR & Career Management</CardTitle>
                  <CardDescription>Manage job postings, applications, and HR communications</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="postings" className="space-y-6">
                    <TabsList>
                      <TabsTrigger value="postings">Job Postings</TabsTrigger>
                      <TabsTrigger value="applications">Applications</TabsTrigger>
                      <TabsTrigger value="emails">Email Templates</TabsTrigger>
                    </TabsList>

                    <TabsContent value="postings">
                      <JobPostingForm />
                    </TabsContent>

                    <TabsContent value="applications">
                      <div className="text-center py-8">
                        <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Job applications management coming soon...</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="emails">
                      <EmailTemplateManager />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {userPermissions.analytics && (
            <TabsContent value="analytics">
              <WebsiteAnalytics />
            </TabsContent>
          )}

          {userPermissions.media && (
            <TabsContent value="media">
              <MediaLibrary />
            </TabsContent>
          )}

          {userPermissions.volunteers && (
            <TabsContent value="volunteers">
              <VolunteerCoordination />
            </TabsContent>
          )}

          {userPermissions.reports && (
            <TabsContent value="reports">
              <ImpactReportBuilder />
            </TabsContent>
          )}

          {userPermissions.donations && (
            <TabsContent value="donations">
              <DonationTracker />
            </TabsContent>
          )}

          {userPermissions.calendar && (
            <TabsContent value="calendar">
              <CalendarManager />
            </TabsContent>
          )}

          {userPermissions.users && (
            <TabsContent value="users">
              <RolePermissionManager />
            </TabsContent>
          )}

          {userPermissions.settings && (
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure system-wide settings and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">System settings coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;