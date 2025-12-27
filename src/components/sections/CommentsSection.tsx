import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { CommentFormModal } from "@/components/ui/comment-form-modal";
import { CommentsCarousel } from "@/components/ui/comments-carousel";

export function CommentsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCommentSubmitted = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Read reviews from travelers who have experienced our safari adventures
          </p>
          
          <Button 
            onClick={() => setIsModalOpen(true)}
            size="lg"
            className="gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            Write a Comment
          </Button>
        </div>

        <div key={refreshKey}>
          <CommentsCarousel />
        </div>
      </div>

      <CommentFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onCommentSubmitted={handleCommentSubmitted}
      />
    </section>
  );
}