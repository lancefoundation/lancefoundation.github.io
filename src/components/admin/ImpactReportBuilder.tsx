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
import { supabase } from '@/integrations/supabase/client';
import { 
  Target, 
  Plus, 
  Edit, 
  Trash2,
  Save,
  FileText,
  BarChart3,
  TrendingUp,
  Calendar,
  Download
} from 'lucide-react';

interface ImpactReport {
  id: string;
  title: string;
  period_start: string;
  period_end: string;
  status: string;
  metrics: any;
  charts_data: any;
  content: string;
  created_at: string;
  updated_at: string;
}

const ImpactReportBuilder = () => {
  const [reports, setReports] = useState<ImpactReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<ImpactReport | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newReportData, setNewReportData] = useState({
    title: '',
    period_start: '',
    period_end: '',
    content: '',
    status: 'draft'
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('impact_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleCreateReport = async () => {
    try {
      const { data, error } = await supabase
        .from('impact_reports')
        .insert([{
          ...newReportData,
          metrics: {
            totalDonations: 0,
            projectsCompleted: 0,
            volunteersEngaged: 0,
            beneficiariesReached: 0
          },
          charts_data: {
            donationTrends: [],
            projectProgress: [],
            volunteerHours: []
          }
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Report created successfully!',
      });

      setNewReportData({
        title: '',
        period_start: '',
        period_end: '',
        content: '',
        status: 'draft'
      });

      await fetchReports();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create report.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateReport = async () => {
    if (!selectedReport) return;

    try {
      const { error } = await supabase
        .from('impact_reports')
        .update({
          title: selectedReport.title,
          content: selectedReport.content,
          status: selectedReport.status,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedReport.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Report updated successfully!',
      });

      setIsEditing(false);
      await fetchReports();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update report.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    try {
      const { error } = await supabase
        .from('impact_reports')
        .delete()
        .eq('id', reportId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Report deleted successfully!',
      });

      if (selectedReport?.id === reportId) {
        setSelectedReport(null);
        setIsEditing(false);
      }

      await fetchReports();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete report.',
        variant: 'destructive',
      });
    }
  };

  const generateAutomaticReport = async () => {
    try {
      // This would typically call an edge function to generate metrics
      toast({
        title: 'Info',
        description: 'Automatic report generation will be implemented with real data.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to generate automatic report.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Impact Report Builder
        </CardTitle>
        <CardDescription>Create and manage impact reports to showcase organizational achievements</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Impact Reports</h3>
              <div className="flex gap-2">
                <Button onClick={generateAutomaticReport} variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Auto Generate
                </Button>
                <Button onClick={() => setIsEditing(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Report
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Reports List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>All Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {reports.map((report) => (
                      <div
                        key={report.id}
                        className={`p-3 border rounded-lg cursor-pointer hover:bg-muted/50 ${
                          selectedReport?.id === report.id ? 'bg-muted border-primary' : ''
                        }`}
                        onClick={() => setSelectedReport(report)}
                      >
                        <div className="space-y-2">
                          <p className="font-medium">{report.title}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                              {new Date(report.period_start).toLocaleDateString()} - {new Date(report.period_end).toLocaleDateString()}
                            </p>
                            <Badge variant={report.status === 'published' ? 'default' : 'secondary'}>
                              {report.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Editor */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {isEditing && !selectedReport ? 'Create New Report' : selectedReport ? 'Edit Report' : 'Select a Report'}
                    {selectedReport && (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setIsEditing(!isEditing)}
                        >
                          {isEditing ? 'Cancel' : 'Edit'}
                        </Button>
                        {isEditing && (
                          <Button size="sm" onClick={handleUpdateReport}>
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => selectedReport && handleDeleteReport(selectedReport.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing && !selectedReport ? (
                    // Create new report form
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Report Title</Label>
                        <Input
                          id="title"
                          value={newReportData.title}
                          onChange={(e) => setNewReportData({ ...newReportData, title: e.target.value })}
                          placeholder="Q1 2024 Impact Report"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="period_start">Period Start</Label>
                          <Input
                            id="period_start"
                            type="date"
                            value={newReportData.period_start}
                            onChange={(e) => setNewReportData({ ...newReportData, period_start: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="period_end">Period End</Label>
                          <Input
                            id="period_end"
                            type="date"
                            value={newReportData.period_end}
                            onChange={(e) => setNewReportData({ ...newReportData, period_end: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="content">Report Content</Label>
                        <Textarea
                          id="content"
                          value={newReportData.content}
                          onChange={(e) => setNewReportData({ ...newReportData, content: e.target.value })}
                          placeholder="Executive summary and key achievements..."
                          rows={10}
                        />
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select value={newReportData.status} onValueChange={(value) => setNewReportData({ ...newReportData, status: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="review">Under Review</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleCreateReport} className="w-full">
                        Create Report
                      </Button>
                    </div>
                  ) : selectedReport ? (
                    // Edit existing report
                    <div className="space-y-4">
                      {isEditing ? (
                        <>
                          <div>
                            <Label htmlFor="edit-title">Title</Label>
                            <Input
                              id="edit-title"
                              value={selectedReport.title}
                              onChange={(e) => setSelectedReport({ ...selectedReport, title: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-content">Content</Label>
                            <Textarea
                              id="edit-content"
                              value={selectedReport.content}
                              onChange={(e) => setSelectedReport({ ...selectedReport, content: e.target.value })}
                              rows={12}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-status">Status</Label>
                            <Select value={selectedReport.status} onValueChange={(value) => setSelectedReport({ ...selectedReport, status: value })}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="review">Under Review</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold">{selectedReport.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(selectedReport.period_start).toLocaleDateString()} - {new Date(selectedReport.period_end).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <Label>Content Preview</Label>
                            <div className="p-4 border rounded-lg bg-muted/20 max-h-60 overflow-y-auto">
                              <p className="text-sm whitespace-pre-wrap">{selectedReport.content}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Select a report to edit or create a new one</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="metrics">
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
                <CardDescription>Configure and track important organizational metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Total Donations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$45,231</div>
                      <p className="text-xs text-muted-foreground">+12% from last period</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Projects Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24</div>
                      <p className="text-xs text-muted-foreground">+3 from last period</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Volunteers Engaged</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">156</div>
                      <p className="text-xs text-muted-foreground">+18% from last period</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Beneficiaries Reached</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2,340</div>
                      <p className="text-xs text-muted-foreground">+25% from last period</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
                <CardDescription>Pre-designed templates for different report types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Report templates coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ImpactReportBuilder;