import { notFound } from 'next/navigation';
import { fetchItemByIdAction } from '@/actions/items.action';
import { EditItemContainer } from './_components';

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
    item = await fetchItemByIdAction(itemId);
  } catch (error) {
    notFound();
  }

  return <EditItemContainer item={item} />;
}
