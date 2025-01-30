import { motion } from "motion/react";
import SyncIcon from "@mui/icons-material/Sync";

type FlipIconProps = {
   handleClick: () => void;
   dark?: boolean;
};

const FlipIcon = ({ handleClick, dark }: FlipIconProps) => {
   return (
      <SyncIcon
         component={motion.svg}
         onClick={() => handleClick()}
         whileHover={{ scale: 1.05, rotate: 180 }}
         whileTap={{ scale: 0.9, rotate: 360 }}
         transition={{ duration: 1, type: "spring" }}
         sx={{
            backgroundColor: "primary.main",
            color: dark ? "background.paper" : "common.white",
            padding: 1,
            fontSize: 40,
            borderRadius: "50%",
            outline: "none",
         }}
      />
   );
};

export default FlipIcon;
