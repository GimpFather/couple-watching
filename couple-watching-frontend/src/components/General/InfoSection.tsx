import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "motion/react";
import Button from "./Button";
import React from "react";
import Loading from "./Loading";
import OutlinedCard from "./OutlinedCard";

type InfoSectionButton = {
   caption: React.ReactNode;
   icon?: React.ReactNode;
   action: () => void;
};

type InfoSectionProps = {
   title: React.ReactNode;
   subtitle: React.ReactNode;
   emoji?: string | React.ReactNode;
   primaryButton?: InfoSectionButton;
   secondaryButton?: InfoSectionButton;
   container?: React.ReactNode;
};

const InfoSection = ({ title, subtitle, emoji, primaryButton, secondaryButton, container }: InfoSectionProps) => {
   const { breakpoints } = useTheme();
   const isMobile = useMediaQuery(breakpoints.down("sm"));
   return (
      <React.Suspense fallback={<Loading isLoading={true} />}>
         <OutlinedCard sx={{ height: "100%" }}>
            <Stack
               component={motion.div}
               initial={{ opacity: 0, y: -100 }}
               animate={{ opacity: 1, y: 0 }}
               spacing={4}
               alignItems="center"
               justifyContent="center"
               sx={{ padding: 4, borderRadius: 4, height: "100%" }}
            >
               <Stack spacing={1} alignItems="center" sx={{ textAlign: "center" }}>
                  {emoji && <Typography variant="headingLarge">{emoji}</Typography>}
                  <Typography variant="headingLarge" fontWeight={700}>
                     {title}
                  </Typography>
                  <Typography variant="bodyMedium">{subtitle}</Typography>
               </Stack>
               {(primaryButton || secondaryButton) && (
                  <Stack direction={isMobile ? "column" : "row"} spacing={2}>
                     {primaryButton && (
                        <Button startIcon={primaryButton.icon} onClick={() => primaryButton.action()}>
                           {primaryButton.caption}
                        </Button>
                     )}
                     {secondaryButton && (
                        <Button startIcon={secondaryButton.icon} onClick={() => secondaryButton.action()}>
                           {secondaryButton.caption}
                        </Button>
                     )}
                  </Stack>
               )}
               {container}
            </Stack>
         </OutlinedCard>
      </React.Suspense>
   );
};

export default InfoSection;
