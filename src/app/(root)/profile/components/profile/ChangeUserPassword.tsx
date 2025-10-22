"use client";

import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/SubmitButton";
import { toast } from "sonner";
import { changePasswordAction } from "@/app/(root)/profile/profileActions";

type PasswordState = {
  success?: boolean;
  error?: string;
  message?: string;
};

export default function ChangePasswordForm() {
  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const initialState: PasswordState = {};

  // Reducer wrapper that calls the server action and returns PasswordState
  const changePasswordReducer = async (
    _state: PasswordState,
    formData: FormData,
  ): Promise<PasswordState> => {
    const result = await changePasswordAction(formData);
    if ("error" in result) return { error: result.error };
    return { success: true, message: result.message };
  };

  const [state, formAction, pending] = useActionState<PasswordState, FormData>(
    changePasswordReducer,
    initialState,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Password changed successfully");
      form.reset();
    }
    if (state?.error) toast.error(state.error);
  }, [state, form]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Change Password
      </h2>
      <Form {...form}>
        <form action={formAction} className="space-y-4">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Current password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="New password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton text="Change Password" isSubmitting={pending} />
        </form>
      </Form>
    </div>
  );
}
