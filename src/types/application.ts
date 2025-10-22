
import type { JobSeekerProfile } from "@/types/profile";
import type { ServerState } from "@/types/server";

export type ApplicationStatus =
  | "pending"
  | "reviewed"
  | "shortlisted"
  | "rejected"
  | "accepted";

export type Application = {
  id: number;
  jobId: number;
  jobSeekerId: number;
  status: ApplicationStatus;
  coverLetter?: string | null;
  resumeUrl?: string | null;
  appliedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type ApplicationWithApplicantProfile = {
  application: Application;
  applicant: {
    id: number;
    name: string;
    email: string;
  };
  profile?: JobSeekerProfile | null;
};

export type ApplicationWithJobCompany = {
  application: Application;
  job: {
    id: number;
    title: string;
    status?: string | null;
  };
  company: {
    id: number;
    companyName: string;
  };
  applicant: {
    id: number;
    name: string;
    email: string;
  };
};

export type GetJobApplicationsState = ServerState & {
  applications?: ApplicationWithApplicantProfile[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalApplications: number;
    limit: number;
  };
};

export type GetAllMyApplicationsState = ServerState & {
  applications?: ApplicationWithJobCompany[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalApplications: number;
    limit: number;
  };
};

export type UpdateApplicationStatusInput = {
  status: ApplicationStatus;
};

export type UpdateApplicationStatusState = ServerState & {
  application?: Application;
};

