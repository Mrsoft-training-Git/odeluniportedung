import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import NewsCarousel from "@/components/NewsCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, ArrowRight } from "lucide-react";
import { useLmsSettings } from "@/hooks/useLmsSettings";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AnimatedSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Home = () => {
  const { data: lmsSettings } = useLmsSettings();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSlider />

        {/* About Preview Section */}
        <section className="py-14 sm:py-20 md:py-28 bg-background relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/[0.03] rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="container px-4 sm:px-6 relative z-10">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center space-y-5 sm:space-y-7">
                <div className="inline-block">
                  <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-primary/70">About Us</span>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-accent mx-auto mt-2 rounded-full" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                  Welcome to ODeL UniPort
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  The Open, Distance and e-Learning Centre at the University of Port Harcourt 
                  provides accessible, quality education through innovative learning solutions. 
                  We are committed to providing lifelong learning opportunities through quality 
                  teaching, research and innovation.
                </p>
                <Button asChild size="lg" className="text-sm sm:text-base group">
                  <Link to="/about">
                    Learn More About Us
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Our Programmes */}
        <section className="py-14 sm:py-20 md:py-28 bg-muted/30 relative">
          <div className="container px-4 sm:px-6">
            <AnimatedSection>
              <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-14">
                <div className="inline-block">
                  <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-primary/70">Explore</span>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-accent mx-auto mt-2 rounded-full" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Our Programmes</h2>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Explore our diverse range of educational programmes designed to meet your learning needs
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 max-w-4xl mx-auto">
              <AnimatedSection delay={100}>
                <Card className="group relative overflow-hidden border-0 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all duration-500 hover:-translate-y-1 text-center p-4 sm:p-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader className="pb-3 sm:pb-4 relative z-10">
                    <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                      <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-bold">Diploma & Short Courses</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 relative z-10">
                    <p className="text-sm text-muted-foreground mb-5 sm:mb-6 leading-relaxed">
                      Access diploma and short course programmes through our dedicated LMS portal
                    </p>
                    <Button asChild variant="outline" className="w-full text-sm group/btn border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                      <a
                        href={lmsSettings?.diplomaShortCourses || "https://lms.odel.uniport.edu.ng/#/home"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Go to Portal
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={250}>
                <Card className="group relative overflow-hidden border-0 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all duration-500 hover:-translate-y-1 text-center p-4 sm:p-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader className="pb-3 sm:pb-4 relative z-10">
                    <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                      <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-bold">Undergraduate & Postgraduate</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 relative z-10">
                    <p className="text-sm text-muted-foreground mb-5 sm:mb-6 leading-relaxed">
                      Access degree programmes through our main learning management system
                    </p>
                    <Button asChild variant="outline" className="w-full text-sm group/btn border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                      <a
                        href={lmsSettings?.undergraduatePostgraduate || "https://odeluniport.com/"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Go to Portal
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Latest News */}
        <section className="py-14 sm:py-20 md:py-28 bg-background relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="container px-4 sm:px-6">
            <AnimatedSection>
              <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-14">
                <div className="inline-block">
                  <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-primary/70">Stay Informed</span>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-accent mx-auto mt-2 rounded-full" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Latest News</h2>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Stay updated with the latest happenings at ODeL UniPort
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <NewsCarousel />
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
