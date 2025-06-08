'use client';

import Link from 'next/link';
import { Eye, Edit, Trash2 } from 'lucide-react';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Item } from '@/types';
import { deleteItemAction } from '@/actions/items.action';

/**
 * Props interface for ItemCard component
 * @interface ItemCardProps
 */
interface ItemCardProps {
  item: Item;                        // Item data to display
}

/**
 * ItemCard Component (Client Component)
 * 
 * A client-side card component for displaying individual item information including:
 * - Item name and description
 * - Category and stock status badges
 * - Formatted price display
 * - Creation date
 * - Action buttons (view, edit, delete)
 * 
 * Marked as client component to handle interactive delete functionality.
 * Delete action triggers a server action and page refresh.
 * 
 * Features hover effects and responsive design.
 * Used to display lists of items.
 * 
 * @param item - The item object containing all item data
 */
export default function ItemCard({ item }: ItemCardProps) {
  /**
   * Formats price as Hebrew currency (ILS)
   * Uses Intl.NumberFormat for proper locale formatting
   */
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS'
    }).format(price);
  };

  /**
   * Formats date string to Hebrew locale format
   * Converts ISO date string to readable Hebrew date
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL');
  };

  /**
   * Handle item deletion using server action
   * Shows confirmation dialog and triggers server-side delete
   * Uses window.location.reload() to refresh the page after deletion
   */
  const handleDelete = async () => {
    const confirmed = confirm('האם אתה בטוח שברצונך למחוק את הפריט?');
    if (!confirmed) return;

    try {
      await deleteItemAction(item.id);
      // Refresh the page to show updated data
      window.location.reload();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('אירעה שגיאה במחיקת הפריט');
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Item name and description section */}
          <div>
            <Link 
              href={`/item/${item.id}`}
              className="text-xl font-semibold hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
            <p className="text-muted-foreground mt-1 line-clamp-2">
              {item.description}
            </p>
          </div>

          {/* Item metadata section - badges, date, and price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {/* Category badge */}
                <Badge variant="secondary">
                  {item.category}
                </Badge>
                {/* Stock status badge with conditional styling */}
                <Badge variant={item.inStock ? "default" : "destructive"}>
                  {item.inStock ? "במלאי" : "אזל"}
                </Badge>
              </div>
              {/* Creation date display */}
              <span className="text-sm text-muted-foreground">
                {formatDate(item.createdAt)}
              </span>
            </div>
            {/* Price display with currency formatting */}
            <div className="text-lg font-bold text-green-600">
              {formatPrice(item.price)}
            </div>
          </div>
        </div>
      </CardContent>
      
      <Separator />
      
      <CardFooter className="p-4">
        <div className="flex justify-between items-center w-full">
          {/* Action buttons section */}
          <div className="flex gap-2">
            {/* View details button */}
            <Button variant="outline" size="sm" asChild>
              <Link href={`/item/${item.id}`}>
                <Eye className="h-4 w-4 ml-1" />
                צפה בפרטים
              </Link>
            </Button>
            {/* Edit item button */}
            <Button variant="outline" size="sm" asChild>
              <Link href={`/edit/${item.id}`}>
                <Edit className="h-4 w-4 ml-1" />
                ערוך
              </Link>
            </Button>
          </div>
          
          {/* Delete button with onClick handler */}
          <Button
            onClick={handleDelete}
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive border-destructive/20 hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4 ml-1" />
            מחק
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 