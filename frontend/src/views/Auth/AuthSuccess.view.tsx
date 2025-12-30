import { useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { HandsClappingIcon } from "@phosphor-icons/react";
import { useEffect } from "react";
import OnboardingContainer from "~/components/Layout/OnboardingContainer";
import NBButton from "~/components/NeoBrutalism/NBButton";
import { playSound } from "~/hooks/useSound";
import { launchConfettiSuccess } from "~/utils/utils";

const AuthSuccessPage = () => {
   const { palette } = useTheme();

   useEffect(() => {
      launchConfettiSuccess();
      playSound("MEME_ALERT_VIOLIN_HAPPY");
   }, []);

   return (
      <OnboardingContainer buttonsStack={<NBButton>Go to home</NBButton>}>
         <Stack direction="column" gap={2} sx={{ height: "100%" }}>
            <Stack
               gap={1}
               alignItems="center"
               justifyContent="center"
               sx={{
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
               }}
            >
               <HandsClappingIcon size={96} weight="duotone" color={palette.success.main} />
               <Typography variant="headingExtraLarge">Your account has been created</Typography>
               <Typography variant="bodyMedium">It’s great to have you on board!</Typography>
            </Stack>
         </Stack>
      </OnboardingContainer>
   );
};

export default AuthSuccessPage;
