import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  UserPlus, 
  Mail, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Award,
  Calendar,
  MapPin,
  Phone,
  Edit,
  Trash2,
  Plus,
  Send,
  Filter,
  Search
} from 'lucide-react';

interface Volunteer {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  role: string;
  status: string;
  skills: string[];
  availability: string;
  projects_assigned: number;
  hours_logged: number;
  last_activity: string;
  coordinator_id?: string;
  performance_rating?: number;
  notes?: string;
}

interface VolunteerAssignment {
  id: string;
  volunteer_id: string;
  project_id: string;
  project_title: string;
  role_assigned: string;
  status: string;
  hours_logged: number;
  tasks_assigned: string[];
  tasks_completed: string[];
  start_date: string;
  end_date?: string;
}

const VolunteerCoordination = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [assignments, setAssignments] = useState<VolunteerAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [messageSubject, setMessageSubject] = useState('');
  const [selectedVolunteers, setSelectedVolunteers] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchVolunteers();
    fetchAssignments();
  }, []);

  const fetchVolunteers = async () => {
    try {
      // In real implementation, this would fetch from volunteer_management table
      // For demo, generate sample data
      setVolunteers(generateSampleVolunteers());
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      setVolunteers(generateSampleVolunteers());
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignments = async () => {
    try {
      // In real implementation, fetch assignments from volunteer_management table
      setAssignments(generateSampleAssignments());
    } catch (error) {
      console.error('Error fetching assignments:', error);
      setAssignments(generateSampleAssignments());
    }
  };

  const generateSampleVolunteers = (): Volunteer[] => {
    return [
      {
        id: '1',
        user_id: 'user1',
        full_name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+254712345678',
        role: 'volunteer',
        status: 'active',
        skills: ['Teaching', 'Project Management', 'Community Outreach'],
        availability: 'Weekends',
        projects_assigned: 3,
        hours_logged: 45.5,
        last_activity: '2024-01-15',
        coordinator_id: 'admin1',
        performance_rating: 4.8,
        notes: 'Excellent volunteer, very reliable and skilled'
      },
      {
        id: '2',
        user_id: 'user2',
        full_name: 'Michael Chen',
        email: 'michael.c@email.com',
        phone: '+254798765432',
        role: 'volunteer',
        status: 'active',
        skills: ['Construction', 'Engineering', 'Training'],
        availability: 'Flexible',
        projects_assigned: 2,
        hours_logged: 32.0,
        last_activity: '2024-01-14',
        coordinator_id: 'admin1',
        performance_rating: 4.6,
        notes: 'Great technical skills, good team player'
      },
      {
        id: '3',
        user_id: 'user3',
        full_name: 'Emily Rodriguez',
        email: 'emily.r@email.com',
        phone: '+254756789123',
        role: 'volunteer',
        status: 'inactive',
        skills: ['Healthcare', 'Nursing', 'First Aid'],
        availability: 'Weekdays',
        projects_assigned: 1,
        hours_logged: 18.5,
        last_activity: '2024-01-10',
        coordinator_id: 'admin1',
        performance_rating: 4.9,
        notes: 'Temporarily unavailable due to personal commitments'
      }
    ];
  };

  const generateSampleAssignments = (): VolunteerAssignment[] => {
    return [
      {
        id: '1',
        volunteer_id: '1',
        project_id: 'proj1',
        project_title: 'Education Center Construction',
        role_assigned: 'Project Coordinator',
        status: 'active',
        hours_logged: 25.0,
        tasks_assigned: ['Site Planning', 'Team Management', 'Progress Reporting'],
        tasks_completed: ['Site Planning', 'Team Management'],
        start_date: '2024-01-01',
      },
      {
        id: '2',
        volunteer_id: '2',
        project_id: 'proj2',
        project_title: 'Water Well Installation',
        role_assigned: 'Technical Lead',
        status: 'active',
        hours_logged: 32.0,
        tasks_assigned: ['Equipment Setup', 'Installation', 'Quality Check'],
        tasks_completed: ['Equipment Setup', 'Installation'],
        start_date: '2024-01-05',
      }
    ];
  };

  const handleSendMessage = async () => {
    if (!messageSubject || !messageContent || selectedVolunteers.length === 0) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields and select volunteers.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // In real implementation, this would use the communication_logs table
      // const { error } = await supabase
      //   .from('communication_logs')
      //   .insert({
      //     sender_id: currentUserId,
      //     recipient_ids: selectedVolunteers,
      //     subject: messageSubject,
      //     content: messageContent,
      //     message_type: 'email'
      //   });

      toast({
        title: 'Success',
        description: `Message sent to ${selectedVolunteers.length} volunteer(s)!`,
      });

      setShowMessageDialog(false);
      setMessageSubject('');
      setMessageContent('');
      setSelectedVolunteers([]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateVolunteerStatus = async (volunteerId: string, newStatus: string) => {
    try {
      setVolunteers(prev => 
        prev.map(vol => 
          vol.id === volunteerId 
            ? { ...vol, status: newStatus }
            : vol
        )
      );

      toast({
        title: 'Success',
        description: 'Volunteer status updated successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update volunteer status.',
        variant: 'destructive',
      });
    }
  };

  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesStatus = statusFilter === 'all' || volunteer.status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      volunteer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getPerformanceColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse h-8 w-48 bg-muted rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-muted rounded-lg h-48"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Volunteer Coordination</h3>
          <p className="text-sm text-muted-foreground">
            {volunteers.length} volunteers • {volunteers.filter(v => v.status === 'active').length} active
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setShowMessageDialog(true)}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Message
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Volunteer
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volunteers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{volunteers.length}</div>
            <p className="text-xs text-muted-foreground">
              {volunteers.filter(v => v.status === 'active').length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {volunteers.reduce((sum, vol) => sum + vol.hours_logged, 0).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              Hours logged this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assignments.filter(a => a.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Ongoing assignments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Performance</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(volunteers
                .filter(v => v.performance_rating)
                .reduce((sum, vol) => sum + (vol.performance_rating || 0), 0) / 
                volunteers.filter(v => v.performance_rating).length
              ).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of 5.0 stars
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="volunteers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="volunteers">
            <Users className="h-4 w-4 mr-2" />
            Volunteers
          </TabsTrigger>
          <TabsTrigger value="assignments">
            <Calendar className="h-4 w-4 mr-2" />
            Assignments
          </TabsTrigger>
          <TabsTrigger value="communications">
            <MessageSquare className="h-4 w-4 mr-2" />
            Communications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="volunteers" className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search volunteers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVolunteers.map((volunteer) => (
              <Card key={volunteer.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{volunteer.full_name}</CardTitle>
                      <CardDescription>{volunteer.email}</CardDescription>
                    </div>
                    <Badge variant="outline" className={`text-white ${getStatusColor(volunteer.status)}`}>
                      {volunteer.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm space-y-1">
                      {volunteer.phone && (
                        <p className="flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          {volunteer.phone}
                        </p>
                      )}
                      <p className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {volunteer.availability}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {volunteer.hours_logged}h logged
                      </p>
                      {volunteer.performance_rating && (
                        <p className="flex items-center gap-2">
                          <Award className="h-3 w-3" />
                          <span className={getPerformanceColor(volunteer.performance_rating)}>
                            {volunteer.performance_rating}/5.0
                          </span>
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-1">Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {volunteer.skills.slice(0, 3).map(skill => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {volunteer.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{volunteer.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Select 
                        value={volunteer.status} 
                        onValueChange={(status) => handleUpdateVolunteerStatus(volunteer.id, status)}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedVolunteers([volunteer.id])}
                      >
                        <Mail className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Assignments</CardTitle>
              <CardDescription>Current volunteer project assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{assignment.project_title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Role: {assignment.role_assigned} • {assignment.hours_logged}h logged
                      </p>
                      <div className="flex items-center gap-4">
                        <Badge variant={assignment.status === 'active' ? 'default' : 'secondary'}>
                          {assignment.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {assignment.tasks_completed.length}/{assignment.tasks_assigned.length} tasks completed
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications">
          <Card>
            <CardHeader>
              <CardTitle>Communication History</CardTitle>
              <CardDescription>Recent messages and announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No recent communications</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Message Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Message to Volunteers</DialogTitle>
            <DialogDescription>
              Send an email or announcement to selected volunteers
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={messageSubject}
                onChange={(e) => setMessageSubject(e.target.value)}
                placeholder="Message subject"
              />
            </div>
            <div>
              <Label htmlFor="content">Message</Label>
              <Textarea
                id="content"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Your message to volunteers..."
                rows={6}
              />
            </div>
            <div>
              <Label>Select Volunteers</Label>
              <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                {volunteers.filter(v => v.status === 'active').map((volunteer) => (
                  <div key={volunteer.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={volunteer.id}
                      checked={selectedVolunteers.includes(volunteer.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedVolunteers([...selectedVolunteers, volunteer.id]);
                        } else {
                          setSelectedVolunteers(selectedVolunteers.filter(id => id !== volunteer.id));
                        }
                      }}
                    />
                    <Label htmlFor={volunteer.id} className="text-sm">
                      {volunteer.full_name} ({volunteer.email})
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowMessageDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VolunteerCoordination;