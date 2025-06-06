import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchItemById } from '@/lib/api';
import DeleteButton from './DeleteButton';


interface PageProps {
  params: {
    id: string;
  };
}

// This page uses SSR
export default async function ItemPage({ params }: PageProps) {
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* חזרה לרשימה */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          חזרה לרשימת הפריטים
        </Link>
      </div>

      {/* כרטיס הפריט */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-8">
          {/* כותרת ופעולות */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {item.name}
              </h1>
              <div className="flex items-center space-x-4 space-x-reverse">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {item.category}
                </span>
                <span className="text-gray-500 text-sm">
                  נוצר ב-{formatDate(item.createdAt)}
                </span>
              </div>
            </div>
            <div className="text-3xl font-bold text-green-600">
              {formatPrice(item.price)}
            </div>
          </div>

          {/* תיאור */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              תיאור הפריט
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {item.description}
            </p>
          </div>

          {/* מידע נוסף */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              פרטים טכניים
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">מזהה פריט</dt>
                <dd className="mt-1 text-sm text-gray-900">#{item.id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">קטגוריה</dt>
                <dd className="mt-1 text-sm text-gray-900">{item.category}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">תאריך יצירה</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatDate(item.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">עדכון אחרון</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatDate(item.updatedAt)}</dd>
              </div>
            </div>
          </div>

          {/* פעולות */}
          <div className="flex justify-between items-center pt-6 border-t">
            <div className="flex space-x-4 space-x-reverse">
              <Link
                href={`/edit/${item.id}`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                ערוך פריט
              </Link>
              <DeleteButton itemId={item.id} itemName={item.name} />
            </div>
            <Link
              href="/new"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              הוסף פריט חדש
            </Link>
          </div>
        </div>
      </div>
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
      title: `${item.name} - ניהול פריטים`,
      description: item.description.substring(0, 155),
    };
  } catch (error) {
    return {
      title: 'פריט לא נמצא',
    };
  }
}
