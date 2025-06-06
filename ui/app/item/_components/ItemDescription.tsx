import { Item } from '@/types';

interface ItemDescriptionProps {
  item: Item;
}

export default function ItemDescription({ item }: ItemDescriptionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">
        תיאור הפריט
      </h2>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
        {item.description}
      </p>
    </div>
  );
} 