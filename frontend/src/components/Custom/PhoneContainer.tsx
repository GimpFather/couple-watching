import { memo } from "react";
import { motion } from "motion/react";

type PhoneContainerProps = {
   children: React.ReactNode;
   direction: "forward" | "backward";
   developerMode?: boolean;
};

const PhoneContainer = ({ children, direction, developerMode = false }: PhoneContainerProps) => {
   const initialX = direction === "forward" ? "200%" : "-200%";
   const exitX = direction === "forward" ? "-200%" : "200%";

   return (
      <motion.div
         layout
         initial={{ x: initialX }}
         animate={{ x: "0%" }}
         exit={{ x: exitX }}
         transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
         }}
         style={{
            padding: "16px",
            maxWidth: 375,
            margin: "0 auto",
            ...(developerMode && {
               border: "1px dashed #453E3E",
            }),
         }}
      >
         {children}
      </motion.div>
   );
};

export default memo(PhoneContainer);
