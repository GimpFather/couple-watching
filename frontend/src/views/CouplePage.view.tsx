import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NBButton from "~/components/NeoBrutalism/NBButton";
import showToast from "~/components/Toasts/showToast";
import { SmileyXEyesIcon } from "@phosphor-icons/react";
import PhoneContainer from "~/components/Layout/PhoneContainer";

const CouplePage = () => {
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
            <Typography variant="bodyExtraLarge">This is the couple! 💑</Typography>
            <Divider />
            <Stack direction="row" gap={2}>
               <NBButton icon={<SmileyXEyesIcon />} onClick={() => handleCoupleButton()}>
                  Show me the couple!
               </NBButton>
            </Stack>
         </Stack>
      </PhoneContainer>
   );
};

export default CouplePage;
