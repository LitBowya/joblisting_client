

export type JobSeekerProfile = {
  id: number;
  userId: number;
  phone?: string | null;
  location?: string | null;
  bio?: string | null;
  yearsOfExperience?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateJobSeekerProfileInput = {
  phone?: string;
  location?: string;
  bio?: string;
  yearsOfExperience?: number;
};

export type UpdateJobSeekerProfileInput = Partial<CreateJobSeekerProfileInput>;
