"use server";

import env from "@/env";
import type {
  AddSkillState,
  CreateSkillInput,
  DeleteSkillState,
  Skill,
  UpdateSkillInput,
  UpdateSkillState,
} from "@/types/skill";
import { withCookieHeaders } from "@/lib/authHeaders";

// Add Skill to Profile
export async function addSkillAction(
  data: CreateSkillInput,
): Promise<
  { success: true; message: string; skill: Skill } | { error: string }
> {
  try {
    const res = await fetch(`${env.API_URL}/job-seeker/skills`, {
      method: "POST",
      headers: await withCookieHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to add skill" };
    }

    return { success: true, message: json.message, skill: json.skill as Skill };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

// Get All My Skills
export async function getMySkillsAction(): Promise<
  { success: true; message: string; skills: Skill[] } | { error: string }
> {
  try {
    const res = await fetch(`${env.API_URL}/job-seeker/skills`, {
      method: "GET",
      headers: await withCookieHeaders(),
      credentials: "include",
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to fetch skills" };
    }

    return {
      success: true,
      message: json.message,
      skills: (json.skills || []) as Skill[],
    };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

// Update Skill by ID
export async function updateSkillAction(
  id: number,
  data: UpdateSkillInput,
): Promise<
  { success: true; message: string; skill: Skill } | { error: string }
> {
  try {
    const res = await fetch(`${env.API_URL}/job-seeker/skills/${id}`, {
      method: "PUT",
      headers: await withCookieHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to update skill" };
    }

    return { success: true, message: json.message, skill: json.skill as Skill };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

// Delete Skill by ID
export async function deleteSkillAction(
  id: number,
): Promise<{ success: true; message: string } | { error: string }> {
  try {
    const res = await fetch(`${env.API_URL}/job-seeker/skills/${id}`, {
      method: "DELETE",
      headers: await withCookieHeaders(),
      credentials: "include",
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to delete skill" };
    }

    return { success: true, message: json.message };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

// ---------- FormData-based wrappers for useActionState ----------
export async function addSkill(
  _prev: any,
  formData: FormData,
): Promise<AddSkillState> {
  const payload: CreateSkillInput = {
    skillName: (formData.get("skillName") as string) || "",
    proficiencyLevel: formData.get("proficiencyLevel") as
      | "Beginner"
      | "Intermediate"
      | "Advanced"
      | "Expert",
  };
  const res = await addSkillAction(payload);
  return res as AddSkillState;
}

export async function updateSkill(
  _prev: any,
  formData: FormData,
): Promise<UpdateSkillState> {
  const idStr = (formData.get("id") as string) || "";
  const id = Number(idStr);
  const payload: UpdateSkillInput = {
    skillName: (formData.get("skillName") as string) || undefined,
    proficiencyLevel: formData.get("proficiencyLevel") as
      | "Beginner"
      | "Intermediate"
      | "Advanced"
      | "Expert",
  };
  const res = await updateSkillAction(id, payload);
  return res as UpdateSkillState;
}

export async function deleteSkill(
  _prev: any,
  formData: FormData,
): Promise<DeleteSkillState> {
  const idStr = (formData.get("id") as string) || "";
  const id = Number(idStr);
  const res = await deleteSkillAction(id);
  return res as DeleteSkillState;
}
