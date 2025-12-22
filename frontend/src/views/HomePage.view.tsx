import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NBButton from "~/components/NeoBrutalism/NBButton";
import { useAuth } from "~/context/auth/useAuth";
import showToast from "~/components/Toasts/showToast";
import { MaskHappyIcon } from "@phosphor-icons/react";
import PhoneContainer from "~/components/Layout/PhoneContainer";
import { useRequiredAuth } from "~/context/auth/useRequiredAuth";
import { useGetProfileData } from "~/api/hooks/profiles";

const HomePage = () => {
   const { logout } = useAuth();
   const user = useRequiredAuth();
   const { data: profileData } = useGetProfileData(user.id);

   const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      await logout();
   };

   const handleYouDidIt = () => {
      showToast({
         title: "You did it!",
         description: "You went through the authentication process successfully!",
         color: "success",
         sound: "MEME_ALERT_SHINE",
      });
   };

   return (
      <PhoneContainer>
         <Stack direction="column" gap={2}>
            <Typography variant="headingExtraLarge">Home</Typography>
            <Typography variant="bodyExtraLarge">Welcome, {profileData?.username ?? "Guest"}</Typography>
            <Divider />
            <Stack direction="row" gap={2}>
               <NBButton icon={<MaskHappyIcon />} onClick={() => handleYouDidIt()}>
                  You did it!
               </NBButton>
               <NBButton onClick={(event) => handleLogout(event)} color="danger">
                  Logout
               </NBButton>
            </Stack>
         </Stack>
      </PhoneContainer>
   );
};

export default HomePage;
