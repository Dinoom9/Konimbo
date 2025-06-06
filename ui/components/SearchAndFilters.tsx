'use client';

import { useState, useEffect } from 'react';
import { FilterOptions, SortOptions } from '@/types';

interface SearchAndFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

const categories = [
  'חלב ומוצרי חלב',
  'לחם ומאפים',
  'פירות וירקות',
  'בשר ועוף',
  'שמנים ותבלינים',
  'אורז ופסטה'
];

const sortOptions = [
  { value: '', label: 'ללא מיון' },
  { value: 'name-asc', label: 'שם פריט (א-ת)' },
  { value: 'name-desc', label: 'שם פריט (ת-א)' },
  { value: 'price-asc', label: 'מחיר (נמוך לגבוה)' },
  { value: 'price-desc', label: 'מחיר (גבוה לנמוך)' }
];

export default function SearchAndFilters({ onFiltersChange, initialFilters = {} }: SearchAndFiltersProps) {
  const [search, setSearch] = useState(initialFilters.search || '');
  const [category, setCategory] = useState(initialFilters.category || '');
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice?.toString() || '');
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice?.toString() || '');
  const [sortBy, setSortBy] = useState(() => {
    if (initialFilters.sort) {
      return `${initialFilters.sort.field}-${initialFilters.sort.order}`;
    }
    return '';
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const filters: FilterOptions = {};
      
      // Always include all filter values, even if empty (for clearing)
      const searchValue = search.trim();
      if (searchValue) {
        filters.search = searchValue;
      }
      
      if (category) {
        filters.category = category;
      }
      
      const minPriceValue = minPrice ? Number(minPrice) : null;
      if (minPriceValue && !isNaN(minPriceValue) && minPriceValue > 0) {
        filters.minPrice = minPriceValue;
      }
      
      const maxPriceValue = maxPrice ? Number(maxPrice) : null;
      if (maxPriceValue && !isNaN(maxPriceValue) && maxPriceValue > 0) {
        filters.maxPrice = maxPriceValue;
      }

      // Add sort options
      if (sortBy) {
        const [field, order] = sortBy.split('-');
        filters.sort = {
          field: field as keyof import('@/types').Item,
          order: order as 'asc' | 'desc'
        };
      }
      
      onFiltersChange(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, category, minPrice, maxPrice, sortBy, onFiltersChange]);

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">חיפוש וסינון</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* חיפוש */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            חיפוש
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="חפש פריט..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* קטגוריה */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            קטגוריה
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">כל הקטגוריות</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* מיון */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            מיון לפי
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* מחיר מינימלי */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            מחיר מינימלי
          </label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="0"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* מחיר מקסימלי */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            מחיר מקסימלי
          </label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="∞"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {(search || category || minPrice || maxPrice || sortBy) && (
        <div className="mt-4 pt-4 border-t">
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
          >
            נקה כל הפילטרים
          </button>
        </div>
      )}
    </div>
  );
} 