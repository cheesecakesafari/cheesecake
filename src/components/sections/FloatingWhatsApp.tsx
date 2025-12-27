import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/254710622549', '_blank');
  };

  return (
    <div className="fixed right-4 bottom-20 z-20">
      <Button
        onClick={handleWhatsAppClick}
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
    </div>
  );
}