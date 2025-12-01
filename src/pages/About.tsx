import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Award, Users } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Eye,
      title: "Our Vision",
      description: "To be a globally recognized centre of excellence in open, distance and e-learning, providing innovative and accessible quality education.",
    },
    {
      icon: Target,
      title: "Our Mission",
      description: "To provide lifelong learning opportunities through quality teaching, research and innovation using cutting-edge technology.",
    },
    {
      icon: Award,
      title: "Quality Education",
      description: "We maintain the highest academic standards while ensuring accessibility and flexibility in our programmes.",
    },
    {
      icon: Users,
      title: "Student-Centered",
      description: "Our approach prioritizes learner needs, providing comprehensive support throughout the educational journey.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">About ODEL UniPort</h1>
              <p className="text-xl opacity-90">
                Leading the way in open, distance and e-learning education in Nigeria
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-6 text-lg">
              <p>
                The Open, Distance and e-Learning Centre (ODEL) at the University of Port Harcourt 
                is committed to providing accessible, flexible, and quality education to learners 
                across Nigeria and beyond. We leverage modern technology and innovative pedagogical 
                approaches to deliver world-class educational programmes.
              </p>
              <p>
                Our centre offers a wide range of programmes from short courses to postgraduate 
                degrees, designed to meet the diverse educational needs of working professionals, 
                traditional students, and lifelong learners.
              </p>
            </div>
          </div>
        </section>

        {/* Vision, Mission, Values */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <Card key={value.title}>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                          <p className="text-muted-foreground">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Goals & Achievements */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Goals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p>Expand access to quality higher education through distance learning</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p>Develop innovative teaching and learning methodologies</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p>Foster research and innovation in open and distance learning</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <p>Build strategic partnerships with local and international institutions</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <p>Provide continuous professional development opportunities</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <p>Maintain high academic standards and quality assurance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Management Team Placeholder */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Our Management Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Led by experienced educators and administrators committed to excellence
              </p>
            </div>
            
            <div className="text-center py-12">
              <p className="text-muted-foreground">Management team information coming soon</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
