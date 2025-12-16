import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NBCard from "~/components/NeoBrutalism/NBCard";
import NBButton from "~/components/NeoBrutalism/NBButton";
import { useAuth } from "~/context/auth/useAuth";
import { useRequiredAuth } from "~/context/auth/useRequiredAuth";

const DashboardPage = () => {
   const user = useRequiredAuth();
   const { logout } = useAuth();

   const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      await logout();
   };

   return (
      <Container maxWidth="sm" sx={{ paddingY: "24px" }}>
         <NBCard sx={{ padding: "16px" }}>
            <Stack direction="column" gap={2}>
               <Typography variant="headingExtraLarge">Dashboard</Typography>
               <Typography variant="bodyExtraLarge">Welcome, {user.email}</Typography>
               <Divider />
               <Stack direction="row" gap={2}>
                  <NBButton onClick={() => console.log(user)}>Console Log User</NBButton>
                  <NBButton onClick={(event) => handleLogout(event)} color="danger">
                     Logout
                  </NBButton>
               </Stack>
            </Stack>
         </NBCard>
      </Container>
   );
};

export default DashboardPage;
