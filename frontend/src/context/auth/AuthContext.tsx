import { createContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router";
import type { AuthContextType, AuthOAuthProvider } from "~/context/context.types";
import { supabaseClient as supabase } from "~/api/client";
import showToast from "~/components/Toasts/showToast";

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
            showToast({
               title: "Logged out",
               color: "success",
               description: "You have been logged out",
            });
         }
      });
      return () => subscription.unsubscribe();
   }, [navigate]);

   async function handleSignUp(email: string, password: string) {
      const { error } = await supabase.auth.signUp({
         email,
         password,
      });
      if (error) {
         showToast({
            title: "Error",
            color: "danger",
            description: error.message,
         });
      }
   }

   async function handleSignIn(email: string, password: string) {
      const { error } = await supabase.auth.signInWithPassword({
         email,
         password,
      });
      if (error) {
         showToast({
            title: "Error",
            color: "danger",
            description: error.message,
         });
      }
   }

   async function handleSignOut() {
      const { error } = await supabase.auth.signOut();
      if (error) {
         showToast({
            title: "Error",
            color: "danger",
            description: error.message,
         });
      }
   }

   async function handleSignInWithOAuth(provider: AuthOAuthProvider) {
      const { error } = await supabase.auth.signInWithOAuth({
         provider,
      });
      if (error) {
         showToast({
            title: "Error",
            color: "danger",
            description: error.message,
         });
      }
   }

   const value: AuthContextType = {
      user,
      login: handleSignIn,
      logout: handleSignOut,
      signUp: handleSignUp,
      signInWithOAuth: handleSignInWithOAuth,
   };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export { AuthContext };
