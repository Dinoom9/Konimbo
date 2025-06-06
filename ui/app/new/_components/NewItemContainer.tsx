import ItemForm from '@/components/ItemForm';
import PageHeader from './PageHeader';

export default function NewItemContainer() {
  return (
    <div>
      <PageHeader 
        title="הוספת פריט חדש"
        description="מלא את הפרטים להוספת פריט חדש למערכת"
      />
      <ItemForm />
    </div>
  );
} 