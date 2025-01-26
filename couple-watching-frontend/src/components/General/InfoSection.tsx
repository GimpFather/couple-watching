import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "motion/react";
import { FormattedMessage } from "react-intl";
import Button from "./Button";

type InfoSectionProps = {
   title: string;
   subtitle: string;
   emoji: string | React.ReactNode;
   primaryButton?: {
      caption: string;
      icon: React.ReactNode;
      action: () => void;
   };
   secondaryButton?: {
      caption: string;
      icon: React.ReactNode;
      action: () => void;
   };
};

const InfoSection = ({ title, subtitle, emoji, primaryButton, secondaryButton }: InfoSectionProps) => {
   const { breakpoints } = useTheme();
   const isMobile = useMediaQuery(breakpoints.down("sm"));
   return (
      <Stack
         component={motion.div}
         initial={{ opacity: 0, y: -100 }}
         animate={{ opacity: 1, y: 0 }}
         spacing={4}
         alignItems="center"
         sx={{ padding: 4, borderRadius: 4, backgroundColor: "background.paper" }}
      >
         <Stack spacing={1} alignItems="center" sx={{ textAlign: "center" }}>
            <Typography variant="h2">{emoji}</Typography>
            <Typography variant="h4" fontWeight={700}>
               <FormattedMessage id={title} />
            </Typography>
            <Typography variant="h6">
               <FormattedMessage id={subtitle} />
            </Typography>
         </Stack>
         {(primaryButton || secondaryButton) && (
            <Stack direction={isMobile ? "column" : "row"} spacing={2}>
               {primaryButton && (
                  <Button variant="contained" startIcon={primaryButton.icon} onClick={() => primaryButton.action()}>
                     <FormattedMessage id={primaryButton.caption} />
                  </Button>
               )}
               {secondaryButton && (
                  <Button variant="contained" startIcon={secondaryButton.icon} onClick={() => secondaryButton.action()}>
                     <FormattedMessage id={secondaryButton.caption} />
                  </Button>
               )}
            </Stack>
         )}
      </Stack>
   );
};

export default InfoSection;
