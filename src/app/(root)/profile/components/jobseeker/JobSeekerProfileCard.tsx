// filepath: /mnt/kekelilit/Projects/Fullstack/meetAI/client/src/app/(root)/profile/components/jobseeker/JobSeekerProfileCard.tsx

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getMyJobSeekerProfileAction } from "@/app/(root)/profile/jobActions";
import type { JobSeekerProfile } from "@/types/profile";

export default async function JobSeekerProfileCard() {
  const res = await getMyJobSeekerProfileAction();
  const error = (res as any)?.error as string | undefined;
  const profile = (res as any)?.profile as JobSeekerProfile | undefined;

  return (
    <Card className="border border-gray-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          My Job Seeker Profile
        </CardTitle>
        <CardDescription>
          Manage and view details about your professional background
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && <p className="text-red-600">{error}</p>}

        {!error && !profile && (
          <p className="text-gray-600 text-sm">
            No profile found. Create one to get started.
          </p>
        )}

        {profile && (
          <>
            <ProfileField label="Phone" value={profile.phone} />
            <ProfileField label="Location" value={profile.location} />
            <ProfileField label="Bio" value={profile.bio} />
            <ProfileField
              label="Years of Experience"
              value={profile.yearsOfExperience?.toString()}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}

// 🔹 Small subcomponent to keep things neat
function ProfileField({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex flex-row justify-between items-center">
      <span className="font-medium text-gray-900">{label}:</span>
      <span className="text-gray-700">{value || "—"}</span>
    </div>
  );
}
