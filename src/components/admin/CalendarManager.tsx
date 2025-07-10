import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2,
  Save,
  Clock,
  MapPin,
  Users,
  Bell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  event_type: string;
  status: string;
  attendees_count?: number;
}

const CalendarManager = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [newEventData, setNewEventData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    event_type: 'meeting',
    status: 'scheduled'
  });
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching events - replace with actual API call
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    // This would typically fetch from a calendar/events table
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'Board Meeting',
        description: 'Monthly board meeting to discuss organization progress',
        start_date: '2024-01-15T10:00:00',
        end_date: '2024-01-15T12:00:00',
        location: 'Conference Room A',
        event_type: 'meeting',
        status: 'scheduled',
        attendees_count: 8
      },
      {
        id: '2',
        title: 'Volunteer Training',
        description: 'Training session for new volunteers',
        start_date: '2024-01-20T14:00:00',
        end_date: '2024-01-20T17:00:00',
        location: 'Training Center',
        event_type: 'training',
        status: 'confirmed',
        attendees_count: 25
      },
      {
        id: '3',
        title: 'Community Outreach',
        description: 'Community engagement event in downtown area',
        start_date: '2024-01-25T09:00:00',
        end_date: '2024-01-25T15:00:00',
        location: 'Downtown Square',
        event_type: 'outreach',
        status: 'scheduled',
        attendees_count: 50
      }
    ];
    setEvents(mockEvents);
  };

  const handleCreateEvent = async () => {
    try {
      // This would typically create an event in the database
      const newEvent: Event = {
        id: Date.now().toString(),
        ...newEventData,
        attendees_count: 0
      };

      setEvents([...events, newEvent]);

      toast({
        title: 'Success',
        description: 'Event created successfully!',
      });

      setNewEventData({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        location: '',
        event_type: 'meeting',
        status: 'scheduled'
      });

      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create event.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateEvent = async () => {
    if (!selectedEvent) return;

    try {
      // This would typically update the event in the database
      setEvents(events.map(event => 
        event.id === selectedEvent.id ? selectedEvent : event
      ));

      toast({
        title: 'Success',
        description: 'Event updated successfully!',
      });

      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update event.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      setEvents(events.filter(event => event.id !== eventId));

      toast({
        title: 'Success',
        description: 'Event deleted successfully!',
      });

      if (selectedEvent?.id === eventId) {
        setSelectedEvent(null);
        setIsEditing(false);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete event.',
        variant: 'destructive',
      });
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'training': return 'bg-green-500';
      case 'outreach': return 'bg-purple-500';
      case 'fundraising': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-yellow-500';
      case 'confirmed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Calendar Management
        </CardTitle>
        <CardDescription>Manage organizational events, meetings, and schedules</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="events">Event List</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="text-lg font-semibold">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={() => setIsEditing(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Event
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 bg-muted/50 rounded">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 min-h-[400px]">
              {/* This would be a proper calendar grid implementation */}
              {Array.from({ length: 35 }, (_, i) => (
                <div key={i} className="border rounded p-2 min-h-[80px] bg-background">
                  <div className="text-sm text-muted-foreground">{((i % 31) + 1)}</div>
                  {/* Events would be rendered here */}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              <Button onClick={() => setIsEditing(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Event
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Events List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>All Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className={`p-3 border rounded-lg cursor-pointer hover:bg-muted/50 ${
                          selectedEvent?.id === event.id ? 'bg-muted border-primary' : ''
                        }`}
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{event.title}</p>
                            <Badge variant="outline" className={`text-white ${getEventTypeColor(event.event_type)}`}>
                              {event.event_type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {new Date(event.start_date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Users className="h-3 w-3" />
                              {event.attendees_count} attendees
                            </div>
                            <Badge variant="outline" className={`text-white ${getStatusColor(event.status)}`}>
                              {event.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Event Editor */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {isEditing && !selectedEvent ? 'Create New Event' : selectedEvent ? 'Event Details' : 'Select an Event'}
                    {selectedEvent && (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setIsEditing(!isEditing)}
                        >
                          {isEditing ? 'Cancel' : 'Edit'}
                        </Button>
                        {isEditing && (
                          <Button size="sm" onClick={handleUpdateEvent}>
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => selectedEvent && handleDeleteEvent(selectedEvent.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing && !selectedEvent ? (
                    // Create new event form
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Event Title</Label>
                        <Input
                          id="title"
                          value={newEventData.title}
                          onChange={(e) => setNewEventData({ ...newEventData, title: e.target.value })}
                          placeholder="Board Meeting"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newEventData.description}
                          onChange={(e) => setNewEventData({ ...newEventData, description: e.target.value })}
                          placeholder="Meeting agenda and details..."
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="start_date">Start Date & Time</Label>
                          <Input
                            id="start_date"
                            type="datetime-local"
                            value={newEventData.start_date}
                            onChange={(e) => setNewEventData({ ...newEventData, start_date: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="end_date">End Date & Time</Label>
                          <Input
                            id="end_date"
                            type="datetime-local"
                            value={newEventData.end_date}
                            onChange={(e) => setNewEventData({ ...newEventData, end_date: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={newEventData.location}
                          onChange={(e) => setNewEventData({ ...newEventData, location: e.target.value })}
                          placeholder="Conference Room A"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="event_type">Event Type</Label>
                          <Select value={newEventData.event_type} onValueChange={(value) => setNewEventData({ ...newEventData, event_type: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="meeting">Meeting</SelectItem>
                              <SelectItem value="training">Training</SelectItem>
                              <SelectItem value="outreach">Outreach</SelectItem>
                              <SelectItem value="fundraising">Fundraising</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="status">Status</Label>
                          <Select value={newEventData.status} onValueChange={(value) => setNewEventData({ ...newEventData, status: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="scheduled">Scheduled</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button onClick={handleCreateEvent} className="w-full">
                        Create Event
                      </Button>
                    </div>
                  ) : selectedEvent ? (
                    // Edit existing event or view details
                    <div className="space-y-4">
                      {isEditing ? (
                        <>
                          <div>
                            <Label htmlFor="edit-title">Title</Label>
                            <Input
                              id="edit-title"
                              value={selectedEvent.title}
                              onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                              id="edit-description"
                              value={selectedEvent.description}
                              onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
                              rows={3}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="edit-start">Start Date & Time</Label>
                              <Input
                                id="edit-start"
                                type="datetime-local"
                                value={selectedEvent.start_date}
                                onChange={(e) => setSelectedEvent({ ...selectedEvent, start_date: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-end">End Date & Time</Label>
                              <Input
                                id="edit-end"
                                type="datetime-local"
                                value={selectedEvent.end_date}
                                onChange={(e) => setSelectedEvent({ ...selectedEvent, end_date: e.target.value })}
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="edit-location">Location</Label>
                            <Input
                              id="edit-location"
                              value={selectedEvent.location}
                              onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })}
                            />
                          </div>
                        </>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
                            <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Start</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(selectedEvent.start_date).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">End</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(selectedEvent.end_date).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm">{selectedEvent.location}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm">{selectedEvent.attendees_count} attendees</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Select an event to view details or create a new one</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Calendar Settings</CardTitle>
                <CardDescription>Configure calendar preferences and integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Calendar settings and integrations coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CalendarManager;