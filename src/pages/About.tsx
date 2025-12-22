import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Award, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
interface TeamMember {
  id: string;
  full_name: string;
  position: string;
  bio: string | null;
  image_url: string | null;
}
const About = () => {
  const {
    data: teamMembers,
    isLoading: isLoadingTeam
  } = useQuery({
    queryKey: ["management-team"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("management_team").select("*").eq("is_published", true).order("display_order", {
        ascending: true
      });
      if (error) throw error;
      return data as TeamMember[];
    }
  });
  const values = [{
    icon: Eye,
    title: "Our Vision",
    description: "To be a globally recognized centre of excellence in open, distance and e-learning, providing innovative and accessible quality education."
  }, {
    icon: Target,
    title: "Our Mission",
    description: "To provide lifelong learning opportunities through quality teaching, research and innovation using cutting-edge technology."
  }, {
    icon: Award,
    title: "Quality Education",
    description: "We maintain the highest academic standards while ensuring accessibility and flexibility in our programmes."
  }, {
    icon: Users,
    title: "Student-Centered",
    description: "Our approach prioritizes learner needs, providing comprehensive support throughout the educational journey."
  }];
  return <div className="min-h-screen flex flex-col">
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
              <p>The Open, Distance and e-Learning Centre (ODeL) at the University of Port Harcourt is committed to providing accessible, flexible, and quality education to learners across Nigeria and beyond. We leverage modern technology and innovative pedagogical approaches to deliver world-class educational programmes.</p>
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
              {values.map(value => {
              const Icon = value.icon;
              return <Card key={value.title}>
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
                  </Card>;
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

        {/* Management Team */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Our Management Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Led by experienced educators and administrators committed to excellence
              </p>
            </div>
            
            {isLoadingTeam ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => <Card key={i}>
                    <CardContent className="pt-6 text-center">
                      <Skeleton className="h-32 w-32 rounded-full mx-auto mb-4" />
                      <Skeleton className="h-6 w-40 mx-auto mb-2" />
                      <Skeleton className="h-4 w-32 mx-auto" />
                    </CardContent>
                  </Card>)}
              </div> : teamMembers && teamMembers.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map(member => <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6 text-center">
                      {member.image_url ? <img src={member.image_url} alt={member.full_name} className="h-32 w-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20" /> : <div className="h-32 w-32 rounded-full mx-auto mb-4 bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold text-primary-foreground">
                          {member.full_name.charAt(0)}
                        </div>}
                      <h3 className="text-xl font-bold">{member.full_name}</h3>
                      <p className="text-primary font-medium mb-2">{member.position}</p>
                      {member.bio && <p className="text-sm text-muted-foreground">{member.bio}</p>}
                    </CardContent>
                  </Card>)}
              </div> : <div className="text-center py-12">
                <p className="text-muted-foreground">Management team information coming soon</p>
              </div>}
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default About;