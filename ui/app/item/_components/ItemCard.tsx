import { Item } from '@/types';
import ItemHeader from './ItemHeader';
import ItemDescription from './ItemDescription';
import ItemDetails from './ItemDetails';
import ItemActions from './ItemActions';

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-8">
        <ItemHeader item={item} />
        <ItemDescription item={item} />
        <ItemDetails item={item} />
        <ItemActions item={item} />
      </div>
    </div>
  );
} 