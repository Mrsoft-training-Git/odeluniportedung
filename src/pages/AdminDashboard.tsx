import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Image, FileText, LogOut, Settings, Layers, UserCircle } from "lucide-react";
import { toast } from "sonner";
import uniportLogo from "@/assets/uniport-logo-crest.png";

interface Stats {
  courses: number;
  gallery: number;
  news: number;
  contacts: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    courses: 0,
    gallery: 0,
    news: 0,
    contacts: 0,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    // Set up realtime subscriptions for stats
    const coursesChannel = supabase
      .channel("courses-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "courses" }, () => {
        fetchStats();
      })
      .subscribe();

    const galleryChannel = supabase
      .channel("gallery-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "gallery_media" }, () => {
        fetchStats();
      })
      .subscribe();

    const newsChannel = supabase
      .channel("news-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "news_articles" }, () => {
        fetchStats();
      })
      .subscribe();

    const contactsChannel = supabase
      .channel("contacts-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "contact_submissions" }, () => {
        fetchStats();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(coursesChannel);
      supabase.removeChannel(galleryChannel);
      supabase.removeChannel(newsChannel);
      supabase.removeChannel(contactsChannel);
    };
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/admin");
      return;
    }

    await fetchStats();
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      const [coursesRes, galleryRes, newsRes, contactsRes] = await Promise.all([
        supabase.from("courses").select("id", { count: "exact", head: true }),
        supabase.from("gallery_media").select("id", { count: "exact", head: true }),
        supabase.from("news_articles").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
      ]);

      setStats({
        courses: coursesRes.count || 0,
        gallery: galleryRes.count || 0,
        news: newsRes.count || 0,
        contacts: contactsRes.count || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const quickStats = [
    { title: "Total Courses", value: stats.courses.toString(), icon: BookOpen },
    { title: "Gallery Items", value: stats.gallery.toString(), icon: Image },
    { title: "News Articles", value: stats.news.toString(), icon: FileText },
    { title: "Contact Messages", value: stats.contacts.toString(), icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img src={uniportLogo} alt="UNIPORT Logo" className="h-10 w-10 object-contain" />
            <div>
              <h1 className="text-lg font-bold">ODEL Admin</h1>
              <p className="text-xs text-muted-foreground">Content Management System</p>
            </div>
          </Link>
          <Button onClick={handleLogout} variant="ghost" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
          <p className="text-muted-foreground">Welcome to the ODEL Admin Dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/admin/courses")}>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Manage Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Add, edit, or remove courses and programmes
              </p>
              <Button className="w-full">Go to Courses</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/admin/gallery")}>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <Image className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Manage Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Upload and organize gallery images and videos
              </p>
              <Button className="w-full">Go to Gallery</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/admin/news")}>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Manage News</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Create and publish news articles and announcements
              </p>
              <Button className="w-full">Go to News</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/admin/hero-slides")}>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Hero Slides</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Manage homepage hero slider images and content
              </p>
              <Button className="w-full">Go to Hero Slides</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/admin/team")}>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <UserCircle className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Management Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Manage team members displayed on the About page
              </p>
              <Button className="w-full">Go to Team</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/admin/settings")}>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Site Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Configure LMS portal links and site-wide settings
              </p>
              <Button className="w-full">Go to Settings</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;