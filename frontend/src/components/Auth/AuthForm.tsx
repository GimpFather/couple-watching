import { useState } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import NBButton from "../NeoBrutalism/NBButton";
import { useAuth } from "../../context/AuthContext";

type AuthFormProps = {
   type: "signup" | "signin";
};

const AuthForm = ({ type }: AuthFormProps) => {
   const { login, signUp } = useAuth();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const title = type === "signup" ? "Create an account" : "Sign in";
   const buttonText = type === "signup" ? "Sign up" : "Sign in";

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (type === "signup") {
         await signUp(email, password);
      } else {
         await login(email, password);
      }
   };

   return (
      <Stack direction="column" gap={2}>
         <Typography variant="headingLarge">{title}</Typography>
         <Stack direction="column" gap={2}>
            <Stack component="form" onSubmit={handleSubmit} direction="column" gap={2}>
               <TextField
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
               />
               <TextField
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
               />
               <NBButton type="submit">{buttonText}</NBButton>
            </Stack>
         </Stack>
      </Stack>
   );
};

export default AuthForm;
