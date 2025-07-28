// services/nominationService.ts

import { apiClient } from '@/lib/api';
import { CreateAward } from '@/types/api';

export const nominationService = {
  // Submit nomination
  createNomination: async (data: CreateAward): Promise<any> => {
    return apiClient.post('/nominations/nominees/', data);
  },

  // Get latest approved Teacher of the Month
  getApprovedTeacherOfTheMonth: async (): Promise<any> => {
    const res = await apiClient.get(`/nominations/nominees/?category=Teacher%20of%20the%20Month&approved=true`);
    const data = res as { results?: any[] };
    return data.results?.[0] || null;
  },
  // Get latest approved Teacher of the Year
  getApprovedTeacherOfTheYear: async (): Promise<any> => {
    const res = await apiClient.get(`/nominations/nominees/?category=Teacher%20of%20the%20Year&approved=true`);
    const data = res as { results?: any[] };
    return data.results?.[0] || null;
  },
};
