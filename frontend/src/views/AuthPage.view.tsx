import { useState } from "react";
import Container from "@mui/material/Container";
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import NBCard from "../components/NeoBrutalism/NBCard";

// This page is the entry point for the application.
// But for the sake of development, I dump everything here.

const AuthPage = () => {
   const { login, signUp } = useAuth();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleLogin = async (event: React.FormEvent<HTMLFormElement>, email: string, password: string) => {
      event.preventDefault();
      await login(email, password);
   };

   const handleSignUp = async (event: React.FormEvent<HTMLFormElement>, email: string, password: string) => {
      event.preventDefault();
      await signUp(email, password);
   };

   return (
      <Container maxWidth="sm" sx={{ paddingY: "24px" }}>
         <NBCard sx={{ padding: "16px" }}>
            <Stack direction="column" gap={2}>
               <Typography variant="headingLarge">Create an account</Typography>
               <Stack direction="column" gap={2}>
                  <Stack
                     component="form"
                     onSubmit={(event) => handleSignUp(event, email, password)}
                     direction="column"
                     gap={2}
                  >
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
                     <Button type="submit">Sign in</Button>
                  </Stack>
               </Stack>
            </Stack>
            <Divider sx={{ margin: "24px 0" }} />
            <Stack direction="column" gap={2}>
               <Typography variant="headingLarge">Already have an account?</Typography>
               <Stack
                  component="form"
                  onSubmit={(event) => handleLogin(event, email, password)}
                  direction="column"
                  gap={2}
               >
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
                  <Button type="submit">Sign in</Button>
               </Stack>
            </Stack>
         </NBCard>
      </Container>
   );
};
export default AuthPage;
