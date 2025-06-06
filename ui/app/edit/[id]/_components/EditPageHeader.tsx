import { Item } from '@/types';

interface EditPageHeaderProps {
  item: Item;
}

export default function EditPageHeader({ item }: EditPageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        עריכת פריט
      </h1>
      <p className="text-gray-600">
        ערוך את פרטי הפריט "{item.name}"
      </p>
    </div>
  );
} 