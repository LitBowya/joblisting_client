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
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";
import { loginUser } from "@/app/(auth)/authActions";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/hooks/useStore";
import { setCredentials } from "@/app/(auth)/authSlice";
import { User } from "@/types/user";

// Define LoginState locally
type LoginState = {
  success?: boolean;
  error?: string;
  message?: string;
  user?: User;
};

const initialState: LoginState = {};

const LoginForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    loginUser,
    initialState,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Login successful");
      dispatch(setCredentials({ user: state.user as User }));
      form.reset();
      // Redirect to the callback URL or home page
      router.push(callbackUrl);
    }

    if (state?.error) toast.error(state.error);
  }, [state, form, router, dispatch, callbackUrl]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md mx-auto p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600">
            Enter your credentials to access your account
          </p>
        </div>

        <Form {...form}>
          <form action={formAction} className="space-y-4">
            {/* Email */}
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

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Password
                    </FormLabel>

                    {/* Forgot Password Link */}
                    <Link
                      href="/forgot-password"
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

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

            <SubmitButton text="Login" isSubmitting={pending} />
          </form>
        </Form>

        <div className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
