import { Grid2 as Grid, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";
import { FormattedMessage } from "react-intl";
import AuthorizationCard from "../../components/Starter/AuthorizationCard";
import CustomIconButton from "../../components/General/CustomIconButton";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import React from "react";

const StarterPage = () => {
   const [path, setPath] = React.useState<"signIn" | "register">("signIn");
   const handleCardFlip = (pathVariant: "signIn" | "register") => {
      setPath(pathVariant);
   };

   return (
      <Grid container sx={{ padding: 2, height: "100vh" }}>
         <Grid size={{ sm: 12, md: 8 }} sx={{ padding: 4, alignContent: "center", justifyItems: "center" }}>
            <Stack spacing={4} sx={{ maxWidth: "700px" }}>
               <Stack>
                  <Typography
                     variant="h4"
                     fontWeight={700}
                     color="primary.main"
                     component={motion.div}
                     initial={{ x: 100, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     transition={{ duration: 1, delay: 0.1, type: "spring" }}
                  >
                     <FormattedMessage id="START.TITLE" />
                  </Typography>
                  <Typography
                     variant="h4"
                     fontWeight={700}
                     component={motion.div}
                     initial={{ x: -100, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     transition={{ duration: 1, delay: 0.5, type: "spring" }}
                  >
                     <Typography
                        variant="h4"
                        fontWeight={700}
                        display="inline"
                        component="span"
                        sx={{
                           textDecoration: "underline",
                           textDecorationColor: "#38A169",
                           textDecorationThickness: 4,
                        }}
                     >
                        <FormattedMessage id="START.SUBTITLE.SPAN" />
                     </Typography>
                     <FormattedMessage id="START.SUBTITLE" />
                  </Typography>
               </Stack>
               <Typography
                  variant="h6"
                  component={motion.div}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 1, type: "spring" }}
               >
                  <FormattedMessage id="START.DESC" />
               </Typography>
               <Stack
                  direction="row"
                  spacing={2}
                  component={motion.div}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5, type: "spring" }}
               >
                  <CustomIconButton
                     handleOnClick={() => handleCardFlip("register")}
                     icon={<AppRegistrationIcon />}
                     text={<Typography>Let's get started!</Typography>}
                     selected={path === "register"}
                  />
                  <CustomIconButton
                     handleOnClick={() => handleCardFlip("signIn")}
                     icon={<LoginIcon />}
                     text={<Typography>Login to your account</Typography>}
                     selected={path === "signIn"}
                  />
               </Stack>
            </Stack>
         </Grid>
         <Grid
            size={{ sm: 12, md: 4 }}
            component={motion.div}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 2, type: "spring" }}
            sx={{
               alignContent: "center",
               justifyItems: "center",
            }}
         >
            <AuthorizationCard
               flipped={path}
               handleFlipRegister={() => handleCardFlip("signIn")}
               handleFlipSignIn={() => handleCardFlip("register")}
            />
         </Grid>
      </Grid>
   );
};

export default StarterPage;
