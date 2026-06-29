import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, Users, ArrowRight, Star } from "lucide-react";

export interface LiveProgram {
  id: string;
  title: string;
  short_description: string;
  category: string;
  price: number;
  currency: string;
  image_url: string | null;
  students_count: number;
  is_featured: boolean;
  apply_url: string;
  details_url: string;
}

interface Props {
  loading: boolean;
  error: string | null;
  programs: LiveProgram[];
  onRetry: () => void;
}

const formatPrice = (price: number, currency: string) => {
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency || "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${currency} ${price.toLocaleString()}`;
  }
};

const LiveProgramsGrid = ({ loading, error, programs, onRetry }: Props) => {
  if (loading) {
    return (
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border/50 bg-card overflow-hidden">
              <div className="h-48 bg-muted animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                <div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
                <div className="h-4 w-full bg-muted animate-pulse rounded" />
                <div className="h-9 w-full bg-muted animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-12 rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center">
        <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-3" />
        <p className="text-foreground font-medium mb-1">Couldn't load live programs</p>
        <p className="text-muted-foreground text-sm mb-4">{error}</p>
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      </div>
    );
  }

  if (!programs.length) return null;

  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((p) => (
          <a
            key={p.id}
            href={`https://lms.odel.uniport.edu.ng/programs/${p.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl overflow-hidden border border-border/50 bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <div className="relative h-48 overflow-hidden bg-muted">
              {p.image_url ? (
                <img
                  src={p.image_url}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                  No image
                </div>
              )}
              {p.is_featured && (
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-accent text-accent-foreground text-xs font-semibold shadow-md">
                  <Star className="w-3 h-3 fill-current" />
                  Top Rated
                </span>
              )}
            </div>

            <CardContent className="p-5 flex flex-col flex-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                {p.category}
              </span>
              <h3 className="text-base font-semibold text-foreground line-clamp-2 leading-snug mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                {p.short_description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  <span>{p.students_count} enrolled</span>
                </div>
                <span className="text-lg font-bold text-foreground">
                  {formatPrice(p.price, p.currency)}
                </span>
              </div>

              <Button className="w-full group/btn" size="sm">
                View details
                <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
              </Button>
            </CardContent>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LiveProgramsGrid;
