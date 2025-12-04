import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  display_order: number;
  is_published: boolean;
}

const AdminHeroSlides = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image_url: "",
    is_published: true,
  });

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin");
      return;
    }
    fetchSlides();
  };

  const fetchSlides = async () => {
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({ title: "Error fetching slides", variant: "destructive" });
    } else {
      setSlides(data || []);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({ title: "", subtitle: "", image_url: "", is_published: true });
    setEditingSlide(null);
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle || "",
      image_url: slide.image_url,
      is_published: slide.is_published,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.image_url) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }

    try {
      if (editingSlide) {
        const { error } = await supabase
          .from("hero_slides")
          .update({
            title: formData.title,
            subtitle: formData.subtitle || null,
            image_url: formData.image_url,
            is_published: formData.is_published,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingSlide.id);

        if (error) throw error;
        toast({ title: "Slide updated successfully" });
      } else {
        const maxOrder = slides.length > 0 ? Math.max(...slides.map(s => s.display_order)) + 1 : 0;
        const { error } = await supabase.from("hero_slides").insert({
          title: formData.title,
          subtitle: formData.subtitle || null,
          image_url: formData.image_url,
          is_published: formData.is_published,
          display_order: maxOrder,
        });

        if (error) throw error;
        toast({ title: "Slide created successfully" });
      }

      setDialogOpen(false);
      resetForm();
      fetchSlides();
    } catch (error) {
      toast({ title: "Failed to save slide", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;

    const { error } = await supabase.from("hero_slides").delete().eq("id", id);

    if (error) {
      toast({ title: "Failed to delete slide", variant: "destructive" });
    } else {
      toast({ title: "Slide deleted successfully" });
      fetchSlides();
    }
  };

  const togglePublished = async (slide: HeroSlide) => {
    const { error } = await supabase
      .from("hero_slides")
      .update({ is_published: !slide.is_published })
      .eq("id", slide.id);

    if (error) {
      toast({ title: "Failed to update slide", variant: "destructive" });
    } else {
      fetchSlides();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Hero Slides Management</h1>
          </div>

          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> Add Slide</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingSlide ? "Edit Slide" : "Add New Slide"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter slide title"
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Enter slide subtitle"
                  />
                </div>
                <ImageUpload
                  value={formData.image_url}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                  folder="hero"
                  label="Slide Image *"
                />
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Published</Label>
                  <Switch
                    id="published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {editingSlide ? "Update Slide" : "Create Slide"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {slides.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No hero slides yet. Add your first slide to get started.
          </div>
        ) : (
          <div className="grid gap-4">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="flex items-center gap-4 p-4 bg-card rounded-lg border"
              >
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                <img
                  src={slide.image_url}
                  alt={slide.title}
                  className="w-32 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{slide.title}</h3>
                  {slide.subtitle && (
                    <p className="text-sm text-muted-foreground">{slide.subtitle}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={slide.is_published}
                    onCheckedChange={() => togglePublished(slide)}
                  />
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(slide)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(slide.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHeroSlides;
