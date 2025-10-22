// Explanation: Client-side delete button that shows a confirmation Dialog and uses the deleteJob wrapper from jobActions via useActionState. On success it refreshes the page.

"use client";

import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import { deleteJob as deleteJobWrapper } from "../jobActions";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SubmitButton from "@/components/SubmitButton";
import { toast } from "sonner";
import type { DeleteJobState } from "@/types/job";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DeleteJobButton({ jobId, jobTitle }: { jobId: number; jobTitle?: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [state, formAction, pending] = useActionState<DeleteJobState, FormData>(deleteJobWrapper, {});

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Job deleted");
      setOpen(false);
      router.refresh();
    }
    if (state?.error) toast.error(state.error);
  }, [state, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-sm text-red-600 hover:underline">Delete</button>
      </DialogTrigger>
      <DialogContent>
        <div className="p-2">
          <DialogTitle className="text-lg font-semibold">Delete Job</DialogTitle>
          <p className="text-sm text-gray-600 mt-2">Are you sure you want to delete {jobTitle ? `"${jobTitle}"` : "this job"}? This action cannot be undone.</p>

          <form action={formAction} className="mt-4 flex justify-end gap-2">
            <input type="hidden" name="id" value={String(jobId)} />
            <Button type="button" variant="destructive" onClick={() => setOpen(false)} className="flex-1">Cancel</Button>
            <div className="flex-2">
              <SubmitButton text="Delete" isSubmitting={pending} />
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

