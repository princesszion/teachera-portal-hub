
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Opportunity } from "@/types/api";

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

export const useOpportunities = (selectedCategory: string) => {
  return useQuery({
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
};

export const useResources = () => {
  return useQuery({
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
};

export const useAwards = () => {
  return useQuery({
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
};

export const useDiscussions = () => {
  return useQuery({
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
};
