
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

    const endpoint = `/nominations/nominees/${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    return apiClient.get<ApiResponse<Award>>(endpoint);
  },

  // Get a single award by ID
  getAward: async (id: number): Promise<Award> => {
    return apiClient.get<Award>(`/nominations/nominees/${id}/`);
  },

  // Create a new award
  createAward: async (data: CreateAward): Promise<Award> => {
    return apiClient.post('/nominations/nominees/', data);
  },

  // Update an award
  updateAward: async (id: number, data: Partial<CreateAward>): Promise<Award> => {
    return apiClient.put<Award>(`/nominations/nominees/${id}/`, data);
  },

  // Delete an award
  deleteAward: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`/nominations/nominees/${id}/`);
  },

  // Get awards by type
  getAwardsByType: async (type: string): Promise<ApiResponse<Award>> => {
    return apiClient.get<ApiResponse<Award>>(`/nominations/nominees/?type=${type}`);
  },

  // Get current awards (active nominations)
  getCurrentAwards: async (): Promise<ApiResponse<Award>> => {
    return apiClient.get<ApiResponse<Award>>('/nominations/nominees/?status=active');
  },
getApprovedTeacherOfTheMonth: async (): Promise<Award | null> => {
  const res = await apiClient.get<ApiResponse<Award>>(`/nominations/nominees/?category=Teacher%20of%20the%20Month&approved=true`);
  return res.results?.[0] || null;
}

  // Nominate for an award (if you have nomination endpoint)
  // nominateForAward: async (awardId: number, nomineeData: any): Promise<any> => {
  //   return apiClient.post<any>(`/nominations/nominees/${awardId}/nominate/`, nomineeData);
  // }
};
