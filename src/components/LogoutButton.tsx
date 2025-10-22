"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/useStore";
import { logoutUser } from "@/app/(auth)/authActions";
import { logout } from "@/app/(auth)/authSlice";
import { toast } from "sonner";

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    startTransition(async () => {
      try {
        const res = await logoutUser();

        if (res?.error) {
          console.error("Logout failed:", res.error);
          return;
        }

        toast.success("Logged out successfully");
        dispatch(logout());
        router.replace("/login");

      } catch (error) {
        console.error("Logout error:", error);
      }
    });
  };

  return (
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={handleLogout}
      className="w-full my-4"
    >
      {isPending ? "Logging out..." : "Logout"}
    </Button>
  );
};

export default LogoutButton;
