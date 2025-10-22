"use server";

import env from "@/env";
import { withCookieHeaders } from "@/lib/authHeaders";

// Get User Profile
export async function getUserProfileAction() {
  try {
    const res = await fetch(`${env.API_URL}/users/profile`, {
      method: "GET",
      headers: await withCookieHeaders(),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || "Failed to fetch profile" };
    }

    return { success: true, message: data.message, user: data.user };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

// Update User Profile
export async function updateUserProfileAction(formData: FormData) {
  try {
    const body: Record<string, string> = {};
    if (formData.get("name")) body.name = formData.get("name") as string;
    if (formData.get("email")) body.email = formData.get("email") as string;

    const res = await fetch(`${env.API_URL}/users/profile`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: await withCookieHeaders(),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || "Failed to update profile" };
    }

    return { success: true, message: data.message, user: data.user };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

// Change Password
export async function changePasswordAction(formData: FormData) {
  try {
    const res = await fetch(`${env.API_URL}/users/change-password`, {
      method: "PUT",
      body: JSON.stringify({
        currentPassword: formData.get("currentPassword"),
        newPassword: formData.get("newPassword"),
      }),
      headers: await withCookieHeaders(),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || "Failed to change password" };
    }

    return { success: true, message: data.message };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}
