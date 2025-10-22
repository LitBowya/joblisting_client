"use client";

import { useAppSelector } from "@/hooks/useStore";
import type { User } from "@/types/user";
import UserProfile from "@/app/(root)/profile/components/profile/UserProfile";
import UserProfileUpdateForm from "@/app/(root)/profile/components/profile/UserProfileUpdateForm";
import ChangePasswordForm from "@/app/(root)/profile/components/profile/ChangeUserPassword";

export default function TopProfileSection() {
  const user: User | null = useAppSelector((state) => state.auth.user);
  if (!user) return <p className="text-center mt-10">No user logged in.</p>;

  return (
    <>
      <div className="md:col-span-3">
        <UserProfile user={user} />
      </div>
      <div className="md:col-span-5">
        <UserProfileUpdateForm user={user} />
      </div>
      <div className="md:col-span-4">
        <ChangePasswordForm />
      </div>
    </>
  );
}
