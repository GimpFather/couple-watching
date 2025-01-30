import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "motion/react";
import { FormattedMessage } from "react-intl";
import Button from "./Button";
import { isString } from "lodash";

type InfoSectionProps = {
   title: React.ReactNode | string;
   subtitle: React.ReactNode | string;
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
         justifyContent="center"
         sx={{ padding: 4, borderRadius: 4, backgroundColor: "background.paper", height: "100%" }}
      >
         <Stack spacing={1} alignItems="center" sx={{ textAlign: "center" }}>
            {isString(emoji) ? <Typography variant="h2">{emoji}</Typography> : emoji}
            <Typography variant="h4" fontWeight={700}>
               {isString(title) ? <FormattedMessage id={title} /> : title}
            </Typography>
            <Typography variant="h6">{isString(subtitle) ? <FormattedMessage id={subtitle} /> : subtitle}</Typography>
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
