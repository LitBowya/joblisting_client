"use server";

import env from "@/env";
import type {
  CreateJobInput,
  CreateJobState,
  UpdateJobInput,
  UpdateJobState,
  DeleteJobState,
  AddJobSkillInput,
  AddJobSkillState,
  DeleteJobSkillState,
} from "@/types/job";
import { withCookieHeaders } from "@/lib/authHeaders";

// Create Job
export async function createJobAction(
  data: CreateJobInput,
): Promise<{ success: true; message: string; job: any } | { error: string }> {
  try {
    // Debug log: show payload before sending to backend (helps troubleshoot zod errors)
    console.debug("[createJobAction] payload:", JSON.stringify(data));

    const res = await fetch(`${env.API_URL}/recruiter/jobs`, {
      method: "POST",
      headers: await withCookieHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      // Log backend message for easier debugging
      console.debug("[createJobAction] backend error:", json);
      return { error: json.message || "Failed to create job" };
    }

    return { success: true, message: json.message, job: json.job };
  } catch (err) {
    console.error("[createJobAction] network error:", err);
    return { error: "Network error. Please try again." };
  }
}

// Get My Jobs (with optional filters)
export async function getMyJobsAction(
  params?: { status?: string; page?: number; limit?: number },
): Promise<{ success: true; message: string; jobs: any[]; pagination?: any } | { error: string }> {
  try {
    const qs = new URLSearchParams();
    if (params?.status) qs.set("status", params.status);
    if (params?.page) qs.set("page", String(params.page));
    if (params?.limit) qs.set("limit", String(params.limit));

    const url = `${env.API_URL}/recruiter/jobs${qs.toString() ? `?${qs.toString()}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      headers: await withCookieHeaders(),
      credentials: "include",
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to fetch jobs" };
    }

    return {
      success: true,
      message: json.message,
      jobs: (json.jobs || []) as any[],
      pagination: json.pagination,
    };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

// Get Job by ID
export async function getJobByIdAction(
  id: number,
): Promise<{ success: true; message: string; job: any; company?: any; skills?: any[] } | { error: string }> {
  try {
    const res = await fetch(`${env.API_URL}/recruiter/jobs/${id}`, {
      method: "GET",
      headers: await withCookieHeaders(),
      credentials: "include",
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to fetch job" };
    }

    return {
      success: true,
      message: json.message,
      job: json.job,
      company: json.company,
      skills: json.skills || [],
    };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

// Update Job
export async function updateJobAction(
  id: number,
  data: UpdateJobInput,
): Promise<{ success: true; message: string; job: any } | { error: string }> {
  try {
    console.debug("[updateJobAction] id:", id, "payload:", JSON.stringify(data));

    const res = await fetch(`${env.API_URL}/recruiter/jobs/${id}`, {
      method: "PUT",
      headers: await withCookieHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.debug("[updateJobAction] backend error:", json);
      return { error: json.message || "Failed to update job" };
    }

    return { success: true, message: json.message, job: json.job };
  } catch (err) {
    console.error("[updateJobAction] network error:", err);
    return { error: "Network error. Please try again." };
  }
}

// Delete Job
export async function deleteJobAction(
  id: number,
): Promise<{ success: true; message: string } | { error: string }> {
  try {
    const res = await fetch(`${env.API_URL}/recruiter/jobs/${id}`, {
      method: "DELETE",
      headers: await withCookieHeaders(),
      credentials: "include",
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to delete job" };
    }

    return { success: true, message: json.message };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

// Add Skill to Job
export async function addJobSkillAction(
  jobId: number,
  data: AddJobSkillInput,
): Promise<{ success: true; message: string; skill: any } | { error: string }> {
  try {
    const res = await fetch(`${env.API_URL}/recruiter/jobs/${jobId}/skills`, {
      method: "POST",
      headers: await withCookieHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to add skill to job" };
    }

    return { success: true, message: json.message, skill: json.skill };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

// Delete Job Skill
export async function deleteJobSkillAction(
  jobId: number,
  skillId: number,
): Promise<{ success: true; message: string } | { error: string }> {
  try {
    const res = await fetch(
      `${env.API_URL}/recruiter/jobs/${jobId}/skills/${skillId}`,
      {
        method: "DELETE",
        headers: await withCookieHeaders(),
        credentials: "include",
      },
    );

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to remove job skill" };
    }

    return { success: true, message: json.message };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

// ---------- Helper validators ----------
const VALID_STATUSES = ["open", "closed", "draft"] as const;
const VALID_JOB_TYPES = ["full_time", "part_time", "contract", "internship", "freelance"] as const;
const VALID_LOCATION_TYPES = ["on_site", "remote", "hybrid"] as const;

function normalizeString(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t === "" ? undefined : t;
}

function isValidStatus(v: unknown): v is CreateJobInput["status"] {
  return typeof v === "string" && (VALID_STATUSES as readonly string[]).includes(v);
}
function isValidJobType(v: unknown): v is CreateJobInput["jobType"] {
  return typeof v === "string" && (VALID_JOB_TYPES as readonly string[]).includes(v);
}
function isValidLocationType(v: unknown): v is CreateJobInput["locationType"] {
  return typeof v === "string" && (VALID_LOCATION_TYPES as readonly string[]).includes(v);
}

// ---------- FormData-based wrappers for useActionState ----------
export async function createJob(
  _prev: any,
  formData: FormData,
): Promise<CreateJobState> {
  const rawStatus = normalizeString(formData.get("status"));
  const rawJobType = normalizeString(formData.get("jobType"));
  const rawLocationType = normalizeString(formData.get("locationType"));

  // normalize to expected casing (backend expects exact lower_snake_case)
  const normStatus = rawStatus ? rawStatus.toLowerCase() : undefined;
  const normJobType = rawJobType ? rawJobType.toLowerCase() : undefined;
  const normLocationType = rawLocationType ? rawLocationType.toLowerCase() : undefined;

  const payload: CreateJobInput = {
    companyId: Number((formData.get("companyId") as string) || 0),
    title: (formData.get("title") as string) || "",
    description: (formData.get("description") as string) || "",
    jobType: isValidJobType(normJobType) ? (normJobType as CreateJobInput["jobType"]) : "full_time",
    locationType: isValidLocationType(normLocationType) ? (normLocationType as CreateJobInput["locationType"]) : "remote",
    location: (formData.get("location") as string) || undefined,
    deadline: (formData.get("deadline") as string) || undefined,
    // only include status if valid; otherwise let backend default apply by passing undefined
    status: isValidStatus(normStatus) ? (normStatus as CreateJobInput["status"]) : undefined,
  };

  const res = await createJobAction(payload);
  return res as CreateJobState;
}

export async function updateJob(
  _prev: any,
  formData: FormData,
): Promise<UpdateJobState> {
  const idStr = (formData.get("id") as string) || "";
  const id = Number(idStr);

  const rawStatus = normalizeString(formData.get("status"));
  const rawJobType = normalizeString(formData.get("jobType"));
  const rawLocationType = normalizeString(formData.get("locationType"));

  const normStatus = rawStatus ? rawStatus.toLowerCase() : undefined;
  const normJobType = rawJobType ? rawJobType.toLowerCase() : undefined;
  const normLocationType = rawLocationType ? rawLocationType.toLowerCase() : undefined;

  const payload: UpdateJobInput = {
    title: (formData.get("title") as string) || undefined,
    description: (formData.get("description") as string) || undefined,
    jobType: isValidJobType(normJobType) ? (normJobType as UpdateJobInput["jobType"]) : undefined,
    locationType: isValidLocationType(normLocationType) ? (normLocationType as UpdateJobInput["locationType"]) : undefined,
    location: (formData.get("location") as string) || undefined,
    deadline: (formData.get("deadline") as string) || undefined,
    status: isValidStatus(normStatus) ? (normStatus as UpdateJobInput["status"]) : undefined,
  };
  const res = await updateJobAction(id, payload);
  return res as UpdateJobState;
}

export async function deleteJob(
  _prev: any,
  formData: FormData,
): Promise<DeleteJobState> {
  const idStr = (formData.get("id") as string) || "";
  const id = Number(idStr);
  const res = await deleteJobAction(id);
  return res as DeleteJobState;
}

export async function addJobSkill(
  _prev: any,
  formData: FormData,
): Promise<AddJobSkillState> {
  const jobIdStr = (formData.get("jobId") as string) || "";
  const jobId = Number(jobIdStr);
  const payload: AddJobSkillInput = {
    skillName: (formData.get("skillName") as string) || "",
    isRequired: formData.get("isRequired") ? (formData.get("isRequired") === "true") : undefined,
  };
  const res = await addJobSkillAction(jobId, payload);
  return res as AddJobSkillState;
}

export async function deleteJobSkill(
  _prev: any,
  formData: FormData,
): Promise<DeleteJobSkillState> {
  const jobIdStr = (formData.get("jobId") as string) || "";
  const skillIdStr = (formData.get("skillId") as string) || "";
  const jobId = Number(jobIdStr);
  const skillId = Number(skillIdStr);
  const res = await deleteJobSkillAction(jobId, skillId);
  return res as DeleteJobSkillState;
}
