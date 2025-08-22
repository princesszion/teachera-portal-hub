import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Opportunity } from "@/types/api";
import { Briefcase, Clock, MapPin, ChevronRight, ChevronUp } from "lucide-react";

interface Props {
  opportunity: Opportunity;
}

const ExpandableOpportunityCard = ({ opportunity }: Props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <MapPin className="h-4 w-4" />
        {opportunity.location}
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Briefcase className="h-4 w-4" />
        {opportunity.type}
      </div>
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
