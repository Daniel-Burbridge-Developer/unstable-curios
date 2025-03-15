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

import { Input } from '@/components/ui/input';
import {
  createCollection,
  getOrganisations,
  updateImage,
} from '@/server/db/queries';
import { toast } from 'sonner';

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
  collectionImageUrl: z.string().min(2, {
    message: 'collection image URL must be a valid URL.',
  }),
  // Collection should be a dropdown from collection list pulled from DB
  organizationId: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: 'Id Number must be non-negative' })
  ),
});

export function CollectionCreationForm({
  selectedImage = { id: 0, url: '' },
}: {
  selectedImage: { id: number; url: string };
}) {
  const [organisations, setOrganisations] = useState<
    Array<{ id: number; name: string }>
  >([]);

  const fetchOrgs = async () => {
    const orgs = await getOrganisations();
    // Assuming orgs is an array of objects like { id: number, name: string }
    const mutatedOrgs = orgs.map((org) => ({ id: org.id, name: org.name }));
    setOrganisations(mutatedOrgs);
  };
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collectionName: '',
      collectionDescription: '',
      collectionImageUrl: selectedImage.url,
      // @ts-expect-error This is being pre-processed to an int
      organizationId: '',
    },
  });

  // Update collectionImageUrl when selectedImageUrl prop changes
  useEffect(() => {
    if (selectedImage.url) {
      form.setValue('collectionImageUrl', selectedImage.url);
    }
  }, [selectedImage.url, form]);

  useEffect(() => {
    fetchOrgs();
  }, []);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const collection = {
      name: values.collectionName,
      organisationId: values.organizationId,
      description: values.collectionDescription,
      imageUrl: values.collectionImageUrl,
    };
    try {
      createCollection({ collection });
      toast.success('Collection Created');
    } catch {
      toast.error('Collection not created');
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
          name='collectionName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection Name</FormLabel>
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
              <FormLabel>Collection Image URL</FormLabel>
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
          name='organizationId'
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
                    {organisations.map((org) => (
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
        <Button type='submit'>Create Collection</Button>
      </form>
    </Form>
  );
}

export default CollectionCreationForm;
