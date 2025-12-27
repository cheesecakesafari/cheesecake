import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function StarRating({ rating, onRatingChange, readonly = false, size = "md" }: StarRatingProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5", 
    lg: "h-6 w-6"
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            sizes[size],
            "transition-colors cursor-pointer",
            star <= rating 
              ? "fill-yellow-400 text-yellow-400" 
              : "text-muted-foreground hover:text-yellow-400",
            readonly && "cursor-default"
          )}
          onClick={() => !readonly && onRatingChange?.(star)}
        />
      ))}
    </div>
  );
}