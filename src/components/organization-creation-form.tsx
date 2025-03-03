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
import { createOrganisation } from '@/server/db/queries';
import { toast } from 'sonner';

const formSchema = z.object({
  organisationName: z
    .string()
    .min(2, {
      message: 'organisation name must be at least 2 characters.',
    })
    .max(256, {
      message: 'organisation name must be at most 256 characters.',
    }),
  organisationDescription: z.string().min(2, {
    message: 'organisation description must be at least 2 characters.',
  }),
  organisationImageUrl: z.string().min(2, {
    message: 'organisation image URL must be a valid URL.',
  }),
});

export function OrganisationCreationForm({
  selectedImageUrl = '',
}: {
  selectedImageUrl: string;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organisationName: '',
      organisationDescription: '',
      organisationImageUrl: selectedImageUrl,
    },
  });

  // Update itemImageUrl when selectedImageUrl prop changes
  useEffect(() => {
    if (selectedImageUrl) {
      form.setValue('organisationImageUrl', selectedImageUrl);
    }
  }, [selectedImageUrl, form]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      createOrganisation({ organisation: values });
      toast.success('Organisation Created');
    } catch {
      toast.error('Organisation not created');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='organisationName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organisation Name</FormLabel>
              <FormControl>
                <Input placeholder='Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='organisationDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organisation Description</FormLabel>
              <FormControl>
                <Input placeholder='Description' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='organisationImageUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organisation Image URL</FormLabel>
              <FormControl>
                <Input placeholder='Select an Image' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Create organisation</Button>
      </form>
    </Form>
  );
}

export default OrganisationCreationForm;
