/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../api/firebase";
import Loading from "../components/General/Loading";
import { useLogout } from "../api/hooks/auth";
import { useRespondToPairRequest, useSendPairRequest } from "../api/hooks/pairs";
import React from "react";
import { PairRequest, RespondToPair } from "../types/Auth.types";

interface AuthContextProps {
   user: User | null;
   loading: boolean;
   logout: () => void;
   sendPairRequest: ({ from, to }: PairRequest) => void;
   respondToPairRequest: ({ accept, requestId }: RespondToPair) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [user, setUser] = React.useState<User | null>(null);
   const [loading, setLoading] = React.useState<boolean>(true);

   const { mutate: logoutMutation } = useLogout();
   const { mutate: sendRequestMutation } = useSendPairRequest();
   const { mutate: respondToRequestMutation } = useRespondToPairRequest();

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
            sendPairRequest: sendRequestMutation,
            respondToPairRequest: respondToRequestMutation,
         }}
      >
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
