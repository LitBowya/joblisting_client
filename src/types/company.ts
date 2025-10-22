import { ServerState } from "@/types/server";

export type Company = {
  id: number;
  userId: number;
  companyName: string;
  companyEmail?: string | null;
  companyPhone?: string | null;
  website?: string | null;
  industry?: string | null;
  location?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type CreateCompanyInput = {
  companyName: string;
  companyEmail?: string;
  companyPhone?: string;
  website?: string;
  industry?: string;
  location?: string;
};

export type UpdateCompanyInput = Partial<CreateCompanyInput>;

export type CreateCompanyState = ServerState & {
  company?: Company;
};

export type GetCompanyState = ServerState & {
  company?: Company;
};

export type UpdateCompanyState = ServerState & {
  company?: Company;
};

export type DeleteCompanyState = ServerState;

