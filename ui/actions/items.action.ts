'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { FilterOptions, Item, ItemFormData, ItemsResponse } from "@/types";
import { buildQueryParams, sortItems, formatItemsResponse, buildUrlWithQuery } from "@/lib/utils";
import { X } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}


// connect to the server
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    console.log('🔍 Response:', response);

    if (!response.ok) {
      throw new ApiError(response.status, `API Error: ${response.statusText}`);
    }
    
    // Handle empty responses (like DELETE requests that return 204 No Content)
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      // For DELETE requests or empty responses, return null
      return null as T;
    }
    
    const text = await response.text();
    if (!text.trim()) {
      // Empty response body
      return null as T;
    }
    
    const data = JSON.parse(text);
    console.log('🔍 Data:', data);
    return data as T;
  } catch (error) {
    console.error('API Request Error:', error);
    console.error('Failed URL:', url);
    
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

// Server Actions for Items
export async function fetchItemsAction(filters?: FilterOptions): Promise<ItemsResponse> {
  const queryParams = buildQueryParams(filters);
  const url = buildUrlWithQuery('/items', queryParams);
  
  console.log('🔍 Fetching items with URL:', `${BASE_URL}${url}`);
  console.log('📋 Filters:', filters);
  
  const response = await apiRequest<any>(url);
  
  console.log('📦 API Response:', response);
  
  // Format the response to ensure correct structure
  let result = formatItemsResponse(response);
  
  // If no sorting from server, apply client-side sorting as fallback
  if (filters?.sort && Array.isArray(result.items)) {
    result.items = sortItems(result.items, filters.sort);
  }
  
  console.log('✅ Formatted result:', result);
  
  return result;
}
// get an item by id
export async function fetchItemByIdAction(id: number): Promise<Item> {
  return apiRequest<Item>(`/items/${id}`);
}
// create an item
export async function createItemAction(data: ItemFormData) {
  try {
    const item = await apiRequest<Item>('/items', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    revalidatePath('/');
    redirect('/');
  } catch (error) {
    throw error;
  }
}
// update an item
export async function updateItemAction(id: number, data: ItemFormData) {
  try {
    const item = await apiRequest<Item>(`/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    
    revalidatePath('/');
    revalidatePath(`/items/${id}`);
    redirect('/');
  } catch (error) {
    throw error;
  }
}
// delete an item
export async function deleteItemAction(id: number) {
  console.log('🗑️ Deleting item with ID:', id);
  try {
    const result = await apiRequest(`/items/${id}`, { method: 'DELETE' });
    console.log('✅ Item deleted successfully');
    
    revalidatePath('/');
    return result;
  } catch (error) {
    console.error('❌ Error deleting item:', error);
    throw error;
  }
}

export { ApiError };
