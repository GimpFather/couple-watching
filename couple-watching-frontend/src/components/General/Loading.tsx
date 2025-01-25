import { AnimatePresence, motion } from "motion/react";
import { bouncy } from "ldrs";
import { Stack, useTheme } from "@mui/material";
import InfoSection from "./InfoSection";

type LoadingProps = {
   title?: string;
   subtitle?: string;
};

const Loading = ({ title = "Loading", subtitle = "Just gimme a moment, sir!" }: LoadingProps) => {
   const { palette } = useTheme();
   bouncy.register();

   return (
      <AnimatePresence>
         <Stack
            component={motion.div}
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{ borderRadius: 4, padding: 2, backgroundColor: "background.paper" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, type: "spring" }}
         >
            <InfoSection title={title} subtitle={subtitle} emoji={<l-bouncy color={palette.primary.main} />} />
         </Stack>
      </AnimatePresence>
   );
};

export default Loading;
