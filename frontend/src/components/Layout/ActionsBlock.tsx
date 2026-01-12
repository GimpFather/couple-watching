import { Box } from "@mui/material";
import { motion } from "motion/react";

type ActionsBlockProps = {
   children: React.ReactNode;
};

const ActionsBlock = ({ children }: ActionsBlockProps) => {
   return (
      <Box
         component={motion.div}
         initial={{ y: "100%" }}
         animate={{ y: 0 }}
         exit={{ y: "100%" }}
         transition={{
            duration: 0.3,
            ease: [0.87, 0, 0.13, 1],
         }}
         sx={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px" }}
      >
         {children}
      </Box>
   );
};

export default ActionsBlock;
