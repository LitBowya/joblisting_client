// filepath: /mnt/kekelilit/Projects/Fullstack/meetAI/client/src/app/(recruiter)/recruiter/applications/components/JobApplicationsList.tsx
import React from "react";
import { getJobApplicationsAction } from "../applicationActions";
import type { GetJobApplicationsState } from "@/types/application";
import ApplicationCard from "./ApplicationCard";
import JobPagination from "@/app/(recruiter)/recruiter/jobs/components/JobPagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  jobId: number;
  page?: number;
  limit?: number;
  status?: string | undefined;
};

export default async function JobApplicationsList({ jobId, page = 1, limit = 10, status }: Props) {
  const res = await getJobApplicationsAction(jobId, { page, limit, status });

  if ((res as any).error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-600">Failed to load applications.</p>
        </CardContent>
      </Card>
    );
  }

  const state = res as GetJobApplicationsState;
  const applications = state.applications || [];
  const pagination = state.pagination;

  return (
    <div className="space-y-4">
      {applications.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No applications found for this job.</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {applications.map((item: any) => (
          <ApplicationCard key={item.application.id} item={item} />
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <JobPagination pagination={{ currentPage: pagination.currentPage, totalPages: pagination.totalPages }} />
      )}
    </div>
  );
}

