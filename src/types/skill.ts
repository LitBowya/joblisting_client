import { ServerState } from "@/types/server";

export type Skill = {
  id: number;
  profileId: number;
  skillName: string;
  proficiencyLevel?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
};

export type CreateSkillInput = {
  skillName: string;
  proficiencyLevel?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
};

export type UpdateSkillInput = Partial<CreateSkillInput>;

export type AddSkillState = ServerState & {
  skill?: Skill;
};

export type UpdateSkillState = ServerState & {
  skill?: Skill;
};

export type DeleteSkillState = ServerState;
