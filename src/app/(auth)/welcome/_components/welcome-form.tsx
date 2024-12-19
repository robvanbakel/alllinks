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
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  displayName: z.string().min(2),
  username: z.string().min(2),
});

type FormValues = z.infer<typeof FormSchema>;

export const WelcomeForm = () => {
  const router = useRouter();

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (formData: FormValues) => {
      const res = await client.profile.$post({ json: formData });
      if (res.ok) return;

      const data = await res.json();
      if (!("message" in data)) throw new Error();

      throw new Error(data.message);
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error) => {
      console.log(error);

      switch (error.message) {
        case "profiles_pkey":
          toast({
            title: "Username already taken",
            description: "Please choose a unique username",
            variant: "destructive",
          });
          break;
        default:
          toast({
            title: "Something went wrong",
            description: "Please try again later",
            variant: "destructive",
          });
          break;
      }
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      displayName: "",
      username: "",
    },
  });

  const submitHandler = async (formData: FormValues) => {
    return updateProfile(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isPending} className="mt-8" type="submit">
          {isPending ? "Saving…" : "Save"}
        </Button>
      </form>
    </Form>
  );
};
