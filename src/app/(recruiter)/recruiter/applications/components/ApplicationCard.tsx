
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type Props = {
  item: any; // either ApplicationWithJobCompany or ApplicationWithApplicantProfile
};

export default function ApplicationCard({ item }: Props) {
  // normalize shapes
  const app = item.application || item;
  const applicant = item.applicant;
  const profile = (item.profile || null) as any;
  const job = item.job || app.job || null;
  const company = item.company || null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{job?.title || app?.jobTitle || "Application"}</span>
          <span className="text-sm text-muted-foreground">{new Date(app?.appliedAt || app?.createdAt || Date.now()).toLocaleString()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div>
            <p className="font-medium">{applicant?.name || app?.applicantName || "Unknown"}</p>
            <p className="text-sm text-muted-foreground">{applicant?.email || app?.applicantEmail}</p>
            {company?.companyName && <p className="text-sm text-muted-foreground">{company.companyName}</p>}
            {profile?.headline && <p className="text-sm mt-2">{profile.headline}</p>}
            {app.coverLetter && (
              <div className="mt-2 text-sm">
                <p className="font-medium">Cover Letter</p>
                <p className="text-sm text-muted-foreground">{app.coverLetter.slice(0, 300)}{app.coverLetter.length > 300 ? '...' : ''}</p>
                <Link href={`/recruiter/applications/${app.id}`} className="text-sm text-primary">View full application</Link>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between items-end gap-4">
            <div className="text-right">
              <p className="text-sm">Status</p>
              <p className="font-medium">{app.status}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

