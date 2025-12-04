import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

// Fallback slides if database is empty
import heroLearning from "@/assets/hero-learning.jpg";
import campusExterior from "@/assets/campus-exterior.jpg";
import onlineStudy from "@/assets/online-study.jpg";

const fallbackSlides = [
  {
    id: "1",
    image_url: heroLearning,
    title: "Providing Lifelong Learning",
    subtitle: "Through quality teaching, research and innovation",
  },
  {
    id: "2",
    image_url: campusExterior,
    title: "Empowering Through Education",
    subtitle: "Accessible learning for every aspiration",
  },
  {
    id: "3",
    image_url: onlineStudy,
    title: "Learn Anywhere, Anytime",
    subtitle: "Flexible distance education designed for you",
  },
];

interface Slide {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>(fallbackSlides);

  useEffect(() => {
    const fetchSlides = async () => {
      const { data, error } = await supabase
        .from("hero_slides")
        .select("id, title, subtitle, image_url")
        .eq("is_published", true)
        .order("display_order", { ascending: true });

      if (!error && data && data.length > 0) {
        setSlides(data);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) return null;

  return (
    <div className="relative h-[400px] md:h-[480px] lg:h-[520px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image_url}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <div className="max-w-2xl space-y-6 animate-fade-in">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 pl-1">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="text-lg" asChild>
                    <Link to="/courses">Explore Courses</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary" asChild>
                    <Link to="/courses">Apply Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
