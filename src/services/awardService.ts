
import { apiClient } from '@/lib/api';
import { Award, ApiResponse, PaginationParams, CreateAward } from '@/types/api';

export const awardService = {
  // Get all awards with pagination and filtering
  getAwards: async (params?: PaginationParams): Promise<ApiResponse<Award>> => {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.page_size) searchParams.append('page_size', params.page_size.toString());
    if (params?.search) searchParams.append('search', params.search);
    if (params?.ordering) searchParams.append('ordering', params.ordering);

    const endpoint = `/awards/${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    return apiClient.get<ApiResponse<Award>>(endpoint);
  },

  // Get a single award by ID
  getAward: async (id: number): Promise<Award> => {
    return apiClient.get<Award>(`/awards/${id}/`);
  },

  // Create a new award
  createAward: async (data: CreateAward): Promise<Award> => {
    return apiClient.post<Award>('/awards/', data);
  },

  // Update an award
  updateAward: async (id: number, data: Partial<CreateAward>): Promise<Award> => {
    return apiClient.put<Award>(`/awards/${id}/`, data);
  },

  // Delete an award
  deleteAward: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`/awards/${id}/`);
  },

  // Get awards by type
  getAwardsByType: async (type: string): Promise<ApiResponse<Award>> => {
    return apiClient.get<ApiResponse<Award>>(`/awards/?type=${type}`);
  },

  // Get current awards (active nominations)
  getCurrentAwards: async (): Promise<ApiResponse<Award>> => {
    return apiClient.get<ApiResponse<Award>>('/awards/?status=active');
  },

  // Nominate for an award (if you have nomination endpoint)
  nominateForAward: async (awardId: number, nomineeData: any): Promise<any> => {
    return apiClient.post<any>(`/awards/${awardId}/nominate/`, nomineeData);
  }
};
