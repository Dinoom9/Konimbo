import { Item } from '@/types';
import ItemForm from '@/components/ItemForm';
import EditPageHeader from './EditPageHeader';

interface EditItemContainerProps {
  item: Item;
}

export default function EditItemContainer({ item }: EditItemContainerProps) {
  return (
    <div>
      <EditPageHeader item={item} />
      <ItemForm item={item} isEditing={true} />
    </div>
  );
} 