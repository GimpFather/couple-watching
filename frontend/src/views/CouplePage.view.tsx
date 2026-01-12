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
import MakePairByYourselfDialog from "~/components/Dialogs/MakePairByYourselfDialog";
import { useGetYourPairData } from "~/api/hooks/pairs";
import showToast from "~/components/Toasts/showToast";
import DeletePairDialog from "~/components/Dialogs/DeletePairDialog";
import { useNavigationTransition } from "~/hooks/useNavigationTransition";

// This is a test page for the couple feature.
// Dont mind redundant code, it's for testing purposes.

const CouplePage = () => {
   const user = useRequiredAuth();
   const { data: profileData } = useGetProfileData(user.id);
   const { data: yourPairData } = useGetYourPairData(profileData?.id);
   const handleNavigationTransition = useNavigationTransition();

   const isPaired = !!yourPairData;
   const isCustomized = !!profileData?.username;

   const [isCustomizeAccountDialogOpen, setIsCustomizeAccountDialogOpen] = useState(false);
   const [isMakePairByYourselfDialogOpen, setIsMakePairByYourselfDialogOpen] = useState(false);
   const [isDeletePairDialogOpen, setIsDeletePairDialogOpen] = useState(false);

   const handleCustomizeAccountButton = () => {
      setIsCustomizeAccountDialogOpen((prev) => !prev);
   };

   const handleMakePairButton = () => {
      handleNavigationTransition("/customization/pairing");
   };

   const handleMakePairByYourselfButton = () => {
      setIsMakePairByYourselfDialogOpen((prev) => !prev);
   };

   const handleCheckPair = () => {
      if (yourPairData) {
         console.log(yourPairData);
         const partnerNickname = yourPairData.secondDisplayName;
         showToast({
            title: "🎉 Pair found!",
            color: "success",
            description: `You are paired with ${partnerNickname}.`,
         });
      }
   };

   const handleDeletePairButton = () => {
      setIsDeletePairDialogOpen((prev) => !prev);
   };

   return (
      <PhoneContainer>
         <Stack direction="column" gap={2}>
            <Typography variant="headingExtraLarge">Couple</Typography>
            <Typography variant="bodyExtraLarge">It's time to set up your couple! 💑</Typography>
            <Divider />
            <Typography variant="bodyMedium">Start with customizing your username . . .</Typography>
            <NBButton onClick={() => handleCustomizeAccountButton()}>Customize my account details</NBButton>
            <Typography variant="bodyMedium">. . . then, set up your couple details.</Typography>
            <NBButton disabled={!isCustomized || !!isPaired} onClick={() => handleMakePairButton()}>
               Make a pair with someone
            </NBButton>
            <NBButton disabled={!isCustomized || !!isPaired} onClick={() => handleMakePairByYourselfButton()}>
               Make a pair managed by yourself
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
                  onClick={() => handleCheckPair()}
                  icon={<SealCheckIcon />}
               >
                  Check
               </NBButton>
               <NBButton color="danger" disabled={!isPaired} onClick={() => handleDeletePairButton()}>
                  Delete pair
               </NBButton>
            </Stack>
         </Stack>
         <CustomizeAcountDialog
            open={isCustomizeAccountDialogOpen}
            onClose={() => setIsCustomizeAccountDialogOpen(false)}
            authId={user.id}
         />
         <MakePairByYourselfDialog
            open={isMakePairByYourselfDialogOpen}
            onClose={() => setIsMakePairByYourselfDialogOpen(false)}
            authId={user.id}
         />
         {yourPairData && (
            <DeletePairDialog
               open={isDeletePairDialogOpen}
               onClose={() => setIsDeletePairDialogOpen(false)}
               pairId={yourPairData.id}
            />
         )}
      </PhoneContainer>
   );
};
export default CouplePage;
