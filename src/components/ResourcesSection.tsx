
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { 
//   FileText,
//   BookOpen,
//   Users,
//   TrendingUp,
//   Heart,
//   Search
// } from "lucide-react";

// const ResourcesSection = () => {
//   return (
//     <section id="resources" className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h3 className="text-3xl font-bold text-gray-900 mb-4">Resource Bank</h3>
//           <p className="text-lg text-gray-600">Professional development tools and resources for educators</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <Card className="hover:shadow-lg transition-shadow">
//             <CardHeader>
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
//                 <FileText className="h-6 w-6 text-blue-600" />
//               </div>
//               <CardTitle>Advocacy Toolkit</CardTitle>
//               <CardDescription>Resources for educational advocacy and policy engagement</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Button variant="outline" className="w-full">Access Toolkit</Button>
//             </CardContent>
//           </Card>

//           <Card className="hover:shadow-lg transition-shadow">
//             <CardHeader>
//               <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
//                 <BookOpen className="h-6 w-6 text-green-600" />
//               </div>
//               <CardTitle>Digital Literacy Course</CardTitle>
//               <CardDescription>Enhance your digital teaching skills with our comprehensive course</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Button variant="outline" className="w-full">Start Learning</Button>
//             </CardContent>
//           </Card>

//           <Card className="hover:shadow-lg transition-shadow">
//             <CardHeader>
//               <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
//                 <Users className="h-6 w-6 text-purple-600" />
//               </div>
//               <CardTitle>CV Review Service</CardTitle>
//               <CardDescription>Get professional feedback on your teaching resume</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Button variant="outline" className="w-full">Submit CV</Button>
//             </CardContent>
//           </Card>

//           <Card className="hover:shadow-lg transition-shadow">
//             <CardHeader>
//               <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
//                 <TrendingUp className="h-6 w-6 text-orange-600" />
//               </div>
//               <CardTitle>Teacher Data Bank</CardTitle>
//               <CardDescription>Access research and statistics on teaching trends</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Button variant="outline" className="w-full">Explore Data</Button>
//             </CardContent>
//           </Card>

//           <Card className="hover:shadow-lg transition-shadow">
//             <CardHeader>
//               <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
//                 <Heart className="h-6 w-6 text-red-600" />
//               </div>
//               <CardTitle>Satisfaction Survey</CardTitle>
//               <CardDescription>Annual teacher satisfaction and well-being survey</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Button variant="outline" className="w-full">Take Survey</Button>
//             </CardContent>
//           </Card>

//           <Card className="hover:shadow-lg transition-shadow">
//             <CardHeader>
//               <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
//                 <Search className="h-6 w-6 text-yellow-600" />
//               </div>
//               <CardTitle>Teacher Marketplace</CardTitle>
//               <CardDescription>Buy and sell educational resources from fellow teachers</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Button variant="outline" className="w-full">Browse Marketplace</Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ResourcesSection;

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, Users, TrendingUp, Heart, Search } from "lucide-react";
import { Resource } from "@/types/api";
import { resourceService } from "@/services/resourceService";

const iconMap = [
  { Icon: FileText, bg: "bg-blue-100", button: "Access Toolkit" },
  { Icon: BookOpen, bg: "bg-green-100", button: "Start Learning" },
  { Icon: Users, bg: "bg-purple-100", button: "Submit CV" },
  { Icon: TrendingUp, bg: "bg-orange-100", button: "Explore Data" },
  { Icon: Heart, bg: "bg-red-100", button: "Take Survey" },
  { Icon: Search, bg: "bg-yellow-100", button: "Browse Marketplace" },
];

const ResourcesSection = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await resourceService.getResources();
        setResources(response.results || []); // for paginated
      } catch (err) {
        setError("Failed to load resources.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchResources();
  }, []);

  return (
    <section id="resources" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Resource Bank</h3>
          <p className="text-lg text-gray-600">Professional development tools and resources for Teachers and Educators</p>
          {isLoading && <p className="text-gray-500 mt-2">Loading resources...</p>}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => {
  const { Icon, bg, button } = iconMap[index % iconMap.length];
  return (
    <Card key={resource.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center mb-4`}>
          <Icon className="h-6 w-6 text-gray-800" />
        </div>
        <CardTitle>{resource.title}</CardTitle>
        <CardDescription>{resource.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <a href={resource.file_url} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="w-full">
            {resource.price && resource.price > 0
              ? `Buy for $${resource.price}`
              : "Download"}
          </Button>
        </a>
      </CardContent>
    </Card>
  );
})}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
