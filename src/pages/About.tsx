import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Award, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import TeamMemberCard from "@/components/TeamMemberCard";
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
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-10 sm:py-14 md:py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <div className="container px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">About ODEL UniPort</h1>
              <p className="text-base sm:text-lg md:text-xl opacity-90">
                Leading the way in open, distance and e-learning education in Nigeria
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-10 sm:py-14 md:py-20 bg-background">
          <div className="container px-4 sm:px-6">
            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg">
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
        <section className="py-10 sm:py-14 md:py-20 bg-muted/30">
          <div className="container px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {values.map(value => {
                const Icon = value.icon;
                return (
                  <Card key={value.title}>
                    <CardContent className="pt-4 sm:pt-6">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">{value.title}</h3>
                          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">{value.description}</p>
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
        <section className="py-10 sm:py-14 md:py-20 bg-background">
          <div className="container px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center">Our Goals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                    <p className="text-sm sm:text-base">Expand access to quality higher education through distance learning</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                    <p className="text-sm sm:text-base">Develop innovative teaching and learning methodologies</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                    <p className="text-sm sm:text-base">Foster research and innovation in open and distance learning</p>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-secondary mt-1.5 sm:mt-2 flex-shrink-0" />
                    <p className="text-sm sm:text-base">Build strategic partnerships with local and international institutions</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-secondary mt-1.5 sm:mt-2 flex-shrink-0" />
                    <p className="text-sm sm:text-base">Provide continuous professional development opportunities</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-secondary mt-1.5 sm:mt-2 flex-shrink-0" />
                    <p className="text-sm sm:text-base">Maintain high academic standards and quality assurance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Management Team */}
        <section className="py-10 sm:py-14 md:py-20 bg-muted/30">
          <div className="container px-4 sm:px-6">
            <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Our Management Team</h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Led by experienced educators and administrators committed to excellence
              </p>
            </div>
            
            {isLoadingTeam ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-card rounded-xl border border-border/60 p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Skeleton className="h-28 w-28 rounded-xl mx-auto sm:mx-0 flex-shrink-0" />
                      <div className="flex-1 space-y-3 text-center sm:text-left">
                        <Skeleton className="h-5 w-40 mx-auto sm:mx-0" />
                        <Skeleton className="h-4 w-28 mx-auto sm:mx-0" />
                        <Skeleton className="h-px w-10 mx-auto sm:mx-0" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : teamMembers && teamMembers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                {teamMembers.map(member => (
                  <TeamMemberCard
                    key={member.id}
                    full_name={member.full_name}
                    position={member.position}
                    bio={member.bio}
                    image_url={member.image_url}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <p className="text-muted-foreground text-sm sm:text-base">Management team information coming soon</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;