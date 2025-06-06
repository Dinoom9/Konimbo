import { Metadata } from 'next';
import { NewItemContainer } from './_components';

export const metadata: Metadata = {
  title: 'הוספת פריט חדש - ניהול פריטים',
  description: 'הוסף פריט חדש למערכת ניהול הפריטים',
};

export default function NewItemPage() {
  return <NewItemContainer />;
}
