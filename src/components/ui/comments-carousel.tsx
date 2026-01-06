import { useEffect, useState } from "react";
import { StarRating } from "@/components/ui/star-rating";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  name: string;
  comment: string;
  rating: number;
  created_at: string;
}

export function CommentsCarousel() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
      // try both possible backends: '/api/comments' (server/index.js) and '/comments' (backend/index.js)
      let res = await fetch(`${apiBase}/api/comments`);
      if (!res.ok) {
        res = await fetch(`${apiBase}/comments`);
      }
      if (!res.ok) throw new Error('Failed to load comments');
      const raw = await res.json();
      // backend returns an array of objects with fields like _id, clientName, description, createdAt
      // normalize different backend shapes to Comment[]
      const data = (Array.isArray(raw) ? raw : raw.value || []) as any[];
      const normalized: Comment[] = data.map((d: any) => ({
        id: d.id || d._id || d._id?.toString() || d._id?.toString?.() || '',
        name: d.name || d.clientName || d.client_name || 'Anonymous',
        comment: d.comment || d.description || d.comment_text || '',
        rating: typeof d.rating === 'number' ? d.rating : 5,
        created_at: d.created_at || d.createdAt || d.createdAt?.toString?.() || new Date().toISOString(),
        image_url: d.image_url || (d.images && d.images[0] ? `${apiBase}/${String(d.images[0]).replace(/\\/g, '/')}` : null),
      }));

      setComments(normalized);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No comments yet. Be the first to share your experience!
      </div>
    );
  }

  return (
    <Carousel
      className="w-full max-w-5xl mx-auto"
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {comments.map((comment) => (
          <CarouselItem key={comment.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{comment.name}</h4>
                    <StarRating rating={comment.rating} readonly size="sm" />
                  </div>
                  
                  {comment.image_url && (
                    <div className="mb-3">
                      <img src={comment.image_url} alt={`${comment.name} photo`} className="w-full h-40 object-cover rounded" />
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground line-clamp-4">
                    "{comment.comment}"
                  </p>
                  
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}