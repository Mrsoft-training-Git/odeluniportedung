import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
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
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location.hash]);

  const { data: teamMembers, isLoading: isLoadingTeam } = useQuery({
    queryKey: ["management-team"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("management_team")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const aboutValues = [
    { icon: Eye, title: "Our Vision", description: "To be a globally recognized centre of excellence in open, distance and e-learning, providing innovative and accessible quality education." },
    { icon: Target, title: "Our Mission", description: "To provide lifelong learning opportunities through quality teaching, research and innovation using cutting-edge technology." },
    { icon: Award, title: "Quality Education", description: "We maintain the highest academic standards while ensuring accessibility and flexibility in our programmes." },
    { icon: Users, title: "Student-Centered", description: "Our approach prioritizes learner needs, providing comprehensive support throughout the educational journey." },
  ];

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

        {/* About Section */}
        <section id="about" className="py-10 sm:py-14 md:py-20 bg-background scroll-mt-20">
          <div className="container px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">About ODEL UniPort</h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                The Open, Distance and e-Learning Centre (ODeL) at the University of Port Harcourt 
                is committed to providing accessible, flexible, and quality education to learners 
                across Nigeria and beyond. We leverage modern technology and innovative pedagogical 
                approaches to deliver world-class educational programmes.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                Our centre offers a wide range of programmes from short courses to postgraduate 
                degrees, designed to meet the diverse educational needs of working professionals, 
                traditional students, and lifelong learners.
              </p>
            </div>
          </div>
        </section>

        {/* Vision, Mission, Values */}
        <section className="py-10 sm:py-14 md:py-20 bg-muted/30">
          <div className="container px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {aboutValues.map((value) => {
                const Icon = value.icon;
                return (
                  <Card key={value.title}>
                    <CardContent className="pt-4 sm:pt-6">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">{value.title}</h3>
                          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Management Team */}
        <section className="py-10 sm:py-14 md:py-20 bg-background">
          <div className="container px-4 sm:px-6">
            <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Our Management Team</h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Led by experienced educators and administrators committed to excellence
              </p>
            </div>
            
            {isLoadingTeam ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="pt-4 sm:pt-6 text-center">
                      <Skeleton className="h-24 w-24 sm:h-32 sm:w-32 rounded-full mx-auto mb-3 sm:mb-4" />
                      <Skeleton className="h-5 sm:h-6 w-32 sm:w-40 mx-auto mb-2" />
                      <Skeleton className="h-4 w-24 sm:w-32 mx-auto" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : teamMembers && teamMembers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {teamMembers.map((member) => (
                  <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="pt-4 sm:pt-6 text-center">
                      {member.image_url ? (
                        <img
                          src={member.image_url}
                          alt={member.full_name}
                          className="h-24 w-24 sm:h-32 sm:w-32 rounded-full mx-auto mb-3 sm:mb-4 object-cover border-4 border-primary/20"
                        />
                      ) : (
                        <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl sm:text-4xl font-bold text-primary-foreground">
                          {member.full_name.charAt(0)}
                        </div>
                      )}
                      <h3 className="text-base sm:text-lg md:text-xl font-bold">{member.full_name}</h3>
                      <p className="text-primary font-medium mb-1 sm:mb-2 text-sm sm:text-base">{member.position}</p>
                      {member.bio && <p className="text-xs sm:text-sm text-muted-foreground">{member.bio}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <p className="text-muted-foreground text-sm sm:text-base">Management team information coming soon</p>
              </div>
            )}
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
                <Button variant="secondary" size="default" className="text-sm sm:text-base" asChild>
                  <a href={lmsSettings?.diplomaShortCourses || "https://lms.odel.uniport.edu.ng/#/home"} target="_blank" rel="noopener noreferrer">
                    Go to Portal
                  </a>
                </Button>
              </div>

              <div className="text-center p-5 sm:p-6 md:p-8 bg-white/10 backdrop-blur-sm rounded-lg">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Undergraduate & Postgraduate</h3>
                <p className="text-sm sm:text-base mb-4 sm:mb-6 opacity-90">
                  Access degree programmes through our main learning management system
                </p>
                <Button variant="secondary" size="default" className="text-sm sm:text-base" asChild>
                  <a href={lmsSettings?.undergraduatePostgraduate || "https://odeluniport.com/"} target="_blank" rel="noopener noreferrer">
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
