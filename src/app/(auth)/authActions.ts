"use server";

import env from "@/env";
import { cookies } from "next/headers";
import { withCookieHeaders } from "@/lib/authHeaders";

export async function registerUser(prevState: any, formData: FormData) {
  try {
    const res = await fetch(`${env.API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        userType: formData.get("userType"),
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || "Registration failed" };
    }

    return {
      success: true,
      message: "Registration successful!",
      email: formData.get("email"),
    };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

export async function loginUser(prevState: any, formData: FormData) {
  try {
    const res = await fetch(`${env.API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    // Get cookie jar for setting on our domain
    const jar = await cookies();

    // Attempt to capture Set-Cookie headers from backend and re-set them for our domain
    const rawSetCookie = res.headers.get("set-cookie");

    if (rawSetCookie) {
      // Split on commas that indicate a new cookie (not the comma in Expires)
      const cookieParts = rawSetCookie.split(/,(?=\s*[^;=]+=)/);

      cookieParts.forEach((cookieStr) => {
        const segments = cookieStr.split(";").map((s) => s.trim());
        const [nameValue] = segments;
        const [name, value] = nameValue.split("=");

        if (!name || !value) return;
        if (name !== "accessToken" && name !== "refreshToken") return;

        jar.set(name, value);
      });
    }

    const data = await res.json();

    if (!res.ok) {
      return { error: data?.message || "Invalid credentials" };
    }

    return {
      success: true,
      message: "Login successful!",
      user: data.user,
    };
  } catch (err) {
    console.error("Login Error:", err);
    return { error: "Network error. Please try again." };
  }
}

export async function verifyOtp(prevState: any, formData: FormData) {
  try {
    const res = await fetch(`${env.API_URL}/auth/verify-otp`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        otp: formData.get("otp"),
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || "OTP verification failed" };
    }

    return { success: true, message: "OTP verified successfully!" };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

export async function resendOtp(prevState: any, formData: FormData) {
  try {
    const res = await fetch(`${env.API_URL}/auth/resend-otp`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || "Failed to resend OTP" };
    }

    return { success: true, message: "OTP resent successfully!" };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

export async function forgotPassword(prevState: any, formData: FormData) {
  try {
    const res = await fetch(`${env.API_URL}/auth/forgot-password`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || "Failed to send OTP for password reset" };
    }

    return { success: true, message: "OTP resent successfully!" };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

export async function resetPassword(prevState: any, formData: FormData) {
  try {
    const res = await fetch(`${env.API_URL}/auth/reset-password`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        otp: formData.get("otp"),
        newPassword: formData.get("newPassword"),
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || "Failed to send OTP for password reset" };
    }

    return { success: true, message: "Password Reset Successful!" };
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}

export async function logoutUser() {
  try {
    const cookieStore = await cookies();

    // 2️⃣ Notify your backend (optional, if backend manages token invalidation)
    const res = await fetch(`${env.API_URL}/auth/logout`, {
      method: "POST",
      headers: await withCookieHeaders(),
      credentials: "include", // ensure cookies are included if any
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || "Failed to logout" };
    }

    // 3️⃣ Return a success response
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    return { success: true, message: "Logout successful!" };
  } catch (err) {
    console.error("Logout error:", err);
    return { error: "Network error. Please try again." };
  }
}
