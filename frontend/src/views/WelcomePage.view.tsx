import { useNavigate } from "react-router";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { MESSAGES } from "~/locales/en";
import NBCard from "~/components/NeoBrutalism/NBCard";
import NBButton from "~/components/NeoBrutalism/NBButton";
import PhoneContainer from "~/components/Custom/PhoneContainer";

const WelcomePage = () => {
   const welcomeBackgroundImage =
      "https://mxqxaduggzrvmnbxktpx.supabase.co/storage/v1/object/public/images/welcome-banner.webp";

   const { TITLE, BUTTON, SUBTEXT } = MESSAGES.WELCOME_PAGE;

   const navigate = useNavigate();

   return (
      <PhoneContainer direction="forward">
         <NBCard
            sx={{
               padding: "4px",
               height: "480px",
               width: "324px",
               backgroundColor: "white",
            }}
         >
            <Box
               sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                  backgroundImage: `
                      linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),
                      url(${welcomeBackgroundImage})
                    `,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
               }}
            />
         </NBCard>
         <Stack direction="column" gap="20px" sx={{ marginTop: "24px" }}>
            <Typography variant="headingLarge" sx={{ textAlign: "center" }}>
               {TITLE}
            </Typography>
            <NBButton onClick={() => navigate("/auth/register")}>{BUTTON.GET_STARTED}</NBButton>
            <Typography variant="bodyMedium" color="common.500" sx={{ textAlign: "center" }}>
               {SUBTEXT.ALREADY_HAVE_ACCOUNT}
               <Typography
                  component="span"
                  variant="bodyMedium"
                  color="primary.main"
                  onClick={() => navigate("/auth/login")}
               >
                  {SUBTEXT.LOG_IN}
               </Typography>
            </Typography>
         </Stack>
      </PhoneContainer>
   );
};

export default WelcomePage;
