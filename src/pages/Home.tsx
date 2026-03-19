import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ProgramsSection from "@/components/home/ProgramsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import DashboardPreview from "@/components/home/DashboardPreview";
import FeaturesSection from "@/components/home/FeaturesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import TeamSection from "@/components/home/TeamSection";
import NewsCarousel from "@/components/NewsCarousel";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <HowItWorksSection />
        <DashboardPreview />
        <FeaturesSection />
        <TeamSection />
        <TestimonialsSection />

        {/* Latest News */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">News</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mt-4 mb-6">
                Latest <span className="gradient-text">Updates</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Stay updated with the latest happenings at ODeL UniPort
              </p>
            </div>
            <NewsCarousel />
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
