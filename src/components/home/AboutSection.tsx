import { Eye, Target, Award, Users } from "lucide-react";

const AboutSection = () => {
  const values = [
    { icon: Eye, title: "Our Vision", description: "To be a globally recognized centre of excellence in open, distance and e-learning, providing innovative and accessible quality education." },
    { icon: Target, title: "Our Mission", description: "To provide lifelong learning opportunities through quality teaching, research and innovation using cutting-edge technology." },
    { icon: Award, title: "Quality Education", description: "We maintain the highest academic standards while ensuring accessibility and flexibility in our programmes." },
    { icon: Users, title: "Student-Centered", description: "Our approach prioritizes learner needs, providing comprehensive support throughout the educational journey." },
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">About Us</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mt-4 mb-6">
            Transforming Education <span className="gradient-text">Digitally</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The Open, Distance and e-Learning Centre (ODeL) at the University of Port Harcourt 
            is committed to providing accessible, flexible, and quality education to learners 
            across Nigeria and beyond using modern technology and innovative approaches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="glass rounded-2xl p-6 card-hover group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-display mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
