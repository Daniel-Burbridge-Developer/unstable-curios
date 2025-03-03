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
  organizationName: z
    .string()
    .min(2, {
      message: 'organization name must be at least 2 characters.',
    })
    .max(256, {
      message: 'organization name must be at most 256 characters.',
    }),
  organizationDescription: z.string().min(2, {
    message: 'Organization description must be at least 2 characters.',
  }),
  organizationImageUrl: z.string().url({
    message: 'Organization image URL must be a valid URL.',
  }),
});

export function OrganizationCreationForm({
  selectedImageUrl = '',
}: {
  selectedImageUrl: string;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationName: '',
      organizationDescription: '',
      organizationImageUrl: selectedImageUrl,
    },
  });

  // Update itemImageUrl when selectedImageUrl prop changes
  useEffect(() => {
    if (selectedImageUrl) {
      form.setValue('organizationImageUrl', selectedImageUrl);
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
          name='organizationName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder='Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='organizationDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Description</FormLabel>
              <FormControl>
                <Input placeholder='Description' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='organizationImageUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Image URL</FormLabel>
              <FormControl>
                <Input placeholder='Select an Image' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Create Organization</Button>
      </form>
    </Form>
  );
}

export default OrganizationCreationForm;
