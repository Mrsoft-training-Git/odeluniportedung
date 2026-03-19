import { Mail, Linkedin } from "lucide-react";

interface TeamMemberCardProps {
  full_name: string;
  position: string;
  bio: string | null;
  image_url: string | null;
}

const TeamMemberCard = ({ full_name, position, bio, image_url }: TeamMemberCardProps) => {
  return (
    <div className="group bg-card rounded-xl border border-border/60 shadow-sm hover:shadow-[var(--shadow-elevated)] hover:scale-[1.02] hover:border-primary/20 transition-all duration-300 ease-out overflow-hidden">
      {/* Desktop: Horizontal | Mobile: Vertical */}
      <div className="flex flex-col sm:flex-row">
        {/* Profile Image */}
        <div className="flex justify-center sm:justify-start p-6 pb-2 sm:p-6 sm:pr-0">
          {image_url ? (
            <img
              src={image_url}
              alt={full_name}
              className="h-28 w-28 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-xl object-cover shadow-md ring-1 ring-border/40 group-hover:ring-primary/30 transition-all duration-300"
            />
          ) : (
            <div className="h-28 w-28 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-3xl sm:text-2xl md:text-3xl font-bold text-primary-foreground shadow-md">
              {full_name.charAt(0)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 pt-3 sm:pt-6 text-center sm:text-left flex flex-col justify-center">
          <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight">
            {full_name}
          </h3>
          <p className="text-sm md:text-base font-medium text-primary mt-1">
            {position}
          </p>

          {/* Divider */}
          <div className="w-10 h-px bg-border mx-auto sm:mx-0 my-3" />

          {bio && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {bio}
            </p>
          )}

          {/* Social Icons - subtle, appear more on hover */}
          <div className="flex gap-2 mt-3 justify-center sm:justify-start">
            <span className="h-8 w-8 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground/60 group-hover:text-primary group-hover:bg-primary/10 transition-colors duration-300 cursor-pointer">
              <Mail className="h-3.5 w-3.5" />
            </span>
            <span className="h-8 w-8 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground/60 group-hover:text-primary group-hover:bg-primary/10 transition-colors duration-300 cursor-pointer">
              <Linkedin className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
