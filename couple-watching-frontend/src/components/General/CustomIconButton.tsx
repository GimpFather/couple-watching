import { Stack } from "@mui/material";
import { motion } from "motion/react";

type CustomIconButtonProps = {
   handleOnClick: () => void;
   icon?: React.ReactNode;
   text: React.ReactNode;
   dark?: boolean;
   selected?: boolean;
};

const CustomIconButton = ({ handleOnClick, icon, text, dark, selected }: CustomIconButtonProps) => {
   return (
      <Stack
         onClick={() => handleOnClick()}
         component={motion.div}
         whileHover={selected ? {} : { scale: 1.1 }}
         whileTap={selected ? {} : { scale: 0.9 }}
         direction="row"
         spacing={1}
         alignItems="center"
         sx={{
            padding: 1,
            backgroundColor: selected ? "background.common" : "primary.main",
            borderRadius: 4,
            cursor: selected ? "default" : "pointer",
            ...(selected && {
               border: "2px solid",
               borderColor: "primary.main",
            }),
            color: dark ? "background.paper" : selected ? "primary.main" : "common.white",
         }}
      >
         {icon && icon}
         {text}
      </Stack>
   );
};

export default CustomIconButton;
