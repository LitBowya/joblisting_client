"use client";

import { useActionState, useEffect } from "react";
import SubmitButton from "@/components/SubmitButton";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteJobSeekerProfile } from "@/app/(root)/profile/jobActions";
import { useRouter } from "next/navigation";

interface DeleteState {
  success?: boolean;
  error?: string;
  message?: string;
}

const initialState: DeleteState = {};

export default function DeleteJobSeekerProfileButton() {
  const router = useRouter();

  const [state, formAction, pending] = useActionState<DeleteState, FormData>(
    deleteJobSeekerProfile,
    initialState,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Profile deleted");
      router.refresh();
    }
    if (state?.error) toast.error(state.error);
  }, [state, router]);

  return (
    <Card className={"bg-red-500/20 text-red-500"}>
      <CardHeader>
        <CardTitle>Danger Zone</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-2">
          <p className="text-sm text-gray-600">
            Deleting your job seeker profile will remove all associated skills.
          </p>
          <SubmitButton
            variant={"destructive"}
            text={pending ? "Deleting" : "Delete Profile"}
            isSubmitting={pending}
          />
        </form>
      </CardContent>
    </Card>
  );
}
