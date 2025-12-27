import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/ui/star-rating";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface CommentFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCommentSubmitted: () => void;
}

export function CommentFormModal({ open, onOpenChange, onCommentSubmitted }: CommentFormModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !comment.trim()) {
      toast({
        title: "Error",
        description: "Name and comment are required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert comment into database
      const { error: dbError } = await supabase
        .from('comments')
        .insert({
          name: name.trim(),
          email: email.trim() || null,
          phone: phone.trim() || null,
          comment: comment.trim(),
          rating
        });

      if (dbError) throw dbError;

      // Send to WhatsApp
      const whatsappMessage = `New Comment Received!\n\nName: ${name}\nEmail: ${email || 'Not provided'}\nPhone: ${phone || 'Not provided'}\nRating: ${rating} stars\n\nComment:\n${comment}`;
      const whatsappUrl = `https://wa.me/254710622549?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');

      toast({
        title: "Comment Submitted!",
        description: "Your comment has been submitted and sent to WhatsApp. Thank you for your feedback!",
      });

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setComment("");
      setRating(5);
      
      onOpenChange(false);
      onCommentSubmitted();
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast({
        title: "Error",
        description: "Failed to submit comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Write a Comment</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name *</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com (optional)"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+254... (optional)"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Rating *</label>
            <div className="mt-2">
              <StarRating rating={rating} onRatingChange={setRating} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Comment *</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with us..."
              rows={4}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Comment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}