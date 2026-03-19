import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute inset-0 dot-grid opacity-20" />

      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-[120px]" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-accent" />
            Applications open for 2025/2026 session
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display leading-tight">
            Ready to Transform
            <br />
            <span className="gradient-text">Your Future?</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Join thousands of students who are building their careers through our world-class 
            distance learning platform. Start your journey today.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="h-14 px-10 text-base font-semibold bg-primary hover:bg-primary-hover glow-primary" asChild>
              <Link to="/courses">
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-base font-semibold glass border-border/50" asChild>
              <Link to="/contact">Talk to Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
