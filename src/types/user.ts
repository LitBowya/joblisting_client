import { ServerState } from "@/types/server";

export type User = {
  id: number;
  email: string;
  name: string;
  userType: string;
};

export type LoginState = ServerState & {
  user?: User;
};

export type RegisterState = ServerState;
export type ForgotPasswordState = ServerState;
