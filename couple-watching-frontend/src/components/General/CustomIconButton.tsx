import { Stack } from "@mui/material";
import { motion } from "motion/react";

type CustomIconButtonProps = {
   handleOnClick: () => void;
   icon: React.ReactNode;
   text: React.ReactNode;
   dark?: boolean;
};

const CustomIconButton = ({ handleOnClick, icon, text, dark }: CustomIconButtonProps) => {
   return (
      <Stack
         onClick={() => handleOnClick()}
         component={motion.div}
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.9 }}
         direction="row"
         spacing={1}
         alignItems="center"
         sx={{
            padding: 1,
            backgroundColor: "primary.main",
            borderRadius: 4,
            color: dark ? "background.paper" : "common.white",
         }}
      >
         {icon}
         {text}
      </Stack>
   );
};

export default CustomIconButton;
