"use server";

import env from "@/env";
import type {
  Company,
  CreateCompanyInput,
  UpdateCompanyInput,
  CreateCompanyState,
  UpdateCompanyState,
  DeleteCompanyState,
} from "@/types/company";
import { withCookieHeaders } from "@/lib/authHeaders";

// Create Company Profile
export async function createCompanyAction(
  data: CreateCompanyInput,
): Promise<{ success: true; message: string; company: Company } | { error: string }> {
  try {
    const res = await fetch(`${env.API_URL}/recruiter/company`, {
      method: "POST",
      headers: await withCookieHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to create company" };
    }

    return { success: true, message: json.message, company: json.company };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

// Get Company Profile (Current Recruiter)
export async function getMyCompanyAction(): Promise<
  | { success: true; message: string; company: Company }
  | { error: string }
> {
  try {
    const res = await fetch(`${env.API_URL}/recruiter/company`, {
      method: "GET",
      headers: await withCookieHeaders(),
      credentials: "include",
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to fetch company" };
    }

    return { success: true, message: json.message, company: json.company };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

// Update Company Profile
export async function updateCompanyAction(
  data: UpdateCompanyInput,
): Promise<{ success: true; message: string; company: Company } | { error: string }> {
  try {
    const res = await fetch(`${env.API_URL}/recruiter/company`, {
      method: "PUT",
      headers: await withCookieHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to update company" };
    }

    return { success: true, message: json.message, company: json.company };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

// Delete Company Profile
export async function deleteCompanyAction(): Promise<
  { success: true; message: string } | { error: string }
> {
  try {
    const res = await fetch(`${env.API_URL}/recruiter/company`, {
      method: "DELETE",
      headers: await withCookieHeaders(),
      credentials: "include",
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: json.message || "Failed to delete company" };
    }

    return { success: true, message: json.message };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

// ---------- FormData-based wrappers for useActionState ----------
export async function createCompany(
  _prev: any,
  formData: FormData,
): Promise<CreateCompanyState> {
  const payload: CreateCompanyInput = {
    companyName: (formData.get("companyName") as string) || "",
    companyEmail: (formData.get("companyEmail") as string) || undefined,
    companyPhone: (formData.get("companyPhone") as string) || undefined,
    website: (formData.get("website") as string) || undefined,
    industry: (formData.get("industry") as string) || undefined,
    location: (formData.get("location") as string) || undefined,
  };
  const res = await createCompanyAction(payload);
  return res as CreateCompanyState;
}

export async function updateCompany(
  _prev: any,
  formData: FormData,
): Promise<UpdateCompanyState> {
  const payload: UpdateCompanyInput = {
    companyName: (formData.get("companyName") as string) || undefined,
    companyEmail: (formData.get("companyEmail") as string) || undefined,
    companyPhone: (formData.get("companyPhone") as string) || undefined,
    website: (formData.get("website") as string) || undefined,
    industry: (formData.get("industry") as string) || undefined,
    location: (formData.get("location") as string) || undefined,
  };
  const res = await updateCompanyAction(payload);
  return res as UpdateCompanyState;
}

export async function deleteCompany(
  _prev: any,
  _formData: FormData,
): Promise<DeleteCompanyState> {
  const res = await deleteCompanyAction();
  return res as DeleteCompanyState;
}
