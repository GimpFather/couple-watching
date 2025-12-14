import { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextType } from "./context.types";
import type { User } from "@supabase/supabase-js";
import { supabaseClient as supabase } from "../api/client";
import { useNavigate } from "react-router";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user ?? null);
        navigate("/dashboard");
      }
      if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSignUp(email: string, password: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      alert(error);
    }
  }

  async function handleSignIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error);
    }
  }

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error);
    }
  }

  const value: AuthContextType = {
    user,
    login: handleSignIn,
    logout: handleSignOut,
    signUp: handleSignUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
