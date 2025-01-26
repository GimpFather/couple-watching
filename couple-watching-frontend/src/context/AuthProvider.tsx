/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../api/firebase";
import Loading from "../components/General/Loading";

interface AuthContextProps {
   user: User | null;
   loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [user, setUser] = useState<User | null>(null);
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         setUser(user || null);
         setLoading(false);
      });
      return () => unsubscribe();
   }, []);

   return (
      <AuthContext.Provider value={{ user, loading }}>
         {loading ? <Loading isLoading={loading} /> : children}
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
