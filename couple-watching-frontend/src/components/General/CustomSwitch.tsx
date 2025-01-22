import { Box, useTheme } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import { motion } from "motion/react";

type CustomSwitch = {
   condition: boolean;
   handleOnChange: () => void;
};

const CustomSwitch = ({ condition, handleOnChange }: CustomSwitch) => {
   const { palette } = useTheme();
   return (
      <Box
         onClick={() => handleOnChange()}
         sx={{
            padding: 1,
            backgroundColor: palette.common.white,
            borderRadius: 4,
            width: 44,
            height: 24,
            position: "relative",
            cursor: "pointer",
         }}
      >
         <Box
            component={motion.div}
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 0.45 }}
            animate={{
               x: condition ? 16 : 0,
               color: condition ? palette.secondary.main : palette.primary.main,
            }}
            sx={{
               position: "absolute",
               width: 20,
               height: 20,
               top: 0,
               left: 2,
               color: "primary.main",
            }}
            children={<AdjustIcon />}
         />
      </Box>
   );
};

export default CustomSwitch;
