import React from "react";
import { getJobDetailsAction } from "@/app/(root)/jobActions";
import type { GetJobDetailsState } from "@/types/job";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ApplyButton from "@/app/(root)/listings/components/ApplyButton";
import Link from "next/link";

type Props = { params: { id: string } };

export default async function JobPage({ params }: Props) {
  const id = Number(params.id);
  const res = await getJobDetailsAction(id);

  if ((res as any).error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-600">Failed to load job details.</p>
        </CardContent>
      </Card>
    );
  }

  const state = res as GetJobDetailsState & { job?: any; company?: any; skills?: any[]; applicationCount?: number };
  const job = state.job;
  const company = state.company;
  const skills = state.skills || [];
  const applicationCount = state.applicationCount ?? 0;

  if (!job) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Job not found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">This job could not be found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="min-h-screen max-width-lg py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{job.title}</h1>
        <Link href="/listings" className="text-sm text-muted-foreground">Back to listings</Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{company?.companyName || ""}</span>
            <span className="text-sm text-muted-foreground">{job.location || ""}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p>{job.description}</p>
          </div>

          <div className="mt-4">
            <p className="text-sm font-medium">Skills required</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.length === 0 && <span className="text-sm text-muted-foreground">No skills listed</span>}
              {skills.map((s: any) => (
                <span key={s.id} className="text-sm px-2 py-1 bg-muted/10 rounded">{s.skillName}{s.isRequired ? ' • required' : ''}</span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Applications: {applicationCount}</p>
            </div>
            <div>
              <ApplyButton jobId={job.id} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

