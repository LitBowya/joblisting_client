"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useActionState } from "react";
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
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import { updateCompany } from "@/app/(recruiter)/recruiter/company/companyActions";
import type { UpdateCompanyState } from "@/types/company";
import { toast } from "sonner";
import type { Company } from "@/types/company";
import { useRouter } from "next/navigation";

type FormValues = {
  companyName?: string;
  companyEmail?: string;
  companyPhone?: string;
  website?: string;
  industry?: string;
  location?: string;
};

export default function EditCompany({ company }: { company: Company }) {
  const form = useForm<FormValues>({
    defaultValues: {
      companyName: company.companyName || "",
      companyEmail: company.companyEmail || "",
      companyPhone: company.companyPhone || "",
      website: company.website || "",
      industry: company.industry || "",
      location: company.location || "",
    },
  });

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [state, formAction, pending] = useActionState<UpdateCompanyState, FormData>(
    updateCompany,
    {},
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Company updated");
      setOpen(false);
      router.refresh();
    }
    if (state?.error) toast.error(state.error);
  }, [state, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-sm text-blue-600 hover:underline">Edit</button>
      </DialogTrigger>
      <DialogContent>
        <div className="p-2">
            <DialogTitle className="text-lg font-semibold">Edit Company</DialogTitle>
          <Form {...form}>
            <form action={formAction} className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Acme Inc." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="email@company.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+1 555 555 555" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Software" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="City, Country" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <input type="hidden" name="id" value={company.id} />
                <SubmitButton text="Save" isSubmitting={pending} />
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
