import { FileText, UserCheck, LayoutDashboard, Award } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Apply for a Program",
    description: "Browse our catalog and submit your application online in minutes.",
  },
  {
    icon: UserCheck,
    title: "Get Admitted",
    description: "Receive your admission letter and access credentials via email.",
  },
  {
    icon: LayoutDashboard,
    title: "Access Your Dashboard",
    description: "Log into your personalized learning dashboard with all your courses.",
  },
  {
    icon: Award,
    title: "Learn & Get Certified",
    description: "Complete modules, submit assignments, take exams, and earn your certificate.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-surface)" }} />
      <div className="container relative px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">How It Works</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mt-4 mb-6">
            Start Learning in <span className="gradient-text">4 Steps</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From application to certification — our streamlined process gets you learning fast
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative group">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+32px)] w-[calc(100%-32px)] h-px bg-gradient-to-r from-border to-transparent" />
                )}

                <div className="text-center space-y-4">
                  <div className="relative inline-flex">
                    <div className="h-20 w-20 rounded-2xl glass flex items-center justify-center group-hover:glow-primary transition-all duration-300">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-display">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
