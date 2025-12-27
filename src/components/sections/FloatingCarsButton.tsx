import { Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompanyCarsModal } from "@/components/ui/company-cars-modal";
import { useState } from "react";

export function FloatingCarsButton() {
  const [showCarsModal, setShowCarsModal] = useState(false);

  return (
    <>
      <div className="fixed right-6 top-20 z-50">
        <Button
          onClick={() => setShowCarsModal(true)}
          className="bg-green-500/90 hover:bg-green-600 border-green-400/50 text-white rounded-full px-6 py-3 shadow-2xl hover:shadow-3xl transition-all duration-300 min-w-[140px]"
          size="default"
        >
          <Car className="w-4 h-4 mr-2" />
          Our Cars
        </Button>
      </div>

      <CompanyCarsModal
        isOpen={showCarsModal}
        onClose={() => setShowCarsModal(false)}
      />
    </>
  );
}