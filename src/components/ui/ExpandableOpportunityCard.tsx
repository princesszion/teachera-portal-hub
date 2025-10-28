import { Button } from "@/components/ui/button";
import { Opportunity } from "@/types/api";
import { MapPin, Briefcase } from "lucide-react";
import { categoryIcons } from "@/lib/categoryIcons";

interface Props {
  opportunity: Opportunity;
  onOpen: (opportunity: Opportunity) => void; // ✅ parent handler
}

const ExpandableOpportunityCard = ({ opportunity, onOpen }: Props) => {
  const Icon = categoryIcons[opportunity.category?.slug || ""] || Briefcase;

  return (
    <div className="space-y-2">
      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <MapPin className="h-4 w-4" />
        {opportunity.location}
      </div>

      {/* Category */}
      {opportunity.category && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Icon className="h-4 w-4" />
          {opportunity.category.name}
        </div>
      )}

      {/* View More Button */}
      <Button
        className="w-full mt-3 bg-[#140ca6] hover:bg-[#0f0992] text-white"
        onClick={() => onOpen(opportunity)} // ✅ open modal via parent
      >
        View More Details
      </Button>
    </div>
  );
};

export default ExpandableOpportunityCard;
