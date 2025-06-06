import { notFound } from 'next/navigation';
import { fetchItemByIdAction } from '@/actions/items.action';
import { BackButton, ItemCard } from '../_components';


interface PageProps {
  params: {
    id: string;
  };
}

// This page uses SSR
export default async function ItemPage({ params }: PageProps) {
  // Await params before using its properties
  const resolvedParams = await params;
  const itemId = parseInt(resolvedParams.id);
  
  if (isNaN(itemId)) {
    notFound();
  }

  let item;
  try {
    item = await fetchItemByIdAction(itemId);
  } catch (error) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <BackButton />
      <ItemCard item={item} />
    </div>
  );
}
