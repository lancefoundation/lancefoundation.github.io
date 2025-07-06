import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { ArrowDown, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  full_name: string | null;
  role: string;
  status: string;
  created_at: string;
  email?: string;
}

const RoleManagement = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchUsers();
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      // First check current user's role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        navigate('/dashboard');
        return;
      }

      setCurrentUserProfile(profile);

      // Only superadmins can manage roles
      if (profile.role !== 'superadmin') {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this page.",
          variant: "destructive",
        });
        navigate('/dashboard');
        return;
      }

      // Fetch all users with their profiles and auth data
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          role,
          status,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        toast({
          title: "Error",
          description: "Failed to load users.",
          variant: "destructive",
        });
      } else {
        // For now, we'll skip fetching email addresses from auth users
        // This would require admin privileges that regular users don't have
        setUsers(profiles || []);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'superadmin' | 'content_manager' | 'volunteer' | 'developer') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) {
        console.error('Error updating role:', error);
        toast({
          title: "Error",
          description: "Failed to update user role.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "User role updated successfully.",
        });
        fetchUsers(); // Refresh the list
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const updateUserStatus = async (userId: string, newStatus: 'pending' | 'approved' | 'rejected' | 'suspended') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status: newStatus })
        .eq('id', userId);

      if (error) {
        console.error('Error updating status:', error);
        toast({
          title: "Error",
          description: "Failed to update user status.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "User status updated successfully.",
        });
        fetchUsers(); // Refresh the list
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'superadmin':
        return 'bg-red-100 text-red-800';
      case 'content_manager':
        return 'bg-blue-100 text-blue-800';
      case 'developer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'suspended':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading role management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Role Management</h1>
            <p className="text-muted-foreground">Manage user roles and permissions</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            <ArrowDown className="mr-2 h-4 w-4 rotate-90" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6">
          {users.map((userProfile) => (
            <Card key={userProfile.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-secondary p-2 rounded-full">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {userProfile.full_name || 'No name provided'}
                      </CardTitle>
                      <CardDescription>
                        {userProfile.email || 'No email available'}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getRoleColor(userProfile.role)}>
                      {userProfile.role}
                    </Badge>
                    <Badge className={getStatusColor(userProfile.status)}>
                      {userProfile.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Joined: {new Date(userProfile.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium">Role:</label>
                      <Select
                        value={userProfile.role}
                        onValueChange={(value) => updateUserRole(userProfile.id, value as 'superadmin' | 'content_manager' | 'volunteer' | 'developer')}
                        disabled={userProfile.id === user?.id} // Can't change own role
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="volunteer">Volunteer</SelectItem>
                          <SelectItem value="content_manager">Content Manager</SelectItem>
                          <SelectItem value="developer">Developer</SelectItem>
                          <SelectItem value="superadmin">Super Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium">Status:</label>
                      <Select
                        value={userProfile.status}
                        onValueChange={(value) => updateUserStatus(userProfile.id, value as 'pending' | 'approved' | 'rejected' | 'suspended')}
                        disabled={userProfile.id === user?.id} // Can't change own status
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {users.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No users found.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default RoleManagement;