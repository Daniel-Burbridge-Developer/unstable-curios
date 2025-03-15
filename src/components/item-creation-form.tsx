'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { createItem, getCollections, updateImage } from '@/server/db/queries';

import { Input } from '@/components/ui/input';

import { toast } from 'sonner';

const formSchema = z.object({
  itemName: z
    .string()
    .min(2, {
      message: 'Item name must be at least 2 characters.',
    })
    .max(256, {
      message: 'Item name must be at most 256 characters.',
    }),
  itemSetNumber: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: 'Set Number must be non-negative' })
  ),
  itemDescription: z.string().min(2, {
    message: 'Item description must be at least 2 characters.',
  }),
  itemImageUrl: z.string().min(2, {
    message: 'Item image URL must be a valid URL.',
  }),
  // Collection should be a dropdown from collection list pulled from DB
  collectionId: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: 'Id Number must be non-negative' })
  ),
});

export function ItemCreationForm({
  selectedImage = { id: 0, url: '' },
}: {
  selectedImage: { id: number; url: string };
}) {
  const [collections, setCollections] = useState<
    Array<{ id: number; name: string }>
  >([]);

  const fetchCollections = async () => {
    const collections = await getCollections();
    // Assuming orgs is an array of objects like { id: number, name: string }
    const mutatedCollections = collections.map((collection) => ({
      id: collection.id,
      name: collection.name,
    }));
    setCollections(mutatedCollections);
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: '',
      // @ts-expect-error This is being pre-processed into an int
      itemSetNumber: '',
      itemDescription: '',
      itemImageUrl: selectedImage.url,
      // @ts-expect-error This is being pre-processed to an int
      collectionId: '',
    },
  });

  // Update itemImageUrl when selectedImageUrl prop changes
  useEffect(() => {
    if (selectedImage.url) {
      form.setValue('itemImageUrl', selectedImage.url);
    }
  }, [selectedImage.url, form]);

  useEffect(() => {
    fetchCollections();
  }, []);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      createItem({
        item: {
          name: values.itemName,
          setNumber: values.itemSetNumber,
          description: values.itemDescription,
          imageUrl: values.itemImageUrl,
          collectionId: values.collectionId,
        },
      });
      toast.success('item Created');
    } catch {
      toast.error('item not created');
    }

    try {
      updateImage(selectedImage.id);
    } catch {}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='itemName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input placeholder='name' {...field} />
              </FormControl>
              {/* <FormDescription>This is the items name</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='itemSetNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Set Number</FormLabel>
              <FormControl>
                <Input type='number' placeholder='0' {...field} />
              </FormControl>
              {/* <FormDescription>This is the items set number</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='itemDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Description</FormLabel>
              <FormControl>
                <Input placeholder='description' {...field} />
              </FormControl>
              {/* <FormDescription>This is the items flavour text</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='itemImageUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder='This should just be selecting the image'
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>This is the items image</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='collectionId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ? String(field.value) : ''}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select Organization' />
                  </SelectTrigger>
                  <SelectContent>
                    {collections.map((org) => (
                      <SelectItem key={org.id} value={String(org.id)}>
                        {org.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Create Item</Button>
      </form>
    </Form>
  );
}

export default ItemCreationForm;
