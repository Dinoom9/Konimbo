import Link from 'next/link';
import { Eye, Edit, Trash2 } from 'lucide-react';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Item } from '@/types';

interface ItemCardProps {
  item: Item;
  onDelete?: (id: number) => void;
}

export default function ItemCard({ item, onDelete }: ItemCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL');
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <Link 
              href={`/item/${item.id}`}
              className="text-xl font-semibold hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
            <p className="text-muted-foreground mt-1 line-clamp-2">
              {item.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="secondary">
                {item.category}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {formatDate(item.createdAt)}
              </span>
            </div>
            <div className="text-lg font-bold text-green-600">
              {formatPrice(item.price)}
            </div>
          </div>
        </div>
      </CardContent>
      
      <Separator />
      
      <CardFooter className="p-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/item/${item.id}`}>
                <Eye className="h-4 w-4 ml-1" />
                צפה בפרטים
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/edit/${item.id}`}>
                <Edit className="h-4 w-4 ml-1" />
                ערוך
              </Link>
            </Button>
          </div>
          {onDelete && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (confirm('האם אתה בטוח שברצונך למחוק את הפריט?')) {
                  onDelete(item.id);
                }
              }}
              className="text-destructive hover:text-destructive border-destructive/20 hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 ml-1" />
              מחק
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
} 