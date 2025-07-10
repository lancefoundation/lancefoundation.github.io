import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  Shield, 
  Settings, 
  UserCog,
  User,
  Edit,
  Save,
  X,
  Check
} from 'lucide-react';

interface UserProfile {
  id: string;
  full_name: string | null;
  role: string;
  status: string;
  created_at: string;
  email?: string;
}

interface RolePermissions {
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

const defaultPermissions: Record<string, RolePermissions> = {
  superadmin: {
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
  },
  content_manager: {
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
  },
  developer: {
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
  },
  volunteer: {
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
  }
};

const RolePermissionManager = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingPermissions, setEditingPermissions] = useState<string | null>(null);
  const [rolePermissions, setRolePermissions] = useState<Record<string, RolePermissions>>(defaultPermissions);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
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

      if (error) throw error;
      setUsers(profiles || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to load users.',
        variant: 'destructive',
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

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'User role updated successfully.',
      });

      await fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update user role.',
        variant: 'destructive',
      });
    }
  };

  const updateUserStatus = async (userId: string, newStatus: 'approved' | 'pending' | 'rejected' | 'suspended') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status: newStatus })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'User status updated successfully.',
      });

      await fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update user status.',
        variant: 'destructive',
      });
    }
  };

  const updateRolePermissions = (role: string, permission: keyof RolePermissions, value: boolean) => {
    setRolePermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permission]: value
      }
    }));
  };

  const saveRolePermissions = async (role: string) => {
    // In a real implementation, this would save to the database
    toast({
      title: 'Success',
      description: `Permissions for ${role} role saved successfully.`,
    });
    setEditingPermissions(null);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'superadmin': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'content_manager': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'developer': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'suspended': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading user management...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCog className="h-5 w-5" />
          User & Role Management
        </CardTitle>
        <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            <TabsTrigger value="audit">Audit Log</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
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
                            onValueChange={(value) => updateUserRole(userProfile.id, value)}
                            disabled={userProfile.id === currentUser?.id}
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
                            onValueChange={(value) => updateUserStatus(userProfile.id, value)}
                            disabled={userProfile.id === currentUser?.id}
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
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(rolePermissions).map(([role, permissions]) => (
                <Card key={role}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="capitalize">{role.replace('_', ' ')}</CardTitle>
                      <div className="flex items-center gap-2">
                        {editingPermissions === role ? (
                          <>
                            <Button size="sm" onClick={() => saveRolePermissions(role)}>
                              <Save className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingPermissions(null)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" variant="outline" onClick={() => setEditingPermissions(role)}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(permissions).map(([permission, enabled]) => (
                        <div key={permission} className="flex items-center justify-between">
                          <Label htmlFor={`${role}-${permission}`} className="capitalize">
                            {permission.replace('_', ' ')}
                          </Label>
                          <Switch
                            id={`${role}-${permission}`}
                            checked={enabled}
                            onCheckedChange={(value) => 
                              editingPermissions === role && 
                              updateRolePermissions(role, permission as keyof RolePermissions, value)
                            }
                            disabled={editingPermissions !== role}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="audit">
            <Card>
              <CardHeader>
                <CardTitle>Audit Log</CardTitle>
                <CardDescription>Track user activity and system changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Audit logging functionality coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RolePermissionManager;