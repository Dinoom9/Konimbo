'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Save, X } from 'lucide-react';

import { createItem, updateItem } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Item } from '@/types';

interface ItemFormProps {
  item?: Item;
  isEditing?: boolean;
}

const categories = [
  'חלב ומוצרי חלב',
  'לחם ומאפים',
  'פירות וירקות',
  'בשר ועוף',
  'שמנים ותבלינים',
  'אורז ופסטה'
];

// Zod schema for validation
const itemSchema = z.object({
  name: z.string()
    .min(1, 'שם הפריט הוא שדה חובה')
    .min(2, 'שם הפריט חייב להכיל לפחות 2 תווים'),
  description: z.string()
    .min(1, 'תיאור הפריט הוא שדה חובה')
    .min(10, 'התיאור חייב להכיל לפחות 10 תווים'),
  price: z.number()
    .min(0.01, 'המחיר חייב להיות גדול מ-0')
    .max(100000, 'המחיר לא יכול להיות גדול מ-100,000'),
  category: z.string()
    .min(1, 'קטגוריה היא שדה חובה'),
});

type ItemFormData = z.infer<typeof itemSchema>;

export default function ItemForm({ item, isEditing = false }: ItemFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: item?.name || '',
      description: item?.description || '',
      price: item?.price || 0,
      category: item?.category || '',
    },
  });

  const onSubmit = async (data: ItemFormData) => {
    setLoading(true);
    setError(null);

    try {
      if (isEditing && item) {
        await updateItem(item.id, data);
      } else {
        await createItem(data);
      }
      
      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'אירעה שגיאה בשמירת הפריט');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {isEditing ? 'עריכת פריט' : 'הוספת פריט חדש'}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="bg-destructive/15 border border-destructive/20 rounded-md p-4">
                  <div className="text-sm text-destructive">{error}</div>
                </div>
              )}

              {/* שם הפריט */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>שם הפריט *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="הכנס שם הפריט"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* תיאור */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>תיאור *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="הכנס תיאור מפורט של הפריט"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* מחיר */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>מחיר (₪) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* קטגוריה */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>קטגוריה *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="בחר קטגוריה" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* כפתורים */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={loading}
                >
                  <X className="h-4 w-4 ml-1" />
                  ביטול
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin ml-1" />
                      שומר...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 ml-1" />
                      {isEditing ? 'עדכן פריט' : 'הוסף פריט'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
} 