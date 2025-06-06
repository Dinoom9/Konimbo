import ItemForm from '@/components/ItemForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'הוספת פריט חדש - ניהול פריטים',
  description: 'הוסף פריט חדש למערכת ניהול הפריטים',
};

export default function NewItemPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          הוספת פריט חדש
        </h1>
        <p className="text-gray-600">
          מלא את הפרטים להוספת פריט חדש למערכת
        </p>
      </div>

      <ItemForm />
    </div>
  );
}
