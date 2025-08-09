import { apiClient } from "@/lib/api";
import { CreateUser } from "@/types/api";

export const signUp = async (data: CreateUser): Promise<any> => {
  try {
    const response = await apiClient.post("/signup/", data);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};