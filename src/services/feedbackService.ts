
import { apiClient } from '@/lib/api';
import { Feedback, ApiResponse, CreateFeedback, PaginationParams } from '@/types/api';

export const feedbackService = {
  // Get all feedback with pagination and filtering
  getFeedback: async (params?: PaginationParams): Promise<ApiResponse<Feedback>> => {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.page_size) searchParams.append('page_size', params.page_size.toString());
    if (params?.search) searchParams.append('search', params.search);
    if (params?.category) searchParams.append('category', params.category);
    if (params?.ordering) searchParams.append('ordering', params.ordering);

    const endpoint = `/feedback/${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    return apiClient.get<ApiResponse<Feedback>>(endpoint);
  },

  // Get a single feedback by ID
  getFeedbackById: async (id: number): Promise<Feedback> => {
    return apiClient.get<Feedback>(`/feedback/${id}/`);
  },

  // Submit feedback
  submitFeedback: async (data: CreateFeedback): Promise<Feedback> => {
    return apiClient.post<Feedback>('/feedback/', data);
  },

  // Update feedback
  updateFeedback: async (id: number, data: Partial<CreateFeedback>): Promise<Feedback> => {
    return apiClient.put<Feedback>(`/feedback/${id}/`, data);
  },

  // Delete feedback
  deleteFeedback: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`/feedback/${id}/`);
  },

  // Get public discussions
  getDiscussions: async (): Promise<ApiResponse<Feedback>> => {
    return apiClient.get<ApiResponse<Feedback>>('/feedback/?is_public=true&type=discussion');
  },

  // Get feedback by type
  getFeedbackByType: async (type: string): Promise<ApiResponse<Feedback>> => {
    return apiClient.get<ApiResponse<Feedback>>(`/feedback/?type=${type}`);
  },

  // Reply to feedback (if you have nested replies)
  replyToFeedback: async (parentId: number, data: CreateFeedback): Promise<Feedback> => {
    return apiClient.post<Feedback>(`/feedback/${parentId}/reply/`, data);
  },

  // Get recent feedback
  getRecentFeedback: async (limit: number = 10): Promise<ApiResponse<Feedback>> => {
    return apiClient.get<ApiResponse<Feedback>>(`/feedback/?ordering=-created_at&page_size=${limit}`);
  }
};
