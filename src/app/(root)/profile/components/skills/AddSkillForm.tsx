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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addSkill } from "@/app/(root)/profile/skillActions";
import { useRouter } from "next/navigation";

interface AddState {
  success?: boolean;
  error?: string;
  message?: string;
  skill?: any;
}

const initialState: AddState = {};

export default function AddSkillForm() {
  const form = useForm({
    defaultValues: {
      skillName: "",
      proficiencyLevel: "",
    },
  });

  const router = useRouter();

  const [state, formAction, pending] = useActionState<AddState, FormData>(
    addSkill,
    initialState,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Skill added");
      form.reset();
      router.refresh();
    }
    if (state?.error) toast.error(state.error);
  }, [state, form, router]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Skill</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} className="space-y-4">
            <FormField
              control={form.control}
              name="skillName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. TypeScript" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="proficiencyLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proficiency</FormLabel>
                  <FormControl>
                    <span>
                      {/* Hidden input ensures value is present in FormData for server action */}
                      <input
                        type="hidden"
                        name="proficiencyLevel"
                        value={String(field.value ?? "")}
                      />
                      <Select
                        onValueChange={field.onChange}
                        value={field.value as string}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </span>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton text="Add Skill" isSubmitting={pending} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
