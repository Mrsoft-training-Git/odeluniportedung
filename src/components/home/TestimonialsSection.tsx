import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Adaeze Okafor",
    role: "Data Science Graduate",
    text: "The ODeL platform transformed my career. I could study while working full-time, and the dashboard made tracking my progress effortless.",
    rating: 5,
  },
  {
    name: "Chukwuemeka Nwosu",
    role: "Business Admin Student",
    text: "The quality of instruction rivals any on-campus program. The online exams and assignment system are seamless and professional.",
    rating: 5,
  },
  {
    name: "Blessing Eze",
    role: "Certificate in EdTech",
    text: "I earned my certificate in just 6 months. The support from instructors and the learning materials were exceptional.",
    rating: 5,
  },
];

const stats = [
  { value: "5,000+", label: "Active Students" },
  { value: "50+", label: "Programs Available" },
  { value: "95%", label: "Completion Rate" },
  { value: "98%", label: "Satisfaction Rate" },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mt-4 mb-6">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from students who transformed their careers through our platform
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-6 text-center card-hover">
              <div className="text-3xl md:text-4xl font-bold font-display gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="glass rounded-2xl p-6 card-hover relative"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
