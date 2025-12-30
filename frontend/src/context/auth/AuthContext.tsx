import { createContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import type { AuthContextType, AuthOAuthProvider } from "~/context/context.types";
import { supabaseClient as supabase } from "~/api/client";
import showToast from "~/components/Toasts/showToast";
import { useNavigate, useLocation } from "react-router";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [user, setUser] = useState<User | null>(null);
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
         setUser(session?.user ?? null);
      });

      const {
         data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
         if (event === "SIGNED_IN") {
            setUser(session?.user ?? null);
            localStorage.removeItem("pendingEmailVerification");
            const isOnAuthPage = location.pathname.startsWith("/auth") || location.pathname === "/";
            if (isOnAuthPage) {
               navigate("/home", { replace: true });
            }
         }
         if (event === "SIGNED_OUT") {
            setUser(null);
         }
         if (event === "TOKEN_REFRESHED") {
            setUser(session?.user ?? null);
         }
         if (event === "INITIAL_SESSION") {
            setUser(session?.user ?? null);
         }
      });
      return () => subscription.unsubscribe();
   }, [navigate, location.pathname]);

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
      } else {
         localStorage.setItem("pendingEmailVerification", email);
         navigate("/auth/confirm-email", { state: { email } });
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
