import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import PhoneContainer from "~/components/Custom/PhoneContainer";
import OAuthStack from "~/components/Auth/OAuthStack";
import AuthForm from "~/components/Auth/AuthForm";
import messages from "~/locales/en.json";
import { useNavigationTransition } from "~/hooks/useNavigationTransition";

const AuthRegisterPage = () => {
   const handleNavigationTransition = useNavigationTransition();
   return (
      <PhoneContainer direction="backward">
         <Stack direction="row" alignItems="center" sx={{ marginBottom: "28px" }}>
            <ArrowLeftIcon cursor="pointer" size={18} onClick={() => handleNavigationTransition("/")} />
            <Typography variant="headingSmall" sx={{ margin: "0 auto" }}>
               {messages["AUTH.REGISTER.TITLE"]}
            </Typography>
         </Stack>
         <Stack gap="12px" sx={{ marginBottom: "20px" }}>
            <OAuthStack />
            <Divider sx={{ color: "accent.200" }}>
               <Typography variant="bodyMedium" color="accent.200">
                  {messages["COMMON.OR"]}
               </Typography>
            </Divider>
            <AuthForm type="register" />
         </Stack>
      </PhoneContainer>
   );
};
export default AuthRegisterPage;
