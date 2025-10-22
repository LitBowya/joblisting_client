"use server";

import env from "@/env";
import type {
  CreateJobSeekerProfileInput,
  UpdateJobSeekerProfileInput,
  JobSeekerProfile,
} from "@/types/profile";
import type { Skill } from "@/types/skill";
import { withCookieHeaders } from "@/lib/authHeaders";
import {
  CreateJobSeekerProfileState,
  DeleteJobSeekerProfileState,
  UpdateJobSeekerProfileState,
} from "@/types/job";

// Create Job Seeker Profile
export async function createJobSeekerProfileAction(
  data: CreateJobSeekerProfileInput,
): Promise<
  | { success: true; message: string; profile: JobSeekerProfile }
  | { error: string }
> {
  try {
    const res = await fetch(`${env.API_URL}/job-seeker/profile`, {
      method: "POST",
      headers: await withCookieHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to create profile" };
    }

    return { success: true, message: json.message, profile: json.profile };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

// Get My Job Seeker Profile
export async function getMyJobSeekerProfileAction(): Promise<
  | {
      success: true;
      message: string;
      profile: JobSeekerProfile;
      skills?: Skill[];
    }
  | { error: string }
> {
  try {
    const res = await fetch(`${env.API_URL}/job-seeker/profile`, {
      method: "GET",
      headers: await withCookieHeaders(),
      credentials: "include",
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to fetch profile" };
    }

    return {
      success: true,
      message: json.message,
      profile: json.profile as JobSeekerProfile,
      skills: json.skills as Skill[] | undefined,
    };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

// Update Job Seeker Profile
export async function updateJobSeekerProfileAction(
  data: UpdateJobSeekerProfileInput,
): Promise<
  | { success: true; message: string; profile: JobSeekerProfile }
  | { error: string }
> {
  try {
    const res = await fetch(`${env.API_URL}/job-seeker/profile`, {
      method: "PUT",
      headers: await withCookieHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to update profile" };
    }

    return { success: true, message: json.message, profile: json.profile };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

// Delete Job Seeker Profile
export async function deleteJobSeekerProfileAction(): Promise<
  { success: true; message: string } | { error: string }
> {
  try {
    const res = await fetch(`${env.API_URL}/job-seeker/profile`, {
      method: "DELETE",
      headers: await withCookieHeaders(),
      credentials: "include",
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to delete profile" };
    }

    return { success: true, message: json.message };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

// ---------- FormData-based wrappers for useActionState ----------
export async function createJobSeekerProfile(
  _prevState: any,
  formData: FormData,
): Promise<CreateJobSeekerProfileState> {
  const payload: CreateJobSeekerProfileInput = {
    phone: (formData.get("phone") as string) || undefined,
    location: (formData.get("location") as string) || undefined,
    bio: (formData.get("bio") as string) || undefined,
    yearsOfExperience: formData.get("yearsOfExperience")
      ? Number(formData.get("yearsOfExperience"))
      : undefined,
  };
  const res = await createJobSeekerProfileAction(payload);
  return res as CreateJobSeekerProfileState;
}

export async function updateJobSeekerProfile(
  _prevState: any,
  formData: FormData,
): Promise<UpdateJobSeekerProfileState> {
  const payload: UpdateJobSeekerProfileInput = {
    phone: (formData.get("phone") as string) || undefined,
    location: (formData.get("location") as string) || undefined,
    bio: (formData.get("bio") as string) || undefined,
    yearsOfExperience: formData.get("yearsOfExperience")
      ? Number(formData.get("yearsOfExperience"))
      : undefined,
  };
  const res = await updateJobSeekerProfileAction(payload);
  return res as UpdateJobSeekerProfileState;
}

export async function deleteJobSeekerProfile(
  _prevState: any,
  _formData: FormData,
): Promise<DeleteJobSeekerProfileState> {
  const res = await deleteJobSeekerProfileAction();
  return res as DeleteJobSeekerProfileState;
}
