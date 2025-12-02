import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
}

const NewsCarousel = () => {
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);

  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: "New Academic Session Begins",
      excerpt: "ODEL UniPort welcomes students to the new academic session with enhanced online learning features.",
      content: "The Open, Distance and e-Learning Centre at the University of Port Harcourt is excited to announce the commencement of a new academic session. We have introduced enhanced online learning features including improved video conferencing capabilities, interactive course materials, and a more user-friendly learning management system. Our commitment to providing quality distance education remains stronger than ever.",
      date: "December 1, 2025",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Research Excellence Award",
      excerpt: "ODEL faculty members recognized for outstanding research contributions in distance education.",
      content: "We are proud to announce that several faculty members from the Open, Distance and e-Learning Centre have been recognized with prestigious research excellence awards. Their groundbreaking work in distance education methodology and e-learning technology has contributed significantly to the advancement of accessible education in Nigeria and beyond.",
      date: "November 28, 2025",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "New Partnership Announced",
      excerpt: "ODEL UniPort partners with leading technology companies to enhance digital learning infrastructure.",
      content: "The Open, Distance and e-Learning Centre has announced strategic partnerships with leading technology companies to enhance our digital learning infrastructure. These partnerships will bring cutting-edge learning technologies, improved bandwidth, and advanced digital tools to our students, ensuring they receive world-class distance education.",
      date: "November 25, 2025",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Student Success Stories",
      excerpt: "ODEL graduates share their inspiring journey of balancing work, family, and education.",
      content: "Our recent graduates share inspiring stories of how they successfully balanced their professional careers, family responsibilities, and academic pursuits through ODEL's flexible learning programmes. These success stories demonstrate the transformative power of accessible, quality distance education in changing lives and creating opportunities.",
      date: "November 20, 2025",
      image: "/placeholder.svg"
    }
  ];

  return (
    <>
      <div className="relative px-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {newsArticles.map((article) => (
              <CarouselItem key={article.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card 
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedNews(article)}
                >
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">{article.date}</p>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {article.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>

      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedNews?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{selectedNews?.date}</p>
            <div className="relative h-64 overflow-hidden rounded-lg bg-muted">
              <img 
                src={selectedNews?.image} 
                alt={selectedNews?.title}
                className="w-full h-full object-cover"
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
