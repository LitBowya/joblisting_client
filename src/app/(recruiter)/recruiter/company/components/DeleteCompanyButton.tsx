"use client";

import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import SubmitButton from "@/components/SubmitButton";
import { deleteCompany } from "@/app/(recruiter)/recruiter/company/companyActions";
import { toast } from "sonner";
import type { DeleteCompanyState } from "@/types/company";
import {Button} from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DeleteCompanyButton({ companyName }: { companyName?: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [state, formAction, pending] = useActionState<DeleteCompanyState, FormData>(
    deleteCompany,
    {},
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Company deleted");
      setOpen(false);
      // refresh so the UI reflects that the company is gone
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
            <DialogTitle className="text-lg font-semibold">Delete Company</DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Are you sure you want to delete {companyName ? `"${companyName}"` : "this company"}? This will also delete all associated jobs and applications. This action cannot be undone.
          </p>

          <form action={formAction} className="mt-4 flex justify-end gap-2">
            <Button  type="button" onClick={() => setOpen(false)} variant={'destructive'} className="flex-1">Cancel</Button>
            <div className={'flex-2'}>
                <SubmitButton text="Delete" isSubmitting={pending} />
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
