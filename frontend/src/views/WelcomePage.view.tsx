import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import messages from "~/locales/en.json";
import NBCard from "~/components/NeoBrutalism/NBCard";
import NBButton from "~/components/NeoBrutalism/NBButton";
import PhoneContainer from "~/components/Layout/PhoneContainer";
import { useNavigationTransition } from "~/hooks/useNavigationTransition";

const WelcomePage = () => {
   const welcomeBackgroundImage =
      "https://mxqxaduggzrvmnbxktpx.supabase.co/storage/v1/object/public/images/welcome-banner.webp";

   const handleNavigationTransition = useNavigationTransition();

   return (
      <PhoneContainer>
         <NBCard
            sx={{
               padding: "4px",
               height: "480px",
               width: "324px",
               backgroundColor: "white",
               placeSelf: "center",
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
               {messages["WELCOME_PAGE.TITLE"]}
            </Typography>
            <NBButton onClick={() => handleNavigationTransition("/auth/register")}>
               {messages["WELCOME_PAGE.BUTTON.GET_STARTED"]}
            </NBButton>
            <Typography variant="bodyMedium" color="accent.500" sx={{ textAlign: "center" }}>
               {messages["WELCOME_PAGE.SUBTEXT.ALREADY_HAVE_ACCOUNT"]}
               <Typography
                  component="span"
                  variant="bodyMedium"
                  color="primary.700"
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleNavigationTransition("/auth/login")}
               >
                  {messages["WELCOME_PAGE.SUBTEXT.LOG_IN"]}
               </Typography>
            </Typography>
         </Stack>
      </PhoneContainer>
   );
};

export default WelcomePage;
