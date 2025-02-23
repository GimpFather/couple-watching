import { Box, Button as MUIButton, ButtonProps as MUIButtonProps } from "@mui/material";
import { motion } from "motion/react";
import React from "react";

type ButtonProps = MUIButtonProps & {
   dark?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, dark = false, ...props }) => {
   const [animate, setAnimate] = React.useState<boolean>(true);
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         onTap={() => setAnimate((prev) => !prev)}
         style={{ width: "fit-content", position: "relative", zIndex: 1 }}
      >
         <MUIButton variant="contained" {...props}>
            <Box
               component={motion.div}
               animate={{ y: animate ? 0 : "-13%" }}
               sx={{
                  position: "relative",
                  ...(dark && {
                     color: "background.paper",
                     "&:hover": {
                        backgroundColor: "primary.main",
                     },
                  }),
               }}
            />
            {children}
            <Box
               sx={{
                  position: "absolute",
                  boxSizing: "content-box",
                  top: "13%",
                  zIndex: -1,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "primary.dark",
                  borderRadius: 4,
                  borderBottom: "2px solid black",
                  borderRight: "2px solid black",
                  borderLeft: "2px solid black",
               }}
            />
         </MUIButton>
      </motion.div>
   );
};

export default Button;
