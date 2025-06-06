export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  inStock: boolean;
}

export interface ItemFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
}

export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: SortOptions;
}

export interface SortOptions {
  field: keyof Item;
  order: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ItemsResponse {
  items: Item[];
  total: number;
  page: number;
  limit: number;
} 


