// filepath: /mnt/kekelilit/Projects/Fullstack/meetAI/client/src/app/(recruiter)/recruiter/applications/applicationActions.ts
"use server";

import env from "@/env";
import { withCookieHeaders } from "@/lib/authHeaders";
import type {
  UpdateApplicationStatusInput,
  UpdateApplicationStatusState,
} from "@/types/application";

// Get applications for a specific job
export async function getJobApplicationsAction(
  jobId: number,
  params?: { status?: string; page?: number; limit?: number },
): Promise<{ success: true; message: string; applications: any[]; pagination?: any } | { error: string }> {
  try {
    const qs = new URLSearchParams();
    if (params?.status) qs.set("status", params.status);
    if (params?.page) qs.set("page", String(params.page));
    if (params?.limit) qs.set("limit", String(params.limit));

    const url = `${env.API_URL}/recruiter/jobs/${jobId}/applications${qs.toString() ? `?${qs.toString()}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      headers: await withCookieHeaders(),
      credentials: "include",
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to fetch applications" };
    }

    return {
      success: true,
      message: json.message,
      applications: (json.applications || []) as any[],
      pagination: json.pagination,
    };
  } catch (err) {
    console.error("[getJobApplicationsAction] network error:", err);
    return { error: "Network error. Please try again." };
  }
}

// Get all applications across recruiter's jobs
export async function getAllMyApplicationsAction(
  params?: { status?: string; page?: number; limit?: number },
): Promise<{ success: true; message: string; applications: any[]; pagination?: any } | { error: string }> {
  try {
    const qs = new URLSearchParams();
    if (params?.status) qs.set("status", params.status);
    if (params?.page) qs.set("page", String(params.page));
    if (params?.limit) qs.set("limit", String(params.limit));

    const url = `${env.API_URL}/recruiter/applications${qs.toString() ? `?${qs.toString()}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      headers: await withCookieHeaders(),
      credentials: "include",
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to fetch applications" };
    }

    return {
      success: true,
      message: json.message,
      applications: (json.applications || []) as any[],
      pagination: json.pagination,
    };
  } catch (err) {
    console.error("[getAllMyApplicationsAction] network error:", err);
    return { error: "Network error. Please try again." };
  }
}
// Valid statuses used by backend
const VALID_APPLICATION_STATUSES = ["pending", "reviewed", "shortlisted", "rejected", "accepted"] as const;

function normalizeString(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t === "" ? undefined : t;
}

function isValidApplicationStatus(v: unknown): v is UpdateApplicationStatusInput["status"] {
  return typeof v === "string" && (VALID_APPLICATION_STATUSES as readonly string[]).includes(v);
}

