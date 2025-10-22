// Explanation: Modified EditJobDialog to accept server-provided `initialJob` prop (no client-side fetch). It pre-fills form from that prop and uses the updateJob wrapper via useActionState. Removed fetch to /api route.

"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SubmitButton from "@/components/SubmitButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateJob as updateJobWrapper } from "../jobActions";
import type { UpdateJobState } from "@/types/job";
import type { Job } from "@/types/job";

type Props = {
  jobId: number;
  initialJob?: Job | null;
};

type FormValues = {
  id: string;
  title?: string;
  description?: string;
  jobType?: string;
  locationType?: string;
  location?: string;
  deadline?: string;
  status?: string;
};

export default function EditJobDialog({ jobId, initialJob }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({ defaultValues: { id: String(jobId), title: "", description: "", jobType: "full_time", locationType: "remote", location: "", deadline: "", status: "open" } });

  const [state, formAction, pending] = useActionState<UpdateJobState, FormData>(updateJobWrapper, {});

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Job updated");
      setOpen(false);
      router.refresh();
    }
    if (state?.error) toast.error(state.error);
  }, [state, router]);

  useEffect(() => {
    // When opening, populate form from server-provided initialJob if available
    if (!open) return;
    if (initialJob) {
      form.reset({
        id: String(initialJob.id),
        title: initialJob.title || "",
        description: initialJob.description || "",
        jobType: initialJob.jobType || "full_time",
        locationType: initialJob.locationType || "remote",
        location: initialJob.location || "",
        deadline: initialJob.deadline || "",
        status: initialJob.status || "open",
      });
    } else {
      // fallback: ensure id is set
      form.setValue("id", String(jobId));
    }
  }, [open, initialJob, jobId, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-sm">Edit</button>
      </DialogTrigger>
      <DialogContent>
        <div className="p-2">
          <DialogTitle className="text-lg font-semibold">Edit Job</DialogTitle>

          <Form {...form}>
            <form action={formAction} className="space-y-4 mt-4">
              {/* Hidden id field */}
              <input type="hidden" name="id" value={String(jobId)} />

              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} name="title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <textarea {...field} name="description" className="w-full rounded border p-2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="jobType" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <FormControl>
                      <span>
                        <input type="hidden" name="jobType" value={field.value} />
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full"><SelectValue placeholder="Choose" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full_time">Full time</SelectItem>
                            <SelectItem value="part_time">Part time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                          </SelectContent>
                        </Select>
                      </span>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="locationType" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Type</FormLabel>
                    <FormControl>
                      <span>
                        <input type="hidden" name="locationType" value={field.value} />
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full"><SelectValue placeholder="Choose" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="remote">Remote</SelectItem>
                            <SelectItem value="on_site">On-site</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </span>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="location" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} name="location" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="deadline" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deadline</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" name="deadline" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="flex justify-end">
                <SubmitButton text="Update" isSubmitting={pending} />
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
