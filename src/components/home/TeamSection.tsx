import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const TeamSection = () => {
  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ["management-team"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("management_team")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-20 md:py-28 relative">
      <div className="absolute inset-0" style={{ background: "var(--gradient-surface)" }} />
      <div className="container relative px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Leadership</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mt-4 mb-6">
            Our <span className="gradient-text">Management Team</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Led by experienced educators and administrators committed to excellence
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center">
                <Skeleton className="h-28 w-28 rounded-full mx-auto mb-4" />
                <Skeleton className="h-5 w-40 mx-auto mb-2" />
                <Skeleton className="h-4 w-32 mx-auto" />
              </div>
            ))}
          </div>
        ) : teamMembers && teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.id} className="glass rounded-2xl p-6 text-center card-hover group">
                {member.image_url ? (
                  <img
                    src={member.image_url}
                    alt={member.full_name}
                    className="h-28 w-28 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-colors"
                  />
                ) : (
                  <div className="h-28 w-28 rounded-full mx-auto mb-4 bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-primary-foreground">
                    {member.full_name.charAt(0)}
                  </div>
                )}
                <h3 className="text-lg font-bold font-display">{member.full_name}</h3>
                <p className="text-primary text-sm font-medium mt-1">{member.position}</p>
                {member.bio && <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{member.bio}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Management team information coming soon</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
