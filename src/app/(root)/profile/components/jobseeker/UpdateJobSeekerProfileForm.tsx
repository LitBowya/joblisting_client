// filepath: /mnt/kekelilit/Projects/Fullstack/meetAI/client/src/app/(root)/profile/components/jobseeker/UpdateJobSeekerProfileForm.tsx
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
import { updateJobSeekerProfile } from "@/app/(root)/profile/jobActions";
import { useRouter } from "next/navigation";

interface UpdateState {
  success?: boolean;
  error?: string;
  message?: string;
  profile?: any;
}

const initialState: UpdateState = {};

export default function UpdateJobSeekerProfileForm() {
  const form = useForm({
    defaultValues: {
      phone: "",
      location: "",
      bio: "",
      yearsOfExperience: "",
    },
  });

  const router = useRouter();

  const [state, formAction, pending] = useActionState<UpdateState, FormData>(
    updateJobSeekerProfile,
    initialState,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Profile updated");
      router.refresh();
    }
    if (state?.error) toast.error(state.error);
  }, [state, router]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Job Seeker Profile</CardTitle>
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

            <SubmitButton
              variant={"secondary"}
              text="Update"
              isSubmitting={pending}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
