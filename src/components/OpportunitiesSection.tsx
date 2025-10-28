import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Briefcase } from "lucide-react";
import { Opportunity } from "@/types/api";
import ExpandableOpportunityCard from "./ui/ExpandableOpportunityCard";
import { useEffect, useState } from "react";
import { useOpportunityCategories } from "@/hooks/useTeachEraData";
import { categoryIcons } from "@/lib/categoryIcons";
import OpportunityModal from "@/components/OpportunityModal";
import { useSearchParams } from "react-router-dom";

interface OpportunitiesSectionProps {
  opportunities: Opportunity[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  isLoading: boolean;
  error: any;
}

const OpportunitiesSection = ({
  opportunities,
  selectedCategory,
  onCategoryChange,
  isLoading,
  error,
}: OpportunitiesSectionProps) => {
  const { data: categoriesFromApi = [], isLoading: catsLoading } = useOpportunityCategories();

  const [visibleCount, setVisibleCount] = useState(6);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

// ✅ Automatically open modal if ?opportunity=id exists
useEffect(() => {
  const oppId = searchParams.get("opportunity");
  if (oppId && opportunities.length > 0) {
    const found = opportunities.find((o) => o.id === Number(oppId));
    if (found) {
      setSelectedOpportunity(found);
      setModalOpen(true);
    }
  }
}, [searchParams, opportunities]);


  // ✅ Open & Close handlers
  const openModal = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setModalOpen(true);
    setSearchParams({ opportunity: opportunity.id.toString() });
  };

  const closeModal = () => {
    setSelectedOpportunity(null);
    setModalOpen(false);
    setSearchParams({});
  };

  // ✅ Filter categories
  const categories = [
    { id: "all", name: "All Opportunities", slug: "all" },
    ...categoriesFromApi.map((c) => ({ id: c.slug, name: c.name, slug: c.slug })),
  ];

  const filteredOpportunities =
    selectedCategory === "all"
      ? opportunities
      : opportunities.filter((opp) => opp.category?.slug === selectedCategory);

  useEffect(() => {
    setVisibleCount(3);
  }, [selectedCategory]);

  const visibleOpportunities = filteredOpportunities.slice(0, visibleCount);

  return (
    <section id="opportunities" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Latest on TeachEra</h3>
          <p className="text-lg text-gray-600">
            Discover the newest opportunities posted by institutions worldwide
          </p>
          {isLoading && <p className="text-sm text-gray-500 mt-2">Loading opportunities...</p>}
          {error && <p className="text-sm text-red-500 mt-2">Using demo data (backend ready for connection)</p>}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map((category) => {
            const Icon = categoryIcons[category.slug] || Briefcase;
            return (
              <Button
                key={category.slug}
                variant={selectedCategory === category.slug ? "default" : "outline"}
                onClick={() => onCategoryChange(category.slug)}
                className={`flex items-center gap-2 ${
                  selectedCategory === category.slug
                    ? "bg-[#140ca6] text-white hover:bg-[#0f0992]"
                    : "border-[#140ca6]/20 text-[#140ca6] hover:bg-[#140ca6]/10"
                }`}
              >
                <Icon className="h-4 w-4" />
                {category.name}
              </Button>
            );
          })}
        </div>
        {catsLoading && <p className="text-center text-sm text-gray-500 mb-4">Loading categories…</p>}

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {visibleOpportunities.map((opportunity) => (
            <Card
              key={opportunity.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                  {opportunity.is_closed && (
                    <Badge variant="secondary" className="text-xs">
                      Closed
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-primary font-medium">
                  {opportunity.organization}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ExpandableOpportunityCard opportunity={opportunity} onOpen={openModal} />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {visibleCount < filteredOpportunities.length && (
          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-[#140ca6] text-[#140ca6] hover:bg-[#140ca6]/10"
              onClick={() => setVisibleCount((prev) => prev + 6)}
            >
              Load More Opportunities <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>

      {/* ✅ Single Modal Instance */}
      <OpportunityModal
        open={modalOpen}
        onClose={closeModal}
        opportunity={selectedOpportunity}
      />
    </section>
  );
};

export default OpportunitiesSection;
