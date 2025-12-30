import { memo } from "react";
import { motion } from "motion/react";
import Box from "@mui/material/Box";

type OnboardingContainerProps = {
   children: React.ReactNode;
   buttonsStack: React.ReactNode;
};

const OnboardingContainer = ({ children, buttonsStack }: OnboardingContainerProps) => {
   return (
      <motion.div
         initial={{ y: "-100%" }}
         animate={{ y: 0 }}
         exit={{ y: "-100%" }}
         transition={{
            duration: 0.3,
            ease: [0.87, 0, 0.13, 1],
         }}
         style={{
            padding: "16px",
            maxWidth: 375,
            margin: "0 auto",
            height: "100vh",
         }}
      >
         {children}
         <Box style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px" }}>{buttonsStack}</Box>
      </motion.div>
   );
};

export default memo(OnboardingContainer);
