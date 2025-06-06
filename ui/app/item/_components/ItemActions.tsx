import Link from 'next/link';
import { Item } from '@/types';
import DeleteButton from '../[id]/DeleteButton';
import { Button } from '@/components/ui/button';

interface ItemActionsProps {
  item: Item;
}

export default function ItemActions({ item }: ItemActionsProps) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Button asChild variant="default" size="default" className="bg-green-600 hover:bg-green-700 text-white">
            <Link href={`/edit/${item.id}`}>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              ערוך פריט
            </Link>
          </Button>
          <DeleteButton itemId={item.id} itemName={item.name} />
        </div>
        <Button asChild variant="outline" size="default">
          <Link href="/new">
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            הוסף פריט חדש
          </Link>
        </Button>
      </div>
    </div>
  );
} 