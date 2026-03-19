import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

// Default images for news articles
import newsGraduation from "@/assets/news-graduation.jpg";
import newsResearch from "@/assets/news-research.jpg";
import newsPartnership from "@/assets/news-partnership.jpg";
import newsStudents from "@/assets/news-students.jpg";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  published_at: string | null;
  image_url: string | null;
  slug: string;
}

const defaultImages = [newsGraduation, newsResearch, newsPartnership, newsStudents];

interface NewsCarouselProps {
  autoPlayInterval?: number; // in milliseconds
}

const NewsCarousel = ({ autoPlayInterval = 4000 }: NewsCarouselProps) => {
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    fetchNews();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!api || newsArticles.length === 0) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [api, autoPlayInterval, newsArticles.length]);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news_articles")
        .select("id, title, excerpt, content, published_at, image_url, slug")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setNewsArticles(data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (article: NewsArticle, index: number) => {
    if (article.image_url) return article.image_url;
    return defaultImages[index % defaultImages.length];
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Recently";
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch {
      return "Recently";
    }
  };

  if (loading) {
    return (
      <div className="relative px-12">
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
              <div className="h-72 bg-muted animate-pulse rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (newsArticles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No news articles available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative px-12">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {newsArticles.map((article, index) => (
              <CarouselItem key={article.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-card/50 backdrop-blur-sm"
                  onClick={() => setSelectedNews(article)}
                >
                  <div className="relative h-72 md:h-80 overflow-hidden bg-muted">
                    <img
                      src={getImageUrl(article, index)}
                      alt={article.title}
                      className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-xs text-primary font-medium mb-2 uppercase tracking-wider">
                        {formatDate(article.published_at)}
                      </p>
                      <h3 className="text-lg font-bold line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 bg-primary text-primary-foreground hover:bg-primary/90 border-0" />
          <CarouselNext className="right-0 bg-primary text-primary-foreground hover:bg-primary/90 border-0" />
        </Carousel>
      </div>

      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedNews?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-primary font-medium">
              {formatDate(selectedNews?.published_at || null)}
            </p>
            <div className="relative max-h-[65vh] overflow-hidden rounded-lg bg-muted">
              <img
                src={selectedNews?.image_url || defaultImages[0]}
                alt={selectedNews?.title}
                className="w-full h-auto max-h-[65vh] object-contain mx-auto"
              />
            </div>
            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {selectedNews?.content}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewsCarousel;
