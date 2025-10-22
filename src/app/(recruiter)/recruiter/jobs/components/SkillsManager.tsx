// Explanation: Client component to manage skills for a given job. Uses addJobSkill and deleteJobSkill wrappers via useActionState. On success it triggers router.refresh() to update server-rendered job list.

"use client";

import React, {useActionState, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {
    addJobSkill as addJobSkillWrapper,
    deleteJobSkill as deleteJobSkillWrapper,
    getJobByIdAction
} from "../jobActions";
import type {AddJobSkillState, DeleteJobSkillState, JobSkill} from "@/types/job";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import SubmitButton from "@/components/SubmitButton";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {Spinner} from "@/components/ui/spinner";
import {isError} from "node:util";

type Props = {
  jobId: number;
  initialSkills?: JobSkill[];
};

type FormValues = {
  skillName: string;
  isRequired?: string;
};

export default function SkillsManager({ jobId, initialSkills = [] }: Props) {
  const form = useForm<FormValues>({ defaultValues: { skillName: "", isRequired: "false" } });
  const router = useRouter();
  const [skills, setSkills] = useState<JobSkill[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const [addState, addAction, adding] = useActionState<AddJobSkillState, FormData>(addJobSkillWrapper, {});
  const [delState, delAction, deleting] = useActionState<DeleteJobSkillState, FormData>(deleteJobSkillWrapper, {});


  useEffect(() => {
    if (addState?.success) {
      toast.success(addState.message || "Skill added");
      form.reset();
      router.refresh();
    }
    if (addState?.error) toast.error(addState.error);
  }, [addState, form, router]);

  useEffect(() => {
    if (delState?.success) {
      toast.success(delState.message || "Skill removed");
      router.refresh();
    }
    if (delState?.error) toast.error(delState.error);
  }, [delState, router]);

    useEffect(() => {
        const loadSkill = async () => {
            try{
                setIsLoading(true);
                const job = await getJobByIdAction(jobId);
                // @ts-ignore
                if (job.success) {
                    // @ts-ignore
                    setSkills(job.skills || [])
                }
            } catch (error){
                console.error("Error", error)
                // @ts-ignore
                setError(error.message)
            } finally {
                setIsLoading(false);
            }
        }

        if (jobId) loadSkill()
    }, [jobId, addState, delState]);

    if (isLoading) return <Spinner />
    if (error) { // @ts-ignore
        return <p className={'text-red-500'}>{error}</p>;
    }

  return (
    <div className="space-y-2">
      <Form {...form}>
        <form action={addAction} className="flex gap-2">
          {/* Hidden jobId input included so wrapper can extract it from FormData */}
          <input type="hidden" name="jobId" value={String(jobId)} />

          <FormField
            control={form.control}
            name="skillName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input {...field} name="skillName" placeholder="Add skill (e.g. TypeScript)" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <input type="hidden" name="isRequired" value={form.getValues("isRequired") ?? "false"} />

          <div className="w-24">
            <SubmitButton text="Add" isSubmitting={adding} />
          </div>
        </form>
      </Form>

      <div className="space-y-1">
        {skills.length === 0 ? (
          <p className="text-xs text-muted-foreground">No skills yet</p>
        ) : (
          <div className="flex flex-col gap-2">
            {skills.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-2 bg-gray-50 p-2 rounded">
                <div>
                  <div className="text-sm font-medium">{s.skillName}</div>
                </div>
                <form action={delAction} className="">
                  <input type="hidden" name="jobId" value={String(jobId)} />
                  <input type="hidden" name="skillId" value={String(s.id)} />
                  <Button variant="destructive" size="sm" type="submit" disabled={deleting}>Remove</Button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
