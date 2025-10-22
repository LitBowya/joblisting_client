import React from "react";
import Filters from "./components/Filters";
import ApplicationsList from "./components/ApplicationsList";
import JobApplicationsList from "./components/JobApplicationsList";
import { getMyJobsAction } from "../jobs/jobActions";

type SearchParams = { [key: string]: string | string[] | undefined } | undefined;

export default async function ApplicationsPage({ searchParams }: { searchParams?: SearchParams }) {
  const qs = searchParams || {};

  function getParam(key: string) {
    const v = qs?.[key];
    if (Array.isArray(v)) return v[0];
    return v as string | undefined;
  }

  const page = Number(getParam("page") || "1");
  const limit = Number(getParam("limit") || "10");
  const status = getParam("status");
  const jobIdParam = getParam("jobId");
  const jobId = jobIdParam ? Number(jobIdParam) : undefined;

  // Fetch recruiter's jobs for the Job filter dropdown (fetch many to populate selector)
  const jobsRes = await getMyJobsAction({ page: 1, limit: 100 });
  const jobs = (jobsRes as any).jobs || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Applications</h1>
      </div>

      <Filters jobs={jobs} currentJobId={jobId} currentStatus={status} />

      <div className="mt-4">
        {jobId ? (
          <JobApplicationsList jobId={jobId} page={page} limit={limit} status={status} />
        ) : (
          <ApplicationsList page={page} limit={limit} status={status} />
        )}
      </div>
    </div>
  );
}
