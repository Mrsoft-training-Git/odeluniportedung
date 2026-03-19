import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import NewsCarousel from "@/components/NewsCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Award, Target, Eye, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLmsSettings } from "@/hooks/useLmsSettings";

const Home = () => {
  const { data: lmsSettings } = useLmsSettings();

  const courseCategories = [
    {
      title: "Certificate/Diploma",
      description: "Professional certificate and diploma programmes",
      icon: BookOpen,
      link: "/courses?category=certificate_diploma",
    },
    {
      title: "Undergraduate",
      description: "Bachelor's degree programmes",
      icon: GraduationCap,
      link: "/courses?category=undergraduate",
    },
    {
      title: "Postgraduate",
      description: "Master's and doctoral programmes",
      icon: Award,
      link: "/courses?category=postgraduate",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSlider />

        {/* About Preview Section */}
        <section className="py-10 sm:py-14 md:py-20 bg-background">
          <div className="container px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Welcome to ODEL UniPort</h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                The Open, Distance and e-Learning Centre at the University of Port Harcourt 
                provides accessible, quality education through innovative learning solutions. 
                We are committed to providing lifelong learning opportunities through quality 
                teaching, research and innovation.
              </p>
              <Button asChild size="default" className="text-sm sm:text-base">
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Course Categories */}
        <section className="py-10 sm:py-14 md:py-20 bg-muted/30">
          <div className="container px-4 sm:px-6">
            <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Our Programmes</h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our diverse range of educational programmes designed to meet your learning needs
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {courseCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card key={category.title} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2 sm:pb-4">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3 sm:mb-4">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-base sm:text-lg">{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                        {category.description}
                      </p>
                      <Button asChild variant="outline" size="sm" className="w-full text-xs sm:text-sm">
                        <Link to={category.link}>Explore Courses</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="py-10 sm:py-14 md:py-20 bg-primary text-primary-foreground">
          <div className="container px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
              <div className="text-center p-5 sm:p-6 md:p-8 bg-white/10 backdrop-blur-sm rounded-lg">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Diploma & Short Courses</h3>
                <p className="text-sm sm:text-base mb-4 sm:mb-6 opacity-90">
                  Access diploma and short course programmes through our dedicated LMS portal
                </p>
                <Button 
                  variant="secondary" 
                  size="default"
                  className="text-sm sm:text-base"
                  asChild
                >
                  <a 
                    href={lmsSettings?.diplomaShortCourses || "https://lms.odel.uniport.edu.ng/#/home"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Go to Portal
                  </a>
                </Button>
              </div>

              <div className="text-center p-5 sm:p-6 md:p-8 bg-white/10 backdrop-blur-sm rounded-lg">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Undergraduate & Postgraduate</h3>
                <p className="text-sm sm:text-base mb-4 sm:mb-6 opacity-90">
                  Access degree programmes through our main learning management system
                </p>
                <Button 
                  variant="secondary" 
                  size="default"
                  className="text-sm sm:text-base"
                  asChild
                >
                  <a 
                    href={lmsSettings?.undergraduatePostgraduate || "https://odeluniport.com/"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Go to Portal
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Latest News */}
        <section className="py-10 sm:py-14 md:py-20 bg-background">
          <div className="container px-4 sm:px-6">
            <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Latest News</h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Stay updated with the latest happenings at ODEL UniPort
              </p>
            </div>

            <NewsCarousel />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
