'use client';

import ItemCard from './ItemCard';
import { Item } from '@/types';

/**
 * Props interface for ItemsGrid component
 * @interface ItemsGridProps
 */
interface ItemsGridProps {
  items: Item[];           // Array of items to display
  total: number;           // Total number of items for display
}

/**
 * ItemsGrid Component
 * 
 * Simple grid component that displays a list of items in a responsive layout.
 * This component is now stateless and purely presentational.
 * 
 * Features:
 * - Responsive grid layout (1 column on mobile, 2 on tablet, 3 on desktop)
 * - Empty state handling
 * - Results counter
 * - Clean separation of concerns
 * 
 * @param items - Array of items to display in the grid
 * @param total - Total number of items (for results counter)
 */
export default function ItemsGrid({ items, total }: ItemsGridProps) {
  return (
    <div>
      {/* Results counter */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-600">
          נמצאו {total} פריטים
        </div>
      </div>

      {/* Items display */}
      {items.length === 0 ? (
        // Empty state display
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
        // Items grid display
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  );
} 