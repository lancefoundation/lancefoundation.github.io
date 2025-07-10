import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Upload, 
  Image, 
  Video, 
  FileText, 
  Trash2, 
  Edit, 
  Copy, 
  Download,
  Filter,
  Grid,
  List,
  Search,
  Plus,
  FolderPlus,
  Tag
} from 'lucide-react';

interface MediaFile {
  id: string;
  filename: string;
  original_name: string;
  file_type: string;
  file_size: number;
  mime_type: string;
  url: string;
  alt_text?: string;
  caption?: string;
  tags: string[];
  folder_path: string;
  uploaded_by: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

const MediaLibrary = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchMediaFiles();
  }, []);

  const fetchMediaFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('media_library')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Generate sample data if no real data exists
      if (!data || data.length === 0) {
        setMediaFiles(generateSampleData());
      } else {
        setMediaFiles(data);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
      setMediaFiles(generateSampleData());
    } finally {
      setLoading(false);
    }
  };

  const generateSampleData = (): MediaFile[] => {
    return [
      {
        id: '1',
        filename: 'hero-image.jpg',
        original_name: 'hero-image.jpg',
        file_type: 'image',
        file_size: 2048000,
        mime_type: 'image/jpeg',
        url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600',
        alt_text: 'Children in a classroom',
        caption: 'Education program in rural Kenya',
        tags: ['education', 'children', 'classroom'],
        folder_path: 'projects',
        uploaded_by: 'admin',
        is_public: true,
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        filename: 'community-well.jpg',
        original_name: 'community-well.jpg',
        file_type: 'image',
        file_size: 1536000,
        mime_type: 'image/jpeg',
        url: 'https://images.unsplash.com/photo-1594736797933-d0c6d7b4b913?w=800&h=600',
        alt_text: 'Water well project',
        caption: 'Clean water initiative completion',
        tags: ['water', 'community', 'infrastructure'],
        folder_path: 'projects',
        uploaded_by: 'admin',
        is_public: true,
        created_at: '2024-01-14T15:30:00Z',
        updated_at: '2024-01-14T15:30:00Z'
      },
      {
        id: '3',
        filename: 'volunteer-team.jpg',
        original_name: 'volunteer-team.jpg',
        file_type: 'image',
        file_size: 1792000,
        mime_type: 'image/jpeg',
        url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600',
        alt_text: 'Volunteer team photo',
        caption: 'Our amazing volunteer team',
        tags: ['volunteers', 'team', 'group'],
        folder_path: 'team',
        uploaded_by: 'admin',
        is_public: true,
        created_at: '2024-01-13T09:15:00Z',
        updated_at: '2024-01-13T09:15:00Z'
      }
    ];
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        // Simulate upload progress
        for (let j = 0; j <= 100; j += 10) {
          setUploadProgress(j);
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        // In a real implementation, you would upload to Supabase Storage
        // const { data, error } = await supabase.storage
        //   .from('media')
        //   .upload(fileName, file);

        // For demo, create a mock entry
        const newFile: MediaFile = {
          id: Date.now().toString(),
          filename: fileName,
          original_name: file.name,
          file_type: file.type.startsWith('image/') ? 'image' : 
                    file.type.startsWith('video/') ? 'video' : 'document',
          file_size: file.size,
          mime_type: file.type,
          url: URL.createObjectURL(file),
          alt_text: '',
          caption: '',
          tags: [],
          folder_path: 'uploads',
          uploaded_by: 'current-user',
          is_public: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        setMediaFiles(prev => [newFile, ...prev]);
      }

      toast({
        title: 'Success',
        description: `${files.length} file(s) uploaded successfully!`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload files.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      // In real implementation: await supabase.from('media_library').delete().eq('id', fileId);
      setMediaFiles(prev => prev.filter(file => file.id !== fileId));
      
      toast({
        title: 'Success',
        description: 'File deleted successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete file.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateFile = async (updatedFile: MediaFile) => {
    try {
      // In real implementation: await supabase.from('media_library').update(...).eq('id', updatedFile.id);
      setMediaFiles(prev => 
        prev.map(file => file.id === updatedFile.id ? updatedFile : file)
      );
      
      toast({
        title: 'Success',
        description: 'File updated successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update file.',
        variant: 'destructive',
      });
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'Copied',
      description: 'File URL copied to clipboard!',
    });
  };

  const filteredFiles = mediaFiles.filter(file => {
    const matchesType = filterType === 'all' || file.file_type === filterType;
    const matchesSearch = searchTerm === '' || 
      file.original_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesType && matchesSearch;
  });

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse h-8 w-48 bg-muted rounded"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="animate-pulse bg-muted rounded-lg h-32"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Media Library</h3>
          <p className="text-sm text-muted-foreground">{mediaFiles.length} files</p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Files</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
          <CardDescription>Upload images, videos, and documents to your media library</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <input
              type="file"
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Click to upload files</p>
              <p className="text-sm text-muted-foreground">
                Support for images, videos, and documents up to 10MB
              </p>
            </label>
            {isUploading && (
              <div className="mt-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredFiles.map((file) => (
            <Card key={file.id} className="group hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-3">
                <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden">
                  {file.file_type === 'image' ? (
                    <img 
                      src={file.url} 
                      alt={file.alt_text || file.original_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {getFileIcon(file.file_type)}
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium truncate">{file.original_name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.file_size)}</p>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="ghost" onClick={() => setSelectedFile(file)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard(file.url)}>
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleDeleteFile(file.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="space-y-0">
              {filteredFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-4 border-b hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                      {file.file_type === 'image' ? (
                        <img src={file.url} alt={file.alt_text} className="w-full h-full object-cover" />
                      ) : (
                        getFileIcon(file.file_type)
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{file.original_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(file.file_size)} • {new Date(file.created_at).toLocaleDateString()}
                      </p>
                      {file.tags.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {file.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" onClick={() => setSelectedFile(file)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard(file.url)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleDeleteFile(file.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* File Edit Dialog */}
      {selectedFile && (
        <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit File Details</DialogTitle>
              <DialogDescription>
                Update file information and metadata
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                  {selectedFile.file_type === 'image' ? (
                    <img 
                      src={selectedFile.url} 
                      alt={selectedFile.alt_text}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {getFileIcon(selectedFile.file_type)}
                    </div>
                  )}
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong>File:</strong> {selectedFile.original_name}</p>
                  <p><strong>Size:</strong> {formatFileSize(selectedFile.file_size)}</p>
                  <p><strong>Type:</strong> {selectedFile.mime_type}</p>
                  <p><strong>Uploaded:</strong> {new Date(selectedFile.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="alt-text">Alt Text</Label>
                  <Input
                    id="alt-text"
                    value={selectedFile.alt_text || ''}
                    onChange={(e) => setSelectedFile({
                      ...selectedFile,
                      alt_text: e.target.value
                    })}
                    placeholder="Describe the image for accessibility"
                  />
                </div>
                <div>
                  <Label htmlFor="caption">Caption</Label>
                  <Textarea
                    id="caption"
                    value={selectedFile.caption || ''}
                    onChange={(e) => setSelectedFile({
                      ...selectedFile,
                      caption: e.target.value
                    })}
                    placeholder="Add a caption for this media"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={selectedFile.tags.join(', ')}
                    onChange={(e) => setSelectedFile({
                      ...selectedFile,
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                    })}
                    placeholder="education, children, classroom"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setSelectedFile(null)}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    handleUpdateFile(selectedFile);
                    setSelectedFile(null);
                  }}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MediaLibrary;