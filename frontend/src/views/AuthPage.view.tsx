import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Container from "@mui/material/Container";
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";

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
      <Container maxWidth="sm">
         <Typography variant="headingExtraLarge">Welcome to the app</Typography>
         <Stack direction="column" gap={2}>
            <Typography variant="headingLarge">First time here?</Typography>
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
      </Container>
   );
};
export default AuthPage;
