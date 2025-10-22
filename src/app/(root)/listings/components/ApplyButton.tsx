"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useActionState } from "react";
import SubmitButton from "@/components/SubmitButton";
import type { ApplyToJobState } from "@/types/job";
import { applyToJob } from "@/app/(root)/jobActions";

type Props = {
  jobId: number;
};

export default function ApplyButton({ jobId }: Props) {
  const router = useRouter();
  const initialState: ApplyToJobState = {};

  const [state, formAction, pending] = useActionState<ApplyToJobState, FormData>(applyToJob, initialState);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Application submitted");
      router.refresh();
    }
    if (state?.error) toast.error(state.error);
  }, [state]);

  return (
    <form action={formAction} className="inline-block">
      <input type="hidden" name="jobId" value={String(jobId)} />
      <SubmitButton text="Apply" isSubmitting={pending} />
    </form>
  );
}

