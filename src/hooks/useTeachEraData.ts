
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Opportunity } from "@/types/api";
import type { Category } from "@/types/api";

import { opportunityService } from "@/services/opportunityService";
import { resourceService } from "@/services/resourceService";
import { awardService } from "@/services/awardService";
import { feedbackService } from "@/services/feedbackService";


function formatPostedDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
}


export const useOpportunityCategories = () => {
  return useQuery({
    queryKey: ["opportunity-categories"],
    queryFn: async (): Promise<Category[]> => {
      const resp = await opportunityService.getCategories(); // ApiResponse<Category>
      return resp.results ?? []; // <- read results here
    },
    staleTime: 5 * 60 * 1000,
  });
};
export const useOpportunities = (selectedCategory: string) => {
  return useQuery({
    queryKey: ['opportunities', selectedCategory],
    queryFn: async () => {
      let data;

      if (!opportunityService) {
        console.warn("Backend service not available – fallback to empty array.");
        return { results: [] };
      }

      try {
        data =
          selectedCategory === "all"
            ? await opportunityService.getRecentOpportunities(12)
            : await opportunityService.getOpportunitiesByCategory(selectedCategory);
      } catch (error) {
        console.error("API call failed, fallback:", error);
        return { results: [] };
      }

      // 🔄 Normalize & map backend fields to expected frontend format
  const transformed = data.results.map((item: any) => ({
  id: item.id,
  title: item.title,
  organization: item.organization || "Not specified",
  type: item.type || item.opportunity_type || "Other",
  category: item.category, // ✅ keep { id, name, slug }
  location: item.location,
  description: item.description || "No description provided",
  eligibility: item.eligibility || "No eligibility criteria specified",
  benefits: item.benefits || "No benefits specified",
  process: item.process || "No application process specified",
  deadline: item.deadline || null,
  posted: formatPostedDate(item.post_date),
  urgent: item.urgent || false,
  created_at: item.created_at || "",
  updated_at: item.updated_at || "",
}));
      return { ...data, results: transformed };
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


// export const useOpportunityCategories = () => {
//   return useQuery({
//     queryKey: ['opportunity-categories'],
//     queryFn: async () => {
//       if (!opportunityService) return { results: [] };
//       try {
//         const response = await opportunityService.getCategories();
//         return response.results || response;
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         return [];
//       }
//     },
//     retry: false,
//   });
// };