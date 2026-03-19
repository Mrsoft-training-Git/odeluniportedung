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
  DialogTrigger } from
"@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from
"@/components/ui/table";
import { ArrowLeft, Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import ImageUpload from "@/components/ImageUpload";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

const AdminNews = () => {
  const navigate = useNavigate();
  const { isAdmin, loading: authLoading } = useAdminAuth();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image_url: "",
    is_published: true
  });

  useEffect(() => {
    if (isAdmin) {
      fetchNews();
    }
  }, [isAdmin]);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase.
      from("news_articles").
      select("*").
      order("created_at", { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Failed to fetch news articles");
    }
  };

  const generateSlug = (title: string) => {
    return title.
    toLowerCase().
    replace(/[^a-z0-9]+/g, "-").
    replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: editingNews ? formData.slug : generateSlug(title)
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image_url: "",
      is_published: true
    });
    setEditingNews(null);
  };

  const handleEdit = (article: NewsArticle) => {
    setEditingNews(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      
      content: article.content,
      image_url: article.image_url || "",
      is_published: article.is_published
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const articleData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        image_url: formData.image_url || null,
        is_published: formData.is_published,
        published_at: formData.is_published ? new Date().toISOString() : null
      };

      if (editingNews) {
        const { error } = await supabase.
        from("news_articles").
        update(articleData).
        eq("id", editingNews.id);

        if (error) throw error;
        toast.success("News article updated successfully");
      } else {
        const { error } = await supabase.
        from("news_articles").
        insert([articleData]);

        if (error) throw error;
        toast.success("News article created successfully");
      }

      setDialogOpen(false);
      resetForm();
      fetchNews();
    } catch (error) {
      console.error("Error saving news:", error);
      toast.error("Failed to save news article");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      const { error } = await supabase.
      from("news_articles").
      delete().
      eq("id", id);

      if (error) throw error;
      toast.success("News article deleted successfully");
      fetchNews();
    } catch (error) {
      console.error("Error deleting news:", error);
      toast.error("Failed to delete news article");
    }
  };

  const togglePublished = async (article: NewsArticle) => {
    try {
      const { error } = await supabase.
      from("news_articles").
      update({
        is_published: !article.is_published,
        published_at: !article.is_published ? new Date().toISOString() : null
      }).
      eq("id", article.id);

      if (error) throw error;
      toast.success(article.is_published ? "Article unpublished" : "Article published");
      fetchNews();
    } catch (error) {
      console.error("Error toggling publish status:", error);
      toast.error("Failed to update article status");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>);

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
              <h1 className="text-lg font-bold">Manage News</h1>
              <p className="text-xs text-muted-foreground">Create and manage news articles</p>
            </div>
          </div>

          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Article
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingNews ? "Edit Article" : "Create New Article"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required />
                  
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required />
                  
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={6}
                    required />
                  
                </div>

                <ImageUpload
                  value={formData.image_url}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                  folder="news"
                  label="Article Image" />
                

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })} />
                  
                  <Label htmlFor="is_published">Publish immediately</Label>
                </div>

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => {setDialogOpen(false);resetForm();}}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingNews ? "Update" : "Create"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>News Articles ({news.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {news.length === 0 ?
            <p className="text-center text-muted-foreground py-8">
                No news articles yet. Click "Add Article" to create one.
              </p> :

            <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {news.map((article) =>
                <TableRow key={article.id}>
                      <TableCell>
                        {article.image_url ?
                    <img src={article.image_url} alt={article.title} className="w-16 h-12 object-cover rounded" /> :

                    <div className="w-16 h-12 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                            No image
                          </div>
                    }
                      </TableCell>
                      <TableCell className="font-medium max-w-xs truncate">{article.title}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    article.is_published ?
                    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"}`
                    }>
                          {article.is_published ? "Published" : "Draft"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {article.published_at ? format(new Date(article.published_at), "MMM d, yyyy") : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => togglePublished(article)} title={article.is_published ? "Unpublish" : "Publish"}>
                            {article.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(article)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id)} className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                )}
                </TableBody>
              </Table>
            }
          </CardContent>
        </Card>
      </main>
    </div>);

};

export default AdminNews;