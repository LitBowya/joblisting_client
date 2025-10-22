import React from "react";
import { getJobsAction, searchJobsAction } from "@/app/(root)/jobActions";
import type { GetJobsState } from "@/types/job";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import JobPagination from "@/app/(recruiter)/recruiter/jobs/components/JobPagination";
import JobFilters from "./JobFilters";
import { Button } from "@/components/ui/button";

type SearchParams = { [key: string]: string | string[] | undefined } | undefined;

export default async function GetJobs({ searchParams }: { searchParams?: SearchParams }) {
  const qs = searchParams || {};

  function getParam(key: string) {
    const v = qs?.[key];
    if (Array.isArray(v)) return v[0];
    return v as string | undefined;
  }

  const page = Number(getParam("page") || "1");
  const limit = Number(getParam("limit") || "10");
  const title = getParam("title");
  const companyIdStr = getParam("companyId");
  const companyId = companyIdStr ? Number(companyIdStr) : undefined;
  const location = getParam("location");
  const jobType = getParam("jobType");
  const locationType = getParam("locationType");

  const useSearch = Boolean(
    title || location || jobType || locationType || page !== 1 || limit !== 10
  );

  let res: any;

  if (useSearch) {
    res = await searchJobsAction({
      search: title || undefined,
      location: location || undefined,
      locationType: locationType || undefined,
      jobType: jobType || undefined,
      page,
      limit,
    });
  } else {
    res = await getJobsAction({ title: title || undefined, companyId, location: location || undefined });
  }

  if (res?.error) {
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

  let jobs: any[];
  let pagination: any;

  if (useSearch) {
    jobs = res.jobs || [];
    pagination = res.pagination;
  } else {
    const state = res as GetJobsState;
    jobs = state.jobs || [];
    pagination = state.pagination;
  }

  return (
    <div className="max-width-lg my-10">
      <JobFilters />

      {jobs.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No jobs found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Try adjusting your search filters.</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((item: any) => (
          <Card key={item.job?.id ?? item.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{item.job?.title ?? item.title}</span>
                <span className="text-sm text-muted-foreground">{item.job?.location ?? item.location}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.company?.companyName}</p>
              <p className="mt-2 text-sm">
                {(item.job?.description ?? item.description)
                  ? (item.job?.description ?? item.description).slice(0, 200)
                  : ""}
                {(item.job?.description ?? item.description) &&
                  (item.job?.description ?? item.description).length > 200
                  ? "..."
                  : ""}
              </p>
              <Button className="mt-3">
                <Link href={`/listings/${item.job?.id ?? item.id}`} className="text-sm text-white">View details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <JobPagination pagination={{ currentPage: pagination.currentPage, totalPages: pagination.totalPages }} />
      )}
    </div>
  );
}
