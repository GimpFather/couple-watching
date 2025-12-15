import { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { EnvelopeIcon, LockKeyIcon } from "@phosphor-icons/react";
import NBButton from "../NeoBrutalism/NBButton";
import { useAuth } from "../../context/AuthContext";
import NBTextField from "../NeoBrutalism/NBTextField";

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
               <NBTextField
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  adornment={{ position: "start", icon: <EnvelopeIcon size={20} /> }}
                  placeholder="Email"
                  type="email"
               />
               <NBTextField
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  adornment={{ position: "start", icon: <LockKeyIcon size={20} /> }}
                  placeholder="Password"
                  type="password"
               />
               <NBButton type="submit">{buttonText}</NBButton>
            </Stack>
         </Stack>
      </Stack>
   );
};

export default AuthForm;
