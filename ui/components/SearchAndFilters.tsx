'use client';

import { useState, useEffect } from 'react';
import { FilterOptions, SortOptions } from '@/types';
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

        {/* מחיר מינימלי */}
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

        {/* מחיר מקסימלי */}
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

        {/* קטגוריה */}
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

        {/* מיון לפי */}
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

      {(search || category || minPrice || maxPrice || sortBy) && (
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
