import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NBButton from "~/components/NeoBrutalism/NBButton";
import showToast from "~/components/Toasts/showToast";
import { SealCheckIcon } from "@phosphor-icons/react";
import PhoneContainer from "~/components/Layout/PhoneContainer";

const CouplePage = () => {
   const isPaired = false;
   const isCustomized = false;

   const handleCoupleButton = () => {
      showToast({
         title: "Show me the couple!",
         description: "You are now in the couple! 💑",
         color: "success",
         sound: "MEME_ALERT_SHINE",
      });
   };

   return (
      <PhoneContainer>
         <Stack direction="column" gap={2}>
            <Typography variant="headingExtraLarge">Couple</Typography>
            <Typography variant="bodyExtraLarge">It's time to set up your couple! 💑</Typography>
            <Divider />
            <Typography variant="bodyMedium">Start with customizing your account details . . .</Typography>
            <NBButton disabled={isCustomized} onClick={() => handleCoupleButton()}>
               Customize my account details
            </NBButton>
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
      </PhoneContainer>
   );
};
export default CouplePage;
