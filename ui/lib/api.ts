import { FilterOptions, Item, ItemFormData, ItemsResponse } from "@/types";



console.log('✅ API Base URL:', process.env.NEXT_PUBLIC_API_URL);
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
console.log('🌐 Final BASE_URL:', BASE_URL);


class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  console.log('🚀 Making API request to:', url);
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(response.status, `API Error: ${response.statusText}`);
    }

    // Check if response has content before trying to parse JSON
    const contentType = response.headers.get('content-type');
    const contentLength = response.headers.get('content-length');
    
    // If no content or content-length is 0, return empty object/null
    if (contentLength === '0' || response.status === 204) {
      return null as T;
    }
    
    // If response has JSON content, parse it
    if (contentType && contentType.includes('application/json')) {
      const text = await response.text();
      return text ? JSON.parse(text) : null as T;
    }
    
    // For non-JSON responses, return null
    return null as T;
  } catch (error) {
    console.error('❌ API Request Error:', error);
    console.error('🔗 Failed URL:', url);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle network errors (server not running, connection refused, etc.)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError(0, `Cannot connect to server at ${BASE_URL}. Make sure the server is running on port 3001.`);
    }
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      throw new ApiError(500, `Invalid JSON response: ${error.message}`);
    }
    
    throw new ApiError(500, `Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function fetchItems(filters?: FilterOptions): Promise<ItemsResponse> {
  const queryParams = new URLSearchParams();
  
  if (filters?.search) queryParams.append('search', filters.search);
  if (filters?.category) queryParams.append('category', filters.category);
  if (filters?.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
  if (filters?.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());
  if (filters?.sort) {
    queryParams.append('sortBy', filters.sort.field);
    queryParams.append('sortOrder', filters.sort.order);
  }
  
  const queryString = queryParams.toString();
  const url = `/items${queryString ? `?${queryString}` : ''}`;
  
  console.log('🔍 Fetching items with URL:', `${BASE_URL}${url}`);
  console.log('📋 Filters:', filters);
  
  const response = await apiRequest<any>(url);
  
  console.log('📦 API Response:', response);
  
  // If no sorting from server, apply client-side sorting as fallback
  let items = response.items || response || [];
  
  if (filters?.sort && Array.isArray(items)) {
    items = [...items].sort((a, b) => {
      const field = filters.sort!.field;
      const order = filters.sort!.order;
      
      let aValue = a[field];
      let bValue = b[field];
      
      // Handle string comparison (for name)
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) {
        return order === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  
  // Ensure the response has the correct format
  const result = {
    items: items,
    total: response.total || (response.items ? response.items.length : (Array.isArray(response) ? response.length : items.length)),
    page: response.page || 1,
    limit: response.limit || 10
  };
  
  console.log('✅ Formatted result:', result);
  
  return result;
}

export async function fetchItemById(id: number): Promise<Item> {
  return apiRequest<Item>(`/items/${id}`);
}

export async function createItem(data: ItemFormData): Promise<Item> {
  return apiRequest<Item>('/items', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateItem(id: number, data: ItemFormData): Promise<Item> {
  return apiRequest<Item>(`/items/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteItem(id: number): Promise<void> {
  console.log('🗑️ Deleting item with ID:', id);
  try {
    await apiRequest(`/items/${id}`, { method: 'DELETE' });
    console.log('✅ Item deleted successfully');
  } catch (error) {
    console.error('❌ Error deleting item:', error);
    throw error;
  }
}

export { ApiError };
