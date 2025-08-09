import { useState } from "react";
import Header from "@/components/Header";
import Join from "@/components/Join";
import Footer from "@/components/Footer";
import { useOpportunities, useResources, useAwards, useDiscussions } from "@/hooks/useTeachEraData";

const JoinPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch data using custom hooks
  const { data: opportunitiesData, isLoading, error } = useOpportunities(selectedCategory);
  const { data: resourcesData } = useResources();
  const { data: awardsData } = useAwards();
  const { data: discussionsData } = useDiscussions();

  // Use API data if available, otherwise use mock data
  const opportunities = opportunitiesData?.results || [];
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
      <Header />
      <Join />
      <Footer />
    </div>
  );
};

export default JoinPage;
