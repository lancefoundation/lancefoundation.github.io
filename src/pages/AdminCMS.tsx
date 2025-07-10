import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import WebsiteAnalytics from '@/components/admin/WebsiteAnalytics';
import MediaLibrary from '@/components/admin/MediaLibrary';
import VolunteerCoordination from '@/components/admin/VolunteerCoordination';
import { 
  FileText, 
  Image, 
  Video, 
  Settings, 
  Plus, 
  Edit, 
  Eye, 
  Trash2,
  Save,
  Upload,
  Globe,
  Layout,
  Users,
  BarChart3,
  Mail,
  Calendar,
  Target,
  FileImage
} from 'lucide-react';

interface ContentPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_description: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  page_type: string;
  featured_image?: string;
}

const AdminCMS = () => {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [pages, setPages] = useState<ContentPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<ContentPage | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newPageData, setNewPageData] = useState({
    title: '',
    slug: '',
    content: '',
    meta_description: '',
    page_type: 'page',
    is_published: false
  });
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
          description: 'You do not have permission to access the CMS.',
          variant: 'destructive',
        });
        navigate('/');
        return;
      }

      await fetchPages();
      setPageLoading(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load CMS data.',
        variant: 'destructive',
      });
      setPageLoading(false);
    }
  };

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from('content_pages')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

  const handleCreatePage = async () => {
    try {
      const { data, error } = await supabase
        .from('content_pages')
        .insert([{
          ...newPageData,
          slug: newPageData.slug || newPageData.title.toLowerCase().replace(/\s+/g, '-')
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Page created successfully!',
      });

      setNewPageData({
        title: '',
        slug: '',
        content: '',
        meta_description: '',
        page_type: 'page',
        is_published: false
      });

      await fetchPages();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create page.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdatePage = async () => {
    if (!selectedPage) return;

    try {
      const { error } = await supabase
        .from('content_pages')
        .update({
          title: selectedPage.title,
          content: selectedPage.content,
          meta_description: selectedPage.meta_description,
          is_published: selectedPage.is_published,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedPage.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Page updated successfully!',
      });

      setIsEditing(false);
      await fetchPages();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update page.',
        variant: 'destructive',
      });
    }
  };

  const handleDeletePage = async (pageId: string) => {
    try {
      const { error } = await supabase
        .from('content_pages')
        .delete()
        .eq('id', pageId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Page deleted successfully!',
      });

      if (selectedPage?.id === pageId) {
        setSelectedPage(null);
        setIsEditing(false);
      }

      await fetchPages();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete page.',
        variant: 'destructive',
      });
    }
  };

  if (loading || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading CMS...</p>
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
            <CardDescription>You do not have permission to access the CMS.</CardDescription>
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
              <h1 className="text-2xl font-bold text-foreground">Content Management System</h1>
              <p className="text-muted-foreground">Manage website content, pages, and media</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => navigate('/dashboard')} variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button onClick={() => navigate('/admin/careers')} variant="outline">
                <Users className="h-4 w-4 mr-2" />
                HR Management
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="pages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="pages">
              <FileText className="h-4 w-4 mr-2" />
              Pages
            </TabsTrigger>
            <TabsTrigger value="media">
              <FileImage className="h-4 w-4 mr-2" />
              Media Library
            </TabsTrigger>
            <TabsTrigger value="volunteers">
              <Users className="h-4 w-4 mr-2" />
              Volunteers
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports">
              <Target className="h-4 w-4 mr-2" />
              Impact Reports
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Site Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Pages List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    All Pages
                    <Button size="sm" onClick={() => setIsEditing(true)}>
                      <Plus className="h-4 w-4 mr-1" />
                      New
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {pages.map((page) => (
                      <div
                        key={page.id}
                        className={`p-3 border rounded-lg cursor-pointer hover:bg-muted/50 ${
                          selectedPage?.id === page.id ? 'bg-muted border-primary' : ''
                        }`}
                        onClick={() => setSelectedPage(page)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{page.title}</p>
                            <p className="text-xs text-muted-foreground">/{page.slug}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Badge variant={page.is_published ? 'default' : 'secondary'}>
                              {page.is_published ? 'Published' : 'Draft'}
                            </Badge>
                            <Badge variant="outline">
                              {page.page_type}
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
                    {isEditing && !selectedPage ? 'Create New Page' : selectedPage ? 'Edit Page' : 'Select a Page'}
                    {selectedPage && (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setIsEditing(!isEditing)}
                        >
                          {isEditing ? 'Cancel' : 'Edit'}
                        </Button>
                        {isEditing && (
                          <Button size="sm" onClick={handleUpdatePage}>
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => selectedPage && handleDeletePage(selectedPage.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing && !selectedPage ? (
                    // Create new page form
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={newPageData.title}
                            onChange={(e) => setNewPageData({ ...newPageData, title: e.target.value })}
                            placeholder="Page title"
                          />
                        </div>
                        <div>
                          <Label htmlFor="slug">Slug</Label>
                          <Input
                            id="slug"
                            value={newPageData.slug}
                            onChange={(e) => setNewPageData({ ...newPageData, slug: e.target.value })}
                            placeholder="page-url-slug"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="meta_description">Meta Description</Label>
                        <Input
                          id="meta_description"
                          value={newPageData.meta_description}
                          onChange={(e) => setNewPageData({ ...newPageData, meta_description: e.target.value })}
                          placeholder="Brief description for SEO"
                        />
                      </div>
                      <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                          id="content"
                          value={newPageData.content}
                          onChange={(e) => setNewPageData({ ...newPageData, content: e.target.value })}
                          placeholder="Page content..."
                          rows={10}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="published"
                          checked={newPageData.is_published}
                          onCheckedChange={(checked) => setNewPageData({ ...newPageData, is_published: checked })}
                        />
                        <Label htmlFor="published">Publish immediately</Label>
                      </div>
                      <Button onClick={handleCreatePage} className="w-full">
                        Create Page
                      </Button>
                    </div>
                  ) : selectedPage ? (
                    // Edit existing page
                    <div className="space-y-4">
                      {isEditing ? (
                        <>
                          <div>
                            <Label htmlFor="edit-title">Title</Label>
                            <Input
                              id="edit-title"
                              value={selectedPage.title}
                              onChange={(e) => setSelectedPage({ ...selectedPage, title: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-meta">Meta Description</Label>
                            <Input
                              id="edit-meta"
                              value={selectedPage.meta_description}
                              onChange={(e) => setSelectedPage({ ...selectedPage, meta_description: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-content">Content</Label>
                            <Textarea
                              id="edit-content"
                              value={selectedPage.content}
                              onChange={(e) => setSelectedPage({ ...selectedPage, content: e.target.value })}
                              rows={12}
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="edit-published"
                              checked={selectedPage.is_published}
                              onCheckedChange={(checked) => setSelectedPage({ ...selectedPage, is_published: checked })}
                            />
                            <Label htmlFor="edit-published">Published</Label>
                          </div>
                        </>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold">{selectedPage.title}</h3>
                            <p className="text-sm text-muted-foreground">/{selectedPage.slug}</p>
                          </div>
                          <div>
                            <Label>Meta Description</Label>
                            <p className="text-sm text-muted-foreground">{selectedPage.meta_description}</p>
                          </div>
                          <div>
                            <Label>Content Preview</Label>
                            <div className="p-4 border rounded-lg bg-muted/20 max-h-60 overflow-y-auto">
                              <p className="whitespace-pre-wrap text-sm">{selectedPage.content}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant={selectedPage.is_published ? 'default' : 'secondary'}>
                              {selectedPage.is_published ? 'Published' : 'Draft'}
                            </Badge>
                            <Badge variant="outline">{selectedPage.page_type}</Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Select a page to view or edit</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="media">
            <MediaLibrary />
          </TabsContent>

          <TabsContent value="volunteers">
            <VolunteerCoordination />
          </TabsContent>

          <TabsContent value="analytics">
            <WebsiteAnalytics />
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Impact Reports</CardTitle>
                <CardDescription>Generate and publish impact reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Impact reports builder coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
                <CardDescription>Configure website settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Site settings coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminCMS;