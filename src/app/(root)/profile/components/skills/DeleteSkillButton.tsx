"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  deleteSkill,
  type DeleteSkillState,
} from "@/app/(root)/profile/skillActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

const initialState: DeleteSkillState = {};

export default function DeleteSkillButton({ id }: Props) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<
    DeleteSkillState,
    FormData
  >(deleteSkill, initialState);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Skill deleted");
      router.refresh();
    }
    if (state?.error) toast.error(state.error);
  }, [state, router]);

  return (
    <form action={formAction} className="inline">
      <input type="hidden" name="id" value={String(id)} />
      <Button type="submit" variant="destructive" size="sm" disabled={pending}>
        {pending ? "Deleting..." : "Delete"}
      </Button>
    </form>
  );
}
