
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { 
//   BookOpen, 
//   Briefcase, 
//   GraduationCap, 
//   Award as AwardIcon, 
//   Globe,
//   ChevronRight,
//   MapPin,
//   Clock
// } from "lucide-react";
// import { Opportunity } from "@/types/api";

// interface OpportunitiesSectionProps {
//   opportunities: Opportunity[];
//   selectedCategory: string;
//   onCategoryChange: (category: string) => void;
//   isLoading: boolean;
//   error: any;
// }

// const OpportunitiesSection = ({ 
//   opportunities, 
//   selectedCategory, 
//   onCategoryChange, 
//   isLoading, 
//   error 
// }: OpportunitiesSectionProps) => {
//   const categories = [
//     { id: "all", name: "All Opportunities", icon: Globe },
//     { id: "jobs", name: "Jobs", icon: Briefcase },
//     { id: "fellowship", name: "Fellowships & Training", icon: Globe },
//     { id: "scholarships", name: "Scholarships", icon: GraduationCap },
//     { id: "research", name: "Research", icon: BookOpen },
//     { id: "awards", name: "Awards & Recognition", icon: AwardIcon }
//   ];

//   const jobSubcategories = ["Full-time Jobs", "Internships", "Volunteering"];
//   const fellowshipSubcategories = ["Undergraduate", "Master's", "PhD", "Post-doctoral", "Online Courses"];

//   const filteredOpportunities = selectedCategory === "all" 
//     ? opportunities 
//     : opportunities.filter(opp => opp.category === selectedCategory);

//   return (
//     <section id="opportunities" className="py-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h3 className="text-3xl font-bold text-gray-900 mb-4">Latest on TeachEra</h3>
//           <p className="text-lg text-gray-600">Discover the newest opportunities posted by institutions worldwide</p>
//           {isLoading && <p className="text-sm text-gray-500 mt-2">Loading opportunities...</p>}
//           {error && <p className="text-sm text-red-500 mt-2">Using demo data (backend ready for connection)</p>}
//         </div>

//         {/* Category Filter */}
//         <div className="flex flex-wrap gap-3 mb-8 justify-center">
//           {categories.map((category) => {
//             const Icon = category.icon;
//             return (
//               <Button
//                 key={category.id}
//                 variant={selectedCategory === category.id ? "default" : "outline"}
//                 onClick={() => onCategoryChange(category.id)}
//                 className={`flex items-center gap-2 ${
//                   selectedCategory === category.id 
//                     ? "bg-primary hover:bg-primary/90" 
//                     : "border-primary/20 text-primary hover:bg-primary/10"
//                 }`}
//               >
//                 <Icon className="h-4 w-4" />
//                 {category.name}
//               </Button>
//             );
//           })}
//         </div>

//         {/* Subcategories for Jobs and Fellowships */}
//         {selectedCategory === "jobs" && (
//           <div className="mb-6">
//             <h4 className="text-lg font-semibold mb-3">Job Categories:</h4>
//             <div className="flex flex-wrap gap-2">
//               {jobSubcategories.map((sub) => (
//                 <Badge key={sub} variant="secondary">{sub}</Badge>
//               ))}
//             </div>
//           </div>
//         )}

//         {selectedCategory === "fellowship" && (
//           <div className="mb-6">
//             <h4 className="text-lg font-semibold mb-3">Fellowship Categories:</h4>
//             <div className="flex flex-wrap gap-2">
//               {fellowshipSubcategories.map((sub) => (
//                 <Badge key={sub} variant="secondary">{sub}</Badge>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Opportunities Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           {filteredOpportunities.map((opportunity) => (
//             <Card key={opportunity.id} className="hover:shadow-lg transition-shadow cursor-pointer">
//               <CardHeader>
//                 <div className="flex justify-between items-start mb-2">
//                   <CardTitle className="text-lg">{opportunity.title}</CardTitle>
//                   {opportunity.urgent && (
//                     <Badge variant="destructive" className="text-xs">Urgent</Badge>
//                   )}
//                 </div>
//                 <CardDescription className="text-primary font-medium">
//                   {opportunity.organization}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <MapPin className="h-4 w-4" />
//                     {opportunity.location}
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <Briefcase className="h-4 w-4" />
//                     {opportunity.type}
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <Clock className="h-4 w-4" />
//                     Posted {opportunity.posted}
//                   </div>
//                   <div className="text-lg font-semibold text-green-600 mt-3">
//                     {opportunity.salary || opportunity.amount}
//                   </div>
//                 </div>
//                 <Button className="w-full mt-4" variant="outline">
//                   View Details <ChevronRight className="h-4 w-4 ml-2" />
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="text-center">
//           <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
//             See More Opportunities <ChevronRight className="h-4 w-4 ml-2" />
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OpportunitiesSection;






import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  Award as AwardIcon, 
  Globe,
  ChevronRight,
  MapPin,
  Clock
} from "lucide-react";
import { Opportunity } from "@/types/api";
import ExpandableOpportunityCard from "./ui/ExpandableOpportunityCard";

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
  const categories = [
    { id: "all", name: "All Opportunities", icon: Globe },
    { id: "jobs", name: "Jobs", icon: Briefcase },
    { id: "fellowship", name: "Fellowships & Training", icon: Globe },
    { id: "scholarships", name: "Scholarships", icon: GraduationCap },
    { id: "research", name: "Research", icon: BookOpen },
    { id: "awards", name: "Awards & Recognition", icon: AwardIcon }
  ];

  const jobSubcategories = ["Full-time Jobs", "Internships", "Volunteering"];
  const fellowshipSubcategories = ["Undergraduate", "Master's", "PhD", "Post-doctoral", "Online Courses"];

  const filteredOpportunities = selectedCategory === "all" 
    ? opportunities 
    : opportunities.filter(opp => opp.category === selectedCategory);

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
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-2 ${
                  selectedCategory === category.id 
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

        {selectedCategory === "fellowship" && (
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
          {filteredOpportunities.map((opportunity) => (
            <Card key={opportunity.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                {opportunity.urgent && (
                  <Badge variant="destructive" className="text-xs">Urgent</Badge>
                )}
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

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
            See More Opportunities <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;
