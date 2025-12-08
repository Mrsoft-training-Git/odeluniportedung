import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
interface Slide {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
}
const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchSlides = async () => {
      setIsLoading(true);
      const {
        data,
        error
      } = await supabase.from("hero_slides").select("id, title, subtitle, image_url").eq("is_published", true).order("display_order", {
        ascending: true
      });
      if (!error && data) {
        setSlides(data);
      }
      setIsLoading(false);
    };
    fetchSlides();
  }, []);
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setPreviousSlide(prev => prev);
      setCurrentSlide(prev => {
        setPreviousSlide(prev);
        return (prev + 1) % slides.length;
      });
      setTimeout(() => setIsTransitioning(false), 800);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);
  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setPreviousSlide(currentSlide);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };
  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };
  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };
  if (isLoading) {
    return <div className="relative h-[400px] md:h-[480px] lg:h-[520px] bg-muted flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>;
  }
  if (slides.length === 0) {
    return <div className="relative h-[400px] md:h-[480px] lg:h-[520px] bg-gradient-to-r from-primary/80 to-primary flex items-center justify-center">
        <div className="text-center text-primary-foreground">
          <h2 className="text-2xl font-bold">Welcome to ODEL UniPort</h2>
          <p className="text-lg mt-2">Add slides from the admin dashboard</p>
        </div>
      </div>;
  }
  return <div className="relative h-[400px] md:h-[480px] lg:h-[520px] overflow-hidden bg-black">
      {slides.map((slide, index) => {
      const isActive = index === currentSlide;
      const isPrevious = index === previousSlide;
      return <div key={slide.id} className={`absolute inset-0 transition-all duration-[800ms] ease-out ${isActive ? "opacity-100 scale-100 z-10" : isPrevious ? "opacity-0 scale-105 z-0" : "opacity-0 scale-100 z-0"}`}>
            <img src={slide.image_url} alt={slide.title} className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-linear ${isActive ? "scale-110" : "scale-100"}`} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            
            <div className="absolute inset-0 flex items-center">
              <div className="container">
                <div className="max-w-2xl space-y-6">
                  <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight transition-all duration-700 ease-out ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{
                transitionDelay: isActive ? "200ms" : "0ms"
              }}>
                    {slide.title}
                  </h1>
                  <p className={`text-xl md:text-2xl text-white/90 transition-all duration-700 ease-out ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{
                transitionDelay: isActive ? "400ms" : "0ms"
              }}>
                    {slide.subtitle}
                  </p>
                  <div className={`flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-700 ease-out ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{
                transitionDelay: isActive ? "600ms" : "0ms"
              }}>
                    <Button size="lg" className="text-lg" asChild>
                      <Link to="/courses">Explore Courses</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary" asChild>
                      
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>;
    })}

      {/* Navigation Buttons */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-110" disabled={isTransitioning}>
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-110" disabled={isTransitioning}>
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => <button key={index} onClick={() => goToSlide(index)} className={`h-2 rounded-full transition-all duration-500 ease-out ${index === currentSlide ? "w-10 bg-white shadow-lg shadow-white/30" : "w-2 bg-white/50 hover:bg-white/70"}`} />)}
      </div>
    </div>;
};
export default HeroSlider;