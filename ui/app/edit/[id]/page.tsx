import { notFound } from 'next/navigation';
import { fetchItemById } from '@/lib/api';
import ItemForm from '@/components/ItemForm';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditItemPage({ params }: PageProps) {
  const itemId = parseInt(params.id);
  
  if (isNaN(itemId)) {
    notFound();
  }

  let item;
  try {
    item = await fetchItemById(itemId);
  } catch (error) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          עריכת פריט
        </h1>
        <p className="text-gray-600">
          ערוך את פרטי הפריט "{item.name}"
        </p>
      </div>

      <ItemForm item={item} isEditing={true} />
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const itemId = parseInt(params.id);
  
  if (isNaN(itemId)) {
    return {
      title: 'פריט לא נמצא',
    };
  }

  try {
    const item = await fetchItemById(itemId);
    return {
      title: `עריכת ${item.name} - ניהול פריטים`,
      description: `ערוך את פרטי הפריט ${item.name}`,
    };
  } catch (error) {
    return {
      title: 'פריט לא נמצא',
    };
  }
}
