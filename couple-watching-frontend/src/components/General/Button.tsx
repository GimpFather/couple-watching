import { Box, Button as MUIButton, ButtonProps as MUIButtonProps } from "@mui/material";
import { motion } from "motion/react";
import React from "react";

type ButtonProps = MUIButtonProps & {};

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         style={{ width: "fit-content", position: "relative" }}
      >
         <Box
            sx={{
               position: "absolute",
               height: 40,
               width: "100%",
               boxSizing: "border-box",
               backgroundColor: props.color ? `${props.color}.dark` : "primary.dark",
               borderRadius: 3,
               border: "2px solid black",
            }}
         />
         <MUIButton
            variant="contained"
            disableRipple
            {...props}
            sx={{
               position: "relative",
               backgroundColor: props.color ? `${props.color}.main` : "primary.main",
               color: "text.secondary",
               borderRadius: 3,
               border: "2px solid black",
               transition: "transform 0.2s, background-color 0.1s ease-in-out",
               transform: "translateY(-8px)",
               "&:active": {
                  backgroundColor: props.color ? `${props.color}.dark` : "primary.dark",
                  transform: "translateY(-4px)",
               },
               "&:hover": {
                  backgroundColor: props.color ? `${props.color}.light` : "primary.light",
                  transition: "background-color 0.1s ease-in-out",
               },
            }}
         >
            {children}
         </MUIButton>
      </motion.div>
   );
};

export default Button;
