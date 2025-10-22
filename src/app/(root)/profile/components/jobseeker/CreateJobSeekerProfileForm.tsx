// filepath: /mnt/kekelilit/Projects/Fullstack/meetAI/client/src/app/(root)/profile/components/jobseeker/CreateJobSeekerProfileForm.tsx
"use client";

import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/SubmitButton";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createJobSeekerProfile } from "@/app/(root)/profile/jobActions";
import { useRouter } from "next/navigation";

interface CreateState {
  success?: boolean;
  error?: string;
  message?: string;
  profile?: any;
}

const initialState: CreateState = {};

export default function CreateJobSeekerProfileForm() {
  const form = useForm({
    defaultValues: {
      phone: "",
      location: "",
      bio: "",
      yearsOfExperience: "",
    },
  });

  const router = useRouter();

  const [state, formAction, pending] = useActionState<CreateState, FormData>(
    createJobSeekerProfile,
    initialState,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Profile created");
      form.reset();
      router.refresh();
    }
    if (state?.error) toast.error(state.error);
  }, [state, form, router]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Job Seeker Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} className="space-y-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional" {...field} />
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
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Input placeholder="Short bio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearsOfExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="e.g. 3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton text="Create" isSubmitting={pending} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
