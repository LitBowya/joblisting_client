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
import { useAppDispatch } from "@/hooks/useStore";
import { setCredentials } from "@/app/(auth)/authSlice";
import { User } from "@/types/user";
import { updateUserProfileAction } from "@/app/(root)/profile/profileActions";

type UpdateState = {
  success?: boolean;
  error?: string;
  message?: string;
  user?: User;
};

interface UserProfileUpdateFormProps {
  user: User;
}

export default function UserProfileUpdateForm({
  user,
}: UserProfileUpdateFormProps) {
  const form = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const dispatch = useAppDispatch();
  const initialState: UpdateState = {};

  // Reducer wrapper that calls the server action and returns UpdateState
  const updateProfileReducer = async (
    _state: UpdateState,
    formData: FormData,
  ): Promise<UpdateState> => {
    const result = await updateUserProfileAction(formData);
    if ("error" in result) return { error: result.error };
    return { success: true, message: result.message, user: result.user };
  };

  const [state, formAction, pending] = useActionState<UpdateState, FormData>(
    updateProfileReducer,
    initialState,
  );

  useEffect(() => {
    if (state?.success && state.user) {
      toast.success(state.message || "Profile updated successfully");
      dispatch(setCredentials({ user: state.user }));
      form.reset({ name: state.user.name, email: state.user.email });
    }
    if (state?.error) toast.error(state.error);
  }, [state, form, dispatch]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Update Profile
      </h2>
      <Form {...form}>
        <form action={formAction} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton
            variant={"secondary"}
            text="Update Profile"
            isSubmitting={pending}
          />
        </form>
      </Form>
    </div>
  );
}
