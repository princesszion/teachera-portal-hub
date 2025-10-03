import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { 
  ChevronRight
} from "lucide-react";
import { Opportunity } from "@/types/api";
import ExpandableOpportunityCard from "./ui/ExpandableOpportunityCard";
import { useEffect, useState } from "react";
import { useOpportunityCategories } from "@/hooks/useTeachEraData";
import { categoryIcons } from "@/lib/categoryIcons";
import { Briefcase } from "lucide-react"; // fallback


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
  error 
}: OpportunitiesSectionProps) => {
  const { data: categoriesFromApi = [], isLoading: catsLoading } = useOpportunityCategories();

  // Build category list with an 'all' pseudo-category
  const categories = [
    { id: "all", name: "All Opportunities", slug: "all" },
    ...categoriesFromApi.map((c) => ({ id: c.slug, name: c.name, slug: c.slug })),
  ];

  // ✅ filter by slug (not id)
  const filteredOpportunities =
    selectedCategory === "all"
      ? opportunities
      : opportunities.filter((opp) => opp.category?.slug === selectedCategory);
      useEffect(() => {
    setVisibleCount(3);
  }, [selectedCategory]);
  
  // const categories = [
  //   { id: "all", name: "All Opportunities", icon: Globe },
  //   { id: "jobs", name: "Jobs", icon: Briefcase },
  //   { id: "fellowship", name: "Fellowships & Training", icon: Globe },
  //   { id: "scholarships", name: "Scholarships", icon: GraduationCap },
  //   { id: "research", name: "Research", icon: BookOpen },
  //   { id: "awards", name: "Awards & Recognition", icon: AwardIcon }
  // ];

  const [visibleCount, setVisibleCount] = useState(6);

  const jobSubcategories = ["Full-time Jobs", "Internships", "Volunteering"];
  const fellowshipSubcategories = ["Undergraduate", "Master's", "PhD", "Post-doctoral", "Online Courses"];

  // ✅ Use category.slug instead of id

  const visibleOpportunities = filteredOpportunities.slice(0, visibleCount);

  return (
    <section id="opportunities" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Latest on TeachEra</h3>
          <p className="text-lg text-gray-600">Discover the newest opportunities posted by institutions worldwide</p>
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
            ? "bg-primary hover:bg-primary/90"
            : "border-primary/20 text-primary hover:bg-primary/10"
        }`}
      >
        <Icon className="h-4 w-4" />
        {category.name}
      </Button>
    );
  })}
</div>
  {catsLoading && <p className="text-center text-sm text-gray-500 mb-4">Loading categories…</p>}

        {/* Subcategories for Jobs and Fellowships */}
        {selectedCategory === "jobs" && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">Job Categories:</h4>
            <div className="flex flex-wrap gap-2">
              {jobSubcategories.map((sub) => (
                <Badge key={sub} variant="secondary">{sub}</Badge>
              ))}
            </div>
          </div>
        )}

        {selectedCategory === "fellowships" && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">Fellowship Categories:</h4>
            <div className="flex flex-wrap gap-2">
              {fellowshipSubcategories.map((sub) => (
                <Badge key={sub} variant="secondary">{sub}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {visibleOpportunities.map((opportunity) => (
            <Card key={opportunity.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                  {(() => {
                    console.log("Opportunity:", opportunity.title, "Closed:", opportunity.is_closed);
                    return opportunity.is_closed ? (
                      <Badge variant="secondary" className="text-xs">Closed</Badge>
                    ) : null;
                  })()}

                </div>
                <CardDescription className="text-primary font-medium">
                  {opportunity.organization}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ExpandableOpportunityCard opportunity={opportunity} />
              </CardContent>
            </Card>
          ))}
        </div>

        {visibleCount < filteredOpportunities.length && (
          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => setVisibleCount((prev) => prev + 6)}
            >
              Load More Opportunities <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default OpportunitiesSection;
