
import { apiClient } from '@/lib/api';
import { Opportunity, ApiResponse, PaginationParams, CreateOpportunity } from '@/types/api';

export const opportunityService = {
  // Get all opportunities with pagination and filtering
  getOpportunities: async (params?: PaginationParams): Promise<ApiResponse<Opportunity>> => {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.page_size) searchParams.append('page_size', params.page_size.toString());
    if (params?.search) searchParams.append('search', params.search);
    if (params?.category) searchParams.append('category', params.category);
    if (params?.ordering) searchParams.append('ordering', params.ordering);

    const endpoint = `/opportunities/opportunities/${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    return apiClient.get<ApiResponse<Opportunity>>(endpoint);
  },

  // Get a single opportunity by ID
  getOpportunity: async (id: number): Promise<Opportunity> => {
    return apiClient.get<Opportunity>(`/opportunities/opportunities/${id}/`);
  },

  // Create a new opportunity
  createOpportunity: async (data: CreateOpportunity): Promise<Opportunity> => {
    return apiClient.post('/opportunities/opportunities/', data);
  },

  // Update an opportunity
  updateOpportunity: async (id: number, data: Partial<CreateOpportunity>): Promise<Opportunity> => {
    return apiClient.put<Opportunity>(`/opportunities/opportunities/${id}/`, data);
  },

  // Delete an opportunity
  deleteOpportunity: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`/opportunities/opportunities/${id}/`);
  },

  // Get recent opportunities (latest posted)
  getRecentOpportunities: async (limit: number = 10): Promise<ApiResponse<Opportunity>> => {
    return apiClient.get<ApiResponse<Opportunity>>(`/opportunities/opportunities/?ordering=-created_at&page_size=${limit}`);
  },

  // Get opportunities by category
  getOpportunitiesByCategory: async (category: string): Promise<ApiResponse<Opportunity>> => {
    return apiClient.get<ApiResponse<Opportunity>>(`/opportunities/opportunities/?category=${category}`);
  },

  // Search opportunities
  searchOpportunities: async (query: string): Promise<ApiResponse<Opportunity>> => {
    return apiClient.get<ApiResponse<Opportunity>>(`/opportunities/opportunities/?search=${encodeURIComponent(query)}`);
  },

  // Get urgent opportunities
  getUrgentOpportunities: async (): Promise<ApiResponse<Opportunity>> => {
    return apiClient.get<ApiResponse<Opportunity>>('/opportunities/opportunities/?urgent=true');
  }
};
