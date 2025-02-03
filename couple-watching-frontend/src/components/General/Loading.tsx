import { AnimatePresence, motion } from "motion/react";
import { bouncy } from "ldrs";
import { Stack, useTheme } from "@mui/material";
import InfoSection from "./InfoSection";
import { FormattedMessage } from "react-intl";

type LoadingProps = {
   isLoading: boolean;
   title?: React.ReactNode;
   subtitle?: React.ReactNode;
};

const Loading = ({
   isLoading,
   title = <FormattedMessage id="LOADING.TITLE" />,
   subtitle = <FormattedMessage id="LOADING.SUBTITLE" />,
}: LoadingProps) => {
   const { palette } = useTheme();
   bouncy.register();

   return (
      <AnimatePresence>
         {isLoading && (
            <Stack
               component={motion.div}
               alignItems="center"
               justifyContent="center"
               spacing={2}
               sx={{ borderRadius: 4, padding: 2, backgroundColor: "background.paper" }}
               initial={{ opacity: 0, scale: 0 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0 }}
            >
               <InfoSection title={title} subtitle={subtitle} emoji={<l-bouncy color={palette.primary.main} />} />
            </Stack>
         )}
      </AnimatePresence>
   );
};

export default Loading;
