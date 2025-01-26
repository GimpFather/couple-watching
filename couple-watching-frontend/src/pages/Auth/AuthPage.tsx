import { Grid2 as Grid } from "@mui/material";
import React from "react";
import AuthorizationCard from "../../components/Auth/AuthorizationCard";
import { useAuthContext } from "../../context/AuthProvider";
import { Navigate } from "react-router";

const AuthPage = () => {
   const { user } = useAuthContext();
   const [path, setPath] = React.useState<"signIn" | "register">("signIn");
   const handleCardFlip = (pathVariant: "signIn" | "register") => {
      setPath(pathVariant);
   };

   if (user) {
      return <Navigate to="/dashboard" replace />;
   }

   return (
      <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
         <AuthorizationCard
            flipped={path}
            handleFlipSignIn={() => handleCardFlip("register")}
            handleFlipRegister={() => handleCardFlip("signIn")}
         />
      </Grid>
   );
};

export default AuthPage;
