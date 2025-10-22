"use client";

import { useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";
import { registerUser } from "@/app/(auth)/authActions";
import { toast } from "sonner";
import VerifyOtpForm from "@/app/(auth)/register/components/VerifyOtpForm";
import { RegisterState } from "@/types/user";

const initialState: RegisterState = {};

const RegisterForm = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      userType: "job_seeker",
    },
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const [state, formAction, pending] = useActionState<RegisterState, FormData>(
    registerUser,
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
            Create an account
          </h1>
          <p className="text-sm text-gray-600">
            Enter your details to create your account
          </p>
        </div>

        <Form {...form}>
          <form action={formAction} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      className="h-11"
                      {...field}
                    />
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Type</FormLabel>
                  <FormControl>
                    <span>
                      {/* Hidden input ensures value is present in FormData for server action */}
                      <input
                        type="hidden"
                        name="userType"
                        value={String(field.value ?? "")}
                      />
                      <Select
                        onValueChange={field.onChange}
                        value={field.value as string}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="job_seeker">Job Seeker</SelectItem>
                          <SelectItem value="recruiter">Recruiter</SelectItem>
                        </SelectContent>
                      </Select>
                    </span>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton text="Register" isSubmitting={pending} />
          </form>
        </Form>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            Sign in
          </Link>
        </div>

        {/* existing registration form */}
        <Dialog open={openDialog} onOpenChange={() => {}}>
          <DialogOverlay />
          <DialogContent
            className="max-w-md w-full"
            onInteractOutside={(e) => e.preventDefault()} // prevent closing
            onEscapeKeyDown={(e) => e.preventDefault()} // disable ESC close
          >
            <DialogHeader>
              <DialogTitle>Verify Email</DialogTitle>
              <DialogDescription>
                Enter The Otp Sent To Your Email
              </DialogDescription>
            </DialogHeader>
            <VerifyOtpForm
              email={registeredEmail}
              onClose={() => setOpenDialog(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RegisterForm;
