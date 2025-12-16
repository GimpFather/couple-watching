import { memo } from "react";
import { motion } from "motion/react";
import { useSound } from "~/hooks/useSound";
import { SOUNDS } from "~/hooks/sounds.config";

type PhoneContainerProps = {
   children: React.ReactNode;
   direction: "forward" | "backward";
   developerMode?: boolean;
};

const PhoneContainer = ({ children, direction, developerMode = false }: PhoneContainerProps) => {
   const { playSound } = useSound();
   const initialX = direction === "forward" ? "200%" : "-200%";
   const exitX = direction === "forward" ? "-200%" : "200%";

   return (
      <motion.div
         layout
         onAnimationStart={() => {
            playSound(SOUNDS.TRANSITION_1.url);
         }}
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
