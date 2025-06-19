
import { apiClient } from '@/lib/api';
import { Resource, ApiResponse } from '@/types/api';

export const resourceService = {
  // Get all resources
  getResources: async (): Promise<ApiResponse<Resource>> => {
    return apiClient.get<ApiResponse<Resource>>('/resources/');
  },

  // Get resource by ID
  getResource: async (id: number): Promise<Resource> => {
    return apiClient.get<Resource>(`/resources/${id}/`);
  },

  // Get resources by category
  getResourcesByCategory: async (category: string): Promise<ApiResponse<Resource>> => {
    return apiClient.get<ApiResponse<Resource>>(`/resources/?category=${category}`);
  }
};
