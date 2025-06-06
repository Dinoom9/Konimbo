import { Item } from '@/types';
import { formatDate } from '@/lib/utils';

interface ItemDetailsProps {
  item: Item;
}

export default function ItemDetails({ item }: ItemDetailsProps) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 mb-8 border border-gray-200 shadow-sm">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8  rounded-full mr-4"></div>
        <h3 className="text-xl font-bold text-gray-900">
          פרטים טכניים
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
          <dt className="text-sm font-semibold text-blue-600 uppercase tracking-wide">מזהה פריט</dt>
          <dd className="mt-2 text-lg font-mono text-gray-900 bg-gray-50 px-3 py-1 rounded-md inline-block">#{item.id}</dd>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
          <dt className="text-sm font-semibold text-green-600 uppercase tracking-wide">קטגוריה</dt>
          <dd className="mt-2 text-lg text-gray-900 font-medium">{item.category}</dd>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
          <dt className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">מצב מלאי</dt>
          <dd className="mt-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              item.inStock 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {item.inStock ? 'במלאי' : 'אזל מהמלאי'}
            </span>
          </dd>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
          <dt className="text-sm font-semibold text-purple-600 uppercase tracking-wide">תאריך יצירה</dt>
          <dd className="mt-2 text-lg text-gray-900 font-medium">{formatDate(item.createdAt)}</dd>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
          <dt className="text-sm font-semibold text-orange-600 uppercase tracking-wide">עדכון אחרון</dt>
          <dd className="mt-2 text-lg text-gray-900 font-medium">{formatDate(item.updatedAt)}</dd>
        </div>
      </div>
    </div>
  );
} 