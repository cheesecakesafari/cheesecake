import React from 'react';
import { Button } from '@/components/ui/button';
import { CommentFormModal } from '@/components/ui/comment-form-modal';

interface CommentsSectionProps {
  isCommentModalOpen: boolean;
  setIsCommentModalOpen: (open: boolean) => void;
}

export function CommentsSection({ isCommentModalOpen, setIsCommentModalOpen }: CommentsSectionProps) {
  return (
    <section className="py-8 px-4 bg-transparent">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-base font-semibold tracking-tight text-gray-800 mb-2">
          The following are comments and reviews by our clients
          <button
            type="button"
            onClick={() => setIsCommentModalOpen(true)}
            className="ml-2 text-sm text-blue-600 hover:underline"
          >
            [Leave a Comment]
          </button>
        </h2>

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Share your rating on Our Cars’ conditions, Tour Guiding, and Services.
        </p>

        <CommentFormModal
          open={isCommentModalOpen}
          onOpenChange={setIsCommentModalOpen}
          onCommentSubmitted={() => alert('Comments section refreshed')}
        />

        <div className="mt-3">
          <Button variant="link" className="text-sm">See More Comments</Button>
        </div>
      </div>
    </section>
  );
}
