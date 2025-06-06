import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { FilterOptions, Item, ItemsResponse, SortOptions } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * בונה URLSearchParams מאובייקט filters
 */
export function buildQueryParams(filters?: FilterOptions): URLSearchParams {
  const queryParams = new URLSearchParams();
  
  if (filters?.search) queryParams.append('search', filters.search);
  if (filters?.category) queryParams.append('category', filters.category);
  if (filters?.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
  if (filters?.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());
  if (filters?.sort) {
    queryParams.append('sortBy', filters.sort.field);
    queryParams.append('sortOrder', filters.sort.order);
  }
  
  return queryParams;
}

/**
 * מבצע sorting על מערך פריטים לפי הפרמטרים שניתנו
 */
export function sortItems<T extends Record<string, any>>(
  items: T[], 
  sortOptions: SortOptions
): T[] {
  return [...items].sort((a, b) => {
    const field = sortOptions.field;
    const order = sortOptions.order;
    
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

/**
 * מעצב תוצאת API לפורמט ItemsResponse תקני
 */
export function formatItemsResponse(response: any): ItemsResponse {
  // Handle null or undefined response
  if (!response) {
    return {
      items: [],
      total: 0,
      page: 1,
      limit: 10
    };
  }
  
  let items = response.items || response || [];
  
  // Ensure items is always an array
  if (!Array.isArray(items)) {
    items = [];
  }
  
  return {
    items: items,
    total: response.total || items.length,
    page: response.page || 1,
    limit: response.limit || 10
  };
}

/**
 * בונה URL עם query parameters אם קיימים
 */
export function buildUrlWithQuery(baseUrl: string, queryParams: URLSearchParams): string {
  const queryString = queryParams.toString();
  return `${baseUrl}${queryString ? `?${queryString}` : ''}`;
}


// format price
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS'
  }).format(price);
};

// format date
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};