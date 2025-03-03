import {
   Button as MUIButton,
   ButtonProps as MUIButtonProps,
   Typography,
   useTheme,
   type CustomColorOptions,
} from "@mui/material";
import { motion, useMotionValue, useSpring } from "framer-motion";
import React from "react";

type ButtonProps = Omit<MUIButtonProps, "color"> & {
   isLoading?: boolean;
   color?: CustomColorOptions;
};

const Button: React.FC<ButtonProps> = ({ children, isLoading, ...props }) => {
   const y = useMotionValue(-5);
   const ySpring = useSpring(y, { stiffness: 400, damping: 20 });
   const { palette } = useTheme();

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.3 }}
         style={{
            position: "relative",
            ...(props.fullWidth && { width: "100%" }),
         }}
      >
         <motion.div
            style={{
               position: "absolute",
               height: 36,
               width: "100%",
               backgroundColor: props.color ? palette[props.color].dark : palette.primary.dark,
               borderRadius: 12,
               border: "2px solid black",
               y: 4,
            }}
         />
         <motion.div
            style={{ y: ySpring }}
            onTapStart={() => y.set(3)}
            onTapCancel={() => y.set(-5)}
            onPointerUp={() => y.set(-5)}
         >
            <MUIButton
               variant="contained"
               disableRipple
               disabled={isLoading}
               {...props}
               sx={{
                  height: 40,
                  width: "100%",
                  paddingX: 3,
                  paddingY: 1,
                  alignItems: "center",
                  position: "relative",
                  backgroundColor: props.color ? palette[props.color].main : palette.primary.main,
                  color: props.color === "accent" ? palette.common.black : "text.secondary",
                  borderRadius: 3,
                  border: "2px solid black",
                  transition: "background-color 0.3s cubic-bezier(0.1, 0, 0.2, 1)",
                  "&:hover": {
                     backgroundColor: props.color ? palette[props.color].light : palette.primary.light,
                  },
                  "&:disabled": {
                     backgroundColor: "grey.400",
                     cursor: "not-allowed",
                  },
               }}
            >
               <Typography variant="emphasizedBodyMedium">{children}</Typography>
            </MUIButton>
         </motion.div>
      </motion.div>
   );
};

export default Button;
