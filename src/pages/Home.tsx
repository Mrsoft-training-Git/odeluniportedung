import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Users, Award } from "lucide-react";

const Home = () => {
  const courseCategories = [
    {
      title: "Short Courses",
      description: "3-month certificate programmes for skill development",
      icon: BookOpen,
      link: "/courses?category=short_course",
    },
    {
      title: "Diploma Programmes",
      description: "Professional diploma certifications",
      icon: GraduationCap,
      link: "/courses?category=diploma",
    },
    {
      title: "Undergraduate",
      description: "Bachelor's degree programmes",
      icon: Users,
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <h3 className="text-2xl font-bold mb-4">Certificate/Diploma Programmes</h3>
                <p className="mb-6">
                  Fast-track your career with our professional certificate and diploma programmes
                </p>
                <Button variant="secondary" size="lg">
                  View Programmes
                </Button>
              </div>

              <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Student Portal</h3>
                <p className="mb-6">
                  Access your learning management system and course materials
                </p>
                <Button variant="secondary" size="lg">
                  Go to Portal
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Latest News Preview */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Latest News & Events</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stay updated with the latest happenings at ODEL UniPort
              </p>
            </div>

            <div className="text-center">
              <Button asChild size="lg">
                <Link to="/news">View All News</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
