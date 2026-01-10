const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://member-dashboard-platform-backend.onrender.com';

class ApiClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  getToken(): string | null {
    if (this.token) return this.token;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      this.setToken(null);
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Request failed' }));
      throw new Error(error.detail || 'Request failed');
    }

    return response.json();
  }

  // Auth
  async getMe() {
    return this.request<any>('/auth/me');
  }

  getGoogleAuthUrl() {
    return `${API_BASE_URL}/auth/google`;
  }

  // Users (read-only)
  async getUsers(params: { page?: number; page_size?: number; search?: string } = {}) {
    const query = new URLSearchParams();
    if (params.page) query.set('page', params.page.toString());
    if (params.page_size) query.set('page_size', params.page_size.toString());
    if (params.search) query.set('search', params.search);
    return this.request<any>(`/users?${query}`);
  }

  async getUser(id: string) {
    return this.request<any>(`/users/${id}`);
  }

  // Travel Data
  async getTravelData(params: { page?: number; page_size?: number; search?: string; country?: string; category?: string } = {}) {
    const query = new URLSearchParams();
    if (params.page) query.set('page', params.page.toString());
    if (params.page_size) query.set('page_size', params.page_size.toString());
    if (params.search) query.set('search', params.search);
    if (params.country) query.set('country', params.country);
    if (params.category) query.set('category', params.category);
    return this.request<any>(`/traveldata?${query}`);
  }

  async getTravelDataById(id: string) {
    return this.request<any>(`/traveldata/${id}`);
  }

  async createTravelData(data: any) {
    return this.request<any>('/traveldata', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTravelData(id: string, data: any) {
    return this.request<any>(`/traveldata/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTravelData(id: string) {
    return this.request<any>(`/traveldata/${id}`, {
      method: 'DELETE',
    });
  }

  // Packages
  async getPackages(params: { page?: number; page_size?: number; search?: string; country?: string; city?: string; category?: string } = {}) {
    const query = new URLSearchParams();
    if (params.page) query.set('page', params.page.toString());
    if (params.page_size) query.set('page_size', params.page_size.toString());
    if (params.search) query.set('search', params.search);
    if (params.country) query.set('country', params.country);
    if (params.city) query.set('city', params.city);
    if (params.category) query.set('category', params.category);
    return this.request<any>(`/packages?${query}`);
  }

  async getPackageById(id: string) {
    return this.request<any>(`/packages/${id}`);
  }

  async createPackage(data: any) {
    return this.request<any>('/packages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePackage(id: string, data: any) {
    return this.request<any>(`/packages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePackage(id: string) {
    return this.request<any>(`/packages/${id}`, {
      method: 'DELETE',
    });
  }

  // Upload
  async uploadImage(file: File) {
    const token = this.getToken();
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  }

  async deleteImage(filename: string) {
    return this.request<any>(`/upload/${filename}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient();
