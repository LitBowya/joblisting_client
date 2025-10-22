"use client";

import { useAppSelector } from "@/hooks/useStore";
import type { User } from "@/types/user";

export default function JobSeekerGate({
  targetId = "jobseeker-section",
}: {
  targetId?: string;
}) {
  const user: User | null = useAppSelector((s) => s.auth.user);
  const isJobSeeker = user?.userType === "job_seeker";
  if (isJobSeeker) return null;
  // Hide the section if not job_seeker
  const css = `#${targetId}{display:none !important;}`;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
