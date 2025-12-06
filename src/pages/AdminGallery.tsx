import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "@/components/ImageUpload";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  url: string;
  thumbnail_url: string | null;
  media_type: string;
  category: string | null;
  is_published: boolean;
  created_at: string;
}

const AdminGallery = () => {
  const navigate = useNavigate();
  const { isAdmin, loading: authLoading } = useAdminAuth();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    category: "general",
    is_published: true,
  });

  const categories = [
    { value: "general", label: "General" },
    { value: "events", label: "Events" },
    { value: "campus", label: "Campus" },
    { value: "graduation", label: "Graduation" },
    { value: "activities", label: "Activities" },
  ];

  useEffect(() => {
    if (isAdmin) {
      fetchGallery();
    }
  }, [isAdmin]);

  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_media")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGallery(data || []);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      toast.error("Failed to fetch gallery items");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      url: "",
      category: "general",
      is_published: true,
    });
    setEditingItem(null);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      url: item.url,
      category: item.category || "general",
      is_published: item.is_published,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.url) {
      toast.error("Please upload an image");
      return;
    }

    try {
      const itemData = {
        title: formData.title,
        description: formData.description || null,
        url: formData.url,
        media_type: "image",
        category: formData.category,
        is_published: formData.is_published,
      };

      if (editingItem) {
        const { error } = await supabase
          .from("gallery_media")
          .update(itemData)
          .eq("id", editingItem.id);

        if (error) throw error;
        toast.success("Gallery item updated successfully");
      } else {
        const { error } = await supabase
          .from("gallery_media")
          .insert([itemData]);

        if (error) throw error;
        toast.success("Gallery item created successfully");
      }

      setDialogOpen(false);
      resetForm();
      fetchGallery();
    } catch (error) {
      console.error("Error saving gallery item:", error);
      toast.error("Failed to save gallery item");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const { error } = await supabase
        .from("gallery_media")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Gallery item deleted successfully");
      fetchGallery();
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      toast.error("Failed to delete gallery item");
    }
  };

  const togglePublished = async (item: GalleryItem) => {
    try {
      const { error } = await supabase
        .from("gallery_media")
        .update({ is_published: !item.is_published })
        .eq("id", item.id);

      if (error) throw error;
      toast.success(item.is_published ? "Item unpublished" : "Item published");
      fetchGallery();
    } catch (error) {
      console.error("Error toggling publish status:", error);
      toast.error("Failed to update item status");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-lg font-bold">Manage Gallery</h1>
              <p className="text-xs text-muted-foreground">Upload and manage gallery images</p>
            </div>
          </div>

          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingItem ? "Edit Image" : "Add New Image"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <ImageUpload
                  value={formData.url}
                  onChange={(url) => setFormData({ ...formData, url: url })}
                  folder="gallery"
                  label="Gallery Image"
                />

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                  />
                  <Label htmlFor="is_published">Publish immediately</Label>
                </div>

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => { setDialogOpen(false); resetForm(); }}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingItem ? "Update" : "Add"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Gallery Items ({gallery.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {gallery.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No gallery items yet. Click "Add Image" to upload one.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.map((item) => (
                  <div key={item.id} className="relative group">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center gap-2">
                      <p className="text-white font-medium text-sm text-center px-2">{item.title}</p>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.is_published
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}>
                        {item.is_published ? "Published" : "Draft"}
                      </span>
                      <div className="flex gap-2 mt-2">
                        <Button variant="secondary" size="icon" onClick={() => togglePublished(item)}>
                          {item.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="secondary" size="icon" onClick={() => handleEdit(item)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminGallery;