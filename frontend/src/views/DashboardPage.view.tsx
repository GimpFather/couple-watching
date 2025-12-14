import { Navigate } from "react-router";
import { Button, Container, Divider, Stack, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
   const { user, logout } = useAuth();
   if (!user) {
      return <Navigate to="/" />;
   }

   const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      await logout();
   };

   return (
      <Container maxWidth="sm">
         <Stack direction="column" gap={2}>
            <Typography variant="headingExtraLarge">Dashboard</Typography>
            <Typography variant="bodyExtraLarge">Welcome, {user.email}</Typography>
            <Divider />
            <Stack direction="row" gap={2}>
               <Button onClick={() => console.log(user)}>Console Log User</Button>
               <Button onClick={(event) => handleLogout(event)} color="danger">
                  Logout
               </Button>
            </Stack>
         </Stack>
      </Container>
   );
};

export default DashboardPage;
