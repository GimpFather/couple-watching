import { Box, Button as MUIButton, ButtonProps as MUIButtonProps, Typography } from "@mui/material";
import { motion } from "motion/react";
import React from "react";

type ButtonProps = MUIButtonProps & {};

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         style={{ position: "relative", ...(props.fullWidth && { width: "100%" }) }}
      >
         <Box
            sx={{
               position: "absolute",
               height: 36,
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
               height: 40,
               width: "100%",
               paddingX: 3,
               paddingY: 1,
               alignItems: "top",
               position: "relative",
               backgroundColor: props.color ? `${props.color}.main` : "primary.main",
               color: "text.secondary",
               borderRadius: 3,
               border: "2px solid black",
               transition: "all 0.3s cubic-bezier(0.1, 0, 0.2, 1)",
               transform: "translateY(-8px)",
               "&:active": {
                  backgroundColor: props.color ? `${props.color}.dark` : "primary.dark",
                  transform: "translateY(-3px)",
               },
               "&:hover": {
                  backgroundColor: props.color ? `${props.color}.light` : "primary.light",
               },
            }}
         >
            <Typography variant="emphasizedBodyMedium">{children}</Typography>
         </MUIButton>
      </motion.div>
   );
};

export default Button;
