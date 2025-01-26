import { Box } from "@mui/material";
import { motion } from "motion/react";
import LoginSide from "./LoginSide";
import RegisterSide from "./RegisterSide";

type AuthorizationCardProps = {
   flipped: "signIn" | "register";
   handleFlipSignIn: () => void;
   handleFlipRegister: () => void;
};

const AuthorizationCard = ({ flipped, handleFlipSignIn, handleFlipRegister }: AuthorizationCardProps) => {
   return (
      <Box
         sx={{
            perspective: "1000px",
            width: 350,
            height: 500,
         }}
      >
         <motion.div
            initial={{
               opacity: 0,
               y: 100,
            }}
            animate={{
               opacity: 1,
               y: 0,
               rotateY: flipped === "register" ? 180 : 0,
            }}
            transition={{
               duration: 0.6,
               type: "spring",
            }}
            style={{
               transformStyle: "preserve-3d",
               position: "relative",
            }}
         >
            <LoginSide handleFlip={() => handleFlipSignIn()} />
            <RegisterSide handleFlip={() => handleFlipRegister()} />
         </motion.div>
      </Box>
   );
};

export default AuthorizationCard;
