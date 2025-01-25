import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import CustomIconButton from "./CustomIconButton";
import { motion } from "motion/react";
import { FormattedMessage } from "react-intl";

type InfoSectionProps = {
   title: string;
   subtitle: string;
   emoji: string;
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
         <Stack direction={isMobile ? "column" : "row"} spacing={2}>
            {primaryButton && (
               <CustomIconButton
                  handleOnClick={() => primaryButton.action()}
                  icon={primaryButton.icon}
                  text={
                     <Typography>
                        <FormattedMessage id={primaryButton.caption} />
                     </Typography>
                  }
               />
            )}
            {secondaryButton && (
               <CustomIconButton
                  handleOnClick={() => secondaryButton.action()}
                  icon={secondaryButton.icon}
                  text={
                     <Typography>
                        <FormattedMessage id={secondaryButton.caption} />
                     </Typography>
                  }
               />
            )}
         </Stack>
      </Stack>
   );
};

export default InfoSection;
