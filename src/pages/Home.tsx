import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import NewsCarousel from "@/components/NewsCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Award } from "lucide-react";
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
        <section className="py-20 bg-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Welcome to ODEL UniPort</h2>
              <p className="text-lg text-muted-foreground">
                The Open, Distance and e-Learning Centre at the University of Port Harcourt 
                provides accessible, quality education through innovative learning solutions. 
                We are committed to providing lifelong learning opportunities through quality 
                teaching, research and innovation.
              </p>
              <Button asChild size="lg">
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Course Categories */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Our Programmes</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our diverse range of educational programmes designed to meet your learning needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courseCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card key={category.title} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <CardTitle>{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {category.description}
                      </p>
                      <Button asChild variant="outline" size="sm" className="w-full">
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
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Diploma & Short Courses</h3>
                <p className="mb-6">
                  Access diploma and short course programmes through our dedicated LMS portal
                </p>
                <Button 
                  variant="secondary" 
                  size="lg" 
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

              <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Undergraduate & Postgraduate</h3>
                <p className="mb-6">
                  Access degree programmes through our main learning management system
                </p>
                <Button 
                  variant="secondary" 
                  size="lg"
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
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Latest News</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
