import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { 
  Mail, 
  Plus, 
  Edit, 
  Save, 
  Eye, 
  Copy, 
  Trash2,
  Send,
  FileText,
  Users,
  MessageSquare
} from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  template_type: 'application_received' | 'interview_invitation' | 'job_offer' | 'rejection' | 'custom';
  variables: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const EmailTemplateManager = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    subject: '',
    content: '',
    template_type: 'custom' as const,
    variables: [] as string[],
    is_active: true
  });
  const [previewData, setPreviewData] = useState({
    applicant_name: 'John Doe',
    job_title: 'Frontend Developer',
    company_name: 'The Lance Foundation',
    interview_date: '2024-01-15',
    interview_time: '10:00 AM'
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const handleCreateTemplate = async () => {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .insert([newTemplate])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Email template created successfully!',
      });

      setNewTemplate({
        name: '',
        subject: '',
        content: '',
        template_type: 'custom',
        variables: [],
        is_active: true
      });
      setIsCreating(false);
      await fetchTemplates();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create template.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateTemplate = async () => {
    if (!selectedTemplate) return;

    try {
      const { error } = await supabase
        .from('email_templates')
        .update({
          name: selectedTemplate.name,
          subject: selectedTemplate.subject,
          content: selectedTemplate.content,
          template_type: selectedTemplate.template_type,
          variables: selectedTemplate.variables,
          is_active: selectedTemplate.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedTemplate.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Template updated successfully!',
      });

      setIsEditing(false);
      await fetchTemplates();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update template.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteTemplate = async (templateId: string) => {
    try {
      const { error } = await supabase
        .from('email_templates')
        .delete()
        .eq('id', templateId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Template deleted successfully!',
      });

      if (selectedTemplate?.id === templateId) {
        setSelectedTemplate(null);
        setIsEditing(false);
      }

      await fetchTemplates();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete template.',
        variant: 'destructive',
      });
    }
  };

  const getTemplateTypeColor = (type: string) => {
    switch (type) {
      case 'application_received': return 'bg-blue-500';
      case 'interview_invitation': return 'bg-green-500';
      case 'job_offer': return 'bg-purple-500';
      case 'rejection': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTemplateTypeLabel = (type: string) => {
    switch (type) {
      case 'application_received': return 'Application Received';
      case 'interview_invitation': return 'Interview Invitation';
      case 'job_offer': return 'Job Offer';
      case 'rejection': return 'Rejection';
      default: return 'Custom';
    }
  };

  const replaceVariables = (content: string, data: any) => {
    let replaced = content;
    Object.keys(data).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      replaced = replaced.replace(regex, data[key]);
    });
    return replaced;
  };

  const defaultTemplates = {
    application_received: {
      subject: 'Application Received - {{job_title}} Position',
      content: `Dear {{applicant_name}},

Thank you for your interest in the {{job_title}} position at {{company_name}}.

We have successfully received your application and our team will review it carefully. We will get back to you within 5-7 business days regarding the next steps in our selection process.

In the meantime, please feel free to explore more about our organization and our mission on our website.

Best regards,
HR Team
{{company_name}}`
    },
    interview_invitation: {
      subject: 'Interview Invitation - {{job_title}} Position',
      content: `Dear {{applicant_name}},

Congratulations! We were impressed with your application for the {{job_title}} position and would like to invite you for an interview.

Interview Details:
Date: {{interview_date}}
Time: {{interview_time}}
Format: [To be specified]

Please confirm your availability by replying to this email. If the proposed time doesn't work for you, please suggest alternative times.

We look forward to meeting you and discussing how you can contribute to our team.

Best regards,
HR Team
{{company_name}}`
    },
    job_offer: {
      subject: 'Job Offer - {{job_title}} Position',
      content: `Dear {{applicant_name}},

We are pleased to offer you the position of {{job_title}} at {{company_name}}.

After careful consideration of your qualifications and interview performance, we believe you would be an excellent addition to our team.

This offer is contingent upon:
- Successful completion of background checks
- Verification of employment eligibility
- Any other conditions as discussed

Please review the attached offer letter for complete details regarding compensation, benefits, and start date.

We would appreciate your response by [date]. If you have any questions, please don't hesitate to reach out.

We look forward to welcoming you to the team!

Best regards,
HR Team
{{company_name}}`
    },
    rejection: {
      subject: 'Application Update - {{job_title}} Position',
      content: `Dear {{applicant_name}},

Thank you for your interest in the {{job_title}} position at {{company_name}} and for taking the time to go through our application process.

After careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our current needs.

This was a difficult decision as we received many strong applications. We encourage you to apply for future opportunities that match your skills and experience.

We wish you all the best in your job search and career endeavors.

Best regards,
HR Team
{{company_name}}`
    }
  };

  const createDefaultTemplate = (type: keyof typeof defaultTemplates) => {
    setNewTemplate({
      name: getTemplateTypeLabel(type),
      subject: defaultTemplates[type].subject,
      content: defaultTemplates[type].content,
      template_type: type,
      variables: ['applicant_name', 'job_title', 'company_name'],
      is_active: true
    });
    setIsCreating(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Email Templates</h3>
          <p className="text-sm text-muted-foreground">Manage email templates for HR communications</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">
            <FileText className="h-4 w-4 mr-2" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="quick-create">
            <MessageSquare className="h-4 w-4 mr-2" />
            Quick Create
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Templates List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-base">All Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`p-3 border rounded-lg cursor-pointer hover:bg-muted/50 ${
                        selectedTemplate?.id === template.id ? 'bg-muted border-primary' : ''
                      }`}
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{template.name}</h4>
                        <Badge variant={template.is_active ? 'default' : 'secondary'}>
                          {template.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{template.subject}</p>
                      <Badge variant="outline" className="text-xs">
                        {getTemplateTypeLabel(template.template_type)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Template Editor/Viewer */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base">
                  {isCreating ? 'Create New Template' : selectedTemplate ? 'Template Details' : 'Select a Template'}
                  {selectedTemplate && !isCreating && (
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? 'Cancel' : 'Edit'}
                      </Button>
                      {isEditing && (
                        <Button size="sm" onClick={handleUpdateTemplate}>
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => selectedTemplate && handleDeleteTemplate(selectedTemplate.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isCreating ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="template-name">Template Name</Label>
                        <Input
                          id="template-name"
                          value={newTemplate.name}
                          onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                          placeholder="Template name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="template-type">Type</Label>
                        <Select 
                          value={newTemplate.template_type} 
                          onValueChange={(value: any) => setNewTemplate({ ...newTemplate, template_type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="application_received">Application Received</SelectItem>
                            <SelectItem value="interview_invitation">Interview Invitation</SelectItem>
                            <SelectItem value="job_offer">Job Offer</SelectItem>
                            <SelectItem value="rejection">Rejection</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="template-subject">Subject</Label>
                      <Input
                        id="template-subject"
                        value={newTemplate.subject}
                        onChange={(e) => setNewTemplate({ ...newTemplate, subject: e.target.value })}
                        placeholder="Email subject line"
                      />
                    </div>
                    <div>
                      <Label htmlFor="template-content">Content</Label>
                      <Textarea
                        id="template-content"
                        value={newTemplate.content}
                        onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                        placeholder="Email content with variables like {{applicant_name}}, {{job_title}}, etc."
                        rows={10}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsCreating(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateTemplate}>
                        Create Template
                      </Button>
                    </div>
                  </div>
                ) : selectedTemplate ? (
                  <div className="space-y-4">
                    {isEditing ? (
                      <>
                        <div>
                          <Label htmlFor="edit-name">Template Name</Label>
                          <Input
                            id="edit-name"
                            value={selectedTemplate.name}
                            onChange={(e) => setSelectedTemplate({ ...selectedTemplate, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-subject">Subject</Label>
                          <Input
                            id="edit-subject"
                            value={selectedTemplate.subject}
                            onChange={(e) => setSelectedTemplate({ ...selectedTemplate, subject: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-content">Content</Label>
                          <Textarea
                            id="edit-content"
                            value={selectedTemplate.content}
                            onChange={(e) => setSelectedTemplate({ ...selectedTemplate, content: e.target.value })}
                            rows={10}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold">{selectedTemplate.name}</h4>
                          <Badge variant="outline" className="mt-1">
                            {getTemplateTypeLabel(selectedTemplate.template_type)}
                          </Badge>
                        </div>
                        <div>
                          <Label>Subject</Label>
                          <p className="text-sm bg-muted p-2 rounded">{selectedTemplate.subject}</p>
                        </div>
                        <div>
                          <Label>Content Preview</Label>
                          <div className="bg-muted p-4 rounded-lg text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
                            {replaceVariables(selectedTemplate.content, previewData)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Select a template to view or edit</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quick-create" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(defaultTemplates).map(([type, template]) => (
              <Card key={type} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getTemplateTypeColor(type)}`} />
                    {getTemplateTypeLabel(type)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3">{template.subject}</p>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => createDefaultTemplate(type as keyof typeof defaultTemplates)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Create Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailTemplateManager;