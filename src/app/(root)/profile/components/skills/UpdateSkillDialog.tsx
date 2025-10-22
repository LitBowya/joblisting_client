"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateSkill } from "@/app/(root)/profile/skillActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UpdateSkillState } from "@/types/skill";
import SubmitButton from "@/components/SubmitButton";

type Props = {
  id: number;
  skillName: string;
  proficiencyLevel?: "Beginner" | "Intermediate" | "Advanced" | "Expert" | null;
};

const initialState: UpdateSkillState = {};

export default function UpdateSkillDialog({
  id,
  skillName,
  proficiencyLevel,
}: Props) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      id: String(id),
      skillName: skillName || "",
      proficiencyLevel: proficiencyLevel || "",
    },
  });

  const router = useRouter();

  const [state, formAction, pending] = useActionState<
    UpdateSkillState,
    FormData
  >(updateSkill, initialState);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Skill updated");
      setOpen(false);
      router.refresh();
    }
    if (state?.error) toast.error(state.error);
  }, [state, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Skill</DialogTitle>
          <DialogDescription>Modify your skill information</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="id" value={String(id)} />

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

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <SubmitButton
                variant={"secondary"}
                text="Update Skill"
                isSubmitting={pending}
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
