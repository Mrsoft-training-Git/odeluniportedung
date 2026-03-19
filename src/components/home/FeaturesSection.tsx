import { BookOpen, FileCheck, Monitor, BarChart3, MessageSquare, Route } from "lucide-react";

const features = [
  { icon: Route, title: "Structured Learning Paths", description: "Follow clear, organized curricula designed by experts." },
  { icon: FileCheck, title: "Assignment Submission", description: "Submit assignments online and get graded feedback." },
  { icon: Monitor, title: "Online Examinations", description: "Take proctored exams securely from anywhere." },
  { icon: BarChart3, title: "Progress Tracking", description: "Monitor your performance with real-time analytics." },
  { icon: MessageSquare, title: "Instructor Interaction", description: "Engage with lecturers through forums and messaging." },
  { icon: BookOpen, title: "Rich Course Materials", description: "Access videos, documents, and interactive content." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="absolute inset-0" style={{ background: "var(--gradient-surface)" }} />
      <div className="container relative px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Features</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mt-4 mb-6">
            Everything You Need to <span className="gradient-text">Succeed</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A comprehensive platform with all the tools for effective online learning
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="glass rounded-2xl p-6 card-hover group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold font-display mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
