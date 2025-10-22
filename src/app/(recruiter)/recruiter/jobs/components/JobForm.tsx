// Explanation: Convert JobForm to accept a server-provided `company` prop instead of calling server action from the client. Remove getMyCompanyAction import and related useEffect.

"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useActionState } from "react";
import { createJob as createJobWrapper } from "../jobActions";
import type { CreateJobState } from "@/types/job";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SubmitButton from "@/components/SubmitButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FormValues = {
  companyId: string;
  title: string;
  description: string;
  jobType: string;
  locationType: string;
  location?: string;
  deadline?: string;
  status?: string;
};

export default function JobForm({ company }: { company?: any | null }) {
  const form = useForm<FormValues>({
    defaultValues: {
      companyId: "",
      title: "",
      description: "",
      jobType: "full_time",
      locationType: "remote",
      location: "",
      deadline: "",
      status: "open",
    },
  });

  const router = useRouter();
  const [loadingCompany, setLoadingCompany] = useState(false);

  // if company prop exists, set default companyId
  React.useEffect(() => {
    if (company) form.setValue("companyId", String(company.id));
  }, [company, form]);

  // useActionState wrapper
  const [state, formAction, pending] = useActionState<CreateJobState, FormData>(createJobWrapper, {});

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Job created");
      form.reset();
      router.refresh();
    }
    if (state?.error) toast.error(state.error);
  }, [state, form, router]);

  // set loading flag briefly if needed (keeping for parity)
  useEffect(() => { setLoadingCompany(false); }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Job</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} className="space-y-4">
            {/* Company selector: show current recruiter company if present, allow selecting (single item) */}
            <FormField
              control={form.control}
              name="companyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <span>
                      {/* Hidden input so FormData includes companyId */}
                      <input type="hidden" name="companyId" value={field.value} />
                      <Select onValueChange={(v) => { field.onChange(v); }} value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={loadingCompany ? "Loading..." : company ? company.companyName : "No company - create one"} />
                        </SelectTrigger>
                        <SelectContent>
                          {company ? (
                            <SelectItem value={String(company.id)}>{company.companyName}</SelectItem>
                          ) : (
                            <SelectItem value="">No company</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </span>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Senior Backend Engineer" name="title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <textarea {...field} name="description" className="w-full rounded border p-2" placeholder="Describe the role" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <FormControl>
                      <span>
                        <input type="hidden" name="jobType" value={field.value} />
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
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
                )}
              />

              <FormField
                control={form.control}
                name="locationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Type</FormLabel>
                    <FormControl>
                      <span>
                        <input type="hidden" name="locationType" value={field.value} />
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
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
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} name="location" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deadline (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" name="deadline" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <SubmitButton text="Create Job" isSubmitting={pending} />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
