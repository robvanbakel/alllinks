"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { toast } from "@/hooks/use-toast";
import axios from "axios";

const FormSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
});

type FormValues = z.infer<typeof FormSchema>;

export const LinkCardForm = ({
  link,
  afterSubmit,
}: {
  link?: { id: string; name: string; url: string };
  afterSubmit: (formData: FormValues) => void;
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: link?.name ?? "",
      url: link?.url ?? "",
    },
  });

  const onCreate = async (formData: FormValues) => {
    try {
      await axios.post("/api/create-link", formData);

      toast({
        title: "Link added",
        description: `${formData.name} has been successfully created!`,
      });

      form.reset(formData);

      afterSubmit(formData);
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const onUpdate = async (formData: FormValues) => {
    if (!link) throw new Error("Link not found");

    try {
      await axios.patch(`/api/update-link/${link.id}`, formData);

      toast({
        title: "Update published",
        description: `${formData.name} has been successfully updated!`,
      });

      form.reset(formData);

      afterSubmit(formData);
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(link ? onUpdate : onCreate)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={link ? !form.formState.isDirty : !form.formState.isValid}
          className="mt-8 w-full bg-violet-600 text-white hover:bg-violet-700 active:bg-violet-800 disabled:bg-muted-foreground"
          type="submit"
        >
          {link ? "Update link" : "Create link"}
        </Button>
      </form>
    </Form>
  );
};
