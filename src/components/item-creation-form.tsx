"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { item } from "@/server/db/schema";

const formSchema = z.object({
  itemName: z.string().min(2, {
    message: "Item name must be at least 2 characters.",
  }),
  itemSetNumber: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: "Age must be non-negative" })
  ),
  itemDescription: z.string().min(2, {
    message: "Item description must be at least 2 characters.",
  }),
  itemImageUrl: z.string().url({
    message: "Item image URL must be a valid URL.",
  }),
  // Collection should be a dropdown from collection list pulled from DB
  collectionName: z.string().min(1, {
    message: "Collection name must be at least 1 character.",
  }),
});

export function ItemCreationForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      // @ts-ignore
      itemSetNumber: "",
      itemDescription: "",
      itemImageUrl: "",
      collectionName: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormDescription>This is the items name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemSetNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Set Number</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormDescription>This is the items set number</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormDescription>This is the items flavour text</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemImageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="This should just be selecting the image"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is the items image</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="collectionName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection Name</FormLabel>
              <FormControl>
                <Input placeholder="This should be a dropdown" {...field} />
              </FormControl>
              <FormDescription>
                This is the collection the item belongs to
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Item</Button>
      </form>
    </Form>
  );
}

export default ItemCreationForm;
