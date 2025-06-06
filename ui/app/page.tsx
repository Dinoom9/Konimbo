import { Suspense } from 'react';
import ItemsGrid from '@/components/ItemsGrid';
import Loading from '@/components/Loading';
import { fetchItemsAction } from '@/actions/items.action';
import { processSearchParams } from '@/lib/utils';


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
  // Await searchParams before using its properties
  const params = await searchParams;
  
  // Process search parameters into filters object
  const filters = processSearchParams(params);

  let initialData;
  let error = null;

  try {
    initialData = await fetchItemsAction(filters);
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
