import { Suspense } from 'react';
import { fetchItemsAction } from '@/actions/items.action';
import SearchAndFilters from '@/components/SearchAndFilters';
import ItemCard from '@/components/ItemCard';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';
import { FilterOptions } from '@/types';

/**
 * Home Page Component
 * 
 * Server-side rendered page that:
 * - Reads filter parameters from URL search params
 * - Fetches filtered data directly from server
 * - Displays results without client-side state management
 * - Re-renders completely when URL changes (triggering new fetch)
 * 
 * This approach leverages Next.js server components and eliminates
 * the need for complex client-side state management.
 */

interface PageProps {
  searchParams: {
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    sortOrder?: string;
  };
}

/**
 * Server Component that fetches and displays items
 * Runs on the server for each navigation/URL change
 */
async function ItemsContent({ searchParams }: PageProps) {
  try {
    // Build filter object from URL search parameters
    const filters: FilterOptions = {};
    
    if (searchParams.search) {
      filters.search = searchParams.search;
    }
    
    if (searchParams.category) {
      filters.category = searchParams.category;
    }
    
    if (searchParams.minPrice) {
      const minPrice = Number(searchParams.minPrice);
      if (!isNaN(minPrice) && minPrice > 0) {
        filters.minPrice = minPrice;
      }
    }
    
    if (searchParams.maxPrice) {
      const maxPrice = Number(searchParams.maxPrice);
      if (!isNaN(maxPrice) && maxPrice > 0) {
        filters.maxPrice = maxPrice;
      }
    }
    
    if (searchParams.sortBy && searchParams.sortOrder) {
      filters.sort = {
        field: searchParams.sortBy as keyof import('@/types').Item,
        order: searchParams.sortOrder as 'asc' | 'desc'
      };
    }

    // Fetch items from server with filters applied
    console.log('🔄 Server: Fetching items with filters:', filters);
    const response = await fetchItemsAction(filters);
    
    const items = response.items || [];
    const total = response.total || 0;

    return (
      <>
        {/* Results summary */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            נמצאו {total} פריטים
          </div>
        </div>

        {/* Items display */}
        {items.length === 0 ? (
          // Empty state
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
          // Items grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                // Note: Delete functionality will need to be handled differently
                // since we don't have context anymore
              />
            ))}
          </div>
        )}
      </>
    );
  } catch (error) {
    console.error('❌ Error fetching items:', error);
    return (
      <ErrorMessage 
        message={error instanceof Error ? error.message : 'אירעה שגיאה בטעינת הפריטים'} 
      />
    );
  }
}

/**
 * Main Home Page
 * Combines search filters with server-fetched content
 */
export default function HomePage({ searchParams }: PageProps) {
  return (
    <div>
      {/* Client-side filters that update URL */}
      <SearchAndFilters />
      
      {/* Server-side content that re-renders on URL change */}
      <Suspense fallback={<Loading />}>
        <ItemsContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
