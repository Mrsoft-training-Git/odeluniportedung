import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import ImageUpload from '@/components/ImageUpload';
import logoImage from '@/assets/uniport-logo.png';

interface Announcement {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  link_url: string | null;
  link_text: string | null;
  is_active: boolean;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
}

const AdminAnnouncements = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { loading: authLoading } = useAdminAuth();
  
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    link_url: '',
    link_text: '',
    is_active: true,
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error fetching announcements', variant: 'destructive' });
    } else {
      setAnnouncements(data || []);
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      image_url: '',
      link_url: '',
      link_text: '',
      is_active: true,
    });
    setEditingAnnouncement(null);
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      image_url: announcement.image_url || '',
      link_url: announcement.link_url || '',
      link_text: announcement.link_text || '',
      is_active: announcement.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      title: formData.title,
      content: formData.content,
      image_url: formData.image_url || null,
      link_url: formData.link_url || null,
      link_text: formData.link_text || null,
      is_active: formData.is_active,
    };

    if (editingAnnouncement) {
      const { error } = await supabase
        .from('announcements')
        .update(payload)
        .eq('id', editingAnnouncement.id);

      if (error) {
        toast({ title: 'Error updating announcement', variant: 'destructive' });
      } else {
        toast({ title: 'Announcement updated successfully' });
        fetchAnnouncements();
        setIsDialogOpen(false);
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('announcements')
        .insert(payload);

      if (error) {
        toast({ title: 'Error creating announcement', variant: 'destructive' });
      } else {
        toast({ title: 'Announcement created successfully' });
        fetchAnnouncements();
        setIsDialogOpen(false);
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;

    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Error deleting announcement', variant: 'destructive' });
    } else {
      toast({ title: 'Announcement deleted successfully' });
      fetchAnnouncements();
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('announcements')
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (error) {
      toast({ title: 'Error updating status', variant: 'destructive' });
    } else {
      fetchAnnouncements();
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/admin/dashboard')}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <img src={logoImage} alt="ODEL Logo" className="h-10 w-auto" />
            <div>
              <h1 className="text-xl font-bold">Announcement Management</h1>
              <p className="text-sm text-primary-foreground/80">Create and manage popup announcements</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="h-5 w-5" />
              Announcements
            </CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Announcement
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingAnnouncement ? 'Edit Announcement' : 'Create New Announcement'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={5}
                      required
                    />
                  </div>

                  <div>
                    <Label>Announcement Image</Label>
                    <ImageUpload
                      value={formData.image_url}
                      onChange={(url) => setFormData({ ...formData, image_url: url })}
                      folder="announcements"
                    />
                  </div>

                  <div>
                    <Label htmlFor="link_url">Link URL (optional)</Label>
                    <Input
                      id="link_url"
                      type="url"
                      value={formData.link_url}
                      onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="link_text">Link Button Text</Label>
                    <Input
                      id="link_text"
                      value={formData.link_text}
                      onChange={(e) => setFormData({ ...formData, link_text: e.target.value })}
                      placeholder="Learn More"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="is_active">Active (visible to visitors)</Label>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => {
                      setIsDialogOpen(false);
                      resetForm();
                    }}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingAnnouncement ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : announcements.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Megaphone className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No announcements yet. Create your first one!</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {announcements.map((announcement) => (
                    <TableRow key={announcement.id}>
                      <TableCell className="font-medium">{announcement.title}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleActive(announcement.id, announcement.is_active)}
                          className={announcement.is_active ? 'text-green-600' : 'text-muted-foreground'}
                        >
                          {announcement.is_active ? (
                            <><Eye className="h-4 w-4 mr-1" /> Active</>
                          ) : (
                            <><EyeOff className="h-4 w-4 mr-1" /> Inactive</>
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>
                        {new Date(announcement.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(announcement)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(announcement.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminAnnouncements;
