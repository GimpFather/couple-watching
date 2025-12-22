import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NBButton from "~/components/NeoBrutalism/NBButton";
import { SealCheckIcon } from "@phosphor-icons/react";
import PhoneContainer from "~/components/Layout/PhoneContainer";
import { useState } from "react";
import CustomizeAcountDialog from "~/components/Dialogs/CustomizeAcountDialog";
import { useRequiredAuth } from "~/context/auth/useRequiredAuth";
import { useGetProfileData } from "~/api/hooks/profiles";

const CouplePage = () => {
   const user = useRequiredAuth();
   const { data: profileData } = useGetProfileData(user.id);
   const isPaired = false;
   const isCustomized = !!profileData?.username;

   const [isDialogOpen, setIsDialogOpen] = useState(false);

   const handleCoupleButton = () => {
      setIsDialogOpen((prev) => !prev);
   };

   return (
      <PhoneContainer>
         <Stack direction="column" gap={2}>
            <Typography variant="headingExtraLarge">Couple</Typography>
            <Typography variant="bodyExtraLarge">It's time to set up your couple! 💑</Typography>
            <Divider />
            <Typography variant="bodyMedium">Start with customizing your account details . . .</Typography>
            <NBButton onClick={() => handleCoupleButton()}>Customize my account details</NBButton>
            <Typography variant="bodyMedium">. . . then, set up your couple details.</Typography>
            <NBButton disabled={!isCustomized} onClick={() => handleCoupleButton()}>
               Make a pair
            </NBButton>
            <Divider />
            <Typography variant="bodyMedium">
               If everything is set up correctly, buttons below will be enabled, and you can start toodling around the
               app or delete your pair. Don't worry, you can always set up your couple again. This is purely for testing
               purposes.
            </Typography>
            <Stack direction="row" gap={2}>
               <NBButton
                  color="success"
                  disabled={!isPaired}
                  onClick={() => handleCoupleButton()}
                  icon={<SealCheckIcon />}
               >
                  Check
               </NBButton>
               <NBButton color="danger" disabled={!isPaired} onClick={() => handleCoupleButton()}>
                  Delete pair
               </NBButton>
            </Stack>
         </Stack>
         <CustomizeAcountDialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            action={() => handleCoupleButton()}
            authId={user.id}
         />
      </PhoneContainer>
   );
};
export default CouplePage;
