import { Button, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router";

const StarterPage = () => {
   return (
      <Grid container sx={{ padding: 2, height: "100vh" }}>
         <Grid size={{ xs: 12, md: 8 }} sx={{ padding: 4, alignContent: "center", justifyItems: "center" }}>
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
                  spacing={4}
                  direction="row"
                  component={motion.div}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5, type: "spring" }}
               >
                  <Link to="/">
                     <Button variant="contained" sx={{ paddingX: 4, paddingY: 2 }}>
                        <Typography variant="h6">
                           <FormattedMessage id="START.BUTTON.PRIMARY" />
                        </Typography>
                     </Button>
                  </Link>
                  <Link to="/">
                     <Button variant="contained" sx={{ paddingX: 4, paddingY: 2 }}>
                        <Typography variant="h6" textTransform="initial">
                           <FormattedMessage id="START.BUTTON.SECONDARY" />
                        </Typography>
                     </Button>
                  </Link>
               </Stack>
            </Stack>
         </Grid>
         <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
               backgroundColor: "background.paper",
               border: "4px solid",
               borderColor: "primary.main",
               borderRadius: 4,
               alignContent: "center",
               justifyItems: "center",
            }}
         >
            <Typography
               variant="h6"
               component={motion.div}
               initial={{ y: 100, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 1, delay: 2.5, type: "spring" }}
            >
               There should be something but I suck at this :(
            </Typography>
         </Grid>
      </Grid>
   );
};

export default StarterPage;
