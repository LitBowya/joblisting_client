import { Suspense } from "react";
import TopProfileSection from "@/app/(root)/profile/components/profile/TopProfileSection";
import JobSeekerProfileCard from "@/app/(root)/profile/components/jobseeker/JobSeekerProfileCard";
import CreateJobSeekerProfileForm from "@/app/(root)/profile/components/jobseeker/CreateJobSeekerProfileForm";
import UpdateJobSeekerProfileForm from "@/app/(root)/profile/components/jobseeker/UpdateJobSeekerProfileForm";
import DeleteJobSeekerProfileButton from "@/app/(root)/profile/components/jobseeker/DeleteJobSeekerProfileButton";
import AddSkillForm from "@/app/(root)/profile/components/skills/AddSkillForm";
import SkillsList from "@/app/(root)/profile/components/skills/SkillsList";
import JobSeekerGate from "@/app/(root)/profile/components/jobseeker/JobSeekerGate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LogoutButton from "@/components/LogoutButton";

export default function ProfilePage() {
  return (
    <div className="max-width-lg py-10 grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Top: basic user profile + update + password (client) */}
      <TopProfileSection />

      {/* Job seeker only sections - visibility controlled client-side */}
      <JobSeekerGate targetId="jobseeker-section" />
      <section id="jobseeker-section" className="contents">
        {/* Profile overview */}
        <div className="md:col-span-4">
          <Suspense
            fallback={
              <Card>
                <CardHeader>
                  <CardTitle>Loading profile…</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Please wait</p>
                </CardContent>
              </Card>
            }
          >
            <JobSeekerProfileCard />
          </Suspense>
        </div>

        {/* Profile forms grouped together */}
        <div className="md:col-span-4">
          <CreateJobSeekerProfileForm />
        </div>
        <div className="md:col-span-4">
          <UpdateJobSeekerProfileForm />
        </div>

        {/* Skills section grouped */}
        <div className="md:col-span-4">
          <AddSkillForm />
        </div>
        <div className="md:col-span-4">
          <Suspense
            fallback={
              <Card>
                <CardHeader>
                  <CardTitle>Loading skills…</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Please wait</p>
                </CardContent>
              </Card>
            }
          >
            <SkillsList />
          </Suspense>
        </div>

        {/* Danger zone last */}
        <div className="md:col-span-4">
          <DeleteJobSeekerProfileButton />

          <LogoutButton />
        </div>
      </section>
    </div>
  );
}
