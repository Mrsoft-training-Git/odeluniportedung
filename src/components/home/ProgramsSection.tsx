import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Award, ArrowRight, Clock, BarChart3 } from "lucide-react";

const ProgramsSection = () => {
  const programs = [
    {
      title: "Certificate & Diploma",
      description: "Professional certificate and diploma programmes designed for career advancement.",
      icon: BookOpen,
      duration: "6-12 months",
      level: "Beginner",
      link: "/courses?category=certificate_diploma",
      accent: "from-accent to-primary",
    },
    {
      title: "Undergraduate",
      description: "Full bachelor's degree programmes with flexible online learning paths.",
      icon: GraduationCap,
      duration: "3-4 years",
      level: "Intermediate",
      link: "/courses?category=undergraduate",
      accent: "from-primary to-primary-glow",
    },
    {
      title: "Postgraduate",
      description: "Master's and doctoral programmes for advanced research and specialization.",
      icon: Award,
      duration: "1-3 years",
      level: "Advanced",
      link: "/courses?category=postgraduate",
      accent: "from-primary-glow to-accent",
    },
  ];

  return (
    <section id="programs" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="container relative px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Programs</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mt-4 mb-6">
            Choose Your <span className="gradient-text">Learning Path</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our diverse range of educational programmes designed to meet your learning needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {programs.map((program, i) => {
            const Icon = program.icon;
            return (
              <div
                key={program.title}
                className="glass rounded-2xl p-6 card-hover group relative overflow-hidden"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${program.accent}`} />

                <div className="relative z-10 space-y-4">
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${program.accent} flex items-center justify-center shadow-lg`}>
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>

                  <h3 className="text-xl font-bold font-display">{program.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{program.description}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {program.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart3 className="h-3.5 w-3.5" />
                      {program.level}
                    </span>
                  </div>

                  <Button variant="ghost" size="sm" className="group/btn px-0 text-primary hover:text-primary-hover" asChild>
                    <Link to={program.link}>
                      Explore Courses
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
