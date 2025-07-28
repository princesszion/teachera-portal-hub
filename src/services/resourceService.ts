
import { apiClient } from '@/lib/api';
import { Resource, ApiResponse, PaginationParams, CreateResource } from '@/types/api';

export const resourceService = {
  // Get all resources with pagination and filtering
  getResources: async (params?: PaginationParams): Promise<ApiResponse<Resource>> => {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.page_size) searchParams.append('page_size', params.page_size.toString());
    if (params?.search) searchParams.append('search', params.search);
    if (params?.category) searchParams.append('category', params.category);
    if (params?.ordering) searchParams.append('ordering', params.ordering);

    const endpoint = `resources/resources/${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    return apiClient.get<ApiResponse<Resource>>(endpoint);
  },

  // Get a single resource by ID
  getResource: async (id: number): Promise<Resource> => {
    return apiClient.get<Resource>(`resources/resources/${id}/`);
  },

  // Create a new resource
  createResource: async (data: CreateResource): Promise<Resource> => {
    return apiClient.post<Resource>(`resources/resources/`, data);
  },

  // Update a resource
  updateResource: async (id: number, data: Partial<CreateResource>): Promise<Resource> => {
    return apiClient.put<Resource>(`resources/resources/${id}/`, data);
  },

  // Delete a resource
  deleteResource: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`resources/resources/${id}/`);
  },

  // Get resources by type
  getResourcesByType: async (type: string): Promise<ApiResponse<Resource>> => {
    return apiClient.get<ApiResponse<Resource>>(`resources/resources/?type=${type}`);
  },

  // Get free resources
  getFreeResources: async (): Promise<ApiResponse<Resource>> => {
    return apiClient.get<ApiResponse<Resource>>('resources/resources/?is_free=true');
  },

  // Get paid resources
  getPaidResources: async (): Promise<ApiResponse<Resource>> => {
    return apiClient.get<ApiResponse<Resource>>('resources/resources/?is_free=false');
  },

  // Search resources
  searchResources: async (query: string): Promise<ApiResponse<Resource>> => {
    return apiClient.get<ApiResponse<Resource>>(`resources/resources/?search=${encodeURIComponent(query)}`);
  }
};
