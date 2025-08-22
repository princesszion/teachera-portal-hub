
// TypeScript interfaces for API data models

import { apiClient } from "@/lib/api";
import { ReactNode } from "react";

// export interface Opportunity {
//   id: number;
//   title: string;
//   organization: string;
//   type: string;
//   category: 'jobs' | 'fellowship' | 'research' | 'awards';
//   location: string;
//   eligibility?: string;
//   benefits?: string;
//   description?: string;
//   process?: string;
//   posted: string;
//   deadline?: string;
//   urgent: boolean;
//   created_at: string;
//   updated_at: string;
// }
export interface Opportunity {
  type: string;
  created_at: any;
  id: number;
  title: string;
  description?: string;
  organization: string;
  deadline?: string;
  post_date: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  eligibility?: string;
  benefits?: string;
  process?: string;
  location: string;
  is_active: boolean;
}
export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface User {
  name: string;
  email: string;
  // first_name: string;
  // last_name: string;
  // profile_picture?: string;
  // bio?: string;
  // is_verified: boolean;
}

export interface Resource {
  uploader_name: string;
  file_url: string;
  id: number;
  title: string;
  description: string;
  category: string;
  type: 'toolkit' | 'course' | 'service' | 'data' | 'survey' | 'marketplace';
  url?: string;
  price?: number;
  is_free: boolean;
  created_at: string;
  updated_at: string;
}

export interface Award {
  nomination_deadline: string;
  title: ReactNode;
  type: ReactNode;
  description: ReactNode;
  id: number;
  nominee_name: string;
  nominee_email?: string;
  nominee_institution: string;
  category: string;
  rationale: string;
  nominated_by_name: string;
  nominated_by_email?: string;
  submitted_at: string;
  approved: boolean;
}


export interface Feedback {
  id: number;
  user: User;
  message: string;
  type: 'feedback' | 'prompt' | 'discussion';
  category?: string;
  is_public: boolean;
  replies?: Feedback[];
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  results: T[];
  count: number;
  next?: string;
  previous?: string;
}

export interface PaginationParams {
  page?: number;
  page_size?: number;
  search?: string;
  category?: string;
  ordering?: string;
}

// Create/Update interfaces
export interface CreateOpportunity {
  title: string;
  organization: string;
  type: string;
  category: 'jobs' | 'fellowship' | 'research' | 'awards';
  location: string;
  eligibility?: string;
  benefits?: string;
  description?: string;
  process?: string;
  deadline?: string;
  urgent?: boolean;
}

export interface CreateResource {
  title: string;
  description: string;
  category: string;
  type: 'toolkit' | 'course' | 'service' | 'data' | 'survey' | 'marketplace';
  url?: string;
  price?: number;
  is_free?: boolean;
}

// export interface CreateAward {
//   title: string;
//   type: 'monthly' | 'yearly' | 'special';
//   description: string;
//   criteria: string;
//   nomination_deadline?: string;
// }

export interface CreateFeedback {
  message: string;
  type: 'feedback' | 'prompt' | 'discussion';
  category?: string;
  is_public?: boolean;
}
export interface CreateUser  {
  name: string;
  email: string;
  password: string;
}
export type CreateAward = {
  nominee_name: string;
  nominee_email?: string;
  nominee_institution: string;
  category: "Teacher of the Month" | "Teacher of the Year" | "Other";
  rationale: string;
  nominated_by_name: string;
  nominated_by_email?: string;
};
createNomination: async (data: CreateAward): Promise<any> => {
  console.log("Submitting nomination:", data);
  return apiClient.post('/nominations/nominees/', data);
};
export interface CreateUser {
  name: string;
  email: string;
  password: string;
}