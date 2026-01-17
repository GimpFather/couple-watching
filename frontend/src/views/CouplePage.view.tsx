import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NBButton from "~/components/NeoBrutalism/NBButton";
import { SealCheckIcon } from "@phosphor-icons/react";
import PhoneContainer from "~/components/Layout/PhoneContainer";
import { useState } from "react";
import CustomizeAcountDialog from "~/components/Dialogs/CustomizeAcountDialog";
import { useRequiredAuth } from "~/context/auth/useRequiredAuth";
import { useGetMyPairWithProfiles } from "~/api/hooks/pairs";
import showToast from "~/components/Toasts/showToast";

// This is a test page for the couple feature.
// Dont mind redundant code, it's for testing purposes.

const CouplePage = () => {
   const user = useRequiredAuth();
   const { data: myPairData } = useGetMyPairWithProfiles();

   const isPaired = !!myPairData;

   const [isCustomizeAccountDialogOpen, setIsCustomizeAccountDialogOpen] = useState(false);

   const handleCustomizeAccountButton = () => {
      setIsCustomizeAccountDialogOpen((prev) => !prev);
   };

   const handleCheckPair = () => {
      if (myPairData) {
         console.log(myPairData);
         const partnerNickname = myPairData.partnerUsername;
         showToast({
            title: "🎉 Pair found!",
            color: "success",
            description: `You are paired with ${partnerNickname}. More information about your pair can be found in console.`,
         });
      }
   };

   return (
      <PhoneContainer>
         <Stack direction="column" gap={2}>
            <Typography variant="headingExtraLarge">Couple</Typography>
            <Typography variant="bodyExtraLarge">It's time to set up your couple! 💑</Typography>
            <Divider />
            <Typography variant="bodyMedium">Start with customizing your username . . .</Typography>
            <NBButton onClick={() => handleCustomizeAccountButton()}>Customize my account details</NBButton>
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
               {/* {TODO: There should be a special function for deleting pair - with cascade delete of reviews} */}
               <NBButton color="danger" disabled={true}>
                  Delete pair
               </NBButton>
            </Stack>
         </Stack>
         {isCustomizeAccountDialogOpen && (
            <CustomizeAcountDialog
               open={isCustomizeAccountDialogOpen}
               onClose={() => setIsCustomizeAccountDialogOpen(false)}
               authId={user.id}
            />
         )}
      </PhoneContainer>
   );
};
export default CouplePage;
