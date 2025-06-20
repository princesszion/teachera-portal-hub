
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  Award as AwardIcon, 
  Users, 
  Search,
  ChevronRight,
  Star,
  MessageSquare,
  FileText,
  Globe,
  Heart,
  TrendingUp,
  Calendar,
  MapPin,
  Clock
} from "lucide-react";
import { Opportunity, Resource, Award } from "@/types/api";

// Import services with error handling
let opportunityService: any = null;
let resourceService: any = null;
let awardService: any = null;
let feedbackService: any = null;

try {
  const services = require("@/services");
  opportunityService = services.opportunityService;
  resourceService = services.resourceService;
  awardService = services.awardService;
  feedbackService = services.feedbackService;
} catch (error) {
  console.warn("Services not available, using mock data:", error);
}

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fallback mock data for development (when backend is not available)
  const mockOpportunities: Opportunity[] = [
    {
      id: 1,
      title: "Senior Mathematics Teacher",
      organization: "International School of Excellence",
      type: "Full-time",
      category: "jobs",
      location: "London, UK",
      salary: "$65,000 - $80,000",
      posted: "2 days ago",
      urgent: true,
      created_at: "2024-01-15T10:00:00Z",
      updated_at: "2024-01-15T10:00:00Z"
    },
    {
      id: 2,
      title: "PhD Scholarship in Education Technology",
      organization: "Cambridge University",
      type: "PhD",
      category: "fellowship",
      location: "Cambridge, UK",
      amount: "$25,000/year",
      posted: "1 week ago",
      urgent: false,
      created_at: "2024-01-10T10:00:00Z",
      updated_at: "2024-01-10T10:00:00Z"
    },
    {
      id: 3,
      title: "Teaching Assistant Program",
      organization: "UNESCO Education Initiative",
      type: "Volunteer",
      category: "jobs",
      location: "Remote",
      salary: "Unpaid",
      posted: "3 days ago",
      urgent: false,
      created_at: "2024-01-12T10:00:00Z",
      updated_at: "2024-01-12T10:00:00Z"
    },
    {
      id: 4,
      title: "Digital Literacy Training Course",
      organization: "EdTech Academy",
      type: "Online Course",
      category: "fellowship",
      location: "Online",
      amount: "Free",
      posted: "5 days ago",
      urgent: false,
      created_at: "2024-01-08T10:00:00Z",
      updated_at: "2024-01-08T10:00:00Z"
    }
  ];

  // Fetch opportunities from Django backend with error handling
  const { data: opportunitiesData, isLoading, error } = useQuery({
    queryKey: ['opportunities', selectedCategory],
    queryFn: async () => {
      if (!opportunityService) {
        console.log("Using mock data - backend services not available");
        return { results: mockOpportunities };
      }
      
      try {
        if (selectedCategory === "all") {
          return await opportunityService.getRecentOpportunities(12);
        } else {
          return await opportunityService.getOpportunitiesByCategory(selectedCategory);
        }
      } catch (error) {
        console.error("API call failed, using mock data:", error);
        return { results: mockOpportunities };
      }
    },
    retry: false,
  });

  // Fetch resources with error handling
  const { data: resourcesData } = useQuery({
    queryKey: ['resources'],
    queryFn: async () => {
      if (!resourceService) return { results: [] };
      try {
        return await resourceService.getResources({ page_size: 6 });
      } catch (error) {
        console.error("Resource fetch failed:", error);
        return { results: [] };
      }
    },
    retry: false,
  });

  // Fetch awards with error handling
  const { data: awardsData } = useQuery({
    queryKey: ['awards'],
    queryFn: async () => {
      if (!awardService) return { results: [] };
      try {
        return await awardService.getCurrentAwards();
      } catch (error) {
        console.error("Awards fetch failed:", error);
        return { results: [] };
      }
    },
    retry: false,
  });

  // Fetch discussions with error handling
  const { data: discussionsData } = useQuery({
    queryKey: ['discussions'],
    queryFn: async () => {
      if (!feedbackService) return { results: [] };
      try {
        return await feedbackService.getDiscussions();
      } catch (error) {
        console.error("Discussions fetch failed:", error);
        return { results: [] };
      }
    },
    retry: false,
  });

  const categories = [
    { id: "all", name: "All Opportunities", icon: Globe },
    { id: "jobs", name: "Jobs", icon: Briefcase },
    { id: "fellowship", name: "Fellowships & Training", icon: GraduationCap },
    { id: "research", name: "Research", icon: BookOpen },
    { id: "awards", name: "Awards & Recognition", icon: AwardIcon }
  ];

  const jobSubcategories = ["Full-time Jobs", "Internships", "Volunteering"];
  const fellowshipSubcategories = ["Undergraduate", "Master's", "PhD", "Post-doctoral", "Online Courses"];

  // Use API data if available, otherwise use mock data
  const opportunities = opportunitiesData?.results || mockOpportunities;
  const filteredOpportunities = selectedCategory === "all" 
    ? opportunities 
    : opportunities.filter(opp => opp.category === selectedCategory);

  const resources = resourcesData?.results || [];
  const awards = awardsData?.results || [];
  const discussions = discussionsData?.results || [];

  console.log('Current opportunities:', opportunities);
  console.log('Resources:', resources);
  console.log('Awards:', awards);
  console.log('Loading state:', isLoading);
  console.log('Error state:', error);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">TeachEra</h1>
                <p className="text-sm text-gray-600">Empowering Educators Worldwide</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#opportunities" className="text-gray-700 hover:text-primary transition-colors">Opportunities</a>
              <a href="#resources" className="text-gray-700 hover:text-primary transition-colors">Resources</a>
              <a href="#community" className="text-gray-700 hover:text-primary transition-colors">Community</a>
              <a href="#awards" className="text-gray-700 hover:text-primary transition-colors">Awards</a>
              <a href="/admin" className="text-gray-700 hover:text-primary transition-colors">Admin</a>
            </nav>
            <Button className="bg-primary hover:bg-primary/90">Join TeachEra</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Empowering Educators,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
              Transforming Lives
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            TeachEra is the premier platform connecting educators with opportunities, resources, and recognition. 
            Discover teaching positions, fellowships, research opportunities, and professional development resources 
            tailored for educators worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Explore Opportunities
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Join Our Community
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
              <div className="text-gray-600">Active Opportunities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">15,000+</div>
              <div className="text-gray-600">Registered Educators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Opportunities */}
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
                  onClick={() => setSelectedCategory(category.id)}
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
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {opportunity.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Briefcase className="h-4 w-4" />
                      {opportunity.type}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      Posted {opportunity.posted}
                    </div>
                    <div className="text-lg font-semibold text-green-600 mt-3">
                      {opportunity.salary || opportunity.amount}
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    View Details <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
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

      {/* Resource Bank */}
      <section id="resources" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Resource Bank</h3>
            <p className="text-lg text-gray-600">Professional development tools and resources for educators</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Advocacy Toolkit</CardTitle>
                <CardDescription>Resources for educational advocacy and policy engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Access Toolkit</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Digital Literacy Course</CardTitle>
                <CardDescription>Enhance your digital teaching skills with our comprehensive course</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Start Learning</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>CV Review Service</CardTitle>
                <CardDescription>Get professional feedback on your teaching resume</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Submit CV</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Teacher Data Bank</CardTitle>
                <CardDescription>Access research and statistics on teaching trends</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Explore Data</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Satisfaction Survey</CardTitle>
                <CardDescription>Annual teacher satisfaction and well-being survey</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Take Survey</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>Teacher Marketplace</CardTitle>
                <CardDescription>Buy and sell educational resources from fellow teachers</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Browse Marketplace</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section id="awards" className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Awards & Recognition</h3>
            <p className="text-lg text-gray-600">Celebrating excellence in education</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-yellow rounded-full flex items-center justify-center">
                    <AwardIcon className="h-6 w-6 text-yellow-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-yellow-800">Teacher of the Month</CardTitle>
                    <CardDescription>Recognizing outstanding monthly achievements</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-sm text-gray-600">Mathematics Teacher, London</div>
                  </div>
                </div>
                <Button className="w-full bg-yellow hover:bg-yellow/90 text-yellow-foreground">Nominate a Teacher</Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-purple-800">Teacher of the Year</CardTitle>
                    <CardDescription>Annual recognition for exceptional educators</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-lg font-semibold">Nominations Open</div>
                  <div className="text-sm text-gray-600">Submit your nomination by March 31st</div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Submit Nomination</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Discussion */}
      <section id="community" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Community Discussion</h3>
            <p className="text-lg text-gray-600">Connect, share, and learn from fellow educators</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Leave Feedback
                </CardTitle>
                <CardDescription>Help us improve TeachEra with your suggestions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea placeholder="Share your feedback or suggestions..." />
                <Button className="w-full">Submit Feedback</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Discussion Forum
                </CardTitle>
                <CardDescription>Join conversations with other educators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-sm">Latest: Best practices for remote teaching</div>
                    <div className="text-xs text-gray-600">42 replies • 2 hours ago</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-sm">How to integrate technology in classrooms?</div>
                    <div className="text-xs text-gray-600">18 replies • 5 hours ago</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">Join Discussion</Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="text-center">
              <CardTitle className="text-blue-800">Write Us a Prompt</CardTitle>
              <CardDescription>Have a specific question or need guidance? Ask our community!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Subject of your prompt..." />
              <Textarea placeholder="Describe your question or challenge in detail..." />
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Post Prompt</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div className="text-xl font-bold">TeachEra</div>
              </div>
              <p className="text-gray-400">Empowering educators worldwide with opportunities and resources.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Opportunities</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fellowships</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Research</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Advocacy Toolkit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Digital Literacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">CV Review</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Discussion Forum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Awards</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Feedback</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TeachEra. All rights reserved. | Domain: teachEra.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
