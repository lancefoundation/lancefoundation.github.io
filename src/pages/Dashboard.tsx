import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Users, Briefcase, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DashboardStats {
  totalUsers: number;
  totalVolunteers: number;
  totalDonations: { amount: number; count: number };
  activeProjects: number;
}

interface UserProfile {
  id: string;
  full_name: string | null;
  role: string;
  status: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    try {
      // Fetch system stats
      const { data: systemStats, error: statsError } = await supabase
        .from('system_stats')
        .select('stat_name, stat_value');

      if (statsError) {
        console.error('Error fetching stats:', statsError);
      }

      // Fetch user profile
      const { data: userProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
      } else {
        setProfile(userProfile);
      }

      // Process system stats
      if (systemStats) {
        const statsMap = systemStats.reduce((acc, stat) => {
          acc[stat.stat_name] = stat.stat_value;
          return acc;
        }, {} as Record<string, any>);

        setStats({
          totalUsers: statsMap.total_users?.count || 0,
          totalVolunteers: statsMap.total_volunteers?.count || 0,
          totalDonations: statsMap.total_donations || { amount: 0, count: 0 },
          activeProjects: statsMap.active_projects?.count || 0,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const isAdmin = profile?.role === 'superadmin' || profile?.role === 'content_manager';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {profile?.full_name || user?.email}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm bg-secondary px-2 py-1 rounded-md capitalize">
              {profile?.role}
            </span>
            {isAdmin && (
              <Button
                variant="outline"
                onClick={() => navigate('/admin/roles')}
              >
                Manage Roles
              </Button>
            )}
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
              <p className="text-xs text-muted-foreground">
                Registered users
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
                Active volunteers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                KES {stats?.totalDonations.amount?.toLocaleString() || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats?.totalDonations.count || 0} donations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.activeProjects || 0}</div>
              <p className="text-xs text-muted-foreground">
                Ongoing projects
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Role-based Content */}
        {profile?.status === 'pending' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-yellow-600">Account Pending Approval</CardTitle>
              <CardDescription>
                Your account is currently pending approval. Please wait for an administrator to review your application.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {isAdmin && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Admin Actions</CardTitle>
                <CardDescription>Manage foundation operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/admin/roles')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Manage User Roles
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/admin/volunteers')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Volunteer Applications
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/admin/projects')}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Manage Projects
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest foundation updates</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Activity feed will be displayed here
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;