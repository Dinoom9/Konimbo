'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { categories } from '@/config/config';

/**
 * Sort options for item ordering
 * Contains both value for internal use and label for display
 */
const sortOptions = [
  { value: 'name-asc', label: 'שם פריט (א-ת)' },
  { value: 'name-desc', label: 'שם פריט (ת-א)' },
  { value: 'price-asc', label: 'מחיר (נמוך לגבוה)' },
  { value: 'price-desc', label: 'מחיר (גבוה לנמוך)' }
];

/**
 * SearchAndFilters Component
 * 
 * URL-based filtering component that:
 * - Reads initial values from URL search parameters
 * - Updates URL when filters change (triggers page refresh and new server fetch)
 * - Maintains filter state in URL, making it shareable and bookmark-able
 * - Triggers automatic re-fetching of filtered data from server
 * 
 * This approach eliminates the need for complex state management
 * and relies on Next.js server-side rendering for data fetching.
 */
export default function SearchAndFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize state from URL parameters
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sortBy, setSortBy] = useState(() => {
    const sortByParam = searchParams.get('sortBy');
    const sortOrderParam = searchParams.get('sortOrder');
    return sortByParam && sortOrderParam ? `${sortByParam}-${sortOrderParam}` : '';
  });

  /**
   * Update URL with current filter values
   * This triggers a page navigation and fresh server fetch with filtered data
   */
  const updateURL = () => {
    const params = new URLSearchParams();
    
    // Add search parameter if not empty
    if (search.trim()) {
      params.set('search', search.trim());
    }
    
    // Add category parameter if selected
    if (category) {
      params.set('category', category);
    }
    
    // Add price range parameters if valid
    if (minPrice && Number(minPrice) > 0) {
      params.set('minPrice', minPrice);
    }
    
    if (maxPrice && Number(maxPrice) > 0) {
      params.set('maxPrice', maxPrice);
    }
    
    // Add sort parameters if selected
    if (sortBy) {
      const [field, order] = sortBy.split('-');
      params.set('sortBy', field);
      params.set('sortOrder', order);
    }
    
    // Navigate to updated URL (triggers server fetch)
    const newUrl = params.toString() ? `/?${params.toString()}` : '/';
    router.push(newUrl);
  };

  /**
   * Debounced effect to update URL when filters change
   * Uses 500ms delay to prevent excessive navigation during typing
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      updateURL();
    }, 500); // 500ms debounce for better UX

    return () => clearTimeout(timer);
  }, [search, category, minPrice, maxPrice, sortBy]);

  /**
   * Clear all filters by navigating to base URL
   */
  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('');
    router.push('/'); // Navigate to clean URL
  };

  // Check if any filters are currently active
  const hasActiveFilters = search || category || minPrice || maxPrice || sortBy;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">חיפוש וסינון</h2>
      
      {/* Filter controls grid - responsive layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search input field */}
        <div>
          <Label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            חיפוש
          </Label>
          <Input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="חפש פריט..."
          />
        </div>

        {/* Minimum price input */}
        <div>
          <Label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-2">
            מחיר מינימלי
          </Label>
          <Input
            id="minPrice"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="0"
            min="0"
          />
        </div>

        {/* Maximum price input */}
        <div>
          <Label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-2">
            מחיר מקסימלי
          </Label>
          <Input
            id="maxPrice"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="∞"
            min="0"
          />
        </div>

        {/* Category select dropdown */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            קטגוריה
          </Label>
          <Select value={category || "all"} onValueChange={(value) => setCategory(value === "all" ? '' : value)}>
            <SelectTrigger className="h-10 px-3 py-2 w-full" dir="rtl">
              <SelectValue placeholder="כל הקטגוריות" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="all">כל הקטגוריות</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort options dropdown */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            מיון לפי
          </Label>
          <Select value={sortBy || "none"} onValueChange={(value) => setSortBy(value === "none" ? '' : value)}>
            <SelectTrigger className="h-10 px-3 py-2 w-full" dir="rtl">
              <SelectValue placeholder="ללא מיון" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="none">ללא מיון</SelectItem>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Clear filters button - only shown when filters are active */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t">
          <Button
            onClick={clearFilters}
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-800 hover:bg-red-50"
          >
            נקה כל הפילטרים
          </Button>
        </div>
      )}
    </div>
  );
}
