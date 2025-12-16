import { useNavigate } from "react-router";
import Typography from "@mui/material/Typography";
import PhoneContainer from "~/components/Custom/PhoneContainer";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import Stack from "@mui/material/Stack";
import { Divider } from "@mui/material";
import OAuthStack from "~/components/Auth/OAuthStack";
import AuthForm from "~/components/Auth/AuthForm";
import { MESSAGES } from "~/locales/en";
import showToast from "~/components/Toasts/showToast";
import { useSound } from "~/hooks/useSound";
import { SOUNDS } from "~/hooks/sounds.config";

const AuthLoginPage = () => {
   const navigate = useNavigate();
   const { playSound } = useSound();

   const { TITLE, FORGOT_PASSWORD } = MESSAGES.AUTH.LOGIN;
   const { COMMON } = MESSAGES;

   const handleForgotPassword = () => {
      playSound(SOUNDS.NOTIFICATION_BUBBLE_POP.url);
      showToast({
         title: "To be done.",
         description: "This feature is not available yet.",
         color: "info",
      });
   };

   return (
      <PhoneContainer direction="backward">
         <Stack direction="row" alignItems="center" sx={{ marginBottom: "28px" }}>
            <ArrowLeftIcon cursor="pointer" size={18} onClick={() => navigate("/")} />
            <Typography variant="headingSmall" sx={{ margin: "0 auto" }}>
               {TITLE}
            </Typography>
         </Stack>
         <Stack gap="12px" sx={{ marginBottom: "12px" }}>
            <OAuthStack />
            <Divider sx={{ color: "common.200" }}>
               <Typography variant="bodyMedium" sx={{ color: "common.500" }}>
                  {COMMON.OR}
               </Typography>
            </Divider>
            <AuthForm type="login" />
         </Stack>
         <Stack alignItems="center">
            <Typography
               variant="bodyMedium"
               sx={{ color: "primary.main", cursor: "pointer" }}
               onClick={() => handleForgotPassword()}
            >
               {FORGOT_PASSWORD}
            </Typography>
         </Stack>
      </PhoneContainer>
   );
};
export default AuthLoginPage;
