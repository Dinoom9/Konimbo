'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Save, X } from 'lucide-react';

import { createItemAction, updateItemAction } from '@/actions/items.action';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { categories } from '@/config/config';

/**
 * Props interface for ItemForm component
 * @interface ItemFormProps
 */
interface ItemFormProps {
  item?: Item;          // Optional existing item for editing
  isEditing?: boolean;  // Flag to determine if this is edit or create mode
}


/**
 * Zod validation schema for item form
 * Provides comprehensive form validation with Hebrew error messages
 */
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
  inStock: z.boolean(),
});

// Type inference from Zod schema
type ItemFormData = z.infer<typeof itemSchema>;

/**
 * ItemForm Component
 * 
 * A comprehensive form component for creating and editing items.
 * Features:
 * - Form validation using Zod schema
 * - Controlled form inputs with react-hook-form
 * - Error handling and display
 * - Loading states during submission
 * - Automatic redirect after successful submission
 * - Support for both create and edit modes
 * 
 * @param item - Optional existing item data for editing
 * @param isEditing - Boolean flag indicating edit vs create mode
 */
export default function ItemForm({ item, isEditing = false }: ItemFormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Initialize react-hook-form with Zod validation
  const form = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: item?.name || '',
      description: item?.description || '',
      price: item?.price || 0,
      category: item?.category || '',
      inStock: item?.inStock ?? true,
    },
  });

  /**
   * Form submission handler
   * Handles both create and update operations
   * Includes comprehensive error handling for Next.js redirects
   */
  const onSubmit = async (data: ItemFormData) => {
    setSubmitError(null);
    
    try {
      console.log('Submitting form data:', data);
      if (isEditing && item) {
        console.log('Updating item:', item.id);
        await updateItemAction(item.id, data);
      } else {
        console.log('Creating new item');
        await createItemAction(data);
      }
      
      console.log('Action completed successfully');
      // Server Actions handle redirect and revalidation automatically
    } catch (err) {
      // Ignore NEXT_REDIRECT errors - these are not real errors but Next.js redirect mechanism
      if (err instanceof Error && err.message.includes('NEXT_REDIRECT')) {
        console.log('🔀 Redirect successful');
        return;
      }
      
      console.error('Form submission error:', err);
      console.error('Error details:', {
        name: err instanceof Error ? err.name : 'Unknown',
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined
      });
      
      const errorMessage = err instanceof Error ? err.message : 'אירעה שגיאה בשמירת הפריט';
      setSubmitError(errorMessage);
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
              {/* Error display section */}
              {submitError && (
                <div className="bg-destructive/15 border border-destructive/20 rounded-md p-4">
                  <div className="text-sm text-destructive">{submitError}</div>
                </div>
              )}

              {/* Item name field */}
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

              {/* Item description field */}
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

              {/* Price field */}
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

              {/* Category selection field */}
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
                        {categories.map((category: string) => (
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

              {/* Stock status checkbox */}
              <FormField
                control={form.control}
                name="inStock"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        מצב מלאי
                      </FormLabel>
                      <div className="text-sm text-muted-foreground">
                        האם הפריט זמין במלאי?
                      </div>
                    </div>
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Action buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={form.formState.isSubmitting}
                >
                  <X className="h-4 w-4 ml-1" />
                  ביטול
                </Button>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
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