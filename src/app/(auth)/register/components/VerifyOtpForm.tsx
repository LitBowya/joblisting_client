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
import { toast } from "sonner";
import { verifyOtp, resendOtp } from "@/app/(auth)/authActions";
import SubmitButton from "@/components/SubmitButton";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ServerState } from "@/types/server";

const initialState: ServerState = {};

interface VerifyOtpFormProps {
  email: string;
  onClose: () => void;
}

const VerifyOtpForm = ({ email, onClose }: VerifyOtpFormProps) => {
  const form = useForm({
    defaultValues: {
      otp: "",
      email,
    },
  });

  const router = useRouter();

  const [state, formAction, pending] = useActionState<ServerState, FormData>(
    verifyOtp,
    initialState,
  );

  const [resendState, resendAction, resendPending] = useActionState<
    ServerState,
    FormData
  >(resendOtp, initialState);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      onClose();
      router.replace("/login");
    }

    if (state?.error) toast.error(state.error);
  }, [state]);

  useEffect(() => {
    if (resendState?.success) toast.success(resendState.message);
    if (resendState?.error) toast.error(resendState.error);
  }, [resendState]);

  return (
    <div className="p-6 space-y-6">
      <Form {...form}>
        <form action={formAction} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OTP Code</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your 6-digit OTP"
                    maxLength={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hidden email field */}
          <Input type="hidden" value={email} name="email" />

          <SubmitButton text="Verify OTP" isSubmitting={pending} />
        </form>
      </Form>

      <div className={"flex items-center justify-center space-x-4"}>
        <form action={resendAction} className="text-center w-full">
          <Input type="hidden" name="email" value={email} />
          <SubmitButton text="Resend OTP" isSubmitting={resendPending} />
        </form>

        <Button onClick={onClose} variant={"destructive"}>
          Cancel
        </Button>
      </div>
      <div className='flex justify-center items-center'>
        <span className='bg-orange-100 text-orange-500 inline-block p-2 rounded-lg'>Make sure to check your spam for the email</span>
      </div>
    </div>
  );
};

export default VerifyOtpForm;
