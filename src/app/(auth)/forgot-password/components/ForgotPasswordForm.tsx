"use client";

import { useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/SubmitButton";
import { forgotPassword } from "@/app/(auth)/authActions";
import { toast } from "sonner";
import { ForgotPasswordState } from "@/types/user";
import ResetPasswordForm from "@/app/(auth)/forgot-password/components/ResetPasswordForm";
import { RegisterState } from "@/types/user";

const initialState: ForgotPasswordState = {};

const ForgotPasswordForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const [state, formAction, pending] = useActionState<RegisterState, FormData>(
    forgotPassword,
    initialState,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      setRegisteredEmail(form.getValues("email"));
      form.reset();
      setOpenDialog(true);
    }

    if (state?.error) toast.error(state.error);
  }, [state, form]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md mx-auto p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Forgot Password
          </h1>
          <p className="text-sm text-gray-600">Retrieve Your Account</p>
        </div>

        <Form {...form}>
          <form action={formAction} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton text="Forgot Password" isSubmitting={pending} />
          </form>
        </Form>

        {/* existing registration form */}
        <Dialog open={openDialog} onOpenChange={() => {}}>
          <DialogOverlay />
          <DialogContent
            className="max-w-md w-full"
            onInteractOutside={(e) => e.preventDefault()} // prevent closing
            onEscapeKeyDown={(e) => e.preventDefault()} // disable ESC close
          >
            <DialogHeader>
              <DialogTitle>Reset Your Password</DialogTitle>
            </DialogHeader>
            <ResetPasswordForm
              email={registeredEmail}
              onClose={() => setOpenDialog(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
