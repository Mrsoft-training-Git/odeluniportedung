import { Mail, Linkedin } from "lucide-react";

interface TeamMemberCardProps {
  full_name: string;
  position: string;
  bio: string | null;
  image_url: string | null;
}

const TeamMemberCard = ({ full_name, position, bio, image_url }: TeamMemberCardProps) => {
  return (
    <div className="group bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-[var(--shadow-elevated)] hover:border-primary/15 transition-all duration-400 ease-out overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* Image — dominant, 40% on desktop, full on mobile */}
        <div className="sm:w-[60%] flex-shrink-0 overflow-hidden">
          {image_url ? (
            <img
              src={image_url}
              alt={full_name}
              className="w-full h-56 sm:h-full sm:min-h-[240px] object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-56 sm:h-full sm:min-h-[240px] bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
              <span className="text-5xl sm:text-6xl font-bold text-primary-foreground opacity-80">
                {full_name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content — 60%, vertically centered */}
        <div className="sm:w-[60%] p-6 sm:p-7 md:p-8 flex flex-col justify-center text-center sm:text-left">
          <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight tracking-tight">
            {full_name}
          </h3>
          <p className="text-sm md:text-base font-semibold text-primary mt-1.5">
            {position}
          </p>

          {/* Divider */}
          <div className="w-12 h-[2px] bg-primary/25 mx-auto sm:mx-0 mt-4 mb-3 rounded-full" />

          {bio && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {bio}
            </p>
          )}

          {/* Social icons */}
          <div className="flex gap-2.5 mt-4 justify-center sm:justify-start">
            <span className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground/50 group-hover:text-primary group-hover:bg-primary/10 transition-colors duration-300 cursor-pointer">
              <Mail className="h-3.5 w-3.5" />
            </span>
            <span className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground/50 group-hover:text-primary group-hover:bg-primary/10 transition-colors duration-300 cursor-pointer">
              <Linkedin className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
