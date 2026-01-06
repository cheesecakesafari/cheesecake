import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload } from "lucide-react";

interface GalleryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGallerySubmitted: () => void;
}

export function GalleryModal({ open, onOpenChange, onGallerySubmitted }: GalleryModalProps) {
  const [clientName, setClientName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 3) {
      alert("You can upload up to 3 images only!");
      return;
    }
    setImages(selectedFiles);
  };

  const handleSubmit = async () => {
    // Validate description length
    if (!description.trim() || description.split(" ").length > 50) {
      alert("Description must not exceed 50 words.");
      return;
    }

    const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5000";
    const url = `${apiBase}/gallery`;

    const formData = new FormData();
    formData.append("clientName", clientName);
    formData.append("description", description);
    formData.append("location", location);
    images.forEach((image) => formData.append("images", image));

    setIsSubmitting(true);

    try {
      const response = await fetch(url, { method: "POST", body: formData });

      if (!response.ok) throw new Error("Failed to submit gallery item");

      alert("Gallery item submitted successfully!");
      setClientName("");
      setDescription("");
      setLocation("");
      setImages([]);
      onGallerySubmitted();
      onOpenChange(false);
    } catch (err) {
      console.error("Gallery submit error:", err);
      alert("Failed to submit gallery item.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Submit Your Gallery</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Your Name *</label>
            <Input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description (max 50 words) *</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly tell your story"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Location *</label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Upload Images (max 3 files) *</label>
            <input type="file" multiple accept="image/*" onChange={handleFileChange} />
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
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Gallery
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}