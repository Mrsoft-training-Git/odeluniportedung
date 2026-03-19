import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute inset-0 noise" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/20 blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-[120px] animate-float-delayed" />

      <div className="container relative z-10 px-4 md:px-6 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
              Now accepting applications for 2025/2026
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-display leading-[1.05] tracking-tight animate-slide-up">
              <span className="gradient-text-hero">Learn. Build.</span>
              <br />
              <span className="text-foreground">Get Certified.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed" style={{ animationDelay: "0.2s" }}>
              World-class distance learning platform by the University of Port Harcourt. 
              Discover programs, track progress, and earn recognized certifications — all online.
            </p>

            <div className="flex flex-wrap gap-4" style={{ animationDelay: "0.4s" }}>
              <Button size="lg" className="h-12 px-8 text-base font-semibold bg-primary hover:bg-primary-hover glow-primary" asChild>
                <Link to="/courses">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold glass border-border/50 hover:bg-secondary/50" asChild>
                <Link to="/#programs">
                  <Play className="mr-2 h-4 w-4" />
                  Explore Programs
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              {[
                { value: "5,000+", label: "Students" },
                { value: "50+", label: "Programs" },
                { value: "95%", label: "Completion" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold font-display text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dashboard Mockup */}
          <div className="hidden lg:block relative">
            <div className="relative animate-float">
              {/* Main dashboard card */}
              <div className="glass rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-accent/60" />
                    <div className="w-3 h-3 rounded-full bg-primary/60" />
                  </div>
                  <div className="flex-1 h-6 rounded-md bg-secondary/50" />
                </div>

                {/* Progress bars */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-foreground font-medium">Data Science</span>
                      <span className="text-accent">78%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary">
                      <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-primary to-accent" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-foreground font-medium">Business Admin</span>
                      <span className="text-accent">62%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary">
                      <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-primary to-accent" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-foreground font-medium">Digital Marketing</span>
                      <span className="text-accent">91%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary">
                      <div className="h-full w-[91%] rounded-full bg-gradient-to-r from-primary to-accent" />
                    </div>
                  </div>
                </div>

                {/* Mini cards */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="rounded-xl bg-secondary/50 p-4">
                    <div className="text-2xl font-bold font-display text-foreground">12</div>
                    <div className="text-xs text-muted-foreground">Modules Done</div>
                  </div>
                  <div className="rounded-xl bg-secondary/50 p-4">
                    <div className="text-2xl font-bold font-display text-accent">3</div>
                    <div className="text-xs text-muted-foreground">Exams Pending</div>
                  </div>
                </div>
              </div>

              {/* Floating notification */}
              <div className="absolute -bottom-4 -left-8 glass rounded-xl p-4 shadow-lg animate-float-delayed max-w-[220px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent text-lg">🎓</span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">Certificate Earned!</div>
                    <div className="text-[10px] text-muted-foreground">Data Science Diploma</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
