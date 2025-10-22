import type { JobSeekerProfile } from "@/types/profile";
import { ServerState } from "@/types/server";

export type CreateJobSeekerProfileState = ServerState & {
  profile?: JobSeekerProfile;
};

export type UpdateJobSeekerProfileState = ServerState & {
  profile?: JobSeekerProfile;
};

export type DeleteJobSeekerProfileState = ServerState;

export type Job = {
  id: number;
  companyId: number;
  recruiterId: number;
  title: string;
  description: string;
  jobType: "full_time" | "part_time" | "contract" | "internship" | "freelance";
  locationType: "on_site" | "remote" | "hybrid";
  location?: string | null;
  deadline?: string | null;
  status?: "open" | "closed" | "draft";
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type JobCompanyMini = {
  id: number;
  companyName: string;
  location?: string | null;
};

export type JobWithCompany = {
  job: Job;
  company: JobCompanyMini;
};

export type JobSkill = {
  id: number;
  jobId: number;
  skillName: string;
  isRequired?: boolean;
  createdAt?: string | null;
};

export type CreateJobInput = {
  companyId: number;
  title: string;
  description: string;
  jobType: Job["jobType"];
  locationType: Job["locationType"];
  location?: string;
  deadline?: string; // YYYY-MM-DD
  status?: Job["status"];
};

export type UpdateJobInput = Partial<CreateJobInput> & {
  id?: number;
};

export type AddJobSkillInput = {
  skillName: string;
  isRequired?: boolean;
};

// States
export type CreateJobState = ServerState & {
  job?: Job;
};

export type GetMyJobsState = ServerState & {
  jobs?: JobWithCompany[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalJobs: number;
    limit: number;
  };
};

export type GetJobByIdState = ServerState & {
  job?: Job;
  company?: JobCompanyMini;
  skills?: JobSkill[];
};

export type UpdateJobState = ServerState & {
  job?: Job;
};

export type DeleteJobState = ServerState;

export type AddJobSkillState = ServerState & {
  skill?: JobSkill;
};

export type GetJobSkillsState = ServerState & {
  skills?: JobSkill[];
};

export type DeleteJobSkillState = ServerState;

export type JobSearchFilters = {
  search?: string | null;
  location?: string | null;
  jobType?: Job["jobType"] | null;
  locationType?: Job["locationType"] | null;
  skills?: string | null; // comma-separated
};

export type GetJobsState = ServerState & {
  jobs?: (JobWithCompany & { skills?: JobSkill[] })[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalJobs: number;
    limit: number;
  };
  filters?: JobSearchFilters;
};

export type GetJobDetailsState = ServerState & {
  job?: Job;
  company?: JobCompanyMini;
  skills?: JobSkill[];
  applicationCount?: number;
};

export type RecommendedJob = JobWithCompany & {
  skills?: JobSkill[];
  matchPercentage?: number;
  matchingSkillsCount?: number;
};

export type GetRecommendedJobsState = ServerState & {
  jobs?: RecommendedJob[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalJobs: number;
    limit: number;
  };
  userSkillsCount?: number;
};

export type ApplyToJobState = ServerState & {
  application?: any;
};

export type GetMyApplicationsState = ServerState & {
  applications?: any[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalApplications: number;
    limit: number;
  };
};

export type WithdrawApplicationState = ServerState;

export type ApplyToJobInput = {
  jobId: number;
};

export type WithdrawApplicationInput = {
  applicationId: number;
};

