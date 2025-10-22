// filepath: /mnt/kekelilit/Projects/Fullstack/meetAI/client/src/app/(root)/jobActions.ts
"use server";

import env from "@/env";
import { withCookieHeaders } from "@/lib/authHeaders";
import type {
  GetJobsState,
  ApplyToJobState,
  WithdrawApplicationState,
} from "@/types/job";

// Search jobs (public)
export async function searchJobsAction(
  params?: { search?: string; location?: string; jobType?: string; locationType?: string; skills?: string; page?: number; limit?: number },
): Promise<{ success: true; message: string; jobs: any[]; pagination?: any; filters?: any } | { error: string }> {
  try {
    const qs = new URLSearchParams();
    if (params?.search) qs.set("search", params.search);
    if (params?.location) qs.set("location", params.location);
    if (params?.jobType) qs.set("jobType", params.jobType);
    if (params?.locationType) qs.set("locationType", params.locationType);
    if (params?.skills) qs.set("skills", params.skills);
    if (params?.page) qs.set("page", String(params.page));
    if (params?.limit) qs.set("limit", String(params.limit));

    const url = `${env.API_URL}/job-seeker/jobs/search${qs.toString() ? `?${qs.toString()}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      headers: await withCookieHeaders(),
      credentials: "include",
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to search jobs" };
    }

    return {
      success: true,
      message: json.message,
      jobs: (json.jobs || []) as any[],
      pagination: json.pagination,
      filters: json.filters,
    };
  } catch (err) {
    console.error("[searchJobsAction] network error:", err);
    return { error: "Network error. Please try again." };
  }
}

// Get all jobs (with optional filters)
export async function getJobsAction(
  params?: { title?: string; companyId?: number; location?: string },
): Promise<GetJobsState | { error: string }> {
  try {
    const qs = new URLSearchParams();
    if (params?.title) qs.set("title", params.title);
    if (typeof params?.companyId !== "undefined") qs.set("companyId", String(params.companyId));
    if (params?.location) qs.set("location", params.location);

    const url = `${env.API_URL}/job-seeker/jobs${qs.toString() ? `?${qs.toString()}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      headers: await withCookieHeaders(),
      credentials: "include",
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to fetch jobs" };
    }

    // Map backend shape into GetJobsState shape
    const state: GetJobsState = {
      success: true,
      message: json.message,
      jobs: (json.jobs || []) as any[],
      // backend returns total; we'll keep it in pagination.totalJobs for compatibility
      pagination: json.total !== undefined ? { currentPage: 1, totalPages: 1, totalJobs: json.total, limit: (json.jobs || []).length } : json.pagination,
    };

    return state;
  } catch (err) {
    console.error("[getJobsAction] network error:", err);
    return { error: "Network error. Please try again." };
  }
}

// Get job details by ID
export async function getJobDetailsAction(
  id: number,
): Promise<{ success: true; message: string; job: any; company?: any; skills?: any[]; applicationCount?: number } | { error: string }> {
  try {
    const res = await fetch(`${env.API_URL}/job-seeker/jobs/${id}`, {
      method: "GET",
      headers: await withCookieHeaders(),
      credentials: "include",
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to fetch job details" };
    }

    return {
      success: true,
      message: json.message,
      job: json.job,
      company: json.company,
      skills: json.skills || [],
      applicationCount: json.applicationCount,
    };
  } catch (err) {
    console.error("[getJobDetailsAction] network error:", err);
    return { error: "Network error. Please try again." };
  }
}

// Get recommended jobs for current user
export async function getRecommendedJobsAction(
  params?: { page?: number; limit?: number },
): Promise<{ success: true; message: string; jobs: any[]; pagination?: any; userSkillsCount?: number } | { error: string }> {
  try {
    const qs = new URLSearchParams();
    if (params?.page) qs.set("page", String(params.page));
    if (params?.limit) qs.set("limit", String(params.limit));

    const url = `${env.API_URL}/job-seeker/jobs/recommended${qs.toString() ? `?${qs.toString()}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      headers: await withCookieHeaders(),
      credentials: "include",
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to fetch recommended jobs" };
    }

    return {
      success: true,
      message: json.message,
      jobs: (json.jobs || []) as any[],
      pagination: json.pagination,
      userSkillsCount: json.userSkillsCount,
    };
  } catch (err) {
    console.error("[getRecommendedJobsAction] network error:", err);
    return { error: "Network error. Please try again." };
  }
}

// Apply to job
export async function applyToJobAction(
  jobId: number,
): Promise<{ success: true; message: string; application: any } | { error: string }> {
  try {
    const res = await fetch(`${env.API_URL}/job-seeker/jobs/${jobId}/apply`, {
      method: "POST",
      headers: await withCookieHeaders(),
      credentials: "include",
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to apply to job" };
    }

    return { success: true, message: json.message, application: json.application };
  } catch (err) {
    console.error("[applyToJobAction] network error:", err);
    return { error: "Network error. Please try again." };
  }
}

// ---------- FormData wrappers for useActionState ----------
export async function applyToJob(_prev: any, formData: FormData): Promise<ApplyToJobState> {
  const jobIdStr = (formData.get("jobId") as string) || "";
  const jobId = Number(jobIdStr);
  if (!jobId) return { error: "Invalid job id" } as ApplyToJobState;
  const res = await applyToJobAction(jobId);
  return res as ApplyToJobState;
}
