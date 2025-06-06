'use client';

import { FilterOptions, Item, SortOptions } from '@/types';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface ItemsState {
  items: Item[];
  loading: boolean;
  error: string | null;
  filters: FilterOptions;
  sort: SortOptions;
  total: number;
  page: number;
}

type ItemsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ITEMS'; payload: { items: Item[]; total: number; page: number } }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_FILTERS'; payload: FilterOptions }
  | { type: 'SET_SORT'; payload: SortOptions }
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'UPDATE_ITEM'; payload: Item }
  | { type: 'DELETE_ITEM'; payload: number };

const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
  filters: {},
  sort: { field: 'createdAt', order: 'desc' },
  total: 0,
  page: 1,
};

function itemsReducer(state: ItemsState, action: ItemsAction): ItemsState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
        page: action.payload.page,
        loading: false,
        error: null,
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'SET_SORT':
      return { ...state, sort: action.payload };
    case 'ADD_ITEM':
      return {
        ...state,
        items: [action.payload, ...state.items],
        total: state.total + 1,
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - 1,
      };
    default:
      return state;
  }
}

interface ItemsContextType {
  state: ItemsState;
  dispatch: React.Dispatch<ItemsAction>;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export function ItemsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(itemsReducer, initialState);

  return (
    <ItemsContext.Provider value={{ state, dispatch }}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemsContext);
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
} 