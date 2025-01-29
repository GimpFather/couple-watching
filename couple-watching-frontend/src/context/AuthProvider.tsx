/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../api/firebase";
import Loading from "../components/General/Loading";
import { useLogout } from "../api/hooks/auth";
import React from "react";
import { Dialog } from "@mui/material";

interface AuthContextProps {
   user: User | null;
   loading: boolean;
   logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [user, setUser] = React.useState<User | null>(null);
   const [loading, setLoading] = React.useState<boolean>(true);

   const { mutate: logoutMutation } = useLogout();

   React.useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         setUser(user || null);
         setLoading(false);
      });
      return () => unsubscribe();
   }, []);

   return (
      <AuthContext.Provider
         value={{
            user,
            loading,
            logout: logoutMutation,
         }}
      >
         {loading ? (
            <Dialog open>
               <Loading isLoading={loading} />
            </Dialog>
         ) : (
            children
         )}
      </AuthContext.Provider>
   );
};

export const useAuthContext = (): AuthContextProps => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error("useAuthContext must be used within an AuthProvider");
   }
   return context;
};
