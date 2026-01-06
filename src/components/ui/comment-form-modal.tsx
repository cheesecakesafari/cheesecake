import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/ui/star-rating";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface CommentFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCommentSubmitted: () => void;
}

export function CommentFormModal({ open, onOpenChange, onCommentSubmitted }: CommentFormModalProps) {
  const [clientName, setClientName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate description length
    if (!description.trim() || description.split(" ").length > 50) {
      toast({
        title: "Error",
        description: "The description must not exceed 50 words.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5000";
      const url = `${apiBase}/comments`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName: clientName || "Anonymous", description, rating }),
      });

      if (!response.ok) throw new Error("Failed to submit comment");

      toast({ title: "Success!", description: "Your comment was submitted!" });

      // Reset form fields and close modal
      setClientName("");
      setDescription("");
      setRating(5);
      onOpenChange(false);
      onCommentSubmitted();
    } catch (err) {
      console.error("Submit error:", err);
      toast({ title: "Error!", description: "Failed to submit comment.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Submit Your Comment</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Your Name (optional)</label>
            <Input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Your Experience *</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Share your experience (max 50 words)"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Your Rating *</label>
            <div className="mt-2">
              <StarRating rating={rating} onRatingChange={setRating} />
            </div>
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
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}