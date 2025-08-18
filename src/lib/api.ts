
// API client configuration for Django backend integration

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;

interface ApiResponse<T> {
  results: T[];
  count: number;
  next?: string;
  previous?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // async post<T>(endpoint: string, data: any): Promise<T> {
  //   return this.request<T>(endpoint, {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //   });
  // }
  async post(url: string, data: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        console.error("🔥 API Validation Error:", errorData); // 👈 See which field failed
        errorMessage += ` | Details: ${JSON.stringify(errorData)}`;
      } catch (e) {
        console.error("❌ Could not parse error response");
      }

      throw new Error(errorMessage);
    }

    return response.json();
};


  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

async delete<T>(endpoint: string): Promise<T> {
  return this.request<T>(endpoint, { method: 'DELETE' });
}

}

export const apiClient = new ApiClient(API_BASE_URL);
export type { ApiResponse };

  