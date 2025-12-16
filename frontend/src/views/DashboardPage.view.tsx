import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NBCard from "~/components/NeoBrutalism/NBCard";
import NBButton from "~/components/NeoBrutalism/NBButton";
import { useAuth } from "~/context/auth/useAuth";
import { useRequiredAuth } from "~/context/auth/useRequiredAuth";
import showToast from "~/components/Toasts/showToast";
import { SOUNDS } from "~/hooks/sounds.config";
import { useSound } from "~/hooks/useSound";
import { MaskHappyIcon } from "@phosphor-icons/react";

const DashboardPage = () => {
   const user = useRequiredAuth();
   const { logout } = useAuth();
   const { playSound } = useSound();

   const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      await logout();
   };

   const handleYouDidIt = () => {
      playSound(SOUNDS.MEME_ALERT_SHINE.url);
      showToast({
         title: "You did it!",
         description: "You went through the authentication process successfully!",
         color: "success",
      });
   };

   return (
      <Container maxWidth="sm" sx={{ paddingY: "24px" }}>
         <NBCard sx={{ padding: "16px" }}>
            <Stack direction="column" gap={2}>
               <Typography variant="headingExtraLarge">Dashboard</Typography>
               <Typography variant="bodyExtraLarge">Welcome, {user.email}</Typography>
               <Divider />
               <Stack direction="row" gap={2}>
                  <NBButton startIcon={<MaskHappyIcon />} onClick={() => handleYouDidIt()}>
                     You did it!
                  </NBButton>
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
