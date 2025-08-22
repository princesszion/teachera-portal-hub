import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Opportunity } from "@/types/api";
import { Briefcase, MapPin, ChevronRight, ChevronUp } from "lucide-react";
import { categoryIcons } from "@/lib/categoryIcons";

interface Props {
  opportunity: Opportunity;
}

const ExpandableOpportunityCard = ({ opportunity }: Props) => {
  const [expanded, setExpanded] = useState(false);

  // pick icon from category slug
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

      {expanded && (
        <div className="text-sm text-gray-700 mt-2 space-y-2">
          <div><strong>Description:</strong> {opportunity.description}</div>
          <div><strong>Eligibility:</strong> {opportunity.eligibility}</div>
          <div><strong>Benefits:</strong> {opportunity.benefits}</div>
          <div><strong>Application Process:</strong> {opportunity.process}</div>
          <div><strong>Deadline:</strong> {new Date(opportunity.deadline).toLocaleDateString()}</div>
          <div><strong>Location:</strong> {opportunity.location}</div>
        </div>
      )}

      <Button
        className="w-full mt-3"
        variant="outline"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <>
            Show Less <ChevronUp className="h-4 w-4 ml-2" />
          </>
        ) : (
          <>
            View Details <ChevronRight className="h-4 w-4 ml-2" />
          </>
        )}
      </Button>
    </div>
  );
};

export default ExpandableOpportunityCard;
