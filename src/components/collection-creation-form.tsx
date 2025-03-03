'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  collectionName: z
    .string()
    .min(2, {
      message: 'collection name must be at least 2 characters.',
    })
    .max(256, {
      message: 'collection name must be at most 256 characters.',
    }),
  collectionDescription: z.string().min(2, {
    message: 'collection description must be at least 2 characters.',
  }),
  collectionImageUrl: z.string().url({
    message: 'collection image URL must be a valid URL.',
  }),
  // Collection should be a dropdown from collection list pulled from DB
  organizationName: z.string().min(1, {
    message: 'Collection name must be at least 1 character.',
  }),
});

export function CollectionCreationForm({
  selectedImageUrl = '',
}: {
  selectedImageUrl: string;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collectionName: '',
      collectionDescription: '',
      collectionImageUrl: selectedImageUrl,
      organizationName: '',
    },
  });

  // Update collectionImageUrl when selectedImageUrl prop changes
  useEffect(() => {
    if (selectedImageUrl) {
      form.setValue('collectionImageUrl', selectedImageUrl);
    }
  }, [selectedImageUrl, form]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='collectionName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input placeholder='name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='collectionDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection Description</FormLabel>
              <FormControl>
                <Input placeholder='Description' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='collectionImageUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Image URL</FormLabel>
              <FormControl>
                <Input placeholder='Select an Image' {...field} />
              </FormControl>
              {/* <FormDescription>This is the items image</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='organizationName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder='This should be a dropdown' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Create Collection</Button>
      </form>
    </Form>
  );
}

export default CollectionCreationForm;
