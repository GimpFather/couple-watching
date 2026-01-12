import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { HandsClappingIcon } from "@phosphor-icons/react";
import { useEffect } from "react";
import PhoneContainer from "~/components/Layout/PhoneContainer";
import NBButton from "~/components/NeoBrutalism/NBButton";
import { useNavigationTransition } from "~/hooks/useNavigationTransition";
import { playSound } from "~/hooks/useSound";
import { launchConfettiSuccess } from "~/utils/utils";

const AuthSuccessPage = () => {
   const handleNavigationTransition = useNavigationTransition();
   const { palette } = useTheme();

   useEffect(() => {
      launchConfettiSuccess();
      playSound("MEME_ALERT_VIOLIN_HAPPY");
   }, []);

   return (
      <PhoneContainer>
         <Stack
            direction="column"
            gap={2}
            sx={{
               height: "100%",
               position: "absolute",
               top: "50%",
               left: 0,
               right: 0,
               transform: "translateY(-50%)",
               paddingBottom: "72px",
            }}
         >
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
         <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px" }}>
            <NBButton onClick={() => handleNavigationTransition("/customization/profile")}>Let's go!</NBButton>
         </Box>
      </PhoneContainer>
   );
};

export default AuthSuccessPage;
