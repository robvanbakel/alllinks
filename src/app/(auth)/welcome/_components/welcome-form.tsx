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
import { formatUsername } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as validators from "@/lib/validators";

const FormSchema = z.object({
  displayName: validators.profileDisplayName,
  username: validators.profileUsername,
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
        case "profiles_username_unique":
          const username = `@${form.getValues("username")}`;

          form.setError(
            "username",
            { message: `Username ${username} already taken` },
            { shouldFocus: true },
          );
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

  const usernameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    form.clearErrors("username");

    const formattedUserInput = formatUsername(e.target.value);
    form.setValue("username", formattedUserInput);
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
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={usernameChangeHandler}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage
                  className={
                    !fieldState.error ? "text-muted-foreground" : undefined
                  }
                >
                  Your page URL:{" "}
                  {form.getValues("username").length >= 3 ? (
                    <span className="font-bold">
                      alllinks.app/{form.getValues("username")}
                    </span>
                  ) : (
                    <span className="italic opacity-75">
                      {"<"}Provide a username{">"}
                    </span>
                  )}
                </FormMessage>
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
