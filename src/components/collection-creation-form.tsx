"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createCollection, getOrganisations } from "@/server/db/queries";
import { toast } from "sonner";

const formSchema = z.object({
  collectionName: z
    .string()
    .min(2, {
      message: "collection name must be at least 2 characters.",
    })
    .max(256, {
      message: "collection name must be at most 256 characters.",
    }),
  collectionDescription: z.string().min(2, {
    message: "collection description must be at least 2 characters.",
  }),
  collectionImageUrl: z.string().min(2, {
    message: "collection image URL must be a valid URL.",
  }),
  // Collection should be a dropdown from collection list pulled from DB
  organizationName: z.string().min(1, {
    message: "Collection name must be at least 1 character.",
  }),
});

export function CollectionCreationForm({
  selectedImage = { id: 0, url: "" },
}: {
  selectedImage: { id: number; url: string };
}) {
  const [organisations, setOrganisations] = useState<
    Array<Record<string, number>>
  >([]);

  const fetchOrgs = () => {
    const orgs = await getOrganisations();
    const mutatedOrgs = orgs.map((org) => ({ [org.name]: org.id }));
    setOrganisations(mutatedOrgs);
  };
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collectionName: "",
      collectionDescription: "",
      collectionImageUrl: selectedImage.url,
      organizationName: "",
    },
  });

  // Update collectionImageUrl when selectedImageUrl prop changes
  useEffect(() => {
    if (selectedImage.url) {
      form.setValue("collectionImageUrl", selectedImage.url);
    }
  }, [selectedImage.url, form]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const collection = {
      name: values.collectionName,

      description: values.collectionDescription,
      collectionImageUrl: values.collectionImageUrl,
    };
    try {
      // createCollection(collection)
      toast.success("Collection Created");
    } catch {
      toast.error("Collection not created");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="collectionName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="collectionDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="collectionImageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Select an Image" {...field} />
              </FormControl>
              {/* <FormDescription>This is the items image</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organizationName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input type="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Collection</Button>
      </form>
    </Form>
  );
}

export default CollectionCreationForm;
