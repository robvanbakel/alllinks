"use client";

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
import { client } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  const queryClient = useQueryClient();

  const { mutate: createLink, isPending: isCreatePending } = useMutation({
    mutationFn: (formData: FormValues) => client.link.$post({ json: formData }),
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({ queryKey: ["links-list"] });

      const data = await res.json();

      toast({
        title: "Link added",
        description: `${data.name} has been successfully created!`,
      });

      form.reset();
      afterSubmit(data);
    },
  });

  const { mutate: updateLink, isPending: isUpdatePending } = useMutation({
    mutationFn: (formData: FormValues) => {
      if (!link) throw new Error("Link not found");

      return client.link[":id"].$patch({
        json: formData,
        param: { id: link.id },
      });
    },
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({ queryKey: ["links-list"] });

      const data = await res.json();

      toast({
        title: "Update published",
        description: `${data.name} has been successfully updated!`,
      });

      form.reset(data);

      afterSubmit(data);
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: link?.name ?? "",
      url: link?.url ?? "",
    },
  });

  const submitHandler = async (formData: FormValues) => {
    try {
      if (link) {
        await updateLink(formData);
        return;
      }

      await createLink(formData);
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
      <form onSubmit={form.handleSubmit(submitHandler)}>
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
          disabled={
            isCreatePending ||
            isUpdatePending ||
            (link ? !form.formState.isDirty : !form.formState.isValid)
          }
          className="mt-8 w-full bg-violet-600 text-white hover:bg-violet-700 active:bg-violet-800 disabled:bg-muted-foreground"
          type="submit"
        >
          {link
            ? isUpdatePending
              ? "Updating link…"
              : "Update link"
            : isCreatePending
              ? "Creating link…"
              : "Create link"}
        </Button>
      </form>
    </Form>
  );
};
