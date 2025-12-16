import { useNavigate } from "react-router";
import Typography from "@mui/material/Typography";
import PhoneContainer from "~/components/Custom/PhoneContainer";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import Stack from "@mui/material/Stack";
import { Divider } from "@mui/material";
import OAuthStack from "~/components/Auth/OAuthStack";
import AuthForm from "~/components/Auth/AuthForm";
import { MESSAGES } from "~/locales/en";

const AuthRegisterPage = () => {
   const navigate = useNavigate();
   const { TITLE } = MESSAGES.AUTH.REGISTER;
   const { COMMON } = MESSAGES;
   return (
      <PhoneContainer direction="backward">
         <Stack direction="row" alignItems="center" sx={{ marginBottom: "28px" }}>
            <ArrowLeftIcon cursor="pointer" size={18} onClick={() => navigate("/")} />
            <Typography variant="headingSmall" sx={{ margin: "0 auto" }}>
               {TITLE}
            </Typography>
         </Stack>
         <Stack gap="12px" sx={{ marginBottom: "20px" }}>
            <OAuthStack />
            <Divider sx={{ color: "common.200" }}>
               <Typography variant="bodyMedium" sx={{ color: "common.500" }}>
                  {COMMON.OR}
               </Typography>
            </Divider>
            <AuthForm type="register" />
         </Stack>
      </PhoneContainer>
   );
};
export default AuthRegisterPage;
