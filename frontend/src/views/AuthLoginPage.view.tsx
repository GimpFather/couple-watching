import Typography from "@mui/material/Typography";
import PhoneContainer from "~/components/Layout/PhoneContainer";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import OAuthStack from "~/components/Auth/OAuthStack";
import AuthForm from "~/components/Auth/AuthForm";
import messages from "~/locales/en.json";
import showToast from "~/components/Toasts/showToast";
import { useNavigationTransition } from "~/hooks/useNavigationTransition";

const AuthLoginPage = () => {
   const handleNavigationTransition = useNavigationTransition();

   const handleForgotPassword = () => {
      showToast({
         title: "To be done.",
         description: "This feature is not available yet.",
         color: "success",
      });
   };

   return (
      <PhoneContainer>
         <Stack direction="row" alignItems="center" sx={{ marginBottom: "28px" }}>
            <ArrowLeftIcon cursor="pointer" size={18} onClick={() => handleNavigationTransition("/")} />
            <Typography variant="headingSmall" sx={{ margin: "0 auto" }}>
               {messages["AUTH.LOGIN.TITLE"]}
            </Typography>
         </Stack>
         <Stack gap="12px" sx={{ marginBottom: "12px" }}>
            <OAuthStack />
            <Divider sx={{ color: "accent.200" }}>
               <Typography variant="bodyMedium" color="accent.200">
                  {messages["COMMON.OR"]}
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
               {messages["AUTH.LOGIN.FORGOT_PASSWORD"]}
            </Typography>
         </Stack>
      </PhoneContainer>
   );
};
export default AuthLoginPage;
