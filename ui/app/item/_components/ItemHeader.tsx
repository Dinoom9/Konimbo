import { Item } from '@/types';
import { formatDate, formatPrice } from '@/lib/utils';

interface ItemHeaderProps {
  item: Item;
}

export default function ItemHeader({ item }: ItemHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {item.name}
          </h1>
          <div className="flex items-center space-x-1 space-x-reverse">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {item.category}
            </span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              item.inStock 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {item.inStock ? 'במלאי' : 'אזל מהמלאי'}
            </span>
          </div>
        </div>
        <div className="text-3xl font-bold text-green-600 mr-4">
          {formatPrice(item.price)}
        </div>
      </div>
      <div>
        <span className="text-gray-500 text-sm">
          נוצר ב-{formatDate(item.createdAt)}
        </span>
      </div>
    </div>
  );
} 