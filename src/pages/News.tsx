import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const News = () => {
  // Placeholder news
  const placeholderNews = [
    {
      id: 1,
      title: "New Academic Session Begins",
      excerpt: "ODEL UniPort welcomes students to the new academic session with enhanced online learning features.",
      date: "December 1, 2025",
    },
    {
      id: 2,
      title: "Research Excellence Award",
      excerpt: "ODEL faculty members recognized for outstanding research contributions in distance education.",
      date: "November 28, 2025",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">News & Announcements</h1>
              <p className="text-xl opacity-90">
                Stay updated with the latest news, events and announcements from ODEL UniPort
              </p>
            </div>
          </div>
        </section>

        {/* News List */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {placeholderNews.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{article.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{article.date}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{article.excerpt}</p>
                    <Button variant="outline" size="sm">Read More</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default News;
