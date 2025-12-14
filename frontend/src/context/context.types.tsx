import type { User } from "@supabase/supabase-js";

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
