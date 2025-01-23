"use client";

import { DashboardPageWrapper } from "@/app/dashboard/_components/dashboard-page-wrapper";
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
import { formatUsername } from "@/lib/utils/formatUsername";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { ChangeEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as validators from "@/lib/validators";

const FormSchema = z.object({
  displayName: validators.profileDisplayName,
  username: validators.profileUsername,
});

type FormValues = z.infer<typeof FormSchema>;

export default function DashboardSettingsPage() {
  const queryClient = useQueryClient();

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await client.user.$get();
      const data = await res.json();
      return data;
    },
  });

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (formData: FormValues) => {
      const res = await client.user.$patch({ json: formData });
      if (res.ok) return;

      const data = await res.json();
      if (!("message" in data)) throw new Error();

      throw new Error(data.message);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });

      toast({
        title: "Changes saved",
        description: `Your profile has been successfully updated!`,
      });
    },
    onError: (error) => {
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
      displayName: userData?.displayName ?? "",
      username: userData?.username ?? "",
    },
  });

  useEffect(() => {
    if (Object.values(form.getValues()).filter(Boolean).length) return;
    form.setValue("displayName", userData?.displayName ?? "");
    form.setValue("username", userData?.username ?? "");
  }, [form, userData]);

  const submitHandler = async (formData: FormValues) => {
    return updateProfile(formData);
  };

  const usernameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    form.clearErrors("username");

    const formattedUserInput = formatUsername(e.target.value);
    form.setValue("username", formattedUserInput);
  };

  return (
    <DashboardPageWrapper noContentBox title="Settings" contentClass="max-w-lg">
      {isUserLoading ? (
        <Loader2 className="animate-spin text-violet-600" />
      ) : (
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
      )}
    </DashboardPageWrapper>
  );
}
