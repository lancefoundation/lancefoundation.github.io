import { useState, useEffect } from 'react';
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
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2,
  Save,
  Globe,
  Eye
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

const CMSManager = () => {
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
  const { toast } = useToast();

  useEffect(() => {
    fetchPages();
  }, []);

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Content Management System
        </CardTitle>
        <CardDescription>Manage website pages, content, and site structure</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pages" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
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
                              <p className="text-sm whitespace-pre-wrap">{selectedPage.content}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Select a page to edit or create a new one</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="navigation">
            <Card>
              <CardHeader>
                <CardTitle>Navigation Management</CardTitle>
                <CardDescription>Configure website navigation and menus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Navigation management coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="components">
            <Card>
              <CardHeader>
                <CardTitle>Component Library</CardTitle>
                <CardDescription>Reusable content components and templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Component library coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CMSManager;