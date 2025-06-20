
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Award,
  Briefcase,
  BookOpen,
  MessageSquare
} from "lucide-react";
import { opportunityService } from "@/services/opportunityService";
import { resourceService } from "@/services/resourceService";
import { awardService } from "@/services/awardService";
import { feedbackService } from "@/services/feedbackService";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("opportunities");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch data for all sections
  const { data: opportunities, isLoading: loadingOpportunities } = useQuery({
    queryKey: ['opportunities', searchTerm],
    queryFn: () => searchTerm 
      ? opportunityService.searchOpportunities(searchTerm)
      : opportunityService.getOpportunities({ page_size: 20 }),
  });

  const { data: resources, isLoading: loadingResources } = useQuery({
    queryKey: ['resources', searchTerm],
    queryFn: () => searchTerm 
      ? resourceService.searchResources(searchTerm)
      : resourceService.getResources({ page_size: 20 }),
  });

  const { data: awards, isLoading: loadingAwards } = useQuery({
    queryKey: ['awards'],
    queryFn: () => awardService.getAwards({ page_size: 20 }),
  });

  const { data: feedback, isLoading: loadingFeedback } = useQuery({
    queryKey: ['feedback'],
    queryFn: () => feedbackService.getFeedback({ page_size: 20 }),
  });

  // Delete mutations
  const deleteOpportunityMutation = useMutation({
    mutationFn: opportunityService.deleteOpportunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      toast({ title: "Opportunity deleted successfully" });
    },
  });

  const deleteResourceMutation = useMutation({
    mutationFn: resourceService.deleteResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      toast({ title: "Resource deleted successfully" });
    },
  });

  const deleteAwardMutation = useMutation({
    mutationFn: awardService.deleteAward,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awards'] });
      toast({ title: "Award deleted successfully" });
    },
  });

  const deleteFeedbackMutation = useMutation({
    mutationFn: feedbackService.deleteFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
      toast({ title: "Feedback deleted successfully" });
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TeachEra Admin Dashboard</h1>
          <p className="text-gray-600">Manage opportunities, resources, awards, and feedback</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search across all content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Opportunities</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{opportunities?.count || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resources?.count || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Awards</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{awards?.count || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{feedback?.count || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="awards">Awards</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="opportunities" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Opportunities Management</h2>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Opportunity
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {opportunities?.results?.map((opportunity) => (
                      <TableRow key={opportunity.id}>
                        <TableCell className="font-medium">{opportunity.title}</TableCell>
                        <TableCell>{opportunity.organization}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{opportunity.category}</Badge>
                        </TableCell>
                        <TableCell>{opportunity.location}</TableCell>
                        <TableCell>
                          {opportunity.urgent && <Badge variant="destructive">Urgent</Badge>}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => deleteOpportunityMutation.mutate(opportunity.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Resources Management</h2>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Resource
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resources?.results?.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell className="font-medium">{resource.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{resource.type}</Badge>
                        </TableCell>
                        <TableCell>{resource.category}</TableCell>
                        <TableCell>
                          {resource.is_free ? (
                            <Badge variant="secondary">Free</Badge>
                          ) : (
                            `$${resource.price}`
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => deleteResourceMutation.mutate(resource.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="awards" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Awards Management</h2>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Award
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {awards?.results?.map((award) => (
                <Card key={award.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {award.title}
                      <Badge variant="outline">{award.type}</Badge>
                    </CardTitle>
                    <CardDescription>{award.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {award.nomination_deadline && `Deadline: ${new Date(award.nomination_deadline).toLocaleDateString()}`}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteAwardMutation.mutate(award.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Feedback Management</h2>
            </div>
            
            <div className="space-y-4">
              {feedback?.results?.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {item.user.first_name} {item.user.last_name}
                        </CardTitle>
                        <CardDescription>
                          {item.type} • {new Date(item.created_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={item.is_public ? "default" : "secondary"}>
                          {item.is_public ? "Public" : "Private"}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteFeedbackMutation.mutate(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{item.message}</p>
                    {item.category && (
                      <Badge variant="outline" className="mt-2">{item.category}</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
