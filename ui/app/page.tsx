import { Suspense } from 'react';
import { fetchItems } from '@/lib/api';
import ItemsGrid from '@/components/ItemsGrid';
import Loading from '@/components/Loading';


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

// This page uses SSR
export default async function HomePage({ searchParams }: PageProps) {
  const filters = {
    ...(searchParams.search && { search: searchParams.search }),
    ...(searchParams.category && { category: searchParams.category }),
    ...(searchParams.minPrice && { minPrice: Number(searchParams.minPrice) }),
    ...(searchParams.maxPrice && { maxPrice: Number(searchParams.maxPrice) }),
    ...(searchParams.sortBy && searchParams.sortOrder && {
      sort: {
        field: searchParams.sortBy as keyof import('@/types').Item,
        order: searchParams.sortOrder as 'asc' | 'desc'
      }
    }),
  };

  let initialData;
  let error = null;

  try {
    initialData = await fetchItems(filters);
    console.log('Initial data from API:', initialData);
  } catch (err) {
    console.error('Error fetching items:', err);
    error = err instanceof Error ? err.message : 'אירעה שגיאה בטעינת הפריטים';
    initialData = { items: [], total: 0, page: 1, limit: 10 };
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          רשימת הפריטים
        </h1>
        <p className="text-gray-600">
          ניהול וחיפוש פריטים בקלות
        </p>
      </div>

      <Suspense fallback={<Loading />}>
        <ItemsGrid initialData={initialData} initialError={error} />
      </Suspense>
    </div>
  );
}
