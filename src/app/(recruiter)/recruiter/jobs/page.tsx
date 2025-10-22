import React from "react";
import JobList from "./components/JobList";
import JobForm from "./components/JobForm";
import { getMyCompanyAction } from "@/app/(recruiter)/recruiter/company/companyActions";

const JobsPage = async () => {
  const res = await getMyCompanyAction();
  const company = (res as any)?.company ?? null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          {/* Job creation form */}
          <JobForm company={company} />
        </div>
        <div className="lg:col-span-2">
          {/* Job list (server component handles fetching & pagination) */}
          <JobList />
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
