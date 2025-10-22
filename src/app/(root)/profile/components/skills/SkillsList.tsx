// filepath: /mnt/kekelilit/Projects/Fullstack/meetAI/client/src/app/(root)/profile/components/skills/SkillsList.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMySkillsAction } from "@/app/(root)/profile/skillActions";
import UpdateSkillDialog from "./UpdateSkillDialog";
import DeleteSkillButton from "./DeleteSkillButton";
import type { Skill } from "@/types/skill";

export default async function SkillsList() {
  const res = await getMySkillsAction();
  const error = (res as any)?.error as string | undefined;
  const skills = (res as any)?.skills as Skill[] | undefined;

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Skills</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-600">{error}</p>}
        {!error && (!skills || skills.length === 0) && (
          <p className="text-gray-600">
            No skills found. Add your first skill.
          </p>
        )}
        <ul className="space-y-3">
          {(skills || []).map((skill) => (
            <li
              key={skill.id}
              className="flex items-center justify-between border rounded-md p-3"
            >
              <div className="space-y-1">
                <p className="font-medium">{skill.skillName}</p>
                {skill.proficiencyLevel && (
                  <p className="text-sm text-gray-600">
                    {skill.proficiencyLevel}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <UpdateSkillDialog
                  id={skill.id}
                  skillName={skill.skillName}
                  proficiencyLevel={skill.proficiencyLevel || undefined}
                />
                <DeleteSkillButton id={skill.id} />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
