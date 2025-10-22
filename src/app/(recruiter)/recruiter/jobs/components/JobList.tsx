import React from "react";
import {getJobByIdAction, getMyJobsAction} from "../jobActions";
import type { GetMyJobsState } from "@/types/job";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteJobButton from "@/app/(recruiter)/recruiter/jobs/components/DeleteJobButton";
import SkillsManager from "@/app/(recruiter)/recruiter/jobs/components/SkillsManager";
import EditJobDialog from "@/app/(recruiter)/recruiter/jobs/components/EditJobDialog";
import JobPagination from "@/app/(recruiter)/recruiter/jobs/components/JobPagination";
import Link from "next/link";

type Props = {
  page?: number;
  limit?: number;
};

export default async function JobList({ page = 1, limit = 10 }: Props) {
  const res = await getMyJobsAction({ page, limit });

  if ((res as any).error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-600">Failed to load jobs.</p>
        </CardContent>
      </Card>
    );
  }

  const state = res as GetMyJobsState;
  const jobs = state.jobs || [];
  const pagination = state.pagination;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Your Jobs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {jobs.length === 0 && (
            <p className="text-sm text-muted-foreground">No jobs yet. Create one to get started.</p>
          )}

          <div className="grid gap-4">
            {jobs.map((item: any) => (
              <div key={item.job.id} className="p-4 border rounded-md bg-white dark:bg-slate-900">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium">{item.job.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.company?.companyName}</p>
                    {item.job.location && <p className="text-sm text-muted-foreground">{item.job.location}</p>}
                    <p className="text-sm mt-2">{item.job.description?.slice(0, 200)}{item.job.description && item.job.description.length > 200 ? '...' : ''}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-2">
                      <Link href={`/recruiter/jobs/${item.job.id}`} className="text-sm">View</Link>
                      <EditJobDialog jobId={item.job.id} initialJob={item.job} />
                      <DeleteJobButton jobId={item.job.id} jobTitle={item.job.title} />
                    </div>
                    <div className="w-56">
                      <SkillsManager jobId={item.job.id} initialSkills={item.skills} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            // Client-side pagination that uses router.push and preserves query params

            <JobPagination pagination={{ currentPage: pagination.currentPage, totalPages: pagination.totalPages }} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
