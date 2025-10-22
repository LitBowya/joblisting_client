// filepath: /mnt/kekelilit/Projects/Fullstack/meetAI/client/src/app/(root)/components/RecommendedJobs.tsx
import React from "react";
import Link from "next/link";
import { getRecommendedJobsAction } from "@/app/(root)/jobActions";
import type { GetRecommendedJobsState } from "@/types/job";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobPagination from "@/app/(recruiter)/recruiter/jobs/components/JobPagination";
import ApplyButton from "@/app/(root)/listings/components/ApplyButton";

type Props = {
  page?: number;
  limit?: number;
};

export default async function RecommendedJobs({ page = 1, limit = 6 }: Props) {
  // Fetch recommendations server-side (requires auth; will return a friendly message if profile missing)
  const res = await getRecommendedJobsAction({ page, limit });

  if ((res as any).error) {
    // If unauthenticated or profile missing, show a small hint with CTA.
    const err = res as { error: string };
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recommended for you</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{err.error || "Unable to load recommendations"}</p>
        </CardContent>
      </Card>
    );
  }

  const state = res as GetRecommendedJobsState;
  const jobs = state.jobs || [];
  const pagination = state.pagination;

  if (jobs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recommended for you</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Add skills to your profile to receive personalized recommendations.</p>
          <div className="mt-3">
            <Link href="/profile" className="text-sm text-primary">Edit profile</Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recommended for you</h2>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((item: any) => {
          const job = item.job ?? item;
          return (
            <Card key={job.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{job.title}</span>
                  <span className="text-sm text-muted-foreground">{item.matchPercentage ?? 0}% match</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.company?.companyName}</p>
                <p className="mt-2 text-sm">{(job.description || "").slice(0, 120)}{(job.description || "").length > 120 ? "…" : ""}</p>
                <div className="mt-3 flex items-center justify-between">
                  <Link href={`/listings/${job.id}`} className="text-sm text-primary">View</Link>
                  <ApplyButton jobId={job.id} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <JobPagination pagination={{ currentPage: pagination.currentPage, totalPages: pagination.totalPages }} />
      )}
    </div>
  );
}
