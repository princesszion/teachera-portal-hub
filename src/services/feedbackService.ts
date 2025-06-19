
import { apiClient } from '@/lib/api';
import { Feedback, ApiResponse } from '@/types/api';

export const feedbackService = {
  // Submit feedback
  submitFeedback: async (data: { message: string; type: string; category?: string }): Promise<Feedback> => {
    return apiClient.post<Feedback>('/feedback/', data);
  },

  // Get public discussions
  getDiscussions: async (): Promise<ApiResponse<Feedback>> => {
    return apiClient.get<ApiResponse<Feedback>>('/feedback/?is_public=true&type=discussion');
  },

  // Get feedback by type
  getFeedbackByType: async (type: string): Promise<ApiResponse<Feedback>> => {
    return apiClient.get<ApiResponse<Feedback>>(`/feedback/?type=${type}`);
  }
};
