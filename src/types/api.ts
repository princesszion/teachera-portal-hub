
// TypeScript interfaces for API data models

export interface Opportunity {
  id: number;
  title: string;
  organization: string;
  type: string;
  category: 'jobs' | 'fellowship' | 'research' | 'awards';
  location: string;
  salary?: string;
  amount?: string;
  description?: string;
  requirements?: string;
  posted: string;
  deadline?: string;
  urgent: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture?: string;
  bio?: string;
  is_verified: boolean;
}

export interface Resource {
  id: number;
  title: string;
  description: string;
  category: string;
  type: 'toolkit' | 'course' | 'service' | 'data' | 'survey' | 'marketplace';
  url?: string;
  price?: number;
  is_free: boolean;
  created_at: string;
}

export interface Award {
  id: number;
  title: string;
  type: 'monthly' | 'yearly' | 'special';
  winner?: User;
  nominees?: User[];
  description: string;
  criteria: string;
  nomination_deadline?: string;
  created_at: string;
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
