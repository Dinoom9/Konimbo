export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  inStock?: boolean;
}

export interface UpdateItemRequest {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  inStock?: boolean;
} 