'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useItems } from '@/context/ItemsContext';
import SearchAndFilters from './SearchAndFilters';
import ItemCard from './ItemCard';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import { ItemsResponse } from '@/types';
import { deleteItemAction, fetchItemsAction } from '@/actions/items.action';

interface ItemsGridProps {
  initialData: ItemsResponse;
  initialError: string | null;
}

export default function ItemsGrid({ initialData, initialError }: ItemsGridProps) {
  const { state, dispatch } = useItems();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInitialized = useRef(false);

  // Initialize with server data
  useEffect(() => {
    if (initialError) {
      dispatch({ type: 'SET_ERROR', payload: initialError });
    } else if (initialData && initialData.items) {
      dispatch({
        type: 'SET_ITEMS',
        payload: {
          items: initialData.items || [],
          total: initialData.total || 0,
          page: initialData.page || 1,
        },
      });
    }
    isInitialized.current = true;
  }, [initialData, initialError, dispatch]);

  const loadItems = useCallback(async () => {
    console.log('🔄 Loading items with filters:', state.filters);
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const response = await fetchItemsAction(state.filters);
      console.log('📥 Received items:', response.items?.length || 0, 'items');
      dispatch({
        type: 'SET_ITEMS',
        payload: {
          items: response.items || [],
          total: response.total || 0,
          page: response.page || 1,
        },
      });
    } catch (error) {
      console.error('❌ Error loading items:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'אירעה שגיאה בטעינת הפריטים',
      });
    }
  }, [state.filters, dispatch]);

  const handleFiltersChange = useCallback(
    (filters: any) => {
      console.log('🎛️ Filters changed:', filters);
      dispatch({ type: 'SET_FILTERS', payload: filters });
      
      // Update URL search params
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (key === 'sort' && typeof value === 'object' && value) {
            // Handle sort object
            const sortValue = value as { field: string; order: string };
            params.set('sortBy', sortValue.field);
            params.set('sortOrder', sortValue.order);
          } else {
            params.set(key, String(value));
          }
        }
      });
      
      const newUrl = params.toString() ? `/?${params.toString()}` : '/';
      console.log('🔗 Updating URL to:', newUrl);
      router.push(newUrl);
    },
    [dispatch, router]
  );

  const handleDeleteItem = useCallback(
    async (id: number) => {
      console.log('🗑️ Starting delete process for item:', id);
      try {
        await deleteItemAction(id);
        console.log('✅ Delete API call successful, updating state');
        dispatch({ type: 'DELETE_ITEM', payload: id });
        console.log('✅ State updated, item removed from list');
      } catch (error) {
        console.error('❌ Delete failed:', error);
        dispatch({
          type: 'SET_ERROR',
          payload: error instanceof Error ? error.message : 'אירעה שגיאה במחיקת הפריט',
        });
      }
    },
    [dispatch]
  );

  // Load items when filters change
  useEffect(() => {
    // Only load items after initialization and when filters actually change
    if (isInitialized.current) {
      loadItems();
    }
  }, [state.filters, loadItems]);

  const initialFilters = {
    search: searchParams.get('search') || undefined,
    category: searchParams.get('category') || undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    sort: searchParams.get('sortBy') && searchParams.get('sortOrder') ? {
      field: searchParams.get('sortBy') as keyof import('@/types').Item,
      order: searchParams.get('sortOrder') as 'asc' | 'desc'
    } : undefined,
  };

  return (
    <div>
      <SearchAndFilters
        onFiltersChange={handleFiltersChange}
        initialFilters={initialFilters}
      />

      {state.error && (
        <ErrorMessage
          message={state.error}
          onRetry={loadItems}
        />
      )}

      {state.loading && <Loading />}

      {!state.loading && !state.error && (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-600">
              נמצאו {state.total} פריטים
            </div>
          </div>

          {!state.items || state.items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">
                לא נמצאו פריטים
              </div>
              <p className="text-gray-400 mb-6">
                נסה לשנות את הפילטרים או להוסיף פריט חדש
              </p>
              <a
                href="/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                הוסף פריט ראשון
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.items && state.items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onDelete={handleDeleteItem}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
} 